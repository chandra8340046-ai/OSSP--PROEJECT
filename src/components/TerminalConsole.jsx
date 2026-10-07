import React, { useState } from 'react';
import { 
  Terminal, 
  Trash2, 
  Download, 
  Copy, 
  Check, 
  Play, 
  Code2, 
  Clock 
} from 'lucide-react';

export default function TerminalConsole({ 
  logs, 
  setLogs, 
  onRunDemo, 
  isDemoRunning 
}) {
  const [copiedCmd, setCopiedCmd] = useState(false);

  const handleClearLogs = () => {
    setLogs([
      "user@ubuntu:~/backupsync$ ./backupsync ~/Documents ~/Backup",
      "Logs cleared. Click 'RUN DEMO' to stream live synchronization logs."
    ]);
  };

  const handleExportLogs = () => {
    const textContent = logs.join('\n');
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `backupsync_execution_${Date.now()}.log`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyCmd = () => {
    navigator.clipboard.writeText("./backupsync ~/Documents ~/Backup");
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#30363d] pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold mb-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>LINUX STDOUT CONSOLE</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-mono">
            Terminal / Log Console
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Real-time execution traces, system call invocations, and synchronization audit logs.
          </p>
        </div>

        {/* Console Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopyCmd}
            className="px-3 py-2 bg-[#21262d] hover:bg-[#30363d] text-slate-200 border border-[#30363d] rounded-lg font-mono text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer"
          >
            {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-blue-400" />}
            <span>{copiedCmd ? 'COPIED!' : 'COPY COMMAND'}</span>
          </button>

          <button
            onClick={handleExportLogs}
            className="px-3 py-2 bg-[#21262d] hover:bg-[#30363d] text-slate-200 border border-[#30363d] rounded-lg font-mono text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-purple-400" />
            <span>EXPORT LOG</span>
          </button>

          <button
            onClick={handleClearLogs}
            className="px-3 py-2 bg-[#21262d] hover:bg-[#30363d] text-rose-300 border border-rose-500/30 rounded-lg font-mono text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-400" />
            <span>CLEAR LOGS</span>
          </button>
        </div>
      </div>

      {/* Terminal Display Panel */}
      <div className="bg-[#0d1117] border border-[#30363d] rounded-2xl overflow-hidden shadow-2xl relative min-h-[450px] flex flex-col justify-between">
        
        {/* Terminal Header */}
        <div className="bg-[#161b22] px-4 py-3 border-b border-[#30363d] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-xs text-slate-300 font-mono ml-2 font-bold">
              backupsync — stdout stream (x86_64 POSIX)
            </span>
          </div>

          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            LIVE LOG STREAMING
          </span>
        </div>

        {/* Scanline Effect Overlay */}
        <div className="terminal-scanline"></div>

        {/* Logs Output Content */}
        <div className="p-6 font-mono text-xs text-slate-200 space-y-2 overflow-y-auto flex-1 leading-relaxed">
          {logs.map((log, index) => {
            const isCmd = log.startsWith("user@ubuntu");
            const isError = log.includes("[ERROR]");
            const isCopied = log.includes("[OK]") || log.includes("[COPY]");
            const isHeader = log.includes("====") || log.includes("---");

            return (
              <div 
                key={index} 
                className={`py-0.5 ${
                  isCmd 
                    ? 'text-amber-300 font-bold' 
                    : isError
                    ? 'text-rose-400 font-bold'
                    : isCopied
                    ? 'text-emerald-300'
                    : isHeader
                    ? 'text-blue-400 font-bold'
                    : 'text-slate-300'
                }`}
              >
                {log}
              </div>
            );
          })}
        </div>

        {/* Terminal Footer Ticker */}
        <div className="bg-[#161b22] px-4 py-2 border-t border-[#30363d] flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="text-emerald-400">$</span>
            <span>./backupsync /home/user/Documents /home/user/Backup</span>
          </div>

          <button
            onClick={onRunDemo}
            disabled={isDemoRunning}
            className="text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 cursor-pointer font-bold"
          >
            <Play className="w-3 h-3" />
            <span>TRIGGER NEW DEMO RUN</span>
          </button>
        </div>

      </div>

    </div>
  );
}
