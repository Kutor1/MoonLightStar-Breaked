<script setup lang="ts"></script>

<template>
  <!-- <img src="@/assets/scrollPic/1.png" alt="Avatar" class="avatar" /> -->
  <div class="profile-card">
    <img src="@/assets/Profile/avatar.png" alt="Avatar" class="avatar" />
    <div class="bio">
      <h3>Hana</h3>
      <!-- 介绍 -->
      <p></p>
    </div>
  </div>
</template>

<style scoped>
.profile-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 12px;
  text-align: center;
  max-width: 300px;
  margin: 0 auto;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
  border: 4px solid #eee;
}

.bio {
  margin-top: 10px;
}

.bio h3 {
  margin: 0;
  font-size: 1.75em;
  color: #333;
}

.bio p {
  margin: 10px 0 0;
  color: #666;
  font-size: 0.95em;
  line-height: 1.5;
}
</style>
