
---

# Aether Web MVP（Next.js）— Agent 执行清单

## M0 — 项目骨架与约束（必须先完成）

**交付物**

* ✅ Next.js 14 App Router + TypeScript 项目可启动
* ✅ TailwindCSS 已接入
* ✅ pnpm lockfile 存在
* ✅ ESLint/Prettier（可选，但建议有）
* ✅ Vitest 可运行（至少 1 个 smoke test）

**验收**

* `pnpm dev` 正常启动
* `pnpm test` 通过
* `pnpm build` 通过

---

## M1 — 路由与页面壳（平台骨架）

**必须实现的路由**

* `/` Landing
* `/worlds` Launcher
* `/editor/[worldId]` Editor（核心页）
* `/world/[shareId]` Share/Play

**交付物**

* ✅ App Router 页面文件已存在，均可访问
* ✅ 全站统一 Layout（Header/Sidebar 或 TopNav）
* ✅ 全站 Design Tokens（颜色/圆角/阴影/字体）统一（Tailwind config 或 CSS variables）

**验收**

* 任意路由无 404
* 页面切换无 layout 抖动（基础体验）

---

## M2 — Seed 数据与类型（可驱动 UI）

**交付物**

* ✅ `WorldSeed` 类型定义
* ✅ `EditorSession` 类型定义
* ✅ `seedWorlds.ts`（至少 3 个 world）
* ✅ 每个 world 至少 3 个 clips：`baseline` / `gravity_off` / `sword_slash`
* ✅ 每个 clip 有 `videoUrl`（可以先用占位 mp4 或同一个 mp4）

**验收**

* `/worlds` 能渲染出至少 3 张世界卡片
* 点击卡片能跳到对应 `/editor/[worldId]`

---

## M3 — World Preview 播放器（“连续变化”的关键组件）

> 这是 MVP 的灵魂：**无刷新切段**。

**交付物**

* ✅ `WorldPreviewPlayer` 组件：

  * 输入：`clips`, `activeClipId`
  * 支持：clip 切换时 crossfade（双 video 叠层）
  * 支持：切换时 subtle zoom（可选）
* ✅ `useClipSwap()` hook（管理前后两个 video、淡入淡出状态）

**验收**

* Editor 页触发 clip 切换时：

  * 不 reload、不闪白
  * 视觉连续（crossfade 明显可见）

---

## M4 — Narrative Editor（Monaco + Apply Intent）

**交付物**

* ✅ Monaco Editor 接入（或 CodeMirror，Monaco 优先）
* ✅ 顶部工具条：

  * World 名称
  * 状态：`Mock/Connected`（先 mock）
  * 延迟显示（mock 值也行）
  * Share 按钮
* ✅ 输入与触发：

  * `Cmd/Ctrl+Enter` 执行 Apply Intent
  * `Apply Intent` 按钮
* ✅ intent 应用后必须触发：

  * clip 切换（调用 M3）
  * timeline 追加记录（调用 M5）

**验收**

* 在 Editor 输入包含关键字的一段文本（如“引力消失了”）
* 点击 Apply 后右侧立即切到 `gravity_off` clip（连续变化）

---

## M5 — Intent Compiler（确定性关键词映射，禁止大模型依赖）

**交付物**

* ✅ `compileIntent(text) -> { clipId, anchorsUpdated, intentLabel }`
* ✅ 关键词规则（中英）：

  * gravity / 引力 / 失重 / 重力 → `gravity_off`
  * sword / 长剑 / 剑气 / 斩击 → `sword_slash`
  * 默认 → `baseline`
* ✅ 单元测试（Vitest）覆盖：

  * gravity case
  * sword case
  * default case

**验收**

* `pnpm test` 通过
* 关键词命中率：输入含关键词必定触发对应 clip

---

## M6 — Timeline（版本化回放，展示“编译器”概念）

**交付物**

* ✅ `IntentTimeline` 组件：

  * 展示：`v{n} · {intentLabel} · {clipLabel}`
  * 支持：点击条目回放（设置 activeClipId）
* ✅ timeline 数据结构（来自 EditorSession）
* ✅ timeline 插入动画（Framer Motion）

**验收**

* 至少能生成 3 条 timeline
* 点击任意一条可回放到对应 clip（连续变化）

---

## M7 — 视觉符号：Ripple + Anchor HUD（让人“信你在编译”）

> 这两项是“投资人脑内补全”的关键。

**交付物**

