import { useState } from 'react';
import { Network, Clock, OctagonAlert as AlertOctagon, Search, Layers, Server, Database, Cloud } from 'lucide-react';

export default function ArchitectureNexus() {
  const [timelineValue, setTimelineValue] = useState(100);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2">
          <Network size={14} />
          Architecture Nexus
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Visual Graph Builder</h1>
        <p className="text-sm text-gray-500 mt-1">
          The single source of truth — renders your exact infrastructure from IaC and live cloud polling.
        </p>
      </div>

      {/* Topological View */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-blue-500" />
            <h2 className="text-sm font-semibold text-gray-900">Topological View</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search nodes..."
                className="pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Empty graph state */}
        <div className="relative bg-gray-50 border border-gray-100 rounded-lg h-96 flex items-center justify-center">
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center mx-auto mb-3">
              <Network size={24} className="text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-600">No graph data available</p>
            <p className="text-xs text-gray-400 mt-1 max-w-sm">
              Run <code className="code-inline">omniguard agent map</code> to discover your infrastructure and build the Secure Design Graph.
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-green-400" /> Synced
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400" /> Drift Detected
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-gray-300" /> Unknown
          </span>
        </div>
      </div>

      {/* Historical Audit Trail */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-5">
          <Clock size={16} className="text-gray-600" />
          <h2 className="text-sm font-semibold text-gray-900">Historical Audit Trail</h2>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>30 days ago</span>
            <span className="font-semibold text-gray-900">Today</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={timelineValue}
            onChange={(e) => setTimelineValue(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
          <p className="text-xs text-gray-400 mt-2">
            Drag the slider to travel back in time and see who changed the graph, what broke, and how OmniGuard responded.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-sm text-gray-500">No audit events for this time range.</p>
          <p className="text-xs text-gray-400 mt-1">
            Graph changes will appear here as CloudTrail-style timeline entries.
          </p>
        </div>
      </div>

      {/* Drift Overlays */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-5">
          <AlertOctagon size={16} className="text-red-500" />
          <h2 className="text-sm font-semibold text-gray-900">Drift Overlays</h2>
        </div>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-sm text-gray-500">No drift detected between live cloud and IaC-defined graph.</p>
          <p className="text-xs text-gray-400 mt-1">
            Nodes will highlight in red when the live environment deviates from Git-defined infrastructure.
          </p>
        </div>
      </div>

      {/* Node type legend */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: Server, label: 'Compute', color: 'text-blue-600 bg-blue-50' },
          { icon: Database, label: 'Data Stores', color: 'text-green-600 bg-green-50' },
          { icon: Cloud, label: 'Cloud Services', color: 'text-amber-600 bg-amber-50' },
          { icon: Network, label: 'Trust Boundaries', color: 'text-gray-600 bg-gray-100' },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color}`}>
                <Icon size={16} />
              </div>
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
