<script setup lang="ts">
import navBar from '../layout/navBar.vue'
import { useFileStore } from '@/stores/fileStore'
import { ref, onMounted } from 'vue'
import topIcon from '@/components/topIcon.vue'
import anchor3 from '@/components/anchorBar3.vue'
import { useRouter } from 'vue-router'

const fileStore = useFileStore()
const state = ref(fileStore.state)
const router = useRouter()
const ratio = ref(100)

onMounted(async () => {
  await fileStore.initializeTextFiles()
})

const navigateTo = (id: string) => {
  router.push({
    name: 'TalkProfile',
    params: { id: id },
    query: { page: 1 } // Default page number
  })
}
</script>

<template>
  <div class="container" ref="containerRef">
    <navBar></navBar>
    <div class="header">
      <div style="height: 60px"></div>
    </div>
    <div class="main" ref="mainRef">
      <div class="left-panel">
        <!-- 左侧区域 -->
        <el-affix target=".left-panel">
          <div style="height: 65px"></div>
          <!-- <el-anchor
            direction="vertical"
            :marker="true"
            :container="containerRef"
          >
            <el-anchor-link
              v-for="item in state.textPaths"
              :key="item.id"
              :href="`#${item.id}`"
            >
              {{ item.title }}
            </el-anchor-link>
          </el-anchor> -->
          <anchor3 :items="state.textPaths" target=".center-panel"></anchor3>
        </el-affix>
      </div>
      <div class="center-panel">
        <el-space
          direction="vertical"
          :size="12"
          wrap
          fill
          :fill-ratio="ratio"
          class="space-container"
        >
          <div v-for="item in state.textPaths" :key="item.id" :id="item.id">
            <el-divider class="card-divider"></el-divider>
            <el-card class="box-card" @click="navigateTo(item.id)">
              <template #header>
                <div class="card-header">
                  <span>{{ item.title }}</span>
                  <topIcon></topIcon>
                </div>
              </template>
              <div
                class="text item"
                style="
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                  -webkit-line-clamp: 10;
                "
              >
                <div v-if="item.text">{{ item.text }}</div>
              </div>
            </el-card>
          </div>
        </el-space>
      </div>
      <div class="right-panel">
        <!-- 右侧内容 -->
      </div>
    </div>
    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<style scoped>
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
  width: 60%;
  background-color: #ffffff; /* 可根据需要更改背景颜色 */
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
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

.box-card {
  width: 95%;
  box-sizing: border-box; /* 确保 padding 不影响宽度 */
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  margin: 0 auto;
}

.box-card:hover {
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
}

.text {
  color: #666;
  line-height: 1.5;
  font-size: 0.95em;
  margin: 10px 0;
}

.item:not(:last-child) {
  margin-bottom: 10px;
}

/* anchor锚点 */
.anchor-container {
  border-radius: 10px; /* 设置矩形圆角 */
  background-color: #f2f5f8; /* 设置背景颜色 */
  padding: 20px; /* 设置内边距 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  border: 1px solid #e0e6ed; /* 添加边框 */
}

.card-divider {
  margin: 15px;
  width: 95%;
}

.affix-container {
  text-align: center;
  height: 400px;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
}
</style>
