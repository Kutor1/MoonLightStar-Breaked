<template>
  <div class="anchor-container">
    <nav>
      <ul>
        <li
          v-for="item in items"
          :key="item.id"
          :class="{ active: activeAnchor === item.id }"
        >
          <a href="#" @click.prevent="scrollToSection(item.id)">
            {{ item.title }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, defineProps } from 'vue'

interface AnchorItem {
  id: string
  title: string
}

// 定义props，声明items属性为AnchorItem类型的数组
const props = defineProps<{
  items: AnchorItem[]
}>()

// 当前活动的锚点ID，初始为null
const activeAnchor = ref<string | null>(null)

// 滚动到指定ID的section
const scrollToSection = (id: string) => {
  const section = document.getElementById(id)
  if (section) {
    // 平滑滚动到section
    section.scrollIntoView({ behavior: 'smooth' })
    // 设置当前活动的锚点ID
    setActiveAnchor(id)
  }
}

// 设置当前活动的锚点ID
const setActiveAnchor = (id: string) => {
  activeAnchor.value = id
}

let observer: IntersectionObserver

// 处理IntersectionObserver的回调函数
const handleIntersect = (entries: IntersectionObserverEntry[]) => {
  // 存储所有可见的元素
  const visibleSections: { section: HTMLElement; rect: DOMRect }[] = []

  entries.forEach((entry) => {
    const section = entry.target as HTMLElement
    const rect = section.getBoundingClientRect()
    // 如果元素在视口中可见，添加到visibleSections中
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      visibleSections.push({ section, rect })
    }
  })

  // 按照元素在页面中的位置从上到下排序
  visibleSections.sort((a, b) => a.rect.top - b.rect.top)

  if (visibleSections.length > 0) {
    // 获取距离页面顶部最近的两个元素
    const firstVisible = visibleSections[0]
    const secondVisible = visibleSections[1]

    // 如果只有一个元素可见，直接设置为活动锚点
    if (!secondVisible) {
      setActiveAnchor(firstVisible.section.id)
    } else {
      // 如果上面的元素被遮住50%或更多，则高亮下方的元素，否则高亮上方的元素
      const firstVisibleHeight = firstVisible.rect.height
      const firstVisibleVisibleHeight =
        Math.min(window.innerHeight, firstVisible.rect.bottom) -
        Math.max(0, firstVisible.rect.top)
      const isFirstVisibleMoreThanHalf =
        firstVisibleVisibleHeight / firstVisibleHeight >= 0.5

      if (isFirstVisibleMoreThanHalf) {
        setActiveAnchor(firstVisible.section.id)
      } else {
        setActiveAnchor(secondVisible.section.id)
      }
    }
  }
}

// 组件挂载时触发的钩子函数
onMounted(() => {
  // 创建IntersectionObserver实例，监听元素的可见性变化
  observer = new IntersectionObserver(handleIntersect, {
    root: null, // 观察整个视口
    threshold: [0, 0.5, 1.0] // 当元素被遮挡50%和完全可见时触发
  })

  // 遍历props中的items，为每个元素添加观察
  props.items.forEach((item) => {
    const section = document.getElementById(item.id)
    if (section) {
      observer.observe(section)
    }
  })
})

// 组件卸载前触发的钩子函数
onBeforeUnmount(() => {
  if (observer) {
    // 断开IntersectionObserver的观察
    observer.disconnect()
  }
})
</script>

<style scoped>
.anchor-container {
  border-radius: 10px; /* 设置矩形圆角 */
  background-color: #f2f5f8; /* 设置背景颜色 */
  padding: 20px; /* 设置内边距 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  border: 1px solid #e0e6ed; /* 添加边框 */
}

.anchor-container ul {
  list-style-type: none;
  padding: 0;
}

.anchor-container li {
  margin: 5px 0;
}

.anchor-container li a {
  text-decoration: none;
  color: black;
}

.anchor-container li.active a {
  font-weight: bold;
  color: blue;
}
</style>
