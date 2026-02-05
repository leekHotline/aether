# 多元宇宙星球系统 PRD

> **Multiverse Sphere System** - Three.js 3D 星球展示组件

---

## 1. 产品概述

### 1.1 目标
将首页右侧区域重构为 **3D 多元宇宙星球场景**，用玻璃质感的星球群展示「世界模型 IDE」的核心概念——每个星球代表用户创建的一个游戏世界。

### 1.2 核心价值
- **视觉冲击**：Three.js 真实 3D 渲染，区别于普通 2D 页面
- **主题契合**：多元宇宙概念完美匹配「世界模型」产品定位
- **交互沉浸**：拖拽、悬停、点击形成完整交互闭环

---

## 2. 功能需求

### 2.1 星球渲染

| 特性 | 描述 |
|------|------|
| 数量 | 5-8 个星球 |
| 大小 | 1 个主星球（居中/偏大），其余随机 0.4x-0.8x |
| 材质 | 玻璃质感（MeshPhysicalMaterial + transmission） |
| 纹理 | 程序生成抽象渐变星系（Shader/Canvas） |
| 动画 | 星球自转 + 内部星系旋转 |

### 2.2 星球数据结构

```typescript
interface WorldSphere {
  id: string
  name: string           // 世界名称
  description: string    // 世界描述
  primaryColor: string   // 主色调 hex
  secondaryColor: string // 副色调 hex
  size: number           // 相对大小 0.4-1.0
  position: [x, y, z]    // 3D 位置
  rotationSpeed: number  // 自转速度
  isMain: boolean        // 是否主星球
}
```

### 2.3 预设世界节点

| ID | 名称 | 描述 | 色彩 |
|----|------|------|------|
| gravity-escape | 重力逃逸 | 失重世界，万物漂浮 | 靛蓝 #6366F1 |
| time-loop | 时间回环 | 时间规则重写 | 紫色 #8B5CF6 |
| crystal-realm | 晶体领域 | 材质世界 | 粉色 #EC4899 |
| force-storm | 力量风暴 | 力学极限 | 琥珀 #F59E0B |
| void-ocean | 虚空之海 | 黑暗深渊 | 青色 #06B6D4 |
| dream-nexus | 梦境枢纽 | 主星球 | 渐变多色 |

### 2.4 交互行为

#### 鼠标悬停
- 星球放大 1.15x（Tween 动画）
- 外发光增强（emissive intensity +50%）
- 自转速度加快 2x
- 显示星球名称 Tooltip

#### 点击星球
- 触发 Ripple 波纹扩散
- 弹出毛玻璃 3D 卡片：
  - 世界名称 + 图标
  - 世界描述
  - 规则标签（失重/漂浮/轨道失稳）
  - 数据指标（ΔMass / Objects / Anchors）
  - 「进入世界」按钮

#### 拖拽旋转
- OrbitControls 支持
- 限制垂直角度 -45° ~ +45°
- 水平 360° 自由旋转
- 惯性阻尼 0.05

### 2.5 视觉效果

#### 玻璃材质参数
```javascript
{
  transmission: 0.9,      // 透射率
  thickness: 0.5,         // 厚度
  roughness: 0.1,         // 粗糙度
  metalness: 0,           // 金属感
  ior: 1.5,               // 折射率
  envMapIntensity: 1.0,   // 环境贴图强度
  clearcoat: 1.0,         // 清漆层
  clearcoatRoughness: 0.1
}
```

#### 星系纹理生成（Shader）
- 使用 GLSL Fragment Shader
- 基于 Simplex Noise 生成旋涡
- 叠加径向渐变
- 时间参数驱动旋转动画

#### 光照
- 主光源：DirectionalLight (0xffffff, 1.0)
- 环境光：AmbientLight (0x404040, 0.5)
- 辉光：UnrealBloomPass (threshold: 0.8, strength: 0.5)

### 2.6 性能优化

- LOD 距离衰减（远处星球降低细分）
- 使用 InstancedMesh 批量渲染小星球
- requestAnimationFrame 节流
- `prefers-reduced-motion` 禁用动画
- 移动端降级为静态图片

---

## 3. 里程碑计划

### M0: 环境搭建 (0.5h)
- [x] 安装 three.js 依赖
- [x] 安装 @react-three/fiber + @react-three/drei
- [x] 创建基础 Canvas 容器

### M1: 基础场景 (1h)
- [ ] 创建 Scene + Camera + Renderer
- [ ] 添加 OrbitControls
- [ ] 搭建基础光照系统
- [ ] 创建单个测试球体

### M2: 玻璃材质 (1h)
- [ ] 实现 MeshPhysicalMaterial 玻璃效果
- [ ] 添加环境贴图（HDR/EXR）
- [ ] 调试透射/折射参数

### M3: 星系纹理 (1.5h)
- [ ] 编写 GLSL 星系 Shader
- [ ] 实现 Simplex Noise 旋涡
- [ ] 添加时间驱动旋转动画
- [ ] 支持自定义颜色参数

### M4: 多星球布局 (1h)
- [ ] 创建 6 个预设世界数据
- [ ] 实现球体位置/大小分布算法
- [ ] 主星球居中放大
- [ ] 添加自转动画

### M5: 交互系统 (1.5h)
- [ ] Raycaster 鼠标拾取
- [ ] 悬停放大 + 发光效果
- [ ] 点击事件分发
- [ ] Tooltip 名称显示

### M6: 详情卡片 (1h)
- [ ] 创建毛玻璃 3D 卡片组件
- [ ] CSS3D + Framer Motion 动画
- [ ] 卡片内容布局
- [ ] 「进入世界」按钮

### M7: 后处理 (0.5h)
- [ ] 添加 UnrealBloomPass 辉光
- [ ] 添加 FXAA 抗锯齿
- [ ] 背景星空粒子

### M8: 性能 & 适配 (0.5h)
- [ ] 移动端降级处理
- [ ] prefers-reduced-motion
- [ ] 内存泄漏检查

### M9: 集成测试 (0.5h)
- [ ] 替换首页组件
- [ ] 跨浏览器测试
- [ ] 性能 Lighthouse 检测

---

## 4. 技术栈

| 库 | 版本 | 用途 |
|----|------|------|
| three | ^0.160.0 | 3D 渲染引擎 |
| @react-three/fiber | ^8.15.0 | React Three.js 绑定 |
| @react-three/drei | ^9.92.0 | 常用 3D 组件 |
| @react-three/postprocessing | ^2.15.0 | 后处理效果 |
| simplex-noise | ^4.0.1 | 噪声生成 |

---

## 5. 文件结构

```
src/components/multiverse-3d/
├── MultiverseCanvas.tsx      # 主 Canvas 容器
├── GlassSphere.tsx           # 单个玻璃星球
├── GalaxyShader.tsx          # 星系 Shader 材质
├── WorldCard.tsx             # 毛玻璃详情卡片
├── StarField.tsx             # 背景星空
├── useMultiverseStore.ts     # Zustand 状态管理
├── constants.ts              # 预设世界数据
└── shaders/
    └── galaxy.glsl           # 星系着色器
```

---

## 6. 验收标准

- [ ] 6 个玻璃星球正常渲染
- [ ] 主星球居中且明显更大
- [ ] 玻璃折射效果真实
- [ ] 星球内部星系旋转动画流畅
- [ ] 悬停放大 + 发光正常
- [ ] 点击弹出毛玻璃卡片
- [ ] 拖拽旋转视角流畅
- [ ] 移动端降级不报错
- [ ] Lighthouse Performance > 80

---

**预计总耗时：8-9 小时**
