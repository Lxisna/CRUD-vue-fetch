import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const usePostListStore = defineStore("PostList", () => {
  let posts = ref([]);
  let isLoading = false;

  const postsCompleted = computed(() =>
    posts.value.filter((object) => object.completed)
  );
  const postsNotCompleted = computed(() =>
    posts.value.filter((object) => !object.completed)
  );

  const targetUrl = "https://crudcrud.com/api/5ea5eb8dabc048ed8351287cb67e1c62";

  async function fetchPosts() {
    isLoading = true;
    let res = await fetch(`${targetUrl}/todos`);
    let data = await res.json();
    posts.value = data;
    isLoading = false;
  }

  function deletePost(id) {
    fetch(`${targetUrl}/todos/${id}`, {
      method: "DELETE",
    }); //这里是已经找到了要删除的ID，然后再有接下去的处理

    posts.value = posts.value.filter((object) => object._id != id);
  }

  function updateStatus(post) {
    const updatedPost = {
      ...post,
      completed: !post.completed,
    };
    const { _id, ...updatedPostWithoutId } = updatedPost;

    fetch(`${targetUrl}/todos/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...updatedPostWithoutId,
      }),
    }); //先处理完要修改的信息，再下面去更新

    posts.value = posts.value.map((object) => {
      if (object._id == _id) {
        return updatedPost;
      } else {
        return object;
      }
    });
  }

  async function createPost(title) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    };
    const res = await fetch(`${targetUrl}/todos`, requestOptions);
    const postData = await res.json(); //这里返回来的data是已经添加了新title的单个post

    posts.value.push(postData);
  }

  return {
    posts,
    postsCompleted,
    postsNotCompleted,
    fetchPosts,
    deletePost,
    updateStatus,
    createPost,
  };
});
