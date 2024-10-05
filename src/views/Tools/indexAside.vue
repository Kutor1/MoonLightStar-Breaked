<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const activeIndex = ref('/tool')
const route = useRoute()
watch(
  () => route.path,
  (newPath) => {
    activeIndex.value = newPath
  },
  { immediate: true } // This will set the initial value on component mount
)
</script>

<template>
  <el-menu
    :default-openeds="['1', '3']"
    router="true"
    :default-active="activeIndex"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><Crop /></el-icon>
        前端工具
      </template>
      <el-menu-item index="/tool/css">CSS</el-menu-item>
      <el-menu-item index="/tool/vue">Vue</el-menu-item>
      <el-menu-item index="/tool/react">React</el-menu-item>
      <el-menu-item index="/tool/js">JavaScript</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><Files /></el-icon>
        后端工具
      </template>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon><Document /></el-icon>
        文档工具
      </template>
      <!-- <el-menu-item index="1-1">CSS</el-menu-item>
      <el-menu-item index="1-2">Vue</el-menu-item>
      <el-menu-item index="1-3">React</el-menu-item>
      <el-menu-item index="1-4">JavaScript</el-menu-item> -->
    </el-sub-menu>
  </el-menu>
</template>

<style scoped>
.el-menu--vertical {
  width: 100%;
  min-height: 85vh;
}
</style>
