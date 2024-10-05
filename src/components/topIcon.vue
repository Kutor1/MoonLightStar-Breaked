<template>
  <!-- 置顶图标 -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    class="topIcon"
    fill="currentColor"
  >
    <!-- 丝带底座 -->
    <path d="M5 22l7-6 7 6V2H5z"></path>
    <!-- 向上的箭头 -->
    <path d="M12 14V6"></path>
    <polyline points="9 10 12 6 15 10"></polyline>
  </svg>
</template>

<style scoped>
/* 置顶图标样式 */
.topIcon {
  width: 30px; /* 可根据需要调整图标的大小 */
  height: 30px;
  fill: #6a84e1; /* 填充图标的颜色 */
}
</style>
