import React from 'react';
import { ChevronLeft, ChevronRight, X, Presentation, Sparkles } from 'lucide-react';

export default function PresentationOverlay({ 
  activeTab, 
  setActiveTab, 
  onClose,
  onRunDemo,
  isDemoRunning
}) {
  const slides = [
    { id: 'dashboard', label: '1. Overview & Demo' },
    { id: 'ubuntu', label: '2. Ubuntu Execution' },
    { id: 'sync', label: '3. Sync Pipeline' },
    { id: 'syscalls', label: '4. POSIX System Calls' },
    { id: 'architecture', label: '5. Architecture (User -> Kernel)' },
    { id: 'performance', label: '6. Performance Metrics' },
    { id: 'testing', label: '7. Test Validation' },
    { id: 'about', label: '8. Team & Limitations' },
  ];

  const currentIndex = slides.findIndex(s => s.id === activeTab);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActiveTab(slides[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setActiveTab(slides[currentIndex + 1].id);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-blue-950 border-b border-purple-500/40 text-white px-6 py-3 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Left: Presentation Info */}
        <div className="flex items-center space-x-3">
          <div className="px-2.5 py-1 rounded bg-purple-500/20 border border-purple-400 text-purple-300 font-mono text-xs font-bold flex items-center space-x-1">
            <Presentation className="w-4 h-4 text-purple-300" />
            <span>PROJECTOR PRESENTATION MODE</span>
          </div>
          <span className="text-slate-300 text-xs font-mono hidden xl:inline">
            25CS2104E — OSSP Project | Team No. 12 (Section 22)
          </span>
        </div>

        {/* Center: Slide Jump Navigator */}
        <div className="flex items-center space-x-2 overflow-x-auto max-w-xl no-scrollbar py-1">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setActiveTab(s.id)}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                activeTab === s.id
                  ? 'bg-purple-600 text-white font-bold ring-2 ring-purple-300 shadow-md'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Right: Slide Controls & Exit */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onRunDemo}
            disabled={isDemoRunning}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs rounded flex items-center space-x-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isDemoRunning ? 'RUNNING...' : 'TRIGGER DEMO'}</span>
          </button>

          <div className="flex items-center bg-slate-800 rounded border border-slate-700">
            <button
              onClick={handlePrev}
              disabled={currentIndex <= 0}
              className="p-1.5 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent text-slate-200 cursor-pointer"
              title="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono px-2 text-purple-300 font-bold">
              {currentIndex + 1}/{slides.length}
            </span>
            <button
              onClick={handleNext}
              disabled={currentIndex >= slides.length - 1}
              className="p-1.5 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent text-slate-200 cursor-pointer"
              title="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 bg-rose-950/80 hover:bg-rose-900 border border-rose-600/50 text-rose-300 rounded cursor-pointer"
            title="Exit Presentation Mode"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
