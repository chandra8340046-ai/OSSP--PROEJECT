import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import SyncSimulator from './components/SyncSimulator';
import FilesTable from './components/FilesTable';
import SystemCallsExplorer from './components/SystemCallsExplorer';
import ArchitectureView from './components/ArchitectureView';
import UbuntuEnvironment from './components/UbuntuEnvironment';
import PerformanceView from './components/PerformanceView';
import TestingView from './components/TestingView';
import TerminalConsole from './components/TerminalConsole';
import AboutView from './components/AboutView';
import PresentationOverlay from './components/PresentationOverlay';
import { INITIAL_FILES } from './data/mockData';
import './App.css';

const DEFAULT_LOGS = [
  "user@ubuntu:~/backupsync$ ./backupsync ~/Documents ~/Backup",
  "[INFO] BackupSync v1.0.0 Initializing (OSSP Team 12)...",
  "[INFO] Source Directory: /home/user/Documents",
  "[INFO] Backup Directory: /home/user/Backup",
  "[SYS] opendir(\"/home/user/Documents\") successful (DIR* fd=3)",
  "[SYS] stat(\"/home/user/Documents/thesis_draft.docx\") => mtime=1727692334, size=2516582",
  "[SYS] stat(\"/home/user/Backup/thesis_draft.docx\") => mtime=1727689500, size=2202009",
  "[DECISION] thesis_draft.docx: MODIFIED (Source timestamp newer) -> COPYING",
  "[SYS] open(\"/home/user/Documents/thesis_draft.docx\", O_RDONLY) => fd=4",
  "[SYS] open(\"/home/user/Backup/thesis_draft.docx\", O_WRONLY|O_CREAT|O_TRUNC) => fd=5",
  "[IO] Streamed 2,516,582 bytes using 615 x 4096-byte chunk buffers",
  "[SYS] close(fd=4), close(fd=5)",
  "[SYS] stat(\"/home/user/Documents/photo.jpg\") => mtime=1727688000, size=3355443",
  "[SYS] stat(\"/home/user/Backup/photo.jpg\") => mtime=1727688000, size=3355443",
  "[DECISION] photo.jpg: UNCHANGED (size and mtime match) -> SKIPPED",
  "[SUMMARY] Processed: 7 files | Copied: 4 files (3.78 MB) | Skipped: 3 files (4.2 MB) | Time: 42 ms",
  "[STATUS] Synchronization complete. Exit code: 0"
];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [presentationMode, setPresentationMode] = useState(false);
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [demoStage, setDemoStage] = useState(0);
  const [activeFile, setActiveFile] = useState(null);
  const [files, setFiles] = useState(INITIAL_FILES);
  const [logs, setLogs] = useState(DEFAULT_LOGS);

  const [stats, setStats] = useState({
    scanned: INITIAL_FILES.length,
    changed: 4,
    copied: 4,
    skipped: 3,
    errors: 0,
    elapsed: 0.042,
    totalFiles: INITIAL_FILES.length,
    bytesTransferred: "3.78 MB",
    savedBandwidth: "4.20 MB",
    timeTakenMs: 42
  });

  const handleRunDemo = async () => {
    if (isDemoRunning) return;
    setIsDemoRunning(true);
    setActiveTab('sync');

    // Reset file list to fresh INITIAL_FILES state so every run has active changes to process
    const initialCopy = INITIAL_FILES.map(f => ({ ...f }));
    setFiles(initialCopy);

    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [
      ...prev,
      `\nuser@ubuntu:~/backupsync$ ./backupsync ~/Documents ~/Backup --live-demo`,
      `[${timestamp}] [START] Live synchronization pipeline initiated.`
    ]);

    // Stage 1: Directory Traversal
    setDemoStage(1);
    setActiveFile({ name: "Scanning /home/user/Documents...", action: "opendir()" });
    setLogs(prev => [...prev, `[${timestamp}] [SYS] opendir("/home/user/Documents") -> scanning directory entries...`]);
    await new Promise(r => setTimeout(r, 600));

    // Stage 2: Metadata Inspection
    setDemoStage(2);
    setActiveFile({ name: "Fetching stat() metadata for files...", action: "stat()" });
    setLogs(prev => [...prev, `[${timestamp}] [SYS] stat() metadata checks executing on all target paths...`]);
    await new Promise(r => setTimeout(r, 600));

    // Stage 3: Change Decision Matrix
    setDemoStage(3);
    setActiveFile({ name: "Evaluating st_mtime & st_size thresholds...", action: "compare()" });
    setLogs(prev => [...prev, `[${timestamp}] [DECISION] Evaluating st_mtime & st_size thresholds...`]);
    await new Promise(r => setTimeout(r, 600));

    // Stage 4: Buffer Streaming per file
    setDemoStage(4);
    let copiedCount = 0;
    let skippedCount = 0;
    let updatedFiles = [...initialCopy];

    for (let i = 0; i < updatedFiles.length; i++) {
      const f = updatedFiles[i];
      setActiveFile(f);

      const isCopyNeeded = f.status === 'MODIFIED' || f.status === 'NEW' || f.action === 'Copy';

      if (isCopyNeeded) {
        copiedCount++;
        setLogs(prev => [
          ...prev,
          `[SYS] open("${f.name}", O_RDONLY) => open("${f.name}", O_WRONLY|O_CREAT|O_TRUNC)`,
          `[IO] Streaming ${f.sourceSize} payload in 4096-byte chunks...`,
          `[DECISION] ${f.name} -> COPIED`
        ]);
        updatedFiles[i] = { ...f, status: 'COPIED', action: 'Copy' };
      } else {
        skippedCount++;
        setLogs(prev => [
          ...prev,
          `[SYS] stat("${f.name}") matched backup metadata.`,
          `[DECISION] ${f.name} -> SKIPPED (Unchanged)`
        ]);
        updatedFiles[i] = { ...f, status: 'SKIPPED', action: 'Skip' };
      }

      setFiles([...updatedFiles]);
      await new Promise(r => setTimeout(r, 550));
    }

    // Stage 5: Sync Complete
    setDemoStage(5);
    setActiveFile(null);
    const finishTime = new Date().toLocaleTimeString();

    setStats({
      scanned: updatedFiles.length,
      changed: copiedCount,
      copied: copiedCount,
      skipped: skippedCount,
      errors: 0,
      elapsed: 0.038,
      totalFiles: updatedFiles.length,
      bytesTransferred: "3.78 MB",
      savedBandwidth: "4.20 MB",
      timeTakenMs: 38
    });

    setLogs(prev => [
      ...prev,
      `[${finishTime}] [SUMMARY] Processed: ${updatedFiles.length} files | Copied: ${copiedCount} | Skipped: ${skippedCount} | Time: 38 ms`,
      `[${finishTime}] [STATUS] Synchronization complete. Exit code: 0`
    ]);

    setIsDemoRunning(false);
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            onRunDemo={handleRunDemo}
            isDemoRunning={isDemoRunning}
            stats={stats}
            setActiveTab={setActiveTab}
          />
        );
      case 'sync':
        return (
          <SyncSimulator
            onRunDemo={handleRunDemo}
            isDemoRunning={isDemoRunning}
            demoStage={demoStage}
            activeFile={activeFile}
            stats={stats}
          />
        );
      case 'files':
        return <FilesTable files={files} setFiles={setFiles} />;
      case 'syscalls':
        return <SystemCallsExplorer />;
      case 'architecture':
        return <ArchitectureView />;
      case 'ubuntu':
        return <UbuntuEnvironment />;
      case 'performance':
        return <PerformanceView />;
      case 'testing':
        return <TestingView />;
      case 'logs':
        return (
          <TerminalConsole
            logs={logs}
            setLogs={setLogs}
            onRunDemo={handleRunDemo}
            isDemoRunning={isDemoRunning}
          />
        );
      case 'about':
        return <AboutView />;
      default:
        return (
          <Dashboard
            onRunDemo={handleRunDemo}
            isDemoRunning={isDemoRunning}
            stats={stats}
            setActiveTab={setActiveTab}
          />
        );
    }
  };

  return (
    <div className={`min-h-screen bg-[#0b0f19] text-slate-100 font-sans selection:bg-blue-600 selection:text-white ${presentationMode ? 'presentation-mode' : ''}`}>
      {presentationMode && (
        <PresentationOverlay
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onClose={() => setPresentationMode(false)}
          onRunDemo={handleRunDemo}
          isDemoRunning={isDemoRunning}
        />
      )}

      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRunDemo={handleRunDemo}
        isDemoRunning={isDemoRunning}
        presentationMode={presentationMode}
        setPresentationMode={setPresentationMode}
      />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {renderActiveView()}
      </main>

      <footer className="border-t border-[#30363d] bg-[#0d1117] py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <div>
            <span className="text-slate-200 font-bold">BackupSync</span> — Linux File Backup & Synchronization System
          </div>
          <div>
            OSSP Course Project (25CS2104E) | Team No. 12 | Section 22
          </div>
          <div className="flex items-center space-x-2 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Ubuntu POSIX Engine Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
