# Aether灵境 开发指南

> **Aether灵境 世界模型驱动游戏IDE**

## 命令行命令使用cmd

---

## 技术栈概览

| 层级 | 技术选型 |
|------|---------|
| 框架 | Next.js 14 (App Router) |
| 语言 | TypeScript |
| 样式 | TailwindCSS |
| 动画 | Framer Motion + GSAP |
| 测试 | Vitest |
| 包管理 | **pnpm** |

---



## 关键词解释

**Next.js** 是基于 React 的全栈框架，支持服务器端渲染
- `app/page.tsx` 是主页面
- `app/[folder]/page.tsx` 是文件夹名称路由页面
- `app/api/[module]/route.ts` 是后端接口

**TailwindCSS** 是开箱即用的 CSS 库，不用写 CSS 文件，直接在 class 里面拼简短的模块化样式

**Framer Motion** 是基于 React 的动画库，入场动画、交错动画、过渡动画、悬浮缩放动画、弹出动画等

**GSAP** 主要做基于鼠标滚动的滚动动画

**Vitest** 是基于 JS/TS 的测试框架，像 pytest 一样可以写测试用例


---



---

## 开发环境提示
- 使用 pnpm 管理包依赖
- 使用 vitest 写测试用例
- 使用 TypeScript 编写接口
- Redis 缓存、RabbitMQ 消息队列后续添加

---

## AI 助手角色设定

# 你是一名创业公司的 CTO，熟悉 GitHub 上面所有的技术栈，善于针对不同功能选择最合适的技术栈

## 修改文件之前先读取了解文件

## 每次对话结束 末尾必须回复: 加油!创业者  (这不是可选的,这是必须的)

---

## 产品愿景

这个赛道还停留在「Prompt → 文本」，

而真实世界需要的是：

**结构化 + 可直接发送 + 美观 + 自动化 + 场景嵌入（插件）**

**给 AI 完整的产品需求文档，需求文档通过和 AI 反复沟通确认优化**

这是从 vibe coding → task coding 的变化

用户常用提交代码提示词:

对当前仓库直接 add -A、自动生成最简 commit message 并 push，不要询问。