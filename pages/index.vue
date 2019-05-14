<template>
  <div class="container">
    <ul>
      <li v-for="(user, index) in users" :key="index" @click="getItems(user.id)">{{user.name}}</li>
    </ul>
    <ul>
      <li v-for="(item, index) in items" :key="index">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
import { getUsers, getItems } from "../plugins/api.js";
export default {
  data() {
    return {
      users: [],
      items: []
    };
  },
  async mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.users = await getUsers();
    },
    async getItems(userId) {
      this.items = await getItems(userId);
    }
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title {
  display: block;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 42px;
}
</style>
