<script setup lang="ts">
import { ref } from 'vue'
import { useJSStore } from '@/stores/FrontEnd/JSStore'
import { ElMessage } from 'element-plus'

const jsstore = useJSStore()
const state = ref(jsstore.state)

const navigateTo = (url: string) => {
  window.open(url, '_blank')
}

const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      ElMessage({
        type: 'success',
        message: '复制成功'
      })
    })
    .catch((err) => {
      ElMessage({
        type: 'error',
        message: '复制失败'
      })
      console.log(err)
    })
}
</script>

<template>
  <el-space fill wrap style="width: 100%">
    <el-card v-for="item in state.link" :key="item.id" class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ item.title }}</span>
          <div class="button-group">
            <el-button type="primary" @click="navigateTo(item.net)"
              >点击跳转</el-button
            >
            <el-button
              class="button"
              type="primary"
              @click="copyToClipboard(item.net)"
              >复制链接</el-button
            >
          </div>
        </div>
      </template>
      <div class="text item">
        <el-tooltip effect="light" content="点击跳转" placement="bottom">
          <el-link :href="item.net" target="_blank">{{ item.net }}</el-link>
        </el-tooltip>
      </div>
    </el-card>
  </el-space>
</template>
