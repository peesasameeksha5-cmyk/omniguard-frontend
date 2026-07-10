import { FileCheck, Download, Shield, Check, X, FileText } from 'lucide-react';

const frameworks = [
  { name: 'SOC 2', controls: 64 },
  { name: 'ISO 27001', controls: 114 },
  { name: 'HIPAA', controls: 42 },
  { name: 'PCI DSS', controls: 78 },
  { name: 'NIST CSF', controls: 108 },
  { name: 'GDPR', controls: 31 },
  { name: 'CIS Controls v8', controls: 153 },
  { name: 'ISO 27017', controls: 37 },
];

export default function SbomCompliance() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2">
          <FileCheck size={14} />
          SBOM & Compliance
        </div>
        <h1 className="text-2xl font-bold text-gray-900">SBOM & Compliance Reports</h1>
        <p className="text-sm text-gray-500 mt-1">
          Generate Software Bills of Materials and track compliance against 180+ frameworks, mapped directly to graph nodes.
        </p>
      </div>

      {/* SBOM Generation */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-5">
          <FileText size={16} className="text-blue-500" />
          <h2 className="text-sm font-semibold text-gray-900">Continuous SBOM Generation</h2>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Download a Software Bill of Materials based on the live Architecture Nexus graph. Available in CycloneDX and SPDX formats.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Download size={16} className="text-gray-600" />
              <h3 className="text-sm font-semibold text-gray-900">CycloneDX</h3>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              OWASP CycloneDX format — JSON or XML. Industry standard for SBOM exchange.
            </p>
            <button
              disabled
              className="btn-secondary text-xs px-3 py-2 w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={14} /> Download (no data yet)
            </button>
          </div>
          <div className="p-5 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Download size={16} className="text-gray-600" />
              <h3 className="text-sm font-semibold text-gray-900">SPDX</h3>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              ISO/IEC 5962 SPDX format. Used for license compliance and component tracking.
            </p>
            <button
              disabled
              className="btn-secondary text-xs px-3 py-2 w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={14} /> Download (no data yet)
            </button>
          </div>
        </div>
      </div>

      {/* Compliance Matrix */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-5">
          <Shield size={16} className="text-green-500" />
          <h2 className="text-sm font-semibold text-gray-900">Compliance Matrix</h2>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Real-time pass/fail status against major security frameworks, mapped directly to graph nodes.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-xs font-semibold text-gray-500 py-3 px-3">Framework</th>
                <th className="text-left text-xs font-semibold text-gray-500 py-3 px-3">Controls</th>
                <th className="text-left text-xs font-semibold text-gray-500 py-3 px-3">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 py-3 px-3">Coverage</th>
              </tr>
            </thead>
            <tbody>
              {frameworks.map((fw) => (
                <tr key={fw.name} className="border-b border-gray-100">
                  <td className="py-3 px-3 text-sm font-medium text-gray-900">{fw.name}</td>
                  <td className="py-3 px-3 text-sm text-gray-500">{fw.controls} controls</td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
                      <span className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                      </span>
                      Not assessed
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gray-300 rounded-full" style={{ width: '0%' }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          Compliance status will populate as the Architecture Nexus maps controls and evidence to framework requirements.
        </p>
      </div>

      {/* Additional Frameworks */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Check size={16} className="text-blue-500" />
          <h2 className="text-sm font-semibold text-gray-900">Supported Frameworks</h2>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          OmniGuard supports 180+ compliance and security frameworks. The above are the most commonly used — additional frameworks are available via the reporting agent.
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            'FedRAMP', 'CMMC', 'APRA CPS 230', 'ISO 27018', 'ISO 27034',
            'NIST 800-53', 'NIST 800-171', 'CSA STAR', 'ENS', 'IRAP',
            'ITAR', 'TISAX', 'Cyber Essentials', 'Cyber Essentials Plus',
            'SOC 1', 'SOC 3', 'FFIEC', 'GLBA', 'FISMA', 'NYDFS 23 NYCRR 500',
          ].map((f) => (
            <span key={f} className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-50 border border-gray-200 rounded text-xs text-gray-600">
              <X size={11} className="text-gray-300" />
              {f}
            </span>
          ))}
          <span className="inline-flex items-center px-2.5 py-1 text-xs text-gray-400">+ 160 more</span>
        </div>
      </div>
    </div>
  );
}
