import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Edit3, 
  CheckCircle, 
  Clock, 
  HardDrive, 
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { INITIAL_FILES } from '../data/mockData';

export default function FilesTable({ files, setFiles }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (statusFilter === 'ALL') return matchesSearch;
    if (statusFilter === 'CHANGED') return matchesSearch && (file.status === 'MODIFIED' || file.status === 'NEW' || file.status === 'COPIED');
    if (statusFilter === 'UNCHANGED') return matchesSearch && (file.status === 'UNCHANGED' || file.status === 'SKIPPED');
    return matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'MODIFIED':
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400">MODIFIED</span>;
      case 'NEW':
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/10 border border-purple-500/30 text-purple-400">NEW</span>;
      case 'UNCHANGED':
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 border border-slate-700 text-slate-400">UNCHANGED</span>;
      case 'COPIED':
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">COPIED</span>;
      case 'SKIPPED':
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/10 border border-blue-500/30 text-blue-400">SKIPPED</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/10 border border-rose-500/30 text-rose-400">ERROR</span>;
    }
  };

  const handleSimulateEdit = (fileId) => {
    setFiles((prev) =>
      prev.map((f) => {
        if (f.id === fileId) {
          return {
            ...f,
            status: 'MODIFIED',
            sourceModified: new Date().toISOString().replace('T', ' ').substring(0, 19),
            action: 'Copy',
            reason: 'User simulated file modification in source directory'
          };
        }
        return f;
      })
    );
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Page Title & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#30363d] pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>DIRECTORY METADATA MATRIX</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-mono">
            File Synchronization Table
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Real-time metadata attributes extracted via <code className="text-emerald-400">stat()</code> system call.
          </p>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search file name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#161b22] border border-[#30363d] rounded-lg pl-9 pr-4 py-2 text-xs font-mono text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center space-x-1 bg-[#161b22] border border-[#30363d] rounded-lg p-1">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-3 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
                statusFilter === 'ALL' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({files.length})
            </button>
            <button
              onClick={() => setStatusFilter('CHANGED')}
              className={`px-3 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
                statusFilter === 'CHANGED' ? 'bg-amber-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Changed
            </button>
            <button
              onClick={() => setStatusFilter('UNCHANGED')}
              className={`px-3 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
                statusFilter === 'UNCHANGED' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Unchanged
            </button>
          </div>
        </div>
      </div>

      {/* Files Table Container */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[#0d1117] text-slate-400 border-b border-[#30363d] uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4 font-semibold">File Name</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold">Source Size</th>
                <th className="py-3.5 px-4 font-semibold">Backup Size</th>
                <th className="py-3.5 px-4 font-semibold">Source Modified</th>
                <th className="py-3.5 px-4 font-semibold">Backup Modified</th>
                <th className="py-3.5 px-4 font-semibold">Action</th>
                <th className="py-3.5 px-4 font-semibold text-center">Interactive</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#30363d]/60 text-slate-200">
              {filteredFiles.map((file) => (
                <tr key={file.id} className="hover:bg-[#1c212a] transition-all">
                  <td className="py-3 px-4 font-bold text-white flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                    <span className="truncate max-w-xs">{file.name}</span>
                  </td>
                  <td className="py-3 px-4">
                    {getStatusBadge(file.status)}
                  </td>
                  <td className="py-3 px-4 text-slate-300">{file.sourceSize}</td>
                  <td className="py-3 px-4 text-slate-400">{file.backupSize}</td>
                  <td className="py-3 px-4 text-emerald-400/90">{file.sourceModified}</td>
                  <td className="py-3 px-4 text-slate-400">{file.backupModified}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      file.action === 'Copy' 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {file.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleSimulateEdit(file.id)}
                      className="px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-amber-300 border border-amber-500/30 text-[10px] flex items-center space-x-1 mx-auto transition-all cursor-pointer"
                      title="Simulate editing file to test change detection"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Modify</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend & Stat Rule Banner */}
      <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center space-x-2 text-slate-300">
          <Clock className="w-4 h-4 text-orange-400" />
          <span>Algorithm: <code className="text-emerald-400">s1.st_mtime &gt; s2.st_mtime || s1.st_size != s2.st_size</code></span>
        </div>
        <div className="text-slate-400 text-[11px]">
          Buffer Size: 4096 bytes (4 KB) | POSIX stat() metadata verification
        </div>
      </div>

    </div>
  );
}
