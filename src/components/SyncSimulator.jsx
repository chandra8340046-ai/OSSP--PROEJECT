import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  CheckCircle, 
  FolderSearch, 
  FileSearch, 
  GitCompare, 
  Copy, 
  CheckCheck, 
  ArrowDown, 
  HardDrive, 
  Zap,
  Terminal,
  Clock
} from 'lucide-react';
import { PROJECT_INFO } from '../data/mockData';

export default function SyncSimulator({ 
  onRunDemo, 
  isDemoRunning, 
  demoStage, 
  activeFile, 
  stats 
}) {
  const [speed, setSpeed] = useState('1x');

  const pipelineStages = [
    {
      id: 1,
      name: "Directory Traversal",
      syscall: "opendir() / readdir()",
      desc: "Open source directory stream and discover dirent structures.",
      icon: FolderSearch,
      stageMatch: 1
    },
    {
      id: 2,
      name: "Metadata Inspection",
      syscall: "stat()",
      desc: "Query stat buffers for both source and destination path.",
      icon: FileSearch,
      stageMatch: 2
    },
    {
      id: 3,
      name: "Change Detection",
      syscall: "st_size + st_mtime",
      desc: "Compare modification timestamps and byte sizes.",
      icon: GitCompare,
      stageMatch: 3
    },
    {
      id: 4,
      name: "Chunk File Copying",
      syscall: "open() → read() → write() → close()",
      desc: "Stream payload in 4096-byte buffers from source fd to backup fd.",
      icon: Copy,
      stageMatch: 4
    },
    {
      id: 5,
      name: "Sync Completion",
      syscall: "closedir() & report",
      desc: "Release file descriptors and compile execution stats.",
      icon: CheckCheck,
      stageMatch: 5
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Page Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#30363d] pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-xs font-semibold mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>INTERACTIVE SYNC ENGINE</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-mono">
            Synchronization Pipeline
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Visualizing the step-by-step execution flow of the C/Linux system call backup engine.
          </p>
        </div>

        {/* Sync Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onRunDemo}
            disabled={isDemoRunning}
            className={`px-6 py-3 rounded-xl font-mono font-bold text-sm uppercase flex items-center space-x-2 transition-all cursor-pointer shadow-lg ${
              isDemoRunning
                ? 'bg-amber-500 text-slate-950 animate-pulse'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/60 hover:scale-[1.02]'
            }`}
          >
            <Play className={`w-4 h-4 ${isDemoRunning ? 'animate-spin' : ''}`} />
            <span>{isDemoRunning ? 'SYNCHRONIZING...' : 'START SYNCHRONIZATION'}</span>
          </button>
        </div>
      </div>

      {/* Directory Path Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#161b22] border border-emerald-500/30 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">SOURCE DIRECTORY</span>
            <span className="font-mono text-sm text-white font-bold">{PROJECT_INFO.sourceDirDefault}</span>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 rounded">
            128 Files
          </span>
        </div>

        <div className="bg-[#161b22] border border-blue-500/30 rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider block">BACKUP DIRECTORY</span>
            <span className="font-mono text-sm text-white font-bold">{PROJECT_INFO.backupDirDefault}</span>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 bg-blue-950/60 border border-blue-500/30 text-blue-400 rounded">
            Mirror Target
          </span>
        </div>
      </div>

      {/* Active Stage Indicator */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            PIPELINE EXECUTION STAGES
          </h2>
          <span className="text-xs font-mono text-slate-400">
            {isDemoRunning ? `Stage ${demoStage} / 5 Running...` : 'Status: Ready'}
          </span>
        </div>

        {/* Pipeline Stepper */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {pipelineStages.map((stage) => {
            const Icon = stage.icon;
            const isActive = demoStage === stage.stageMatch;
            const isPassed = demoStage > stage.stageMatch;

            return (
              <div 
                key={stage.id}
                className={`p-4 rounded-xl border transition-all duration-300 relative flex flex-col justify-between ${
                  isActive 
                    ? 'bg-blue-950/40 border-blue-400 text-white shadow-lg shadow-blue-500/20 ring-2 ring-blue-500/40' 
                    : isPassed
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-300'
                    : 'bg-[#0d1117] border-[#30363d] text-slate-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      isActive ? 'bg-blue-500 text-slate-950' : isPassed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-[#161b22] text-slate-500'
                    }`}>
                      STAGE 0{stage.id}
                    </span>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400 animate-bounce' : isPassed ? 'text-emerald-400' : 'text-slate-600'}`} />
                  </div>
                  <h3 className="font-mono text-xs font-bold text-white mb-1">{stage.name}</h3>
                  <p className="text-[11px] text-slate-300 mb-2 leading-tight">{stage.desc}</p>
                </div>

                <div className="mt-2 pt-2 border-t border-[#30363d]/60">
                  <span className="font-mono text-[10px] text-emerald-400 block truncate">
                    {stage.syscall}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live File In-Progress Banner */}
      {isDemoRunning && activeFile && (
        <div className="bg-gradient-to-r from-blue-950 via-[#161b22] to-purple-950 border border-blue-500/50 rounded-xl p-4 shadow-xl flex items-center justify-between animate-pulse">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 text-blue-300 rounded-lg">
              <Copy className="w-5 h-5 animate-spin" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-blue-300 font-bold block">PROCESSING FILE</span>
              <span className="font-mono text-sm text-white font-bold">
                {typeof activeFile === 'object' && activeFile !== null ? (activeFile.name || activeFile.action || 'Processing...') : activeFile}
              </span>
            </div>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold px-3 py-1 bg-emerald-950/80 border border-emerald-500/40 rounded-lg">
            stat() & open() chunk copy...
          </span>
        </div>
      )}

      {/* Flow Diagram Representation */}
      <section className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 space-y-4">
        <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
          <Terminal className="w-4 h-4 text-orange-400" />
          SYNCHRONIZATION ARCHITECTURE FLOW
        </h2>

        <div className="flex flex-col items-center space-y-3 max-w-xl mx-auto font-mono text-xs">
          
          <div className="w-full bg-[#0d1117] border border-emerald-500/40 rounded-lg p-3 text-center text-emerald-400 font-bold">
            SOURCE DIRECTORY (/home/user/Documents)
          </div>

          <ArrowDown className="w-4 h-4 text-emerald-400 animate-bounce" />

          <div className="w-full bg-[#0d1117] border border-blue-500/40 rounded-lg p-3 text-center text-blue-300">
            FILE SCAN — opendir() & readdir()
          </div>

          <ArrowDown className="w-4 h-4 text-blue-400" />

          <div className="w-full bg-[#0d1117] border border-amber-500/40 rounded-lg p-3 text-center text-amber-300">
            METADATA COMPARISON — stat() (st_mtime & st_size)
          </div>

          <ArrowDown className="w-4 h-4 text-amber-400" />

          <div className="w-full bg-[#0d1117] border border-purple-500/40 rounded-lg p-3 text-center text-purple-300">
            CHANGE DETECTION (s1.mtime &gt; s2.mtime || s1.size != s2.size)
          </div>

          <ArrowDown className="w-4 h-4 text-purple-400" />

          <div className="w-full bg-[#0d1117] border border-cyan-500/40 rounded-lg p-3 text-center text-cyan-300">
            COPY CHANGED FILES — open() → read() → write() → close() (4096-byte buffer)
          </div>

          <ArrowDown className="w-4 h-4 text-cyan-400" />

          <div className="w-full bg-[#0d1117] border border-emerald-500/40 rounded-lg p-3 text-center text-emerald-400 font-bold">
            BACKUP DIRECTORY (/home/user/Backup)
          </div>

        </div>
      </section>

      {/* Stats Summary Panel */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-[#161b22] p-4 rounded-xl border border-[#30363d] text-center">
          <span className="text-xs text-slate-400 font-mono block">SCANNED</span>
          <span className="text-xl font-bold font-mono text-white mt-1 block">{stats?.scanned ?? stats?.totalFiles ?? 7}</span>
        </div>
        <div className="bg-[#161b22] p-4 rounded-xl border border-[#30363d] text-center">
          <span className="text-xs text-amber-400 font-mono block">CHANGED</span>
          <span className="text-xl font-bold font-mono text-amber-300 mt-1 block">{stats?.changed ?? 4}</span>
        </div>
        <div className="bg-[#161b22] p-4 rounded-xl border border-[#30363d] text-center">
          <span className="text-xs text-emerald-400 font-mono block">COPIED</span>
          <span className="text-xl font-bold font-mono text-emerald-300 mt-1 block">{stats?.copied ?? 4}</span>
        </div>
        <div className="bg-[#161b22] p-4 rounded-xl border border-[#30363d] text-center">
          <span className="text-xs text-blue-400 font-mono block">SKIPPED</span>
          <span className="text-xl font-bold font-mono text-blue-300 mt-1 block">{stats?.skipped ?? 3}</span>
        </div>
        <div className="bg-[#161b22] p-4 rounded-xl border border-[#30363d] text-center col-span-2 md:col-span-1">
          <span className="text-xs text-purple-400 font-mono block">TIME TAKEN</span>
          <span className="text-xl font-bold font-mono text-purple-300 mt-1 block">{(stats?.elapsed ?? 0.04).toFixed(2)}s</span>
        </div>
      </div>

    </div>
  );
}
