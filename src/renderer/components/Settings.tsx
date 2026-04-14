import { useState } from 'react';
import { Save, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface SettingsProps {
  onClose: () => void;
}

function Settings({ onClose }: SettingsProps) {
  const [isExpanded, setIsExpanded] = useState({
    simulation: true,
    monitors: false,
    safeApps: false,
    system: false
  });

  const [simulationConfig, setSimulationConfig] = useState({
    mouseSpeed: 10,
    keyboardDelay: [50, 300],
    pauseProbability: 0.3,
    pauseDuration: [500, 2000]
  });

  const [monitoredProcesses, setMonitoredProcesses] = useState([
    'Teramind',
    'ActivTrak',
    'Hubstaff',
    'Veriato',
    'SentryPC',
    'InterGuard'
  ]);

  const [newProcess, setNewProcess] = useState('');

  const [safeApplications, setSafeApplications] = useState([
    { name: 'Excel', path: 'C:\\Program Files\\Microsoft Office\\root\\Office16\\EXCEL.EXE', shortcut: 'excel' },
    { name: 'Visual Studio Code', path: 'C:\\Users\\zilu.zhu\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe', shortcut: 'code' }
  ]);

  const [newApp, setNewApp] = useState({
    name: '',
    path: '',
    shortcut: ''
  });

  const [startup, setStartup] = useState(true);

  const toggleExpanded = (section: keyof typeof isExpanded) => {
    setIsExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleAddProcess = () => {
    if (newProcess && !monitoredProcesses.includes(newProcess)) {
      setMonitoredProcesses([...monitoredProcesses, newProcess]);
      setNewProcess('');
    }
  };

  const handleRemoveProcess = (process: string) => {
    setMonitoredProcesses(monitoredProcesses.filter(p => p !== process));
  };

  const handleAddApp = () => {
    if (newApp.name && newApp.path && newApp.shortcut) {
      setSafeApplications([...safeApplications, newApp]);
      setNewApp({ name: '', path: '', shortcut: '' });
    }
  };

  const handleRemoveApp = (appName: string) => {
    setSafeApplications(safeApplications.filter(app => app.name !== appName));
  };

  const handleSave = () => {
    console.log('Saving settings...');
    // 保存设置到本地存储
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-cyber-gray rounded-lg p-6 w-full max-w-2xl border border-cyber-blue">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-pink to-cyber-blue">设置</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-800">
            <ChevronDown className="text-cyber-blue" />
          </button>
        </div>

        {/* 行为模拟设置 */}
        <div className="mb-6">
          <div 
            className="flex justify-between items-center cursor-pointer p-2 rounded bg-gray-800"
            onClick={() => toggleExpanded('simulation')}
          >
            <h3 className="text-cyber-blue font-bold">行为模拟设置</h3>
            {isExpanded.simulation ? <ChevronUp className="text-cyber-blue" /> : <ChevronDown className="text-cyber-blue" />}
          </div>
          {isExpanded.simulation && (
            <div className="mt-4 space-y-4 p-4 bg-gray-800 rounded">
              <div>
                <label className="block text-gray-300 mb-2">鼠标移动速度</label>
                <input 
                  type="range" 
                  min="1" 
                  max="20" 
                  value={simulationConfig.mouseSpeed}
                  onChange={(e) => setSimulationConfig(prev => ({ ...prev, mouseSpeed: parseInt(e.target.value) }))}
                  className="w-full"
                />
                <p className="text-cyber-green text-center mt-1">{simulationConfig.mouseSpeed}</p>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">键盘延迟 (ms)</label>
                <div className="flex gap-4">
                  <input 
                    type="number" 
                    value={simulationConfig.keyboardDelay[0]}
                    onChange={(e) => setSimulationConfig(prev => {
                      return { ...prev, keyboardDelay: [parseInt(e.target.value), prev.keyboardDelay[1]] };
                    })}
                    className="flex-1 bg-gray-700 border border-gray-600 rounded p-2"
                  />
                  <span className="text-gray-400 self-center">-</span>
                  <input 
                    type="number" 
                    value={simulationConfig.keyboardDelay[1]}
                    onChange={(e) => setSimulationConfig(prev => ({ ...prev, keyboardDelay: [prev.keyboardDelay[0], parseInt(e.target.value)] }))}
                    className="flex-1 bg-gray-700 border border-gray-600 rounded p-2"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">停顿概率</label>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.1"
                  value={simulationConfig.pauseProbability}
                  onChange={(e) => setSimulationConfig(prev => ({ ...prev, pauseProbability: parseFloat(e.target.value) }))}
                  className="w-full"
                />
                <p className="text-cyber-green text-center mt-1">{Math.round(simulationConfig.pauseProbability * 100)}%</p>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">停顿时长 (ms)</label>
                <div className="flex gap-4">
                  <input 
                    type="number" 
                    value={simulationConfig.pauseDuration[0]}
                    onChange={(e) => setSimulationConfig(prev => {
                      return { ...prev, pauseDuration: [parseInt(e.target.value), prev.pauseDuration[1]] };
                    })}
                    className="flex-1 bg-gray-700 border border-gray-600 rounded p-2"
                  />
                  <span className="text-gray-400 self-center">-</span>
                  <input 
                    type="number" 
                    value={simulationConfig.pauseDuration[1]}
                    onChange={(e) => setSimulationConfig(prev => ({ ...prev, pauseDuration: [prev.pauseDuration[0], parseInt(e.target.value)] }))}
                    className="flex-1 bg-gray-700 border border-gray-600 rounded p-2"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 监控程序设置 */}
        <div className="mb-6">
          <div 
            className="flex justify-between items-center cursor-pointer p-2 rounded bg-gray-800"
            onClick={() => toggleExpanded('monitors')}
          >
            <h3 className="text-cyber-pink font-bold">监控程序设置</h3>
            {isExpanded.monitors ? <ChevronUp className="text-cyber-pink" /> : <ChevronDown className="text-cyber-pink" />}
          </div>
          {isExpanded.monitors && (
            <div className="mt-4 space-y-4 p-4 bg-gray-800 rounded">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={newProcess}
                  onChange={(e) => setNewProcess(e.target.value)}
                  placeholder="添加监控程序名称"
                  className="flex-1 bg-gray-700 border border-gray-600 rounded p-2"
                />
                <button 
                  onClick={handleAddProcess}
                  className="bg-cyber-pink text-white p-2 rounded"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-2">
                {monitoredProcesses.map((process, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-700 rounded">
                    <span>{process}</span>
                    <button 
                      onClick={() => handleRemoveProcess(process)}
                      className="text-cyber-pink hover:text-white"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 安全应用设置 */}
        <div className="mb-6">
          <div 
            className="flex justify-between items-center cursor-pointer p-2 rounded bg-gray-800"
            onClick={() => toggleExpanded('safeApps')}
          >
            <h3 className="text-cyber-purple font-bold">安全应用设置</h3>
            {isExpanded.safeApps ? <ChevronUp className="text-cyber-purple" /> : <ChevronDown className="text-cyber-purple" />}
          </div>
          {isExpanded.safeApps && (
            <div className="mt-4 space-y-4 p-4 bg-gray-800 rounded">
              <div className="space-y-2">
                <input 
                  type="text" 
                  value={newApp.name}
                  onChange={(e) => setNewApp(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="应用名称"
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2"
                />
                <input 
                  type="text" 
                  value={newApp.path}
                  onChange={(e) => setNewApp(prev => ({ ...prev, path: e.target.value }))}
                  placeholder="应用路径"
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2"
                />
                <input 
                  type="text" 
                  value={newApp.shortcut}
                  onChange={(e) => setNewApp(prev => ({ ...prev, shortcut: e.target.value }))}
                  placeholder="快捷方式"
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2"
                />
                <button 
                  onClick={handleAddApp}
                  className="bg-cyber-purple text-white p-2 rounded w-full"
                >
                  添加应用
                </button>
              </div>
              <div className="space-y-2">
                {safeApplications.map((app, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-700 rounded">
                    <div>
                      <p className="font-bold">{app.name}</p>
                      <p className="text-xs text-gray-400">{app.path}</p>
                      <p className="text-xs text-cyber-green">快捷方式: {app.shortcut}</p>
                    </div>
                    <button 
                      onClick={() => handleRemoveApp(app.name)}
                      className="text-cyber-purple hover:text-white"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 系统设置 */}
        <div className="mb-6">
          <div 
            className="flex justify-between items-center cursor-pointer p-2 rounded bg-gray-800"
            onClick={() => toggleExpanded('system')}
          >
            <h3 className="text-cyber-green font-bold">系统设置</h3>
            {isExpanded.system ? <ChevronUp className="text-cyber-green" /> : <ChevronDown className="text-cyber-green" />}
          </div>
          {isExpanded.system && (
            <div className="mt-4 p-4 bg-gray-800 rounded">
              <div className="flex justify-between items-center">
                <span>开机自启动</span>
                <input 
                  type="checkbox" 
                  checked={startup}
                  onChange={(e) => setStartup(e.target.checked)}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button 
            onClick={handleSave}
            className="bg-cyber-blue text-white p-3 rounded flex items-center gap-2 hover:bg-cyber-pink transition-colors"
          >
            <Save className="h-5 w-5" />
            保存设置
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;