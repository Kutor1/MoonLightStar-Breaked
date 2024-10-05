import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useJSStore = defineStore('js', () => {
  const state = ref({
    link: [
      {
        id: '1',
        net: '',
        title: ''
      }
    ]
  })

  return { state }
})
