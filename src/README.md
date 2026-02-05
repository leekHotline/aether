# Aether

世界模型驱动的游戏 IDE

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 运行测试
pnpm test

# 构建生产版本
pnpm build
```

## 路由

- `/` - Landing 页面
- `/worlds` - 种子世界列表
- `/editor/[worldId]` - 叙事编辑器（核心页面）
- `/world/[shareId]` - 分享/播放页面
- `/docs` - 文档页面

## 技术栈

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Framer Motion
- Monaco Editor
- Vitest

## 核心功能

1. **叙事编辑器** - 用自然语言描述意图
2. **世界预览** - 无缝切换的视频片段
3. **意图编译** - 关键词映射到世界状态
4. **时间线** - 版本化回放历史
5. **分享** - 生成可分享链接

## 开发

使用 pnpm 管理依赖：

```bash
pnpm install
pnpm dev
```
