<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useFileStore } from '@/stores/fileStore'

const router = useRouter()
const route = useRoute()
const fileStore = useFileStore()

// 获取当前路由的 id 参数
const id = route.params.id

// 根据 id 获取对应的标题
const title = computed(() => {
  const file = fileStore.state.textPaths.find((item) => item.id === id)
  return file ? file.title : '标题未找到'
})

const onBack = () => {
  router.back()
}
</script>

<template>
  <div>
    <el-page-header @back="onBack">
      <template #breadcrumb>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">
            <span style="font-size: 23px; font-weight: 500">首页</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/talk' }">
            <span style="font-size: 23px; font-weight: 500"
              >杂谈</span
            ></el-breadcrumb-item
          >
          <el-breadcrumb-item>
            <span style="font-size: 23px; font-weight: 500">{{
              title
            }}</span></el-breadcrumb-item
          >
        </el-breadcrumb>
      </template>
      <template #icon>
        <el-icon><ArrowLeftBold /></el-icon>
      </template>
      <template #title>
        <span style="font-size: 20px; font-weight: 500">返回</span>
      </template>
      <!-- <template #content>
      </template> -->
    </el-page-header>
  </div>

  <div style="height: 30px"></div>

  <div class="container" ref="containerRef">
    <div class="main" ref="mainRef">
      <div class="left-panel">
        <!-- 左侧区域 -->
      </div>
      <div class="center-panel">
        <!-- 中间区域 -->
        <!-- <el-space :fill="fill" wrap> -->
        <div class="title" style="text-align: center">{{ title }}</div>
        <div class="text">
          <!-- 文本内容 -->
          <router-view :id="id" :linesPerPage="20"></router-view>
        </div>
        <!-- </el-space> -->
      </div>
      <div class="right-panel">
        <!-- 右侧内容 -->
      </div>
    </div>
    <!-- <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalPages"
        :page-size="1"
        style="justify-items: center"
      />
    </div> -->

    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<style scoped>
html {
  height: 100vh;
}

.container {
  display: flex;
  flex-direction: column;
}

.header {
  position: relative;
}

.main {
  display: flex;
  flex: 1;
}

.left-panel,
.center-panel,
.right-panel {
  padding: 10px;
}

.left-panel {
  width: 20%;
  background-color: #f5f5f5; /* 可根据需要更改背景颜色 */
}

.center-panel {
  width: 70%;
  height: 79vh; /* 高度为浏览器视口高度 */
  display: flex;
  justify-content: center; /* 使内容水平居中，可选 */
  flex-direction: column;
  align-items: center; /* 水平居中 */
}

.right-panel {
  width: 20%;
  background-color: #f5f5f5; /* 可根据需要更改背景颜色 */
}

.header + .main {
  margin-top: 20px; /* 根据需要调整间距 */
}

.space-container {
  width: 100%;
  box-sizing: border-box;
}

.text {
  width: 100%; /* 填满父容器的宽度 */
  height: 100%; /* 高度为父容器高度 */
  padding: 10px 20px; /* 内边距，确保文本不会紧贴边框 */
  background-color: #f9f9f9; /* 背景颜色 */
  box-sizing: border-box; /* 包含内边距和边框 */
  overflow: hidden; /* 超出部分隐藏 */
  display: flex;
  flex-direction: column;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px; /* Adjust the height as needed */
  width: 100%; /* Ensure it takes the full width of its parent */
}

.title {
  font-size: 25px;
  font-weight: bold;
}

.breadcrumb {
  font-size: 200px;
}

.el-page-header__title {
  font-size: 100px;
}
</style>
