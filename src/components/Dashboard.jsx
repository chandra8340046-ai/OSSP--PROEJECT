import React from 'react';
import { 
  Folder, 
  ArrowRight, 
  Play, 
  Search, 
  GitCompare, 
  Terminal, 
  Cpu, 
  FileCheck, 
  Clock, 
  AlertCircle, 
  ShieldCheck, 
  HardDrive,
  Code,
  Layers,
  Sparkles
} from 'lucide-react';
import { PROJECT_INFO, SYSTEM_CALLS } from '../data/mockData';

export default function Dashboard({ 
  onRunDemo, 
  isDemoRunning, 
  stats, 
  setActiveTab 
}) {
  return (
    <div className="space-y-8 pb-12">
      
      {/* Hero Header Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#161b22] via-[#0d1117] to-[#1f242d] border border-[#30363d] p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-8 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>OSSP COURSE PROJECT (25CS2104E)</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Intelligent Incremental <br />
            <span className="ubuntu-gradient-text">File Synchronization</span>
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl">
            A transparent Linux backup utility that detects file changes using POSIX file metadata 
            (<code className="text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded font-mono text-xs">stat()</code>) 
            and synchronizes only the files that require copying.
          </p>

          {/* Directory Cards & Sync Flow */}
          <div className="pt-4 grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
            {/* Source Directory Card */}
            <div className="md:col-span-5 bg-[#0d1117]/90 border border-emerald-500/30 rounded-xl p-4 shadow-lg flex items-center space-x-3">
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Folder className="w-6 h-6" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-emerald-400 block">SOURCE DIRECTORY</span>
                <span className="font-mono text-sm text-slate-100 font-semibold truncate block">{PROJECT_INFO.sourceDirDefault}</span>
                <span className="text-xs text-slate-400 block">128 Files Detected</span>
              </div>
            </div>

            {/* Sync Arrow */}
            <div className="md:col-span-1 flex flex-col items-center justify-center py-2">
              <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-400/50 flex items-center justify-center text-blue-400 shadow-lg shadow-blue-500/20 animate-pulse">
                <ArrowRight className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-mono text-blue-400 mt-1 font-bold">ONE-WAY</span>
            </div>

            {/* Backup Directory Card */}
            <div className="md:col-span-5 bg-[#0d1117]/90 border border-blue-500/30 rounded-xl p-4 shadow-lg flex items-center space-x-3">
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400">
                <HardDrive className="w-6 h-6" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-blue-400 block">BACKUP DIRECTORY</span>
                <span className="font-mono text-sm text-slate-100 font-semibold truncate block">{PROJECT_INFO.backupDirDefault}</span>
                <span className="text-xs text-slate-400 block">Incremental Mirror Target</span>
              </div>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-4 flex flex-wrap gap-3">
            <button
              onClick={onRunDemo}
              disabled={isDemoRunning}
              className={`px-5 py-3 rounded-xl font-mono font-bold text-sm tracking-wide uppercase flex items-center space-x-2 transition-all cursor-pointer shadow-lg ${
                isDemoRunning 
                  ? 'bg-amber-500 text-slate-950 animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/60 hover:scale-[1.02]'
              }`}
            >
              <Play className={`w-4 h-4 ${isDemoRunning ? 'animate-spin' : ''}`} />
              <span>{isDemoRunning ? 'SYNCHRONIZING...' : 'START SYNCHRONIZATION'}</span>
            </button>

            <button
              onClick={() => setActiveTab('sync')}
              className="px-4 py-3 bg-[#21262d] hover:bg-[#30363d] text-slate-200 border border-[#30363d] rounded-xl font-mono text-xs font-semibold flex items-center space-x-2 transition-all cursor-pointer"
            >
              <Search className="w-4 h-4 text-blue-400" />
              <span>SCAN FILES</span>
            </button>

            <button
              onClick={() => setActiveTab('syscalls')}
              className="px-4 py-3 bg-[#21262d] hover:bg-[#30363d] text-slate-200 border border-[#30363d] rounded-xl font-mono text-xs font-semibold flex items-center space-x-2 transition-all cursor-pointer"
            >
              <GitCompare className="w-4 h-4 text-orange-400" />
              <span>COMPARE METADATA</span>
            </button>

            <button
              onClick={() => setActiveTab('logs')}
              className="px-4 py-3 bg-[#21262d] hover:bg-[#30363d] text-slate-200 border border-[#30363d] rounded-xl font-mono text-xs font-semibold flex items-center space-x-2 transition-all cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>VIEW LOGS</span>
            </button>
          </div>
        </div>
      </section>

      {/* Live System Status Cards (Demo Run) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-emerald-400" />
              LIVE SYSTEM STATUS
            </h2>
            <span className="text-[11px] font-mono px-2 me-1 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded font-semibold">
              DEMO RUN METRICS
            </span>
          </div>
          <span className="text-xs text-slate-400 font-mono">Sample Experimental Run</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-4 text-center hover:border-slate-500 transition-all">
            <span className="text-xs text-slate-400 font-mono font-medium block">FILES SCANNED</span>
            <span className="text-2xl md:text-3xl font-bold font-mono text-white mt-1 block">
              {stats?.scanned ?? stats?.totalFiles ?? 7}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">opendir() + readdir()</span>
          </div>

          <div className="bg-[#161b22] border border-amber-500/30 rounded-xl p-4 text-center hover:border-amber-500/50 transition-all">
            <span className="text-xs text-amber-400 font-mono font-medium block">FILES CHANGED</span>
            <span className="text-2xl md:text-3xl font-bold font-mono text-amber-300 mt-1 block">
              {stats?.changed ?? 4}
            </span>
            <span className="text-[10px] text-amber-500/80 font-mono">stat() mtime/size</span>
          </div>

          <div className="bg-[#161b22] border border-emerald-500/30 rounded-xl p-4 text-center hover:border-emerald-500/50 transition-all">
            <span className="text-xs text-emerald-400 font-mono font-medium block">FILES COPIED</span>
            <span className="text-2xl md:text-3xl font-bold font-mono text-emerald-300 mt-1 block">
              {stats?.copied ?? 4}
            </span>
            <span className="text-[10px] text-emerald-500/80 font-mono">open/read/write</span>
          </div>

          <div className="bg-[#161b22] border border-blue-500/30 rounded-xl p-4 text-center hover:border-blue-500/50 transition-all">
            <span className="text-xs text-blue-400 font-mono font-medium block">FILES SKIPPED</span>
            <span className="text-2xl md:text-3xl font-bold font-mono text-blue-300 mt-1 block">
              {stats?.skipped ?? 3}
            </span>
            <span className="text-[10px] text-blue-500/80 font-mono">No I/O overhead</span>
          </div>

          <div className="bg-[#161b22] border border-rose-500/30 rounded-xl p-4 text-center hover:border-rose-500/50 transition-all">
            <span className="text-xs text-rose-400 font-mono font-medium block">ERRORS</span>
            <span className="text-2xl md:text-3xl font-bold font-mono text-rose-400 mt-1 block">
              {stats?.errors ?? 0}
            </span>
            <span className="text-[10px] text-rose-500/80 font-mono">errno check</span>
          </div>

          <div className="bg-[#161b22] border border-purple-500/30 rounded-xl p-4 text-center hover:border-purple-500/50 transition-all">
            <span className="text-xs text-purple-400 font-mono font-medium block">TIME TAKEN</span>
            <span className="text-2xl md:text-3xl font-bold font-mono text-purple-300 mt-1 block">
              {(stats?.elapsed ?? 0.04).toFixed(2)}s
            </span>
            <span className="text-[10px] text-purple-500/80 font-mono">Clock cycles</span>
          </div>

        </div>
      </section>

      {/* UBUNTU / LINUX ENVIRONMENT CARD */}
      <section className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#30363d] pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-orange-600/20 border border-orange-500/40 rounded-lg text-orange-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-mono tracking-wide">
                UBUNTU LINUX ENVIRONMENT
              </h2>
              <p className="text-xs text-slate-400">Operating System execution context and compiler parameters</p>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-[#0d1117] px-3 py-1.5 rounded-lg border border-[#30363d] self-start sm:self-auto">
            Ubuntu/Linux Execution Environment — Demonstration
          </span>
        </div>

        {/* Environment Tags */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="bg-[#0d1117] p-3 rounded-lg border border-[#30363d] text-center">
            <span className="text-[10px] text-slate-400 font-mono block">DISTRIBUTION</span>
            <span className="text-xs font-bold text-orange-400 font-mono mt-0.5 block">Ubuntu 22.04 LTS</span>
          </div>
          <div className="bg-[#0d1117] p-3 rounded-lg border border-[#30363d] text-center">
            <span className="text-[10px] text-slate-400 font-mono block">KERNEL</span>
            <span className="text-xs font-bold text-blue-400 font-mono mt-0.5 block">Linux 5.15.0 x86_64</span>
          </div>
          <div className="bg-[#0d1117] p-3 rounded-lg border border-[#30363d] text-center">
            <span className="text-[10px] text-slate-400 font-mono block">COMPILER</span>
            <span className="text-xs font-bold text-emerald-400 font-mono mt-0.5 block">GCC 11.4.0</span>
          </div>
          <div className="bg-[#0d1117] p-3 rounded-lg border border-[#30363d] text-center">
            <span className="text-[10px] text-slate-400 font-mono block">STANDARD</span>
            <span className="text-xs font-bold text-purple-400 font-mono mt-0.5 block">C99 / POSIX.1-2008</span>
          </div>
          <div className="bg-[#0d1117] p-3 rounded-lg border border-[#30363d] text-center col-span-2 sm:col-span-1">
            <span className="text-[10px] text-slate-400 font-mono block">STATUS</span>
            <span className="text-xs font-bold text-emerald-400 font-mono mt-0.5 block flex items-center justify-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              READY
            </span>
          </div>
        </div>

        {/* Linux Terminal Sample Output Panel */}
        <div className="relative rounded-xl overflow-hidden bg-[#0d1117] border border-[#30363d]">
          <div className="bg-[#161b22] px-4 py-2 border-b border-[#30363d] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              <span className="text-xs text-slate-400 font-mono ml-2">bash — user@ubuntu: ~/backupsync</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Sample Execution Terminal</span>
          </div>

          <div className="p-4 font-mono text-xs text-slate-300 space-y-2 overflow-x-auto">
            <div className="flex space-x-2">
              <span className="text-emerald-400">user@ubuntu:~/backupsync$</span>
              <span className="text-white">uname -a</span>
            </div>
            <div className="text-slate-400 pl-4">
              Linux ubuntu 5.15.0-88-generic #98-Ubuntu SMP Mon Oct 2 15:18:56 UTC 2023 x86_64 GNU/Linux
            </div>

            <div className="flex space-x-2 pt-1">
              <span className="text-emerald-400">user@ubuntu:~/backupsync$</span>
              <span className="text-white">gcc --version</span>
            </div>
            <div className="text-slate-400 pl-4">
              gcc (Ubuntu 11.4.0-1ubuntu1~22.04) 11.4.0
            </div>

            <div className="flex space-x-2 pt-1">
              <span className="text-emerald-400">user@ubuntu:~/backupsync$</span>
              <span className="text-amber-300">./backupsync ~/Documents ~/Backup</span>
            </div>
            <div className="text-emerald-400/90 pl-4 space-y-1">
              <p>Scanning source directory...</p>
              <p className="text-slate-300">128 files found</p>
              <p>Comparing metadata...</p>
              <p className="text-slate-300">9 changed, 119 unchanged</p>
              <p>Copying updated files...</p>
              <p className="text-emerald-300">thesis_draft.docx [OK]</p>
              <p className="text-emerald-300">budget_2026.xlsx [OK]</p>
              <p className="text-emerald-300">notes_week12.txt [OK]</p>
              <p className="text-white font-bold pt-1">Synchronization complete. 9 copied, 119 skipped, 0 errors. Time: 0.42s</p>
            </div>
          </div>
        </div>
      </section>

      {/* POSIX System Calls Quick Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <Code className="w-5 h-5 text-blue-400" />
              POSIX SYSTEM CALL INTERFACE
            </h2>
            <p className="text-xs text-slate-400">Core kernel syscall primitives powering BackupSync</p>
          </div>
          <button
            onClick={() => setActiveTab('syscalls')}
            className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center space-x-1 cursor-pointer"
          >
            <span>Explore All 7 Syscalls</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SYSTEM_CALLS.slice(0, 4).map((sys) => (
            <div 
              key={sys.name} 
              onClick={() => setActiveTab('syscalls')}
              className="bg-[#161b22] border border-[#30363d] hover:border-blue-500/50 rounded-xl p-4 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-base text-blue-400 group-hover:text-blue-300">{sys.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800/40">{sys.header}</span>
              </div>
              <p className="text-xs text-slate-300 line-clamp-2 mb-3">{sys.purpose}</p>
              <div className="bg-[#0d1117] p-2 rounded border border-[#30363d] font-mono text-[11px] text-emerald-400 overflow-hidden text-ellipsis whitespace-nowrap">
                {sys.syntax}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Flow Architecture Preview */}
      <section className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-purple-600/20 border border-purple-500/40 rounded-lg text-purple-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-mono">
                SYSTEM CALL CONTROL FLOW
              </h2>
              <p className="text-xs text-slate-400">User Space to Linux Kernel to Physical Storage</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('architecture')}
            className="text-xs font-mono px-3 py-1.5 bg-[#21262d] hover:bg-[#30363d] text-slate-200 rounded-lg border border-[#30363d] cursor-pointer"
          >
            Full Diagram
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center">
          <div className="bg-[#0d1117] p-4 rounded-xl border border-blue-500/30">
            <span className="text-[10px] font-mono text-blue-400 font-bold uppercase block">1. USER SPACE</span>
            <span className="text-xs font-bold text-white font-mono mt-1 block">CLI Application</span>
            <span className="text-[11px] text-slate-400 block mt-1">Directory Orchestration</span>
          </div>
          <div className="flex items-center justify-center text-slate-500">
            <ArrowRight className="w-5 h-5 text-blue-400 rotate-90 md:rotate-0" />
          </div>
          <div className="bg-[#0d1117] p-4 rounded-xl border border-emerald-500/30">
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">2. SYSTEM CALLS</span>
            <span className="text-xs font-bold text-white font-mono mt-1 block">POSIX API</span>
            <span className="text-[11px] text-slate-400 block mt-1">open, read, write, stat</span>
          </div>
          <div className="flex items-center justify-center text-slate-500">
            <ArrowRight className="w-5 h-5 text-emerald-400 rotate-90 md:rotate-0" />
          </div>
          <div className="bg-[#0d1117] p-4 rounded-xl border border-purple-500/30">
            <span className="text-[10px] font-mono text-purple-400 font-bold uppercase block">3. KERNEL & VFS</span>
            <span className="text-xs font-bold text-white font-mono mt-1 block">Linux Kernel</span>
            <span className="text-[11px] text-slate-400 block mt-1">Page Cache & Ext4 FS</span>
          </div>
        </div>
      </section>

    </div>
  );
}
