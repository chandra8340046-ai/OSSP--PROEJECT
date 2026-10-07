import React from 'react';
import { 
  BarChart3, 
  Clock, 
  Zap, 
  HardDrive, 
  ShieldCheck, 
  TrendingUp,
  Cpu
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { PERFORMANCE_DATA } from '../data/mockData';

export default function PerformanceView() {
  return (
    <div className="space-y-8 pb-12">
      
      {/* Page Title */}
      <div className="border-b border-[#30363d] pb-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold mb-2">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>EXPERIMENTAL BENCHMARKING</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white font-mono">
          Performance Analysis
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Full Backup vs Incremental Synchronization execution time comparison.
        </p>
      </div>

      {/* Experimental Parameter Callout Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-xl flex items-center space-x-3">
          <div className="p-3 bg-blue-600/20 border border-blue-500/40 rounded-lg text-blue-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">BUFFER SIZE</span>
            <span className="font-mono text-sm text-white font-bold">4096 Bytes (4 KB)</span>
            <span className="text-[11px] text-slate-400 block">Single memory page size</span>
          </div>
        </div>

        <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-xl flex items-center space-x-3">
          <div className="p-3 bg-emerald-600/20 border border-emerald-500/40 rounded-lg text-emerald-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">COMPARISON KEYS</span>
            <span className="font-mono text-sm text-white font-bold">st_size + st_mtime</span>
            <span className="text-[11px] text-slate-400 block">stat() metadata check</span>
          </div>
        </div>

        <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-xl flex items-center space-x-3">
          <div className="p-3 bg-purple-600/20 border border-purple-500/40 rounded-lg text-purple-400">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">SYNC DIRECTION</span>
            <span className="font-mono text-sm text-white font-bold">SOURCE → BACKUP</span>
            <span className="text-[11px] text-slate-400 block">One-Way Mirror Sync</span>
          </div>
        </div>
      </div>

      {/* Recharts Bar Chart Container */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#30363d] pb-4">
          <div>
            <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              FULL BACKUP VS INCREMENTAL SYNCHRONIZATION
            </h2>
            <p className="text-xs text-slate-400 font-mono">Execution time measured in seconds (Lower is better)</p>
          </div>
          <span className="text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-lg">
            Sample Experimental Results
          </span>
        </div>

        {/* Chart View */}
        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={PERFORMANCE_DATA}
              margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
              <XAxis dataKey="files" stroke="#9ca3af" fontStyle="mono" tick={{ fontSize: 12 }} />
              <YAxis stroke="#9ca3af" fontStyle="mono" tick={{ fontSize: 12 }} label={{ value: 'Seconds (s)', angle: -90, position: 'insideLeft', fill: '#9ca3af', style: { fontSize: 12 } }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0d1117', borderColor: '#30363d', borderRadius: '8px', color: '#fff', fontFamily: 'monospace' }} 
              />
              <Legend wrapperStyle={{ fontFamily: 'monospace', fontSize: '12px' }} />
              <Bar dataKey="fullBackup" name="Full Backup (All Files Re-copied)" fill="#e11d48" radius={[4, 4, 0, 0]} />
              <Bar dataKey="incremental" name="Incremental Sync (BackupSync)" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#0d1117] p-4 rounded-xl border border-[#30363d] text-xs font-mono text-slate-300 leading-relaxed">
          <span className="text-emerald-400 font-bold">Key Insight: </span>
          “Incremental synchronization avoids re-copying unchanged files by evaluating POSIX metadata beforehand, reducing unnecessary kernel disk I/O operations by up to <strong className="text-white">8.4x</strong> on 500-file directory workloads.”
        </div>
      </div>

      {/* Benchmark Data Table */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-2xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-[#30363d] bg-[#0d1117]">
          <h3 className="font-mono text-sm font-bold text-white">Experimental Data Matrix</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[#0d1117] text-slate-400 border-b border-[#30363d] uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-6">Dataset Size</th>
                <th className="py-3.5 px-6 text-rose-400">Full Backup Time</th>
                <th className="py-3.5 px-6 text-emerald-400">Incremental Sync Time</th>
                <th className="py-3.5 px-6 text-purple-400">Performance Speedup</th>
                <th className="py-3.5 px-6">Efficiency Gain</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#30363d]/60 text-slate-200">
              {PERFORMANCE_DATA.map((row) => (
                <tr key={row.files} className="hover:bg-[#1c212a] transition-all">
                  <td className="py-3.5 px-6 font-bold text-white">{row.files}</td>
                  <td className="py-3.5 px-6 text-rose-300 font-bold">{row.fullBackup.toFixed(2)}s</td>
                  <td className="py-3.5 px-6 text-emerald-300 font-bold">{row.incremental.toFixed(2)}s</td>
                  <td className="py-3.5 px-6 text-purple-300 font-bold">{row.speedup} Faster</td>
                  <td className="py-3.5 px-6 text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {((1 - row.incremental / row.fullBackup) * 100).toFixed(1)}% I/O Saved
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
