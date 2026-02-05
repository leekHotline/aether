// 预设世界数据
export interface WorldSphere {
  id: string
  name: string
  description: string
  primaryColor: string
  secondaryColor: string
  size: number
  position: [number, number, number]
  rotationSpeed: number
  isMain: boolean
  tags: string[]
  stats: {
    mass: string
    objects: number
    anchors: number
  }
}

export const PRESET_WORLDS: WorldSphere[] = [
  {
    id: 'dream-nexus',
    name: '梦境枢纽',
    description: '多元宇宙的中心节点，连接所有平行世界',
    primaryColor: '#6366F1',
    secondaryColor: '#EC4899',
    size: 1.0,
    position: [0, 0, 0],
    rotationSpeed: 0.002,
    isMain: true,
    tags: ['核心', '枢纽', '无限'],
    stats: { mass: '∞', objects: 999, anchors: 42 },
  },
  {
    id: 'gravity-escape',
    name: '重力逃逸',
    description: '失重世界，万物漂浮于虚空之中',
    primaryColor: '#6366F1',
    secondaryColor: '#3B82F6',
    size: 0.65,
    position: [-2.5, 1.2, -1],
    rotationSpeed: 0.003,
    isMain: false,
    tags: ['失重', '漂浮', '轨道失稳'],
    stats: { mass: '0.0g', objects: 12, anchors: 3 },
  },
  {
    id: 'time-loop',
    name: '时间回环',
    description: '时间规则重写，过去与未来交织',
    primaryColor: '#8B5CF6',
    secondaryColor: '#A855F7',
    size: 0.55,
    position: [2.2, 0.8, -0.5],
    rotationSpeed: 0.004,
    isMain: false,
    tags: ['回溯', '循环', '永恒'],
    stats: { mass: '1.2t', objects: 8, anchors: 5 },
  },
  {
    id: 'crystal-realm',
    name: '晶体领域',
    description: '万物皆由晶体构成的奇幻世界',
    primaryColor: '#EC4899',
    secondaryColor: '#F472B6',
    size: 0.5,
    position: [-1.8, -1.5, 0.5],
    rotationSpeed: 0.0025,
    isMain: false,
    tags: ['晶体', '折射', '永恒'],
    stats: { mass: '4.7t', objects: 24, anchors: 7 },
  },
  {
    id: 'force-storm',
    name: '力量风暴',
    description: '力学极限的世界，暴风肆虐',
    primaryColor: '#F59E0B',
    secondaryColor: '#FBBF24',
    size: 0.45,
    position: [2.8, -1.0, 0.8],
    rotationSpeed: 0.005,
    isMain: false,
    tags: ['力场', '风暴', '混沌'],
    stats: { mass: '9.8N', objects: 16, anchors: 4 },
  },
  {
    id: 'void-ocean',
    name: '虚空之海',
    description: '黑暗深渊中的宁静海洋',
    primaryColor: '#06B6D4',
    secondaryColor: '#22D3EE',
    size: 0.4,
    position: [0.5, 2.0, -1.5],
    rotationSpeed: 0.002,
    isMain: false,
    tags: ['深渊', '静谧', '未知'],
    stats: { mass: '???', objects: 6, anchors: 2 },
  },
]