* ✅ `IntentRipple`：

  * Apply Intent 时播放 1 次 ripple（CSS/Canvas 都行）
* ✅ `AnchorHUD`：

  * 当 intent 命中 gravity/sword 时，在右侧预览叠加 1–3 个点位
  * 显示文本：`Anchor: GravityField` / `Anchor: WeaponImpulse`

**验收**

* Apply Intent 时必定出现 ripple
* 命中关键词时必定出现 anchor HUD

---

## M8 — Launcher 交互（平台感）

**交付物**

* ✅ `WorldCard`：

  * hover 视差（Framer Motion）
  * hover 播放封面预览（可选）
* ✅ filter/search UI（可假，但必须存在）
* ✅ 进入视口 stagger 动画

**验收**

* `/worlds` 看起来像“平台”，不是列表页
* hover 交互明显、不卡

---

## M9 — Share/Play（可传播链接）

**交付物**

* ✅ Share 创建逻辑：

  * 从 EditorSession 生成 `shareId`
  * 写入 `localStorage`（MVP）
  * 复制链接按钮
* ✅ `/world/[shareId]` 页面：

  * 播放最终 clip（或可切 timeline）
  * 展示 Story 摘要（关键句）

**验收**

* Editor 点击 Share → 能拿到可打开链接
* 无登录状态打开 `/world/[shareId]` 正常播放

---

## M10 — Landing 动效（只做一个“炸点”）

> 不要做一堆。只要一个：**滚动驱动“重力场变化”**。

**交付物**

* ✅ GSAP ScrollTrigger：滚动时控制右侧预览从 baseline → gravity_off 的过渡（可以用 opacity + transform + text overlay）
* ✅ keywords hover ripple（可选）

**验收**

* 进入 Landing 滚动时，能明显看到“世界状态”在变化（不是图文滚动）

---

## M11 — 生产化最低要求（Vercel 可上线）

**交付物**

* ✅ `pnpm build` 通过
* ✅ 静态资源（mp4）可正常加载（public/ 或远程）
* ✅ 基础错误边界（Editor 页异常不白屏）
* ✅ 最低埋点接口（console log 也行，后续换 PostHog）

**验收**

* Vercel Production 部署成功
* 访问 4 个核心路由无报错

---

# 全局约束（Agent 必须遵守）

1. **核心优先级**：Editor（M3~M7）> Worlds（M8）> Share（M9）> Landing（M10）
2. “世界变化”必须是 **连续**（crossfade），禁止刷新页面或重挂载整个 Preview
3. 所有“未实现后端”部分必须有明确 mock（状态标记为 Mock）
4. 组件必须可复用、类型必须完整（TS 类型先行）
5. 禁止引入重量级依赖（除 Monaco/GSAP/Framer）

---

# 最小录屏验收脚本（最终必须能录出来）

* 打开 `/editor/gravity-escape`
* 输入：“突然，引力消失了……”
* `Cmd+Enter`
* 右侧连续切到失重片段 + ripple + anchor HUD
* timeline 出现 v2，点击 v1/v2 回放
* 点 Share，打开新链接能播放

---




# PRD：Aether Web MVP（Next.js + Vercel）

## 0. 目标与边界

### 0.1 目标（MVP必须达成）

1. 让人 30 秒内明白：**写文本 → 世界改变（哪怕是伪实时）**
2. 让人感觉：这是一个**平台**，不是一个 demo 页面
3. 录屏出来像“硅谷产品”，有**新鲜交互**（Framer + GSAP）

### 0.2 非目标（这阶段不做）

* 真世界模型推理服务（先用 mock 视频/帧流占位）
* 账号体系/付费/多人协作
* 完整内容审核/版权系统

---

## 1. 用户与核心任务

### 1.1 目标用户

* 独立开发者（会写点代码但讨厌引擎管线）
* 小说作者/叙事创作者（不会写代码）
* 投资人/合伙人（要被“看见未来”）

### 1.2 核心任务（MVP用户路径）

**Landing → Launcher（种子世界）→ Editor（写一句话）→ 右侧世界变化 → 分享链接**

---

## 2. 信息架构与路由（App Router）

### 2.1 路由清单

* `/` Landing（产品叙事 + CTA）
* `/worlds` Launcher（种子世界列表）
* `/editor/[worldId]` Narrative Editor（核心）
* `/world/[shareId]` Play / Share（可公开观看的录屏/伪交互页面）
* `/physics` Physics Hub（壁垒叙事，占位）
* `/community` Community Feed（裂变入口，占位）
* `/docs`（可选）概念与FAQ（投资人常问）

