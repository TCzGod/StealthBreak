import { MonitoringProcess } from '../types';

export class ProcessMonitor {
  private monitoredProcesses: string[] = [
    'Teramind',
    'ActivTrak',
    'Hubstaff',
    'Veriato',
    'SentryPC',
    'InterGuard'
  ];

  private isMonitoring: boolean = false;
  private checkInterval: NodeJS.Timeout | null = null;
  private onMonitorDetected: ((process: string) => void) | null = null;

  setOnMonitorDetected(callback: (process: string) => void): void {
    this.onMonitorDetected = callback;
  }

  startMonitoring(interval: number = 5000): void {
    this.isMonitoring = true;
    this.checkInterval = setInterval(() => {
      this.checkProcesses();
    }, interval);
  }

  stopMonitoring(): void {
    this.isMonitoring = false;
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }

  async checkProcesses(): Promise<MonitoringProcess[]> {
    const results: MonitoringProcess[] = [];
    
    for (const processName of this.monitoredProcesses) {
      const isRunning = await this.isProcessRunning(processName);
      results.push({ name: processName, isRunning });
      
      if (isRunning && this.onMonitorDetected) {
        this.onMonitorDetected(processName);
      }
    }
    
    return results;
  }

  private async isProcessRunning(processName: string): Promise<boolean> {
    try {
      const { execSync } = await import('child_process');
      const cmd = process.platform === 'win32' 
        ? `tasklist | findstr "${processName}"` 
        : `ps aux | grep "${processName}" | grep -v grep`;
      
      const output = execSync(cmd, { encoding: 'utf8' });
      return output.trim().length > 0;
    } catch {
      return false;
    }
  }

  addMonitoredProcess(processName: string): void {
    if (!this.monitoredProcesses.includes(processName)) {
      this.monitoredProcesses.push(processName);
    }
  }

  removeMonitoredProcess(processName: string): void {
    const index = this.monitoredProcesses.indexOf(processName);
    if (index > -1) {
      this.monitoredProcesses.splice(index, 1);
    }
  }

  getMonitoredProcesses(): string[] {
    return [...this.monitoredProcesses];
  }
}