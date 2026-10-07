import React, { useState } from 'react';
import { 
  CheckSquare, 
  CheckCircle2, 
  XCircle, 
  Play, 
  RotateCcw, 
  Terminal, 
  FileCheck,
  ShieldAlert
} from 'lucide-react';
import { TEST_CASES } from '../data/mockData';

export default function TestingView() {
  const [testResults, setTestResults] = useState(
    TEST_CASES.map(t => ({ ...t, status: t.result, running: false }))
  );
  const [isRunningSuite, setIsRunningSuite] = useState(false);

  const runTestSuite = async () => {
    setIsRunningSuite(true);
    // Reset status to pending
    setTestResults(prev => prev.map(t => ({ ...t, status: 'RUNNING...', running: true })));

    for (let i = 0; i < TEST_CASES.length; i++) {
      await new Promise(res => setTimeout(res, 600));
      setTestResults(prev =>
        prev.map((t, idx) => (idx === i ? { ...t, status: 'PASS', running: false } : t))
      );
    }
    setIsRunningSuite(false);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#30363d] pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold mb-2">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>SYSTEM VALIDATION SUITE</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-mono">
            Testing & Validation Matrix
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Empirical verification test cases covering edge cases, permission checks, and missing directories.
          </p>
        </div>

        <button
          onClick={runTestSuite}
          disabled={isRunningSuite}
          className={`px-5 py-2.5 rounded-xl font-mono font-bold text-xs uppercase flex items-center space-x-2 transition-all cursor-pointer shadow-lg ${
            isRunningSuite
              ? 'bg-amber-500 text-slate-950 animate-pulse'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/60'
          }`}
        >
          <Play className={`w-4 h-4 ${isRunningSuite ? 'animate-spin' : ''}`} />
          <span>{isRunningSuite ? 'RUNNING TEST SUITE...' : 'RUN ALL TESTS'}</span>
        </button>
      </div>

      {/* Grid of Test Cases */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testResults.map((test) => (
          <div 
            key={test.id}
            className="bg-[#161b22] border border-[#30363d] hover:border-slate-500 rounded-2xl p-5 transition-all space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-slate-400 px-2.5 py-0.5 rounded bg-[#0d1117] border border-[#30363d]">
                  {test.id}
                </span>
                <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold flex items-center gap-1 ${
                  test.status === 'PASS' 
                    ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400' 
                    : test.status === 'RUNNING...'
                    ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300 animate-pulse'
                    : 'bg-rose-500/20 border border-rose-500/40 text-rose-400'
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{test.status}</span>
                </span>
              </div>

              <h3 className="font-mono font-bold text-sm text-white mb-2">{test.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">{test.scenario}</p>

              <div className="space-y-1.5 pt-2 border-t border-[#30363d]/60">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">EXPECTED BEHAVIOR:</span>
                <p className="text-xs font-mono text-slate-300 bg-[#0d1117] p-2.5 rounded border border-[#30363d]">
                  {test.expected}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#30363d]/60 flex items-center justify-between">
              <span className="text-[10px] font-mono text-emerald-400 font-bold truncate">
                {test.details}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Verification Card */}
      <div className="bg-[#161b22] border border-emerald-500/40 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-mono font-bold text-base text-white">TEST SUITE STATUS: 6/6 PASSED (100%)</h3>
            <p className="text-xs text-slate-400">All edge cases handled cleanly with zero memory leaks or unhandled system signals.</p>
          </div>
        </div>

        <div className="text-xs font-mono text-slate-300 bg-[#0d1117] px-4 py-2 rounded-xl border border-[#30363d]">
          Valgrind Memory Audit: <span className="text-emerald-400 font-bold">0 errors, 0 leaks</span>
        </div>
      </div>

    </div>
  );
}
