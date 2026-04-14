export interface Point {
  x: number;
  y: number;
}

export interface MousePath {
  points: Point[];
  duration: number;
}

export interface SimulationConfig {
  mouseSpeed: number;
  keyboardDelay: [number, number];
  pauseProbability: number;
  pauseDuration: [number, number];
}

export interface MonitoringProcess {
  name: string;
  isRunning: boolean;
}

export interface SafeApplication {
  name: string;
  path: string;
  shortcut: string;
}

export interface AppState {
  isStealthMode: boolean;
  securityIndex: number;
  uptime: number;
  detectedMonitors: MonitoringProcess[];
  safeApplications: SafeApplication[];
  simulationConfig: SimulationConfig;
}