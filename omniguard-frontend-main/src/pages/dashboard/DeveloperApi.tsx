import { useState } from 'react';
import { Key, Plus, Copy, Trash2, Terminal, GitBranch, Zap, Eye, EyeOff } from 'lucide-react';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  type: 'personal' | 'service';
  createdAt: string;
}

function generateKey() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const body = Array.from({ length: 48 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `omniguard_sk_${body}`;
}

export default function DeveloperApi() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyType, setNewKeyType] = useState<'personal' | 'service'>('personal');
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return;
    const key = generateKey();
    const newKey: ApiKey = {
      id: `key-${Date.now()}`,
      name: newKeyName,
      key,
      type: newKeyType,
      createdAt: new Date().toISOString(),
    };
    setKeys([newKey, ...keys]);
    setVisibleKeys(new Set([key]));
    setNewKeyName('');
    setNewKeyType('personal');
    setShowCreateForm(false);
  };

  const deleteKey = (id: string) => {
    setKeys(keys.filter((k) => k.id !== id));
  };

  const toggleKeyVisibility = (key: string) => {
    setVisibleKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
  };

  const maskKey = (key: string) => key.slice(0, 14) + '••••••••••••••••••••••••••••••';

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2">
          <Key size={14} />
          API & Integrations
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Developer API Keys & Integration Hooks</h1>
        <p className="text-sm text-gray-500 mt-1">
          Generate API tokens, configure the MCP server, and embed OmniGuard into your CI/CD pipeline.
        </p>
      </div>

      {/* API Key Generation */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Key size={16} className="text-blue-500" />
            <h2 className="text-sm font-semibold text-gray-900">API Keys</h2>
          </div>
          {!showCreateForm && (
            <button onClick={() => setShowCreateForm(true)} className="btn-primary text-xs px-3 py-1.5">
              <Plus size={14} /> Generate Key
            </button>
          )}
        </div>

        {showCreateForm && (
          <div className="mb-5 p-5 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">New API Key</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Key name</label>
                <input
                  type="text"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="e.g. CI/CD Pipeline"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Key type</label>
                <select
                  value={newKeyType}
                  onChange={(e) => setNewKeyType(e.target.value as 'personal' | 'service')}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="personal">Personal</option>
                  <option value="service">Service Account</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <button onClick={handleCreateKey} className="btn-primary text-xs px-4 py-2">
                <Key size={14} /> Generate Token
              </button>
              <button onClick={() => setShowCreateForm(false)} className="btn-ghost text-xs">
                Cancel
              </button>
            </div>
          </div>
        )}

        {keys.length === 0 && !showCreateForm ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <Key size={20} className="text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">No API keys generated yet.</p>
            <p className="text-xs text-gray-400 mt-1">
              Generate personal or service-account <code className="code-inline">omniguard_sk_...</code> tokens.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {keys.map((k) => (
              <div key={k.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-gray-900">{k.name}</p>
                    <span className={`tag ${k.type === 'service' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                      {k.type}
                    </span>
                  </div>
                  <code className="text-xs text-gray-500 font-mono">
                    {visibleKeys.has(k.key) ? k.key : maskKey(k.key)}
                  </code>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => toggleKeyVisibility(k.key)}
                    className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                    title={visibleKeys.has(k.key) ? 'Hide' : 'Reveal'}
                  >
                    {visibleKeys.has(k.key) ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                  <button
                    onClick={() => copyKey(k.key)}
                    className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                    title="Copy"
                  >
                    <Copy size={14} />
                  </button>
                  <button
                    onClick={() => deleteKey(k.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Revoke"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MCP Server Configuration */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-5">
          <Zap size={16} className="text-amber-500" />
          <h2 className="text-sm font-semibold text-gray-900">MCP Server Configuration</h2>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Hook the OmniGuard MCP server into Claude Desktop or Antigravity IDE for real-time, pre-commit AI guardrails.
        </p>
        <div className="bg-gray-950 rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm text-green-400 font-mono">{`{
  "mcpServers": {
    "omniguard-nexus": {
      "command": "node",
      "args": ["cli/src/mcp-server.js"]
    }
  }
}`}</pre>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Place this in your Claude Desktop config file or Antigravity IDE MCP settings. The server exposes tools for Threat Library, Secure Design Graph, Compliance Evidence, Drift Detection, and Architecture Mapping.
        </p>
      </div>

      {/* CI/CD Hooks */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-5">
          <GitBranch size={16} className="text-blue-500" />
          <h2 className="text-sm font-semibold text-gray-900">CI/CD Hooks</h2>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Copy-paste snippets to embed OmniGuard into your GitHub Actions or GitLab CI pipeline.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Terminal size={14} className="text-gray-500" />
              <span className="text-xs font-semibold text-gray-700">GitHub Actions</span>
            </div>
            <div className="bg-gray-950 rounded-lg p-4 overflow-x-auto">
              <pre className="text-xs text-green-400 font-mono">{`- name: OmniGuard Nexus Check
  run: npx omniguard nexus check
  env:
    OMNIGUARD_API_KEY: \${{ secrets.OMNIGUARD_API_KEY }}`}</pre>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Terminal size={14} className="text-gray-500" />
              <span className="text-xs font-semibold text-gray-700">GitLab CI</span>
            </div>
            <div className="bg-gray-950 rounded-lg p-4 overflow-x-auto">
              <pre className="text-xs text-green-400 font-mono">{`omniguard_check:
  script:
    - npx omniguard nexus check
  variables:
    OMNIGUARD_API_KEY: $CI_OMNIGUARD_API_KEY`}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
