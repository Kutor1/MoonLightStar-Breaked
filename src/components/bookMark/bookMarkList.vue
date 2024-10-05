<template>
  <div class="bookmark-list">
    <div class="bookmark-list-header">
      <h2>Bookmarks</h2>
      <button @click="addBookmark" class="add-button">Add Bookmark</button>
    </div>
    <div class="bookmarks">
      <Bookmark
        v-for="bookmark in bookmarks"
        :key="bookmark.id"
        :icon="bookmark.icon"
        :title="bookmark.title"
        :url="bookmark.url"
        :id="bookmark.id"
        @remove="removeBookmark"
        @edit="editBookmark"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Bookmark from '@/components/bookMark/bookMark.vue'

const bookmarks = ref([
  {
    id: 1,
    icon: 'https://example.com/icon1.png',
    title: 'Bookmark 1',
    url: 'https://example.com'
  },
  {
    id: 2,
    icon: 'https://example.com/icon2.png',
    title: 'Bookmark 2',
    url: 'https://example.com'
  }
])

const addBookmark = () => {
  const newId = bookmarks.value.length
    ? bookmarks.value[bookmarks.value.length - 1].id + 1
    : 1
  bookmarks.value.push({
    id: newId,
    icon: 'https://example.com/icon3.png', // Replace with appropriate icon URL
    title: `Bookmark ${newId}`,
    url: 'https://example.com'
  })
}

const removeBookmark = (id: number) => {
  bookmarks.value = bookmarks.value.filter((bookmark) => bookmark.id !== id)
}

const editBookmark = ({
  id,
  title,
  url
}: {
  id: number
  title: string
  url: string
}) => {
  const bookmark = bookmarks.value.find((b) => b.id === id)
  if (bookmark) {
    bookmark.title = title
    bookmark.url = url
  }
}
</script>

<style scoped>
.bookmark-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.bookmark-list-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
}

.add-button {
  padding: 5px 10px;
  border: none;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}

.bookmarks {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  max-width: 600px;
}
</style>