> MVP 最小：`/` + `/worlds` + `/editor/[worldId]` + `/world/[shareId]`

---

## 3. 关键页面需求

## 3.1 Landing（/）

### 目标

* 10 秒内讲清定位：**Write → World Reacts**
* 让人愿意点进 Editor

### 版式结构（建议）

1. Hero：标题 + 副标题 + CTA（进入 Worlds / 打开 Demo）
2. “范式转移”三连卡片：脚本世界 vs 计算世界（对比视觉）
3. 30 秒 Demo GIF/视频（自动播放、静音）
4. 可信背书区：Roadmap / Milestones / “Latency < 800ms (目标)”（注意写目标，不要写已达成）
5. Footer：社交/邮件/加入等

### 创新交互（必须）

* **滚动驱动的“世界切换”**：随着滚动，右侧预览从“正常重力”平滑过渡到“失重漂浮”（用 GSAP ScrollTrigger）
* 鼠标悬浮在关键词（gravity / sword / floating）上时，右侧预览出现**“latent ripple”**波纹效果（Canvas/Shader占位也行）

---

## 3.2 Launcher（/worlds）

### 目标

* “平台感”：像 Steam/Itch 的种子世界列表
* 引导进 Editor

### 功能

* 种子世界卡片（3-5 个）

  * 标题 / 风格 / 一句话玩法 / 预览视频封面
* 搜索框（可假）
* Filter（风格：Cyber Zen / Noir / Cartoon / Sci-fi）
* CTA：Open in Editor

### 创新交互（必须）

* 卡片 hover：预览视频**局部放大+视差**（Framer Motion）
* 卡片进入视口：**交错动画**（stagger）

---

## 3.3 Narrative Editor（/editor/[worldId]）【核心】

### 核心目标

让用户感到：**“我写一句话，世界就变了，而且不是重新加载。”**

### 页面布局（Dual-Brain）

* 左：Monaco Editor（叙事文本）
* 右：World Preview（视频/帧流/Canvas）
* 顶部工具条：World名、状态（Connected/Mock）、延迟指标（mock也行）、Share按钮
* 底部：快捷意图按钮（Gravity Off / Time Slow / Summon Sword）

### 核心交互流程（MVP）

1. 默认载入 world seed（一个初始视频段）
2. 用户在左侧输入一段文本
3. 按 `Cmd+Enter` 或点击 “Apply Intent”
4. 右侧预览**无缝切段**到“变化后的片段”（伪实时：从视频 A crossfade 到视频 B）
5. 右侧浮层显示：`Intent compiled → 3 anchors updated`（强化“编译器”概念）
6. Timeline 出现一条记录：`v3: Gravity=0`，可回放

> 你现在做不到真推理没关系：
> **只要“输入→右侧变化”是连续的，就能骗过人的大脑**。

### 创新交互（必须）

* “Intent Ripple”：点击 Apply 后，右侧画面出现“潜空间波纹”扩散（视觉符号）
* “Anchor Highlight”：文本里出现关键词时（gravity/sword/float），左侧高亮，右侧出现对应 HUD 点（Logic Anchor）

---

## 3.4 Share / Play（/world/[shareId]）

### 目标

* 让别人“点开就能看见”
* 分享到社交媒体像产品，不像视频

### 功能

* 顶部：World 标题、作者（匿名也行）、按钮：Remix / Open in Editor
* 中间：预览播放器（自动播放）
* 下方：Intent Timeline（v1/v2/v3）点击会跳转到对应片段
* 右侧：Prompt/Story 摘要（只显示关键句）

---

## 3.5 Physics Hub（/physics）【占位但要“像真的”】【重要】

### 目标

让投资人看到“护城河的接口已经存在”

### 内容结构

* 物理资产卡片：

  * “Inertia Profile: Heavy Hammer”
  * “Zero-G Field”
  * “Fluid Drag v0.2”
* 每张卡：来源（Robot Capture / Sim / Hybrid）、稳定性等级（Alpha/Beta）
* CTA：Request Access（弹窗收邮箱）

---

## 3.6 Community Feed（/community）【占位但要能裂变】

* 世界短视频瀑布流（mock）
* “Remix”按钮
* 排行榜（Today / Week）

---

## 4. 数据与状态（MVP可用最小模型）

