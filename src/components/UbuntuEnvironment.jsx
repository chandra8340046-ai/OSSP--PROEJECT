import React, { useState } from 'react';
import { 
  Cpu, 
  Terminal, 
  Code, 
  Play, 
  CheckCircle2, 
  Layers, 
  HardDrive,
  Copy,
  Check
} from 'lucide-react';

export default function UbuntuEnvironment() {
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [activeOutput, setActiveOutput] = useState('full');

  const gccCmd = "gcc -Wall -Wextra -std=c99 src/main.c src/scan.c src/compare.c src/copy.c -o backupsync";
  const runCmd = "./backupsync ~/Documents ~/Backup";

  const handleCopyCmd = () => {
    navigator.clipboard.writeText(`${gccCmd} && ${runCmd}`);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Page Title */}
      <div className="border-b border-[#30363d] pb-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-xs font-semibold mb-2">
          <Cpu className="w-3.5 h-3.5" />
          <span>UBUNTU 22.04 LTS EXECUTION HOST</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white font-mono">
          Ubuntu / Linux Environment
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Technical specifications, compilation commands, and execution instructions for the Linux C environment.
        </p>
      </div>

      {/* Environment Spec Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-xl text-center">
          <span className="text-[10px] text-slate-400 font-mono block">OS DISTRO</span>
          <span className="text-sm font-bold text-orange-400 font-mono mt-1 block">Ubuntu 22.04 LTS</span>
        </div>
        <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-xl text-center">
          <span className="text-[10px] text-slate-400 font-mono block">KERNEL</span>
          <span className="text-sm font-bold text-blue-400 font-mono mt-1 block">Linux 5.15.0</span>
        </div>
        <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-xl text-center">
          <span className="text-[10px] text-slate-400 font-mono block">COMPILER</span>
          <span className="text-sm font-bold text-emerald-400 font-mono mt-1 block">GCC 11+</span>
        </div>
        <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-xl text-center">
          <span className="text-[10px] text-slate-400 font-mono block">IDE / EDITOR</span>
          <span className="text-sm font-bold text-purple-400 font-mono mt-1 block">VS Code</span>
        </div>
        <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-xl text-center">
          <span className="text-[10px] text-slate-400 font-mono block">VERSION CONTROL</span>
          <span className="text-sm font-bold text-cyan-400 font-mono mt-1 block">Git / GitHub</span>
        </div>
        <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-xl text-center">
          <span className="text-[10px] text-slate-400 font-mono block">BUILD TOOL</span>
          <span className="text-sm font-bold text-amber-400 font-mono mt-1 block">GNU Make</span>
        </div>
      </div>

      {/* Terminal Command Execution Simulator */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-2xl overflow-hidden shadow-2xl space-y-0">
        
        {/* Terminal Header */}
        <div className="bg-[#0d1117] px-4 py-3 border-b border-[#30363d] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-xs text-slate-300 font-mono ml-2 font-bold">
              Ubuntu Bash Terminal — BackupSync Demonstration
            </span>
          </div>

          <button
            onClick={handleCopyCmd}
            className="px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-slate-300 text-xs font-mono flex items-center space-x-1 border border-[#30363d] cursor-pointer"
          >
            {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCmd ? 'COPIED!' : 'COPY COMMANDS'}</span>
          </button>
        </div>

        {/* Terminal Screen */}
        <div className="p-6 font-mono text-xs text-slate-200 bg-[#0d1117] space-y-4 overflow-x-auto leading-relaxed">
          
          <div className="text-slate-400 border-b border-[#30363d]/60 pb-2 text-[11px]">
            # Ubuntu 22.04 LTS (GNU/Linux 5.15.0-88-generic x86_64)
          </div>

          {/* Step 1: Nav & Compilation */}
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-emerald-400 font-bold">user@ubuntu:~$</span>
              <span className="text-white">cd backupsync</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-emerald-400 font-bold">user@ubuntu:~/backupsync$</span>
              <span className="text-amber-300">{gccCmd}</span>
            </div>
            <div className="text-emerald-400 text-[11px] pl-4">
              [GCC] Compiled main.c, scan.c, compare.c, copy.c successfully. Output binary: ./backupsync
            </div>
          </div>

          {/* Step 2: Execution */}
          <div className="space-y-1 pt-2">
            <div className="flex items-center space-x-2">
              <span className="text-emerald-400 font-bold">user@ubuntu:~/backupsync$</span>
              <span className="text-white">{runCmd}</span>
            </div>
            
            <div className="bg-[#161b22] p-4 rounded-xl border border-[#30363d] text-slate-300 space-y-1.5">
              <p className="text-blue-400 font-bold">=====================================================</p>
              <p className="text-white font-bold">  BACKUPSYNC - Linux File Synchronization System</p>
              <p className="text-blue-400 font-bold">=====================================================</p>
              <p className="text-slate-400">Source: /home/user/Documents</p>
              <p className="text-slate-400">Backup: /home/user/Backup</p>
              <p className="pt-2 text-emerald-400">[opendir] Scanning source directory...</p>
              <p className="text-slate-300">128 files found.</p>
              <p className="text-emerald-400">[stat] Comparing file metadata...</p>
              <p className="text-amber-300">9 changed files detected, 119 files unchanged.</p>
              <p className="text-emerald-400">[open/read/write] Copying updated files (4KB buffer)...</p>
              
              <div className="pl-3 space-y-0.5 text-emerald-300">
                <p>• thesis_draft.docx [COPIED]</p>
                <p>• budget_2026.xlsx [COPIED]</p>
                <p>• notes_week12.txt [COPIED]</p>
                <p>• kernel_module_notes.c [COPIED]</p>
                <p>• presentation_slides.pptx [COPIED]</p>
                <p>• ossp_assignment2.tar.gz [COPIED]</p>
              </div>

              <p className="pt-2 text-white font-bold">Synchronization complete.</p>
              <p className="text-slate-400">-----------------------------------------------------</p>
              <p>Files Scanned : 128</p>
              <p>Files Copied  : 9</p>
              <p>Files Skipped : 119</p>
              <p>Errors        : 0</p>
              <p>Elapsed Time  : 0.42 seconds</p>
              <p className="text-blue-400 font-bold">=====================================================</p>
            </div>
          </div>

        </div>

      </div>

      {/* Step-by-Step Run Guide on Ubuntu */}
      <section className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
          <Terminal className="w-5 h-5 text-emerald-400" />
          RUN ON UBUNTU — STEP-BY-STEP PRESENTATION GUIDE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="bg-[#0d1117] p-4 rounded-xl border border-[#30363d] space-y-2">
            <span className="text-xs font-mono font-bold text-orange-400 px-2 py-0.5 rounded bg-orange-950/60 border border-orange-500/30">STEP 1</span>
            <h3 className="font-mono text-sm font-bold text-white">Open Terminal & Clone</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Open Ubuntu terminal (<kbd className="bg-slate-800 px-1 py-0.5 rounded text-[10px] text-amber-300">Ctrl+Alt+T</kbd>) and navigate into the project repository directory.
            </p>
          </div>

          <div className="bg-[#0d1117] p-4 rounded-xl border border-[#30363d] space-y-2">
            <span className="text-xs font-mono font-bold text-blue-400 px-2 py-0.5 rounded bg-blue-950/60 border border-blue-500/30">STEP 2</span>
            <h3 className="font-mono text-sm font-bold text-white">Compile with GCC</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Compile source files using GCC or GNU Make with strict C99 warning flags (<code className="text-emerald-400">-Wall -Wextra</code>).
            </p>
          </div>

          <div className="bg-[#0d1117] p-4 rounded-xl border border-[#30363d] space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30">STEP 3</span>
            <h3 className="font-mono text-sm font-bold text-white">Execute Synchronization</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Run <code className="text-white">./backupsync &lt;source&gt; &lt;backup&gt;</code> and observe real-time terminal stdout reports.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
