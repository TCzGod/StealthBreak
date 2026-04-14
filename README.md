# StealthBreak - 智能职场辅助系统

## 项目简介

StealthBreak是一款基于Electron + React技术栈开发的智能职场辅助系统，旨在通过技术手段保护员工的合理休息权利，应对现代职场中的过度监控现象。

## 核心功能

### 1. 行为模拟引擎
- 模拟真实的人类鼠标移动轨迹，使用贝塞尔曲线算法
- 模拟键盘敲击，包含随机延迟（50-300ms）
- 鼠标移动速度要有变化，偶尔停顿模拟"思考"
- 轨迹要自然，不能是直线

### 2. 智能监控系统
- 实时检测以下监控进程：Teramind、ActivTrak、Hubstaff、Veriato、SentryPC、InterGuard
- 检测到监控程序启动时，立即触发隐身模式
- 提供系统托盘图标显示当前状态

### 3. 智能切屏模块
- 当检测到监控时，自动将当前窗口切换到预设的"工作界面"（如Excel、IDE）
- 切换动画要自然，模拟人工Alt+Tab操作
- 支持自定义"安全应用"列表

### 4. 可视化仪表盘
- 赛博朋克风格设计（深色背景+霓虹色点缀）
- 显示以下指标：
  * 安全指数（0-100%，进度条形式）
  * 今日累计运行时长
  * 检测到的监控程序列表
  * 行为模拟热力图
- 支持窗口置顶/取消置顶

### 5. 设置面板
- 可配置行为模拟的频率和强度
- 可添加/删除监控程序名单
- 可设置"安全应用"快捷方式
- 开机自启动选项

## 技术栈

- Electron 28+
- React 18 + TypeScript
- Tailwind CSS + Lucide图标库
- 支持Windows 10+和macOS 12+

## 项目结构

```
stealthbreak/
├── src/
│   ├── main/              # Electron主进程
│   │   ├── index.ts       # 主进程入口
│   │   ├── monitor.ts     # 进程监控
│   │   ├── screenSwitcher.ts # 智能切屏
│   │   └── preload.js     # 渲染进程预加载
│   ├── renderer/          # React前端
│   │   ├── components/    # 组件
│   │   ├── pages/         # 页面
│   │   └── App.tsx        # 应用入口
│   ├── core/              # 核心算法
│   │   ├── pathGenerator.ts # 路径生成器
│   │   └── behaviorEngine.ts # 行为引擎
│   └── types/             # TypeScript类型
├── assets/                # 资源文件
├── package.json           # 项目配置
└── electron-builder.json  # 打包配置
```

## 安装方法

### 开发环境

1. 克隆项目到本地
2. 安装依赖
   ```bash
   npm install
   ```
3. 启动开发服务器
   ```bash
   npm run dev
   ```
4. 启动Electron应用
   ```bash
   npm run electron:dev
   ```

### 生产环境

1. 构建应用
   ```bash
   npm run build
   ```
2. 打包应用
   ```bash
   npm run electron:build
   ```
3. 在`dist-electron`目录中找到生成的可执行文件

## 使用说明

1. **启动应用**：双击应用图标或从开始菜单启动StealthBreak
2. **系统托盘**：应用会在系统托盘中显示图标，右键点击可访问快捷菜单
3. **隐身模式**：点击系统托盘菜单中的"开启隐身模式"或主界面中的眼睛图标
4. **设置**：点击主界面中的设置图标，可配置行为模拟参数、监控程序和安全应用
5. **安全指数**：主界面会显示当前的安全指数，基于检测到的监控程序数量和行为模拟状态

## 注意事项

- 本应用仅用于保护员工的合理休息权利，请勿用于违反公司规定的行为
- 使用前请确保了解并遵守所在公司的相关政策
- 应用需要系统权限才能检测进程和模拟鼠标/键盘操作
- 首次启动时可能需要管理员权限

## 图标说明

应用需要以下图标文件，请添加到`assets`目录：
- `icon.ico` - Windows应用图标
- `icon.icns` - macOS应用图标
- `icon.png` - 系统托盘图标

## 许可证

MIT License