### 4.1 World（种子世界）

```ts
type WorldSeed = {
  id: string
  name: string
  style: "cyber-zen" | "noir" | "toon" | "scifi"
  tagline: string
  coverUrl: string
  clips: Array<{
    clipId: string
    label: string // "baseline" | "gravity_off" | "sword_slash"
    videoUrl: string
    anchorsDelta: Record<string, any> // mock
  }>
}
```

### 4.2 Session（编辑器会话）

```ts
type EditorSession = {
  sessionId: string
  worldId: string
  storyText: string
  timeline: Array<{
    version: number
    intentText: string
    clipId: string
    createdAt: number
  }>
}
```

> MVP 存储建议：
> **先用本地 localStorage + share 时生成 shareId**
> 真要持久化再接 Supabase。

---

## 5. 技术实现要求（前端）

### 5.1 技术栈（你已确认）

* Next.js 14 App Router + TS
* TailwindCSS
* Framer Motion + GSAP(ScrollTrigger)
* Vitest（至少测 util 和 intent parser）
* pnpm
* Vercel 部署

### 5.2 必须实现的组件

* `WorldCard`
* `WorldPreviewPlayer`（支持 clip 切换、crossfade）
* `NarrativeEditor`（Monaco + highlight）
* `IntentTimeline`
* `AnchorHUD`（右侧叠加点位）
* `ShareDialog`

### 5.3 Intent Compiler（MVP版）

不是 NLP 大模型——先做 deterministic parser：

* 从文本里抓关键词：

  * gravity / 引力 / 失重
  * sword / 长剑 / 剑气
  * float / 漂浮
* 映射到 clip label：

  * gravity_off → clipId = `gravity_off`
  * sword_slash → clipId = `sword_slash`

**验收标准：**写出关键词就能触发对应世界变化。

---

## 6. 动效规范（你要“令人眼前一新”）

### 6.1 动效原则

* 所有动效服务于一个目标：**“世界被计算”**
* 避免花哨的无意义动画

### 6.2 必做动效清单

* Landing：滚动驱动“重力场”变化
* Launcher：卡片视差/预览播放
* Editor：

  * Apply Intent → Ripple（波纹）
  * Clip 切换 → Crossfade + subtle zoom
  * Timeline 插入 → 从右滑入、数字跳动

---

## 7. 埋点与指标（MVP也要有）

### 7.1 关键事件

* `landing_cta_click`
* `world_open_editor`
* `intent_apply`
* `share_create`
* `share_open`
* `remix_click`

### 7.2 目标指标（15天）

* 录屏 demo 完整播放率 > 60%
* Editor 意图触发成功率 > 90%
* 分享页打开率（由你渠道决定）

---

## 8. 验收标准（Definition of Done）

### 必须通过（不然别发）

* `/worlds` → `/editor/[id]` 全链路可用
* Editor 输入一段文字 → **右侧画面连续变化**（无刷新）
* Timeline 可回放至少 3 次变化
* Share 生成链接可在无登录状态打开
* Vercel 部署无 500 错误、移动端基本可用

### 加分项

* Anchor HUD 与文本高亮联动
* 右侧预览在弱网/低性能设备上也不卡死（降级成静态图）

---

## 9. 里程碑（15天拆解）

### Day 1–2：框架 + 路由 + 视觉基调

* 完成 Landing / Worlds / Editor 页面骨架
* 定好 design tokens（颜色、圆角、阴影、字体）

### Day 3–5：Editor 核心交互跑通

* Monaco + 预览播放器 + crossfade
* Intent parser（关键词触发 clip）

### Day 6–8：平台感

* Launcher 卡片动效
* Share 页面 + shareId
* Physics/Community 占位页

### Day 9–12：打磨“惊艳感”

* Ripple + Anchor HUD
* ScrollTrigger Landing
* 录屏脚本排练

### Day 13–15：上线 + 录屏 + Pitch

* Vercel Production
* 录屏 30 秒 / 60 秒版
* 配套一页 pitch 文案

---

## 10. 风险与应对（你现在就会踩）

### 风险 1：世界模型服务不可用

**应对：**先做 clip mock + 伪实时切段（PRD 已设计）

### 风险 2：动效过重导致卡

**应对：**给低端设备降级：去掉 shader，仅保留淡入淡出

### 风险 3：概念太大，用户看不懂

**应对：**把 Editor 的主按钮命名为：**Apply Intent**（不是 Generate）

---

