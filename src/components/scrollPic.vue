<script setup lang="ts">
import { ref } from 'vue'

// 图片轮播素材
const photos = ref([
  { src: 'src/assets/scrollPic/1.png', id: '1' },
  { src: 'src/assets/scrollPic/2.jpg', id: '2' },
  { src: 'src/assets/scrollPic/3.jpg', id: '3' },
  { src: 'src/assets/scrollPic/4.png', id: '4' }
])
</script>

<template>
  <div class="carouselContainer">
    <!-- <el-affix target=".carouselContainer"> -->
    <div class="centerText">MoonLightStar</div>
    <el-carousel
      height="500px"
      :autoplay
      indicator-position="none"
      interval="6000"
    >
      <el-carousel-item v-for="(photo, index) in photos" :key="index">
        <img :src="photo.src" :alt="photo.alt" class="carousel-image" />
      </el-carousel-item>
    </el-carousel>
    <!-- </el-affix> -->
  </div>
</template>

<style scoped>
.carouselContainer {
  position: relative; /* 改为相对定位 */
  width: 100%;
  height: 500px; /* 走马灯容器高度 */
  margin-bottom: 20px; /* 确保与下方内容有间距 */
}
.el-carousel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.centerText {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white; /* 文字颜色 */
  font-size: 8vw; /* 使用vw单位调整字体大小 */
  font-family: 'Segoe Script', sans-serif; /* 字体家族 */
  font-weight: bold; /* 字体粗细 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 文字阴影 */
  z-index: 2;
  text-align: center;
}
</style>
