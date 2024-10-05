<template>
  <div class="text-container">
    <div class="text-content">
      <div v-for="(line, index) in textContent" :key="index">{{ line }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFileStore } from '@/stores/fileStore'

interface Props {
  id: string
}

const props = defineProps<Props>()

const fileStore = useFileStore()
const textContent = ref<string[]>([])

onMounted(async () => {
  const file = fileStore.state.textPaths.find(
    (pathObj) => pathObj.id === props.id
  )
  if (file && !file.text) {
    await fileStore.initializeTextFiles()
  }
  if (file && file.text) {
    textContent.value = file.text.split('\n') // 假设文本是按行分割的
  }
})
</script>

<style scoped>
.text-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}

.text-content {
  overflow-y: auto; /* 添加滚动条，确保内容超出时可以滚动查看 */
  padding: 1rem;
  line-height: 1.5rem; /* 固定行高，确保文本行数计算准确 */
  box-sizing: border-box; /* 确保 padding 不影响实际高度计算 */
}
</style>
