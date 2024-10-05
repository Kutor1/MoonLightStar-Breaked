import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCSSStore = defineStore('fd', () => {
  const state = ref({
    link: [
      {
        id: '1',
        net: 'https://css.bqrdh.com/animate',
        title: 'CSS可视化动画'
      },
      {
        id: '2',
        net: 'https://haikei.app/',
        title: 'SVG生成'
      },
      {
        id: '3',
        net: 'https://cssgrid-generator.netlify.app',
        title: 'Grid网格生成器'
      },
      {
        id: '4',
        net: 'https://web.dev/patterns/layout',
        title: 'LayoutPattern布局工具'
      },
      {
        id: '5',
        net: 'https://www.transition.style',
        title: 'TransitionStyle过渡动画'
      },
      {
        id: '6',
        net: 'https://cssgradient.io',
        title: 'Gradient渐变色'
      },
      {
        id: '7',
        net: 'https://mybrandnewlogo.com/color-palette-generator',
        title: '调色板生成'
      }
    ]
  })

  return { state }
})
