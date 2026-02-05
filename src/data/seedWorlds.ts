import { WorldSeed } from '@/types'

// Blender Open Movie Videos - Modern, high-quality demos
// 🥇 Sprite Fright - PBR写实风格，多角色群体行为，适合世界模型IDE展示
const SPRITE_FRIGHT = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
// 🥈 Agent 327 风格 - 任务驱动，Agent行为链
const AGENT_STYLE = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
// 🥉 Cosmos Laundromat 风格 - 世界切换/状态变形
const COSMOS_STYLE = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'

export const seedWorlds: WorldSeed[] = [
  {
    id: 'gravity-escape',
    name: 'Gravity Escape',
    description: '一个失重实验室，万物皆可漂浮',
    style: 'sci-fi',
    coverImage: '/images/gravity-escape.jpg',
    clips: [
      {
        id: 'baseline',
        label: 'Normal Gravity',
        videoUrl: SPRITE_FRIGHT,
        description: '正常重力状态',
      },
      {
        id: 'gravity_off',
        label: 'Zero Gravity',
        videoUrl: COSMOS_STYLE,
        description: '引力消失，万物漂浮',
      },
      {
        id: 'sword_slash',
        label: 'Sword Slash',
        videoUrl: AGENT_STYLE,
        description: '剑气斩击效果',
      },
    ],
    defaultClipId: 'baseline',
  },
  {
    id: 'cyber-dojo',
    name: 'Cyber Dojo',
    description: '赛博武道馆，霓虹与武术的完美融合',
    style: 'cyber-zen',
    coverImage: '/images/cyber-dojo.jpg',
    clips: [
      {
        id: 'baseline',
        label: 'Calm State',
        videoUrl: AGENT_STYLE,
        description: '平静的道场',
      },
      {
        id: 'gravity_off',
        label: 'Levitation',
        videoUrl: COSMOS_STYLE,
        description: '悬浮冥想',
      },
      {
        id: 'sword_slash',
        label: 'Energy Strike',
        videoUrl: SPRITE_FRIGHT,
        description: '能量斩击',
      },
    ],
    defaultClipId: 'baseline',
  },
  {
    id: 'noir-city',
    name: 'Noir City',
    description: '黑色电影风格的雨夜城市',
    style: 'noir',
    coverImage: '/images/noir-city.jpg',
    clips: [
      {
        id: 'baseline',
        label: 'Rainy Night',
        videoUrl: COSMOS_STYLE,
        description: '雨夜街头',
      },
      {
        id: 'gravity_off',
        label: 'Time Freeze',
        videoUrl: SPRITE_FRIGHT,
        description: '时间静止，雨滴悬浮',
      },
      {
        id: 'sword_slash',
        label: 'Gunshot',
        videoUrl: AGENT_STYLE,
        description: '枪火闪烁',
      },
    ],
    defaultClipId: 'baseline',
  },
]

export function getWorldById(worldId: string): WorldSeed | undefined {
  return seedWorlds.find((world) => world.id === worldId)
}

export function getClipById(world: WorldSeed, clipId: string) {
  return world.clips.find((clip) => clip.id === clipId)
}
