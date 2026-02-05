import { WorldSeed } from '@/types'

// 本地视频 - Project Genie 无限交互世界演示
const LOCAL_VIDEO = '/video/infinite_interactive_world.mp4'

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
        videoUrl: LOCAL_VIDEO,
        description: '正常重力状态',
      },
      {
        id: 'gravity_off',
        label: 'Zero Gravity',
        videoUrl: LOCAL_VIDEO,
        description: '引力消失，万物漂浮',
      },
      {
        id: 'sword_slash',
        label: 'Sword Slash',
        videoUrl: LOCAL_VIDEO,
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
        videoUrl: LOCAL_VIDEO,
        description: '平静的道场',
      },
      {
        id: 'gravity_off',
        label: 'Levitation',
        videoUrl: LOCAL_VIDEO,
        description: '悬浮冥想',
      },
      {
        id: 'sword_slash',
        label: 'Energy Strike',
        videoUrl: LOCAL_VIDEO,
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
        videoUrl: LOCAL_VIDEO,
        description: '雨夜街头',
      },
      {
        id: 'gravity_off',
        label: 'Time Freeze',
        videoUrl: LOCAL_VIDEO,
        description: '时间静止，雨滴悬浮',
      },
      {
        id: 'sword_slash',
        label: 'Gunshot',
        videoUrl: LOCAL_VIDEO,
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
