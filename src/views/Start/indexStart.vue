<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import BookMark from '@/components/bookMark/bookMarkList.vue'

// 动态导入图片
const images = import.meta.glob('@/assets/start/*', { eager: true })

// 提取图片路径
const imagePaths = Object.values(images).map((img: any) => img.default)

const rotateDegree = ref(0)
let clicked = false
let currentIndex = ref(0) // 当前图片索引

const currentImage = ref('') // 初始背景图片路径为空

onMounted(() => {
  // 在组件挂载后设置初始背景图片
  currentImage.value = imagePaths[currentIndex.value] // 设置初始背景图片为第一个图片路径
})

const handleClick = () => {
  if (!clicked) {
    // 第一次点击时触发
    rotateDegree.value += 180 // 每次点击增加180度
    currentIndex.value = (currentIndex.value + 1) % imagePaths.length // 更新索引，确保循环
    currentImage.value = imagePaths[currentIndex.value] // 更换背景图片
    clicked = true // 标记已点击过

    // 在一定时间后重置 clicked 标记
    setTimeout(() => {
      clicked = false
    }, 500) // 这里的5000表示5秒钟，你可以根据需求调整时间
  }
}

const showBtn = ref(false)
// 定时器
let timer: number

// 创建 refs 以分别存储时间、AM/PM和日期
const time = ref('')
const period = ref('')
const date = ref('')

// 定义一个更新时间的函数
const updateTime = () => {
  const now = new Date()
  time.value = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
    .format(now)
    .slice(0, -3) // 去掉最后的空格和AM/PM
  period.value = now.toLocaleTimeString('en-US', { hour12: true }).split(' ')[1] // 只获取AM/PM
  date.value = `${now.toLocaleDateString('en-US', { weekday: 'long' })} / ${now.toLocaleDateString('en-US', { month: 'short' })} / ${now.toLocaleDateString('en-US', { day: '2-digit' })} / ${now.toLocaleDateString('en-US', { year: 'numeric' })}` // 获取日期并格式化
}

onMounted(() => {
  startTimer()

  updateTime() // 立即调用一次，确保组件挂载时显示正确时间
  const intervalId = setInterval(updateTime, 60000) // 每分钟更新一次

  // 在组件卸载时，清除定时器
  onUnmounted(() => {
    clearInterval(intervalId)
  })
})

const startTimer = () => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    showBtn.value = false
  }, 5000)
}

const showBtnAgain = () => {
  showBtn.value = true
  startTimer()
}

const router = useRouter()
const onClick = () => {
  router.push('/')
}

// 抽屉
const drawer = ref(false)
const direction = ref('ltr')

// 抽屉按钮
const isHovered = ref(false)

const handleMouseMove = (event: MouseEvent) => {
  const threshold = window.innerWidth * 0.3
  if (event.clientX <= threshold) {
    isHovered.value = true
  } else {
    isHovered.value = false
  }
}

const handleDrawerButton = () => {
  drawer.value = true
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <div>
    <img class="background-image" :src="currentImage" alt="底层" />

    <div
      class="half-circle"
      :class="{ show: isHovered }"
      @click="handleDrawerButton()"
    >
      <el-icon size="52" color="#6a84e1" class="icon"
        ><ArrowRightBold
      /></el-icon>
    </div>
    <el-drawer
      v-model="drawer"
      title="I am the title"
      :direction="direction"
      :with-header="false"
    >
      <BookMark></BookMark>
    </el-drawer>

    <div class="icon-container" @click="handleClick()">
      <el-icon :size="38" color="#b7c2ec">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2em"
          height="2em"
          viewBox="0 0 500 500"
          :style="{ transform: `rotate(${rotateDegree}deg)` }"
        >
          <path
            fill="none"
            stroke="#ced7f5"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="38.9"
            d="M434.67 285.59v-29.8c0-98.73-80.24-178.79-179.2-178.79a179 179 0 0 0-140.14 67.36m-38.53 82v29.8C76.8 355 157 435 256 435a180.45 180.45 0 0 0 140-66.92"
          />
          <path
            fill="none"
            stroke="#ced7f5"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="38.9"
            d="m32 256l44-44l46 44m358 0l-44 44l-46-44"
          />
        </svg>
      </el-icon>
    </div>

    <div class="clock-container" @mousemove="showBtnAgain">
      <div class="time-container">
        <div class="time">{{ time }}</div>
        <div class="period">{{ period }}</div>
      </div>
      <div class="underline"></div>
      <div class="date">{{ date }}</div>
    </div>
    <transition name="fade">
      <div class="arrowbtn" v-show="showBtn">
        <el-button @click="onClick" type="primary" circle></el-button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.clock-container {
  position: fixed; /* 固定定位 */
  bottom: 35px; /* 距离底部20像素 */
  right: 25px; /* 距离右边20像素 */
  padding: 10px; /* 内边距 */
  border-radius: 5px; /* 圆角 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 盒子阴影 */
  z-index: 1000; /* 确保其在最上层 */
  text-align: center; /* 文本居中 */
  font-family: 'Arial', sans-serif;
  font-weight: bold;
}

.time-container {
  display: flex; /* 使用flex布局 */
  align-items: baseline; /* 基线对齐 */
}

.time {
  font-size: 7rem; /* 字体大小 */
  font-family: 'Arial', sans-serif; /* 字体 */
}

.period {
  font-size: 4rem; /* 字体大小 */
  font-family: 'Arial', sans-serif; /* 字体 */
  margin-left: 4px; /* 添加左边距，以便与时间部分有一些间距 */
}

.underline {
  border-bottom: 3px solid; /* 下划线 */
  margin: 0px 0 10px 0; /* 上下边距分别为5px和10px */
  width: 100%; /* 宽度100% */
}

.date {
  font-size: 1rem; /* 字体大小 */
  font-family: 'Arial', sans-serif; /* 字体 */
  text-align: right; /* 文字右对齐 */
}
.arrowbtn {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-button {
  height: 80px;
  width: 80px;
  position: center;
  /* flex: 1;
  display: flex;
  justify-content: center;
  align-items: center; */
}

/* 按钮渐变消失效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* 背景图 */
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1; /* 将图片置于底层 */
}

.icon-container {
  position: absolute;
  top: 25px; /* 距离页面上方50px */
  left: 25px; /* 距离页面左边50px */
  width: 40px; /* 调整容器宽度 */
  height: 40px; /* 调整容器高度 */
  border-radius: 50%; /* 圆形容器 */
  background-color: #f6f7fa; /* 背景颜色 */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.icon-container svg {
  transition: transform 0.4s ease; /* 缓慢旋转的过渡动画 */
}

.half-circle {
  position: fixed;
  top: 42%;
  left: 0;
  transform: translateY(-50%);
  width: 6vh; /* 半圆的宽度 */
  height: 12vh; /* 半圆的高度 */
  background-color: white; /* 半圆的背景颜色 */
  border-top-right-radius: 200px;
  border-bottom-right-radius: 200px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  transition: transform 0.3s ease;
  transform: translateX(-100%);
}

.half-circle.show {
  transform: translateX(0);
}

.icon {
  position: absolute;
  left: 0px; /* 距离左侧5px */
  top: 50%; /* 垂直居中 */
  transform: translateY(-50%);
}
</style>
