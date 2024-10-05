<template>
  <div class="bookmark" @click="openUrl">
    <img :src="icon" alt="Bookmark Icon" class="bookmark-icon" />
    <div class="bookmark-title">{{ title }}</div>
    <div class="dropdown-container">
      <el-dropdown @command="handleCommand" class="el-dropdown-link">
        <div class="circle-container">
          <span @click.stop>
            <el-icon><More /></el-icon>
          </span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="edit">修改书签信息</el-dropdown-item>
            <el-dropdown-item command="remove">移除</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <el-dialog
      v-model="dialogVisible"
      title="修改书签信息"
      @close="dialogVisible = false"
    >
      <el-form :model="editForm">
        <el-form-item label="名称">
          <el-input v-model="editForm.title"></el-input>
        </el-form-item>
        <el-form-item label="网站地址">
          <el-input v-model="editForm.url"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="cancelEdit">取消</el-button>
        <el-button type="primary" @click="saveEdit">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/dialog/style/css'
import 'element-plus/es/components/form/style/css'
import 'element-plus/es/components/input/style/css'
import 'element-plus/es/components/dropdown/style/css'
import 'element-plus/es/components/icon/style/css'
import { More } from '@element-plus/icons-vue'

const props = defineProps({
  icon: String,
  title: String,
  url: String,
  id: Number
})

const emits = defineEmits(['remove', 'edit'])

const dialogVisible = ref(false)
const editForm = ref({
  title: props.title,
  url: props.url
})

const handleCommand = (command: string) => {
  if (command === 'edit') {
    dialogVisible.value = true
  } else if (command === 'remove') {
    emits('remove', props.id)
  }
}

const saveEdit = (e: Event) => {
  e.stopPropagation()
  emits('edit', {
    id: props.id,
    title: editForm.value.title,
    url: editForm.value.url
  })
  dialogVisible.value = false
}

const cancelEdit = (e: Event) => {
  e.stopPropagation()
  dialogVisible.value = false
}

const openUrl = (e: Event) => {
  if (
    !dialogVisible.value &&
    !(e.target as HTMLElement).closest('.el-dropdown-link')
  ) {
    window.open(props.url, '_blank')
  }
}
</script>

<style scoped>
.bookmark {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  padding: 10px;
  margin: 5px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  cursor: pointer;
}

.bookmark-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 10px;
}

.bookmark-title {
  font-size: 14px;
  text-align: center;
}

.dropdown-container {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-dropdown-link {
  cursor: pointer;
}

.circle-container {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  width: 24px;
  height: 24px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.dropdown-container:hover .circle-container {
  opacity: 1;
}
</style>
