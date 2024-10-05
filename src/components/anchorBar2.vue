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
import { ref, onMounted, onBeforeUnmount } from 'vue'

interface AnchorItem {
  id: string
  title: string
}

const props = defineProps<{
  items: AnchorItem[]
}>()

const activeAnchor = ref('')

const scrollToSection = (id: string) => {
  const section = document.getElementById(id)
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
    setActiveAnchor(id)
  }
}

const setActiveAnchor = (id: string) => {
  activeAnchor.value = id
}

let observer: IntersectionObserver

const handleIntersect = (entries: IntersectionObserverEntry[]) => {
  let topmostFullyVisibleItem = null

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]
    const section = entry.target as HTMLElement

    // Check if the entire section is visible
    const isFullyVisible =
      entry.intersectionRatio === 1 &&
      entry.intersectionRect.height === section.getBoundingClientRect().height

    // Find the topmost fully visible element
    if (isFullyVisible) {
      if (
        !topmostFullyVisibleItem ||
        section.getBoundingClientRect().top <
          topmostFullyVisibleItem.getBoundingClientRect().top
      ) {
        topmostFullyVisibleItem = section
      }
    }
  }

  if (topmostFullyVisibleItem) {
    setActiveAnchor(topmostFullyVisibleItem.id)
  }
}

onMounted(() => {
  observer = new IntersectionObserver(handleIntersect, {
    root: null, // 观察整个视口
    threshold: 1.0 // 当元素完全可见时触发
  })
  props.items.forEach((item) => {
    const section = document.getElementById(item.id)
    if (section) {
      observer.observe(section)
    }
  })
})

onBeforeUnmount(() => {
  if (observer) {
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
