<template>
  <div class="container">
    <ul>
      <li v-for="(user, index) in users" :key="index">{{user.name}}</li>
    </ul>
  </div>
</template>

<script>
import { getUsers } from "../plugins/api.js";
export default {
  data() {
    return {
      users: []
    };
  },
  async mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.users = await getUsers();
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
