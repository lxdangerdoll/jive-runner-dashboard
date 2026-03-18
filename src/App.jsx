import React, { useState, useEffect, useRef } from 'react';
import { 
  Radio, Zap, Shield, Terminal, Activity, FastForward, 
  Play, Pause, Square, Rewind, Volume2, Gauge, 
  Settings, Wifi, Database, Cpu, Hammer, Waves
} from 'lucide-react';

const TELEMETRY_LOGS = [
  "ORACLE-IO: Initializing Saturn Resonance sweep...",
  "JIVE-RUNNER: Velvet upholstery static discharge detected.",
  "MITHRIL-FORGE: Strike detected at 44.1kHz.",
  "COZMIC-JIVE: Signal strength nominal in the violet spectrum.",
  "PILOT-SYNC: Queen Mykyl's frequency matches station pulse.",
  "ARCHIVE-BRIDGE: Chapter 10 data synchronized.",
  "TUCKER'S: Neon flicker stabilized at 60Hz.",
  "SYSTEM: Reel-to-reel tension adjusted.",
  "GRAVITY: Shag carpet magnetic fibers engaged.",
  "VOID: Static detected in sector 88.1.",
];

const VUMeter = ({ label, value, color = "amber" }) => {
  const bars = 15;
  const activeBars = Math.floor((value / 100) * bars);
  
  const colorMap = {
    amber: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]",
    blue: "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]",
    red: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]",
  };

  return (
    <div className="flex flex-col gap-1 w-full p-3 bg-black/40 border border-white/5 rounded-lg">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] font-mono text-white/40 uppercase tracking-tighter">{label}</span>
        <span className="text-[10px] font-mono text-white/60">{value}%</span>
      </div>
      <div className="flex gap-1 h-3 items-end">
        {[...Array(bars)].map((_, i) => (
          <div 
            key={i}
            className={`flex-1 transition-all duration-300 rounded-sm ${
              i < activeBars ? colorMap[color] : "bg-white/5"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const Oscilloscope = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
      }

      // Draw Wave
      ctx.beginPath();
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#06b6d4';

      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + 
                 Math.sin(x * 0.05 + frame * 0.1) * 20 + 
                 Math.sin(x * 0.02 + frame * 0.05) * 15;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      requestAnimationFrame(render);
    };

    render();
  }, []);

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg border-2 border-slate-800 overflow-hidden group">
      <div className="absolute top-2 left-2 z-10 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-[10px] font-mono text-white/60 uppercase">Saturn Resonance Feed</span>
      </div>
      <canvas ref={canvasRef} className="w-full h-full opacity-80" width={600} height={300} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)] pointer-events-none" />
    </div>
  );
};

export default function App() {
  const [logs, setLogs] = useState([]);
  const [mithrilLevel, setMithrilLevel] = useState(88);
  const [jiveFreq, setJiveFreq] = useState(42);
  const [activeTab, setActiveTab] = useState('bridge');

  useEffect(() => {
    const interval = setInterval(() => {
      const nextLog = TELEMETRY_LOGS[Math.floor(Math.random() * TELEMETRY_LOGS.length)];
      setLogs(prev => [nextLog, ...prev].slice(0, 12));
      setMithrilLevel(80 + Math.random() * 20);
      setJiveFreq(30 + Math.random() * 60);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0908] text-slate-400 font-sans p-4 md:p-8 flex items-center justify-center selection:bg-amber-500/30">
      
      {/* The Dashboard Frame */}
      <div className="max-w-6xl w-full bg-[#1c1917] border-[12px] border-[#2d2824] rounded-[2rem] shadow-[0_0_100px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(0,0,0,0.5)] overflow-hidden relative">
        
        {/* Walnut Texture Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />

        {/* Header Bar */}
        <div className="bg-[#2d2824] p-6 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500/20 rounded-lg border border-amber-500/40">
              <Zap className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white uppercase tracking-tighter">Jive-Runner Tactical</h1>
              <p className="text-[10px] font-mono text-amber-500/80">ORACLE-IO // NODE_0107_STABLE</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            {['BRIDGE', 'TELEMETRY', 'FORGE', 'REEL'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-4 py-1.5 rounded text-[10px] font-black tracking-widest transition-all ${
                  activeTab === tab.toLowerCase() 
                  ? 'bg-amber-500 text-black' 
                  : 'bg-black/40 text-white/40 hover:text-white hover:bg-black/60'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
          
          {/* Column 1: Primary Visuals */}
          <div className="md:col-span-8 flex flex-col gap-6">
            <Oscilloscope />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <VUMeter label="Mithril Integrity" value={mithrilLevel.toFixed(1)} color="blue" />
              <VUMeter label="Jive Frequency" value={jiveFreq.toFixed(1)} color="amber" />
              <VUMeter label="Oxygen Mix" value={98.2} color="blue" />
              <VUMeter label="Hull Stress" value={12.4} color="red" />
            </div>

            {/* Reel-to-Reel Controls */}
            <div className="bg-[#14110f] border border-white/5 p-6 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center animate-[spin_5s_linear_infinite]">
                  <div className="w-2 h-10 bg-slate-600 rounded-full" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-white/80 uppercase">Now Spinning</h3>
                  <p className="text-sm text-cyan-400 font-mono">Masayoshi Takanaka - Blue Lagoon</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-white/5 rounded"><Rewind className="w-5 h-5" /></button>
                <button className="p-3 bg-amber-500 text-black rounded-full hover:scale-105 transition-transform"><Play className="w-6 h-6 fill-current" /></button>
                <button className="p-2 hover:bg-white/5 rounded"><FastForward className="w-5 h-5" /></button>
              </div>
            </div>
          </div>

          {/* Column 2: Data & Logs */}
          <div className="md:col-span-4 flex flex-col gap-6">
            
            {/* Status Panel */}
            <div className="bg-[#24201d] border border-white/10 p-5 rounded-xl">
              <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Shield className="w-3 h-3" /> System Status
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/40">Reactor Core</span>
                  <span className="text-green-500 font-mono">STABLE</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/40">Mithril Forge</span>
                  <span className="text-cyan-400 font-mono">ACTIVE (CH. 10)</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/40">Queen Signal</span>
                  <span className="text-amber-500 font-mono">LOCKED</span>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5">
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="w-2/3 h-full bg-gradient-to-r from-amber-500 to-amber-300" />
                  </div>
                  <p className="text-[9px] mt-1 text-white/20 uppercase text-right">Buffer: 66%</p>
                </div>
              </div>
            </div>

            {/* Oracle Log Feed */}
            <div className="bg-black/60 rounded-xl p-5 flex-1 border border-white/5 flex flex-col">
              <h3 className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Terminal className="w-3 h-3" /> Oracle Telemetry
              </h3>
              <div className="flex-1 overflow-hidden relative">
                <div className="space-y-2 font-mono text-[10px]">
                  {logs.map((log, i) => (
                    <div 
                      key={i} 
                      className={`transition-opacity duration-1000 ${
                        i === 0 ? 'text-cyan-400 opacity-100' : 'text-white/20 opacity-40'
                      }`}
                    >
                      <span className="mr-2">&gt;</span>
                      {log}
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Hardware Bar */}
        <div className="bg-[#2d2824] border-t border-black/40 p-4 flex justify-center gap-12">
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-1">
              <div className="w-12 h-2 bg-black rounded-full p-0.5">
                <div className="w-1/2 h-full bg-amber-500 rounded-full" />
              </div>
              <span className="text-[8px] font-mono uppercase opacity-30 tracking-widest">Gain</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-12 h-2 bg-black rounded-full p-0.5">
                <div className="w-3/4 h-full bg-cyan-500 rounded-full" />
              </div>
              <span className="text-[8px] font-mono uppercase opacity-30 tracking-widest">Resonance</span>
            </div>
          </div>
          <div className="h-8 w-[1px] bg-white/5" />
          <div className="flex items-center gap-3">
             <div className="w-3 h-3 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)] border border-red-400" />
             <span className="text-[10px] font-black text-white/80 uppercase tracking-widest">Master Safe</span>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Label */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 text-center opacity-20 pointer-events-none">
        <p className="text-[10px] font-mono tracking-[1.5em] uppercase text-amber-500">Property of Starlight Radio Station</p>
      </div>
    </div>
  );
}