<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const activeIndex = ref('/')
const handleSelect = (index: string) => {
  activeIndex.value = index
}

const route = useRoute()
const router = useRouter()

const navigateTo = () => {
  router.push('/tool/css')
}

// Watch the route and update activeIndex accordingly
watch(
  () => route.path,
  (newPath) => {
    activeIndex.value = newPath
  },
  { immediate: true } // This will set the initial value on component mount
)
</script>

<template>
  <div class="navBar-container">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo fixed-header"
      mode="horizontal"
      router="true"
      @select="handleSelect"
      :ellipsis="false"
    >
      <el-menu-item index="/">
        <el-icon><House /></el-icon>首页
      </el-menu-item>
      <el-sub-menu @click="navigateTo">
        <template #title
          ><el-icon><MessageBox /></el-icon>工具箱</template
        >
        <el-sub-menu index="1">
          <template #title>前端工具</template>
          <el-menu-item index="/tool/css">css</el-menu-item>
          <el-menu-item index="/tool/vue">vue</el-menu-item>
          <el-menu-item index="/tool/react">react</el-menu-item>
          <el-menu-item index="/tool/js">js</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>后端工具</template>
          <!-- <el-menu-item index="/tool/css">css</el-menu-item>
          <el-menu-item index="/tool/vue">vue</el-menu-item>
          <el-menu-item index="/tool/react">react</el-menu-item>
          <el-menu-item index="/tool/js">js</el-menu-item> -->
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>文档工具</template>
          <!-- <el-menu-item index="/tool/css">css</el-menu-item>
          <el-menu-item index="/tool/vue">vue</el-menu-item>
          <el-menu-item index="/tool/react">react</el-menu-item>
          <el-menu-item index="/tool/js">js</el-menu-item> -->
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="/project"
        ><el-icon><Document /></el-icon>项目展示</el-menu-item
      >
      <el-menu-item index="/talk">
        <el-icon><Reading /></el-icon>杂谈</el-menu-item
      >
      <el-menu-item class="rightBtn" index="/start">
        <el-icon><Back /></el-icon>
        羽时
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped>
.rightBtn {
  margin-left: auto; /* 自动左边距，推到最右 */
}

.navBar-container {
  margin-bottom: 10px;
  position: fixed; /* 改为 fixed 位置 */
  top: 0; /* 距离顶部 */
  width: 100%; /* 宽度100% */
  background-color: #fff; /* 设置背景颜色 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  z-index: 1000; /* 确保在最上层 */
}

.fixed-header {
  position: fixed; /* 固定位置 */
  top: 0; /* 距离顶部距离 */
  width: 100%; /* 宽度100% */
  z-index: 1000; /* 设置 z-index */
}
</style>
