<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  src: {
    required: true,
    type: String
  }
})
</script>

<template>
  <div class="Pic">
    <img class="background" :src="src" alt="gzucm" />
  </div>
</template>

<style scoped>
.Pic {
  position: relative;
  width: 100%;
  height: 100%;
}

.background {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-size: cover;
}
</style>
