<script setup lang="ts">
import navBar from '@/views/layout/navBar.vue'
</script>

<template>
  <div class="container">
    <navBar></navBar>
    <div>
      <div style="height: 60px"></div>
      <img src="@/assets/gzucm.jpg" alt="123" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-rows: auto auto;
  row-gap: 20px; /* 设置行间距 */
}
</style>
