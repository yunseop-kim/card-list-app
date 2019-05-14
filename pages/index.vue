<template>
  <v-app id="inspire">
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap fill-height>
        <v-flex xs6>
          <v-list>
            <v-list-tile v-for="(user, index) in users" :key="index">
              <v-list-tile-content>
                <v-list-tile-title>{{user.name}}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn color="info" @click="getItems(user.id)">보기</v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-flex>
        <v-flex>
          <!-- <v-list>
            <v-list-tile v-for="(item, index) in items" :key="index">
              <v-list-tile-content>
                <v-list-tile-title>{{item.name}}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <div>
                  <v-btn color="info">수정</v-btn>
                  <v-btn color="info">삭제</v-btn>
                </div>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>-->
          <v-card v-for="(item, index) in items" :key="index">
            <v-img :src="item.image_path" aspect-ratio="2.75"></v-img>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{item.name}}</h3>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn flat color="orange">수정</v-btn>
              <v-btn flat color="orange" @click="removeItem(currentUser, item.id)">삭제</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { getUsers, getItems, removeItem } from "../plugins/api.js";
export default {
  data() {
    return {
      currentUser: null,
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
      this.currentUser = userId;
      this.items = await getItems(userId);
    },
    async removeItem(userId, id){
      await removeItem(userId, id)
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
