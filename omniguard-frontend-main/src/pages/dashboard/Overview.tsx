import { useAuth } from '../../context/AuthContext';
import { Shield, Activity, TriangleAlert as AlertTriangle, GitBranch, Zap, TrendingUp, Eye } from 'lucide-react';

export default function Overview() {
  const { user } = useAuth();
  if (!user) return null;

  const roleLabel =
    user.role === 'ciso' ? 'CISO' : user.role === 'manager' ? 'Security Manager' : 'Developer';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2">
          <Activity size={14} />
          Shared Attention Dashboard
        </div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user.name.split(' ')[0]}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Real-time overview of your security posture — scoped to your role as {roleLabel}.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={AlertTriangle}
          label="High-Risk Threats Today"
          value="—"
          sub="No new threats detected"
          color="red"
        />
        <StatCard
          icon={GitBranch}
          label="Graph Deltas (24h)"
          value="—"
          sub="No architecture changes"
          color="blue"
        />
        <StatCard
          icon={Zap}
          label="MCP Intercepts"
          value="—"
          sub="No AI guardrail triggers"
          color="amber"
        />
        <StatCard
          icon={Shield}
          label="Control Coverage"
          value="—"
          sub="Awaiting first scan"
          color="green"
        />
      </div>

      {/* Live Threat Map */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-red-500" />
            <h2 className="text-sm font-semibold text-gray-900">Live Threat Map</h2>
          </div>
          <span className="text-xs text-gray-400">High-risk vulnerabilities introduced today across all repos</span>
        </div>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
            <Eye size={20} className="text-gray-400" />
          </div>
          <p className="text-sm text-gray-500">No threats have been detected yet.</p>
          <p className="text-xs text-gray-400 mt-1">
            Threats will appear here once repositories are connected and scanned.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graph Delta Feed */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <GitBranch size={16} className="text-blue-500" />
            <h2 className="text-sm font-semibold text-gray-900">Graph Delta Feed</h2>
          </div>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-sm text-gray-500">No architecture changes recorded.</p>
            <p className="text-xs text-gray-400 mt-1">
              Changes to the Architecture Nexus will stream here in real time.
            </p>
          </div>
        </div>

        {/* MCP Intercept Feed */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={16} className="text-amber-500" />
            <h2 className="text-sm font-semibold text-gray-900">MCP Intercept Feed</h2>
          </div>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-sm text-gray-500">No MCP interceptions recorded.</p>
            <p className="text-xs text-gray-400 mt-1">
              AI guardrail blocks from Claude/Antigravity will appear here.
            </p>
          </div>
        </div>
      </div>

      {/* Role-specific quick links */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={16} className="text-gray-600" />
          <h2 className="text-sm font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <QuickLink href="/app/nexus" label="View Architecture Nexus" />
          <QuickLink href="/app/api" label="Generate API Key" />
          <QuickLink href="/app/compliance" label="Download SBOM" />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
}: {
  icon: typeof Shield;
  label: string;
  value: string;
  sub: string;
  color: 'red' | 'blue' | 'amber' | 'green';
}) {
  const colors = {
    red: 'bg-red-50 text-red-600',
    blue: 'bg-blue-50 text-blue-600',
    amber: 'bg-amber-50 text-amber-600',
    green: 'bg-green-50 text-green-600',
  };
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${colors[color]}`}>
        <Icon size={18} />
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs font-semibold text-gray-600 mt-1">{label}</p>
      <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
    </div>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-blue-300 hover:bg-blue-50 transition-colors"
    >
      {label}
      <ArrowRightSmall />
    </a>
  );
}

function ArrowRightSmall() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
