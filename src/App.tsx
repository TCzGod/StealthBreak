import { useState, useEffect } from 'react';
import './App.css';
import { Shield, Clock, AlertTriangle, Activity, Settings, Power, Eye, ChevronUp, ChevronDown } from 'lucide-react';

function App() {
  const [isStealthMode, setIsStealthMode] = useState(false);
  const [securityIndex] = useState(85);
  const [uptime, setUptime] = useState(0);
  const [detectedMonitors] = useState([
    { name: 'Teramind', isRunning: false },
    { name: 'ActivTrak', isRunning: true },
    { name: 'Hubstaff', isRunning: false },
    { name: 'Veriato', isRunning: false },
    { name: 'SentryPC', isRunning: false },
    { name: 'InterGuard', isRunning: false }
  ]);
  const [isTopMost, setIsTopMost] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setUptime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleStealthMode = () => {
    setIsStealthMode(!isStealthMode);
  };

  const toggleTopMost = () => {
    setIsTopMost(!isTopMost);
  };

  return (
    <div className="min-h-screen bg-cyber-black text-gray-100 font-cyber">
      <div className="container mx-auto p-4">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Shield className="text-cyber-pink h-8 w-8" />
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-pink to-cyber-blue">StealthBreak</h1>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={toggleTopMost}
              className="p-2 rounded-full hover:bg-cyber-gray transition-colors"
            >
              {isTopMost ? <ChevronUp className="text-cyber-blue" /> : <ChevronDown className="text-cyber-blue" />}
            </button>
            <button 
              onClick={toggleStealthMode}
              className={`p-2 rounded-full transition-colors ${isStealthMode ? 'bg-cyber-green' : 'bg-cyber-pink'}`}
            >
              {isStealthMode ? <Eye className="text-cyber-black" /> : <Eye className="text-cyber-black" />}
            </button>
            <button className="p-2 rounded-full hover:bg-cyber-gray transition-colors">
              <Settings className="text-cyber-blue" />
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-cyber-gray rounded-lg p-4 border border-cyber-blue/30 animate-glow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-cyber-blue">安全指数</h3>
              <Shield className="text-cyber-blue h-5 w-5" />
            </div>
            <div className="relative w-full h-4 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyber-pink to-cyber-blue" 
                style={{ width: `${securityIndex}%` }}
              />
            </div>
            <p className="text-center mt-2 text-xl font-bold text-cyber-green">{securityIndex}%</p>
          </div>

          <div className="bg-cyber-gray rounded-lg p-4 border border-cyber-purple/30">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-cyber-purple">运行时长</h3>
              <Clock className="text-cyber-purple h-5 w-5" />
            </div>
            <p className="text-center text-2xl font-bold text-cyber-green">{formatTime(uptime)}</p>
          </div>

          <div className="bg-cyber-gray rounded-lg p-4 border border-cyber-pink/30">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-cyber-pink">监控状态</h3>
              <AlertTriangle className="text-cyber-pink h-5 w-5" />
            </div>
            <p className="text-center text-2xl font-bold text-cyber-green">
              {detectedMonitors.filter(m => m.isRunning).length} 个监控
            </p>
          </div>

          <div className="bg-cyber-gray rounded-lg p-4 border border-cyber-green/30">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-cyber-green">隐身模式</h3>
              <Power className="text-cyber-green h-5 w-5" />
            </div>
            <p className="text-center text-2xl font-bold text-cyber-green">
              {isStealthMode ? '已启用' : '已禁用'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-cyber-gray rounded-lg p-4 border border-cyber-blue/30">
            <h3 className="text-cyber-blue text-lg font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" /> 检测到的监控程序
            </h3>
            <div className="space-y-2">
              {detectedMonitors.map((monitor, index) => (
                <div key={index} className="flex justify-between items-center p-2 rounded bg-gray-800">
                  <span>{monitor.name}</span>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${monitor.isRunning ? 'bg-cyber-pink text-white' : 'bg-cyber-green text-cyber-black'}`}>
                    {monitor.isRunning ? '运行中' : '未运行'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-cyber-gray rounded-lg p-4 border border-cyber-purple/30">
            <h3 className="text-cyber-purple text-lg font-bold mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5" /> 行为模拟热力图
            </h3>
            <div className="w-full h-64 bg-gray-800 rounded flex items-center justify-center">
              <p className="text-gray-400">热力图将显示鼠标活动区域</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App