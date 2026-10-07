import React, { useState } from 'react';
import { 
  Terminal, 
  Code2, 
  FileCode, 
  Layers, 
  Cpu, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { SYSTEM_CALLS } from '../data/mockData';

export default function SystemCallsExplorer() {
  const [selectedSyscall, setSelectedSyscall] = useState(SYSTEM_CALLS[0]);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Page Title */}
      <div className="border-b border-[#30363d] pb-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-xs font-semibold mb-2">
          <Terminal className="w-3.5 h-3.5" />
          <span>LINUX KERNEL PRIMITIVES</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white font-mono">
          System Call Explorer
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Detailed technical documentation and C source code usage for all 7 POSIX system calls powering BackupSync.
        </p>
      </div>

      {/* Grid of System Call Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SYSTEM_CALLS.map((sys) => {
          const isSelected = selectedSyscall.name === sys.name;
          return (
            <div
              key={sys.name}
              onClick={() => setSelectedSyscall(sys)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-blue-950/40 border-blue-400 text-white shadow-xl shadow-blue-500/20 ring-2 ring-blue-500/40'
                  : 'bg-[#161b22] border-[#30363d] text-slate-300 hover:border-slate-500 hover:bg-[#1c212a]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono font-bold text-lg text-blue-400">{sys.name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0d1117] border border-[#30363d] text-slate-400">
                    {sys.header}
                  </span>
                </div>
                <p className="text-xs text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                  {sys.purpose}
                </p>
              </div>

              <div className="pt-3 border-t border-[#30363d]/60 flex items-center justify-between">
                <span className="text-[10px] font-mono text-emerald-400 font-bold">Role: {sys.name} API</span>
                <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-blue-400 translate-x-1' : 'text-slate-500'}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Detail Inspector Drawer */}
      {selectedSyscall && (
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#30363d] pb-4 gap-2">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-600/20 border border-blue-500/40 text-blue-400 rounded-xl font-mono text-xl font-bold">
                {selectedSyscall.name}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white font-mono">
                  {selectedSyscall.name} System Call Inspector
                </h2>
                <p className="text-xs text-slate-400 font-mono">Header File: <span className="text-emerald-400">{selectedSyscall.header}</span></p>
              </div>
            </div>
            <div className="px-3 py-1 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-xs rounded-lg self-start md:self-auto">
              POSIX Standard / Linux Kernel API
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Column: Purpose & Role */}
            <div className="space-y-4">
              <div className="bg-[#0d1117] p-4 rounded-xl border border-[#30363d]">
                <h3 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  Kernel Purpose & Behavior
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {selectedSyscall.purpose}
                </p>
              </div>

              <div className="bg-[#0d1117] p-4 rounded-xl border border-[#30363d]">
                <h3 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  Role in BackupSync Engine
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {selectedSyscall.role}
                </p>
              </div>

              <div className="bg-[#0d1117] p-4 rounded-xl border border-[#30363d]">
                <h3 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider mb-1">
                  Return Values & Error Handling
                </h3>
                <p className="text-xs font-mono text-slate-300">
                  {selectedSyscall.returns}
                </p>
              </div>
            </div>

            {/* Right Column: Code Snippet & Syntax */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono text-slate-400 font-bold block mb-1.5">POSIX C SYNTAX SIGNATURE</span>
                <div className="bg-[#0d1117] p-3 rounded-xl border border-blue-500/40 font-mono text-xs text-blue-300">
                  {selectedSyscall.syntax}
                </div>
              </div>

              <div>
                <span className="text-xs font-mono text-slate-400 font-bold block mb-1.5">BACKUPSYNC C IMPLEMENTATION SNIPPET</span>
                <div className="relative rounded-xl overflow-hidden bg-[#0d1117] border border-[#30363d]">
                  <div className="bg-[#161b22] px-4 py-2 border-b border-[#30363d] flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400">C Source Execution</span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">Linux C99</span>
                  </div>
                  <pre className="p-4 font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed">
                    {selectedSyscall.codeSnippet}
                  </pre>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
