import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useFileStore = defineStore('file', () => {
  const state = reactive({
    textPaths: [
      {
        id: '1',
        title: '岳阳楼记',
        path: 'src/stores/text/1.txt',
        text: '',
        loading: false
      },
      {
        id: '2',
        title: '桃花源记',
        path: 'src/stores/text/2.txt',
        text: '',
        loading: false
      },
      {
        id: '3',
        title: '醉翁亭记',
        path: 'src/stores/text/3.txt',
        text: '',
        loading: false
      },
      {
        id: '4',
        title: '赤壁赋',
        path: 'src/stores/text/4.txt',
        text: '',
        loading: false
      }
    ]
  })

  const fetchTextFile = async (path: string): Promise<string> => {
    try {
      // const response = await fetch(path)
      const response = await fetch(`/${path}`)
      if (!response.ok) {
        throw new Error('Failed to fetch')
      }
      return await response.text()
    } catch (error) {
      console.error('Error fetching text file:', error)
      return ''
    }
  }

  const initializeTextFiles = async () => {
    console.log('Initializing text files...')
    for (const pathObj of state.textPaths) {
      console.log(`Fetching text file from ${pathObj.path}`)
      pathObj.loading = true // 开始加载
      pathObj.text = await fetchTextFile(pathObj.path)
      console.log(`Text file from ${pathObj.path} loaded:`, pathObj.text)
      pathObj.loading = false // 加载完成
    }
    console.log('Text files initialization completed.')
  }

  return { state, fetchTextFile, initializeTextFiles }
})
