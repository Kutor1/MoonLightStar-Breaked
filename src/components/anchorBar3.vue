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
// 存储上一次检测到的最顶部完全可见的元素
let previousTopmostVisibleItem: HTMLElement | null = null

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
  // 最顶部可见的section
  let topmostVisibleItem: HTMLElement | null = null

  // 遍历所有观察的元素的IntersectionObserverEntry
  for (const entry of entries) {
    const section = entry.target as HTMLElement
    // 获取元素的顶部可见比例
    const topVisibleRatio = entry.intersectionRatio

    // 如果顶部部分可见
    if (topVisibleRatio > 0) {
      // 如果是第一个顶部可见的元素或者比当前记录的元素更靠近顶部
      if (
        !topmostVisibleItem ||
        section.getBoundingClientRect().top <
          topmostVisibleItem.getBoundingClientRect().top
      ) {
        // 更新为当前最顶部可见的元素
        topmostVisibleItem = section
      }
    }
  }

  // 比较新的topmostVisibleItem与之前的previousTopmostVisibleItem
  if (previousTopmostVisibleItem) {
    const rect = previousTopmostVisibleItem.getBoundingClientRect()
    const isVisible90Percent =
      rect.top >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) * 0.9
    console.log(previousTopmostVisibleItem)
    console.log(top)
    if (isVisible90Percent) {
      previousTopmostVisibleItem = topmostVisibleItem
    }
  }

  if (topmostVisibleItem && topmostVisibleItem !== previousTopmostVisibleItem) {
    // 更新previousTopmostVisibleItem
    previousTopmostVisibleItem = topmostVisibleItem
    // 设置当前活动的锚点ID
    setActiveAnchor(topmostVisibleItem.id)
  }
}

// 组件挂载时触发的钩子函数
onMounted(() => {
  // 创建IntersectionObserver实例，监听元素的可见性变化
  observer = new IntersectionObserver(handleIntersect, {
    root: null, // 观察整个视口
    threshold: 0.9 // 当元素部分或完全可见时触发
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
