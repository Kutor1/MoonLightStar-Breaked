<script setup lang="ts">
import navBar from '@/views/layout/navBar.vue'
import Aside from './indexAside.vue'
</script>

<template>
  <div class="container" ref="containerRef">
    <navBar></navBar>
    <div class="main" ref="mainRef">
      <div class="left-panel">
        <!-- 左侧区域 -->
        <el-affix target=".left-panel">
          <div style="height: 65px"></div>
          <Aside></Aside>
        </el-affix>
      </div>
      <div class="center-panel">
        <div style="height: 60px"></div>
        <router-view></router-view>
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

.main {
  display: flex;
  flex: 1;
}

.left-panel,
.center-panel {
  padding: 10px;
}

.left-panel {
  width: 15%;
  background-color: #f5f5f5; /* 可根据需要更改背景颜色 */
}

.center-panel {
  width: 85%;
  background-color: #ffffff; /* 可根据需要更改背景颜色 */
  overflow-y: auto;
  overflow-x: hidden;
  flex-direction: column;
}
</style>
