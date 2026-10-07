import React from 'react';
import { 
  LayoutDashboard, 
  RefreshCw, 
  FileText, 
  Terminal, 
  Layers, 
  Cpu, 
  BarChart3, 
  CheckSquare, 
  Code2, 
  Info,
  Play,
  Monitor,
  CheckCircle2
} from 'lucide-react';
import { PROJECT_INFO } from '../data/mockData';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onRunDemo, 
  isDemoRunning, 
  presentationMode, 
  setPresentationMode 
}) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'sync', label: 'Sync', icon: RefreshCw },
    { id: 'files', label: 'Files', icon: FileText },
    { id: 'syscalls', label: 'System Calls', icon: Terminal },
    { id: 'architecture', label: 'Architecture', icon: Layers },
    { id: 'ubuntu', label: 'Ubuntu / Linux', icon: Cpu },
    { id: 'performance', label: 'Performance', icon: BarChart3 },
    { id: 'testing', label: 'Testing', icon: CheckSquare },
    { id: 'logs', label: 'Logs', icon: Code2 },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0d1117]/95 backdrop-blur-md border-b border-[#30363d] px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        
        {/* Brand & Subtitle & Status */}
        <div className="flex items-center space-x-3 w-full lg:w-auto justify-between lg:justify-start">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-600 via-amber-500 to-emerald-500 p-0.5 shadow-lg shadow-orange-500/20">
              <div className="w-full h-full bg-[#161b22] rounded-[7px] flex items-center justify-center text-orange-400 font-mono font-bold text-xl">
                BS
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-xl tracking-wider text-white font-mono">{PROJECT_INFO.title}</span>
                <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  SYSTEM READY
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">{PROJECT_INFO.subtitle}</p>
            </div>
          </div>

          {/* Action buttons on small screens */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={onRunDemo}
              disabled={isDemoRunning}
              className={`px-3 py-1.5 rounded-md text-xs font-mono font-semibold flex items-center space-x-1 transition-all ${
                isDemoRunning 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30'
              }`}
            >
              <Play className={`w-3.5 h-3.5 ${isDemoRunning ? 'animate-spin' : ''}`} />
              <span>{isDemoRunning ? 'RUNNING...' : 'RUN DEMO'}</span>
            </button>
          </div>
        </div>

        {/* Action Buttons Desktop */}
        <div className="hidden lg:flex items-center space-x-3">
          <button
            onClick={onRunDemo}
            disabled={isDemoRunning}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider uppercase flex items-center space-x-2 transition-all cursor-pointer ${
              isDemoRunning 
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 animate-pulse'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/50 hover:scale-[1.02]'
            }`}
          >
            <Play className={`w-4 h-4 ${isDemoRunning ? 'animate-spin' : ''}`} />
            <span>{isDemoRunning ? 'DEMO RUNNING...' : 'RUN DEMO'}</span>
          </button>

          <button
            onClick={() => setPresentationMode(!presentationMode)}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider uppercase flex items-center space-x-2 transition-all cursor-pointer border ${
              presentationMode
                ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-900/50 ring-2 ring-purple-400/50'
                : 'bg-[#161b22] hover:bg-[#21262d] text-slate-200 border-[#30363d]'
            }`}
          >
            <Monitor className="w-4 h-4 text-purple-400" />
            <span>{presentationMode ? 'EXIT PRESENTATION' : 'PRESENTATION MODE'}</span>
          </button>
        </div>
      </div>

      {/* Tabs Row */}
      <nav className="max-w-7xl mx-auto mt-3 pt-2 border-t border-[#30363d]/50 overflow-x-auto no-scrollbar flex space-x-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center space-x-1.5 whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#161b22]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
}
