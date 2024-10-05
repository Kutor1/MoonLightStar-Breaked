<!-- 已弃用 -->
<script setup>
import { ref, onUnmounted } from 'vue'

const visible = ref(false)
let scrollbarRef = null

const checkVisibility = () => {
  if (scrollbarRef) {
    visible.value = scrollbarRef.wrapRef.scrollTop > 200
  }
}

const smoothScrollToTop = () => {
  if (scrollbarRef) {
    const currentScrollPosition = scrollbarRef.wrapRef.scrollTop
    const duration = 500 // 滚动时长
    const startTime = performance.now()
    const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t) // 缓动函数
    const scrollStep = (timestamp) => {
      const elapsedTime = timestamp - startTime
      scrollbarRef.wrapRef.scrollTo(
        0,
        easeInOutQuad(elapsedTime / duration) * currentScrollPosition
      )
      if (elapsedTime < duration) {
        requestAnimationFrame(scrollStep)
      }
    }
    requestAnimationFrame(scrollStep)
  }
}

const setScrollbarRef = (ref) => {
  scrollbarRef = ref
  if (scrollbarRef) {
    scrollbarRef.wrapRef.addEventListener('scroll', checkVisibility)
    checkVisibility() // 初始化时检查是否需要显示
  }
}

onUnmounted(() => {
  if (scrollbarRef) {
    scrollbarRef.wrapRef.removeEventListener('scroll', checkVisibility)
  }
})

// 暴露方法给父组件
defineExpose({ setScrollbarRef })
</script>

<template>
  <div v-show="visible" class="back-to-top" @click="smoothScrollToTop">
    <slot>
      <!-- 默认按钮样式，如果没有提供插槽内容 -->
      <div class="default-button">
        <el-icon size="45" class="icon"><CaretTop /></el-icon>
      </div>
    </slot>
  </div>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  right: 80px;
  bottom: 70px;
  cursor: pointer;
  z-index: 1000;
}

.default-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 60px;
  background-color: #f2f5f8;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  text-align: center;
  line-height: 40px;
  color: #1989fa;
  border-radius: 20%; /* 圆角 */
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
