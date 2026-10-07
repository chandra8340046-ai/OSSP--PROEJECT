import React from 'react';
import { 
  Info, 
  Users, 
  BookOpen, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Code2, 
  HardDrive 
} from 'lucide-react';
import { PROJECT_INFO } from '../data/mockData';

export default function AboutView() {
  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="border-b border-[#30363d] pb-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono text-xs font-semibold mb-2">
          <Info className="w-3.5 h-3.5" />
          <span>PROJECT METADATA & CREDITS</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white font-mono">
          About BackupSync
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Operating Systems and Systems Programming (OSSP) Course Project (25CS2104E) - Term I, 2026–27
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Project Card */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-orange-500/10 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-mono">{PROJECT_INFO.title}</h3>
              <p className="text-xs text-orange-400 font-mono">Team 12 | Section 22</p>
            </div>
          </div>
          <div className="space-y-2 text-xs text-slate-300 font-mono border-t border-[#30363d]/60 pt-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Course Code:</span>
              <span className="text-slate-100 font-semibold">25CS2104E</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Academic Term:</span>
              <span className="text-slate-100 font-semibold">{PROJECT_INFO.academicYear}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Faculty Supervisor:</span>
              <span className="text-emerald-400 font-bold">{PROJECT_INFO.faculty}</span>
            </div>
          </div>
        </div>

        {/* Technical Architecture Summary */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-mono">POSIX / C Spec</h3>
              <p className="text-xs text-blue-400 font-mono">Low-Level System Calls</p>
            </div>
          </div>
          <div className="space-y-2 text-xs text-slate-300 font-mono border-t border-[#30363d]/60 pt-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Sync Strategy:</span>
              <span className="text-emerald-400 font-semibold">Incremental Mirroring</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Decision Rule:</span>
              <span className="text-amber-400 font-semibold">{PROJECT_INFO.comparisonKeys}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">I/O Buffer Size:</span>
              <span className="text-blue-400 font-semibold">{PROJECT_INFO.bufferSize}</span>
            </div>
          </div>
        </div>

        {/* Environment Specification */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <HardDrive className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-mono">Target Platform</h3>
              <p className="text-xs text-emerald-400 font-mono">Ubuntu Linux Kernel</p>
            </div>
          </div>
          <div className="space-y-2 text-xs text-slate-300 font-mono border-t border-[#30363d]/60 pt-3">
            <div className="flex justify-between">
              <span className="text-slate-400">OS Host:</span>
              <span className="text-slate-100 font-semibold">Ubuntu 22.04 LTS x86_64</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Compiler:</span>
              <span className="text-slate-100 font-semibold">GCC 11.4.0 (-std=c99 -Wall)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Standard API:</span>
              <span className="text-purple-400 font-semibold">POSIX.1-2008 Standard</span>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members Section */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 md:p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Users className="w-6 h-6 text-orange-400" />
          <h2 className="text-xl font-bold text-white font-mono">Development Team & Technical Contributions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECT_INFO.members.map((member, idx) => (
            <div 
              key={member.id} 
              className="bg-[#0d1117] border border-[#30363d] hover:border-orange-500/50 rounded-xl p-5 transition-all group shadow-md"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-slate-950 font-bold font-mono text-sm">
                  0{idx + 1}
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  ID: {member.id}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors font-mono">
                {member.name}
              </h3>
              <p className="text-xs text-emerald-400 font-mono mt-1 font-semibold">
                {member.role}
              </p>
              <div className="mt-4 pt-3 border-t border-[#30363d]/60 text-xs text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Module Contribution</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Scope, Limitations & Future Work */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Capabilities */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 space-y-4">
          <div className="flex items-center space-x-3 text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
            <h3 className="text-lg font-bold text-white font-mono">Key Project Features</h3>
          </div>
          <ul className="space-y-2 text-xs text-slate-300 font-mono">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Fast stat() based change detection without full file content hashing overhead</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Automatic handling of missing destination files (creates target backup files)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Chunked 4KB I/O buffer implementation minimizing memory allocation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Comprehensive logging of file skips, copies, and timestamps</span>
            </li>
          </ul>
        </div>

        {/* Limitations & Future Work */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 space-y-4">
          <div className="flex items-center space-x-3 text-amber-400">
            <AlertTriangle className="w-6 h-6" />
            <h3 className="text-lg font-bold text-white font-mono">Limitations & Enhancements</h3>
          </div>
          <ul className="space-y-2 text-xs text-slate-300 font-mono">
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span><strong className="text-slate-100">Single-threaded sequential I/O:</strong> Can be enhanced using multi-threaded worker pools (<code className="text-amber-300">pthread</code>).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span><strong className="text-slate-100">Local filesystem only:</strong> Future versions can integrate Linux network sockets for remote backup.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span><strong className="text-slate-100">Full file copy on change:</strong> Future iterations can implement block-level delta sync algorithm (like rsync).</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
