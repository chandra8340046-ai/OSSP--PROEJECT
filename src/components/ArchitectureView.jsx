import React, { useState } from 'react';
import { 
  Layers, 
  Cpu, 
  HardDrive, 
  Terminal, 
  ArrowDown, 
  ShieldCheck, 
  CheckCircle2,
  Code2,
  GitBranch,
  FileCode
} from 'lucide-react';
import { SYSTEM_CALLS } from '../data/mockData';

export default function ArchitectureView() {
  const [activeLayer, setActiveLayer] = useState('user');

  const layers = {
    user: {
      title: "USER SPACE — BackupSync Application",
      desc: "User-space process executing CLI argument parsing, directory scanning orchestration, file metadata comparison logic, and synchronization statistics reporting.",
      components: ["main.c (CLI Orchestration)", "scan.c (Directory Logic)", "compare.c (Change Decision)", "copy.c (Buffer Controller)"],
      color: "border-blue-500/50 bg-blue-950/20 text-blue-400"
    },
    syscall: {
      title: "POSIX SYSTEM CALL INTERFACE",
      desc: "Standardized trap interface switching execution context from unprivileged User Space (Ring 3) to privileged Kernel Space (Ring 0) via interrupt handlers.",
      components: ["open()", "read()", "write()", "close()", "stat()", "opendir()", "readdir()"],
      color: "border-emerald-500/50 bg-emerald-950/20 text-emerald-400"
    },
    kernel: {
      title: "LINUX KERNEL & VIRTUAL FILE SYSTEM (VFS)",
      desc: "Kernel subsystem responsible for inode access control, file descriptor table lookup, page caching, read/write block scheduling, and permission validation.",
      components: ["VFS Layer", "File Descriptor Table", "Page Cache Manager", "Block Layer Scheduler"],
      color: "border-purple-500/50 bg-purple-950/20 text-purple-400"
    },
    filesystem: {
      title: "LINUX FILESYSTEM & STORAGE DEVICE",
      desc: "Physical storage abstractions managing Ext4 / Btrfs directory tree nodes, inode tables, data block allocations, and disk I/O operations.",
      components: ["Ext4 Filesystem Driver", "NVMe / SATA Storage Controller", "Source Directory (/home/user/Documents)", "Backup Directory (/home/user/Backup)"],
      color: "border-amber-500/50 bg-amber-950/20 text-amber-400"
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="border-b border-[#30363d] pb-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono text-xs font-semibold mb-2">
          <Layers className="w-3.5 h-3.5" />
          <span>OPERATING SYSTEM ARCHITECTURE</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white font-mono">
          System Architecture & Kernel Interface
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Interactive layer stack showing how BackupSync requests file access through the controlled Linux kernel interface.
        </p>
      </div>

      {/* Interactive Layer Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Stack Diagram */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Layer 1: User Space */}
          <div 
            onClick={() => setActiveLayer('user')}
            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer shadow-lg ${
              activeLayer === 'user' ? layers.user.color + ' ring-2 ring-blue-400/50' : 'bg-[#161b22] border-[#30363d] text-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-400">LAYER 1 — USER SPACE</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0d1117] text-slate-400">Unprivileged (Ring 3)</span>
            </div>
            <h3 className="font-mono font-bold text-lg text-white mt-1">BackupSync CLI Application</h3>
            <p className="text-xs text-slate-300 mt-1">Directory Scan, Metadata Comparison, Copy Decision Engine</p>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-5 h-5 text-blue-400 animate-bounce" />
          </div>

          {/* Layer 2: System Call Interface */}
          <div 
            onClick={() => setActiveLayer('syscall')}
            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer shadow-lg ${
              activeLayer === 'syscall' ? layers.syscall.color + ' ring-2 ring-emerald-400/50' : 'bg-[#161b22] border-[#30363d] text-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">LAYER 2 — SYSTEM CALL INTERFACE</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300">Context Switch Trap</span>
            </div>
            <h3 className="font-mono font-bold text-lg text-white mt-1">POSIX System Calls</h3>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {SYSTEM_CALLS.map(s => (
                <span key={s.name} className="px-2 py-0.5 bg-[#0d1117] border border-emerald-500/30 text-emerald-400 rounded font-mono text-[11px] font-bold">
                  {s.name}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-5 h-5 text-emerald-400 animate-bounce" />
          </div>

          {/* Layer 3: Linux Kernel */}
          <div 
            onClick={() => setActiveLayer('kernel')}
            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer shadow-lg ${
              activeLayer === 'kernel' ? layers.kernel.color + ' ring-2 ring-purple-400/50' : 'bg-[#161b22] border-[#30363d] text-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-purple-400">LAYER 3 — KERNEL SPACE</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/80 text-purple-300">Privileged (Ring 0)</span>
            </div>
            <h3 className="font-mono font-bold text-lg text-white mt-1">Linux Kernel & Virtual File System</h3>
            <p className="text-xs text-slate-300 mt-1">VFS abstraction, Inode table management, Page Cache & Block I/O</p>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-5 h-5 text-purple-400 animate-bounce" />
          </div>

          {/* Layer 4: Filesystem */}
          <div 
            onClick={() => setActiveLayer('filesystem')}
            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer shadow-lg ${
              activeLayer === 'filesystem' ? layers.filesystem.color + ' ring-2 ring-amber-400/50' : 'bg-[#161b22] border-[#30363d] text-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400">LAYER 4 — HARDWARE & FILESYSTEM</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-300">Storage Hardware</span>
            </div>
            <h3 className="font-mono font-bold text-lg text-white mt-1">Ext4 Filesystem / Block Storage</h3>
            <p className="text-xs text-slate-300 mt-1">Source Directory (/home/user/Documents) ↔ Backup Directory (/home/user/Backup)</p>
          </div>

        </div>

        {/* Right Info Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 space-y-4 shadow-xl">
            <h3 className="font-mono text-base font-bold text-white border-b border-[#30363d] pb-3">
              {layers[activeLayer].title}
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              {layers[activeLayer].desc}
            </p>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-mono text-slate-400 font-bold block uppercase">KEY SUBSYSTEM COMPONENTS:</span>
              <div className="space-y-1.5">
                {layers[activeLayer].components.map((comp, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs font-mono text-slate-300 bg-[#0d1117] p-2 rounded border border-[#30363d]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#30363d] text-xs font-mono text-amber-300 bg-amber-950/30 p-3 rounded-lg border border-amber-500/30">
              “Applications request file access through a controlled kernel interface rather than directly accessing hardware.”
            </div>
          </div>

          {/* Change Detection Flowchart Card */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 space-y-4 shadow-xl">
            <h3 className="font-mono text-base font-bold text-white flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-emerald-400" />
              CHANGE DETECTION ALGORITHM
            </h3>

            <div className="bg-[#0d1117] p-4 rounded-xl border border-[#30363d] space-y-3 font-mono text-xs">
              <div className="text-blue-400 font-bold">For every file F in source_dir:</div>
              <div className="pl-3 border-l-2 border-slate-700 space-y-2">
                <p className="text-slate-300"><span className="text-amber-400">IF</span> backup file does not exist (stat() returns ENOENT):</p>
                <p className="text-emerald-400 font-bold pl-4">→ COPY FILE (open → read → write → close)</p>
                
                <p className="text-slate-300"><span className="text-amber-400">ELSE</span> retrieve stat(source) & stat(backup):</p>
                <div className="pl-4 space-y-1 text-slate-400">
                  <p>s1 = stat(source_path)</p>
                  <p>s2 = stat(backup_path)</p>
                </div>

                <p className="text-slate-300"><span className="text-amber-400">IF</span> <code className="text-emerald-300">s1.st_mtime &gt; s2.st_mtime || s1.st_size != s2.st_size</code>:</p>
                <p className="text-emerald-400 font-bold pl-4">→ COPY FILE</p>
                <p className="text-slate-300"><span className="text-amber-400">ELSE</span>:</p>
                <p className="text-blue-400 font-bold pl-4">→ SKIP FILE (No I/O overhead)</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
