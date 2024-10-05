import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home/indexHome.vue'
import Tool from '@/views/Tools/indexToolLayout.vue'
import Project from '@/views/Project/indexProject.vue'
import Talk from '@/views/Talk/indexTalk.vue'
import Start from '@/views/Start/indexStart.vue'
import Profile from '@/views/Talk/indexArticleProfile.vue'

import CSS from '@/views/Tools/toolDetail/FrontEnd/CSS.vue'
import JS from '@/views/Tools/toolDetail/FrontEnd/JS.vue'
import VUE from '@/views/Tools/toolDetail/FrontEnd/VUE.vue'
import REACT from '@/views/Tools/toolDetail/FrontEnd/REACT.vue'

import TalkProfile from '@/views/Talk/indexArticleProfile.vue'
import Content from '@/views/Talk/contentProfile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/tool',
      component: Tool,
      children: [
        {
          path: '/tool/css',
          component: CSS
        },
        {
          path: '/tool/vue',
          component: VUE
        },
        {
          path: '/tool/react',
          component: REACT
        },
        {
          path: '/tool/js',
          component: JS
        }
      ]
    },
    {
      path: '/talk',
      component: Talk
    },
    {
      path: '/article',
      component: TalkProfile,
      children: [
        {
          path: ':id',
          name: 'TalkProfile',
          component: Content,
          props: (route) => ({
            id: route.params.id,
            page: parseInt(route.query.page as string) || 1
          })
        }
      ]
    },
    {
      path: '/profile',
      component: Profile
    },
    {
      path: '/project',
      component: Project
    },
    {
      path: '/start',
      component: Start
    }
  ]
})

export default router
