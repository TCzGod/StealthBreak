import { SafeApplication } from '../types';

export class ScreenSwitcher {
  private safeApplications: SafeApplication[] = [];
  private currentApplication: string | null = null;

  addSafeApplication(app: SafeApplication): void {
    this.safeApplications.push(app);
  }

  removeSafeApplication(appName: string): void {
    const index = this.safeApplications.findIndex(app => app.name === appName);
    if (index > -1) {
      this.safeApplications.splice(index, 1);
    }
  }

  getSafeApplications(): SafeApplication[] {
    return [...this.safeApplications];
  }

  async switchToSafeApplication(): Promise<boolean> {
    if (this.safeApplications.length === 0) {
      return false;
    }

    const randomApp = this.safeApplications[Math.floor(Math.random() * this.safeApplications.length)];
    return this.switchToApplication(randomApp);
  }

  private async switchToApplication(app: SafeApplication): Promise<boolean> {
    try {
      const { execSync } = await import('child_process');
      
      if (process.platform === 'win32') {
        execSync(`start "" "${app.path}"`, { encoding: 'utf8' });
      } else if (process.platform === 'darwin') {
        execSync(`open "${app.path}"`, { encoding: 'utf8' });
      } else {
        execSync(`xdg-open "${app.path}"`, { encoding: 'utf8' });
      }

      this.currentApplication = app.name;
      await this.simulateAltTab();
      return true;
    } catch (error) {
      console.error('Failed to switch to application:', error);
      return false;
    }
  }

  private async simulateAltTab(): Promise<void> {
    try {
      const { execSync } = await import('child_process');
      
      if (process.platform === 'win32') {
        execSync(`powershell -Command "[System.Windows.Forms.SendKeys]::SendWait('%{TAB}')"`, { encoding: 'utf8' });
      } else if (process.platform === 'darwin') {
        execSync(`osascript -e 'tell application "System Events" to key code 48 using command down'`, { encoding: 'utf8' });
      }
      
      await this.sleep(100);
      
      if (process.platform === 'win32') {
        execSync(`powershell -Command "[System.Windows.Forms.SendKeys]::SendWait('{ENTER}')"`, { encoding: 'utf8' });
      } else if (process.platform === 'darwin') {
        execSync(`osascript -e 'tell application "System Events" to key code 36'`, { encoding: 'utf8' });
      }
    } catch (error) {
      console.error('Failed to simulate Alt+Tab:', error);
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getCurrentApplication(): string | null {
    return this.currentApplication;
  }
}