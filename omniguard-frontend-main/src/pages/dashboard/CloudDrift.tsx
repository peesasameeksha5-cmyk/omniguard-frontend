import { useState } from 'react';
import { Cloud, OctagonAlert as AlertOctagon, Power, Shield, Plus, Check } from 'lucide-react';

interface ProviderForm {
  provider: 'aws' | 'gcp' | 'azure';
  iamRoleArn: string;
  externalId: string;
}

export default function CloudDrift() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<ProviderForm>({
    provider: 'aws',
    iamRoleArn: '',
    externalId: '',
  });

  const [policies, setPolicies] = useState([
    { id: 'shutdown-ssh', label: 'Auto-shutdown services with open SSH (port 22) to the internet', enabled: false, severity: 'critical' },
    { id: 'shutdown-rdp', label: 'Auto-isolate services with open RDP (port 3389) to the internet', enabled: false, severity: 'critical' },
    { id: 'shutdown-public-db', label: 'Auto-shutdown databases exposed to 0.0.0.0/0', enabled: false, severity: 'high' },
    { id: 'shutdown-iam', label: 'Auto-quarantine IAM role changes without CISO approval', enabled: false, severity: 'high' },
  ]);

  const togglePolicy = (id: string) => {
    setPolicies((prev) => prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)));
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2">
          <Cloud size={14} />
          Cloud Drift & Auto-Shutdown
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Cloud Provider Control Center</h1>
        <p className="text-sm text-gray-500 mt-1">
          Connect cloud providers, monitor active drift, and configure negligence auto-shutdown rules.
        </p>
      </div>

      {/* Provider Config */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Cloud size={16} className="text-blue-500" />
            <h2 className="text-sm font-semibold text-gray-900">Provider Configuration</h2>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="btn-secondary text-xs px-3 py-1.5"
            >
              <Plus size={14} /> Connect Provider
            </button>
          )}
        </div>

        {showForm && (
          <div className="mb-6 p-5 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Connect a Cloud Provider</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Provider</label>
                <select
                  value={form.provider}
                  onChange={(e) => setForm({ ...form, provider: e.target.value as ProviderForm['provider'] })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="aws">AWS</option>
                  <option value="gcp">GCP</option>
                  <option value="azure">Azure</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  IAM Role ARN
                </label>
                <input
                  type="text"
                  value={form.iamRoleArn}
                  onChange={(e) => setForm({ ...form, iamRoleArn: e.target.value })}
                  placeholder="arn:aws:iam::123456789012:role/OmniGuardNexus"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="sm:col-span-3">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  External ID
                </label>
                <input
                  type="text"
                  value={form.externalId}
                  onChange={(e) => setForm({ ...form, externalId: e.target.value })}
                  placeholder="omniguard-external-id"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => setShowForm(false)}
                className="btn-primary text-xs px-4 py-2"
              >
                <Check size={14} /> Save Provider
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="btn-ghost text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
            <Cloud size={20} className="text-gray-400" />
          </div>
          <p className="text-sm text-gray-500">No cloud providers connected.</p>
          <p className="text-xs text-gray-400 mt-1">
            Connect AWS, GCP, or Azure via IAM roles to start monitoring drift.
          </p>
        </div>
      </div>

      {/* Active Drifts */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-5">
          <AlertOctagon size={16} className="text-red-500" />
          <h2 className="text-sm font-semibold text-gray-900">Active Drifts</h2>
        </div>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-3">
            <Check size={20} className="text-green-500" />
          </div>
          <p className="text-sm text-gray-500">No unapproved changes detected.</p>
          <p className="text-xs text-gray-400 mt-1">
            Drifts like "Port 22 manually opened on DB-Server" will appear here.
          </p>
        </div>
      </div>

      {/* Auto-Shutdown Rules */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-5">
          <Power size={16} className="text-red-500" />
          <h2 className="text-sm font-semibold text-gray-900">Negligence Auto-Shutdown Rules</h2>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          Toggle rules to allow OmniGuard to automatically isolate or shut down services when explicitly dangerous drift is detected without CISO approval.
        </p>
        <div className="space-y-3">
          {policies.map((policy) => (
            <div
              key={policy.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-start gap-3">
                <Shield
                  size={16}
                  className={`flex-shrink-0 mt-0.5 ${policy.severity === 'critical' ? 'text-red-500' : 'text-amber-500'}`}
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{policy.label}</p>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1 ${
                      policy.severity === 'critical'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {policy.severity}
                  </span>
                </div>
              </div>
              <button
                onClick={() => togglePolicy(policy.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  policy.enabled ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    policy.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
