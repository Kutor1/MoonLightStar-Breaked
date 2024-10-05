<script setup lang="ts"></script>

<template>
  <div class="card">
    <div class="card-header">
      <slot name="header"></slot>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.card-header {
  padding: 18px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-around;
}

.card-body {
  padding: 16px;
}
</style>
