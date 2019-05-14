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
          <v-btn @click="openModal">생성</v-btn>
          <v-select
            v-if="items.length > 0"
            v-model="order"
            @change="sortList"
            :items="['선택하세요', '내림차순', '오름차순']"
            label="정렬"
          ></v-select>
          <div style="height:80vh; overflow:scroll;">
            <v-card v-for="(item, index) in items" :key="index">
              <v-img :src="item.image_path" aspect-ratio="2.75"></v-img>

              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">{{item.name}}</h3>
                </div>
              </v-card-title>

              <v-card-actions>
                <v-btn flat color="orange" @click="openModal(item)">수정</v-btn>
                <v-btn flat color="orange" @click="removeItem(item.id)">삭제</v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">아이템 수정</v-card-title>
        <v-text-field label="이름" @input="editItem" :value="selectedItem.name"></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="closeModal">취소</v-btn>
          <v-btn color="green darken-1" flat @click="updateItem">수정</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import {
  addItem,
  getUsers,
  getItems,
  removeItem,
  updateItem
} from "../plugins/api.js";
export default {
  data() {
    return {
      currentUser: null,
      // selectedItem: {
      //   id: null,
      //   name: null,
      //   image_path: null
      // },
      dialog: false,
      users: [],
      items: [],
      order: null
    };
  },
  async mounted() {
    this.fetch();
  },
  computed: {
    selectedItem() {
      return this.$store.state.selectedItem;
    }
  },
  methods: {
    async fetch() {
      this.users = await getUsers();
    },
    async addItem(userId) {
      this.currentUser = userId;
      this.items = await addItem(this.currentUser, this.selectedItem);
    },
    async getItems(userId) {
      this.currentUser = userId;
      this.items = await getItems(userId);
    },
    async removeItem(id) {
      await removeItem(this.currentUser, id);
      this.items = await getItems(this.currentUser);
    },
    async updateItem() {
      await updateItem(this.currentUser, this.selectedItem);
      this.items = await getItems(this.currentUser);
      this.closeModal();
    },
    editItem(name) {
      const { id, image_path } = this.selectedItem;
      this.$store.commit("setItem", {
        id,
        name,
        image_path
      });
    },
    openModal(item) {
      this.$store.commit("setItem", item);
      this.dialog = true;
    },
    closeModal() {
      this.dialog = false;
      this.$store.commit("resetItem");
    },
    sortList() {
      switch (this.order) {
        case "오름차순":
          this.items = this.items.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
          );
          break;

        case "내림차순":
          this.items = this.items.sort((a, b) =>
            a.name < b.name ? 1 : b.name < a.name ? -1 : 0
          );
          break;

        default:
          break;
      }
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
