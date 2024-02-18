<script setup>
import { usePostListStore } from "../store";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";

const store = usePostListStore();
const { postsCompleted, postsNotCompleted, isLoading } = storeToRefs(store);

onMounted(() => {
  store.fetchPosts();
});

const input_title = ref("");
const createPostAndClear = () => {
  if (input_title.value.length === 0) {
    return;
  }
  store.createPost(input_title.value);
  input_title.value = "";
};
</script>

<template>
  <div>
    <button @click="store.fetchPosts" type="text" placeholder="Get posts">
      Get Posts
    </button>
    <form @submit.prevent="createPostAndClear">
      <input
        id="title"
        v-model="input_title"
        type="text"
        class="txtb"
        placeholder="Add a post"
      />
    </form>
    <div class="notcomp">
      <h3>Not Completed</h3>
    </div>
    <p v-if="isLoading">Loading...</p>
    <div v-for="p in postsNotCompleted" :key="p._id">
      <div class="task">
        <h2>{{ p.title }}</h2>
        <img src="../assets/img/delete.png" @click="store.deletePost(p._id)" />
        <img src="../assets/img/completed.png" @click="store.updateStatus(p)" />
      </div>
    </div>
    <div class="comp">
      <h3>Completed</h3>
    </div>
    <p v-if="isLoading">Loading...</p>
    <div v-for="p in postsCompleted" :key="p._id">
      <div class="task">
        <h2>{{ p.title }}</h2>
        <img src="../assets/img/delete.png" @click="store.deletePost(p._id)" />
        <img src="../assets/img/completed.png" @click="store.updateStatus(p)" />
      </div>
    </div>
  </div>
</template>
