<template>
  <div class="row">
    <div id="container" class="col-md-12">
      <div id="info-box">
        <div class="col-md-6">
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >선택하세요</button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <button
                class="dropdown-item"
                href="#"
                v-for="(item, index) in ['내림차순', '오름차순']"
                :key="index"
              >{{item}}</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div id="user-list" class="col-md-6">
          <ul class="list-group">
            <li
              class="list-group-item justify-content-between align-items-center"
              v-for="(user, index) in users"
              :class="{active: user.id == currentUser.id}"
              :key="index"
              @click="getItems(user)"
            >
              <span>{{user.name}}</span>
              <div style="display: flex; justify-content: flex-end">
                <button class="btn btn-success" @click="openModal(null, 'add')" data-toggle="modal">생성</button>
              </div>
            </li>
          </ul>
        </div>
        <div id="card-list" class="col-md-6" style="height:100vh; overflow:scroll;">
          <card
            v-for="(item, index) in items"
            :key="index"
            :name="item.name"
            :path="item.image_path"
            @modify="openModal(item)"
            @remove="removeItem(item)"
          />
        </div>
      </div>
    </div>

    <modal v-if="dialog" @close="closeModal">
      <h3 slot="header">
        <h5 class="modal-title">아이템 {{isAddMode ? '생성': '수정'}}</h5>
      </h3>
      <div slot="body">
        <div class="form-group">
          <label for="name">이름</label>
          <input class="form-control" type="text" name="name" id="name" v-model="itemInput.name">
        </div>
        <div class="form-group">
          <label for="path">경로</label>
          <input
            class="form-control"
            type="text"
            name="path"
            id="path"
            placeholder="경로"
            v-model="itemInput.image_path"
          >
        </div>
      </div>
      <div slot="footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeModal">취소</button>
        <button type="button" class="btn btn-primary" v-if="isAddMode" @click="addItem">생성</button>
        <button type="button" class="btn btn-primary" v-if="isEditMode" @click="updateItem">수정</button>
      </div>
    </modal>
  </div>
</template>

<script>
import {
  addItem,
  getUsers,
  getItems,
  removeItem,
  updateItem
} from "../plugins/api.js";
import Modal from "../components/Modal";
import Card from "../components/Card";

export default {
  components: {
    Modal, Card
  },
  data() {
    return {
      currentUser: {
        id: null,
        name: null
      },
      dialog: false,
      dialogMode: "",
      users: [],
      items: [],
      order: null,
      itemInput: {
        id: null,
        name: null,
        image_path: null
      }
    };
  },
  async mounted() {
    this.fetch();
  },
  computed: {
    selectedItem() {
      return this.$store.state.selectedItem;
    },
    isAddMode() {
      return this.dialogMode == "add";
    },
    isEditMode() {
      return this.dialogMode == "edit";
    }
  },
  methods: {
    async fetch() {
      this.users = await getUsers();
    },
    async addItem() {
      this.items = await addItem(this.currentUser.id, this.itemInput);
      await this.getItems(this.currentUser);
      this.closeModal();
    },
    async getItems(user) {
      this.currentUser = user;
      this.items = await getItems(this.currentUser.id);
    },
    async removeItem(item) {
      console.log(item);
      await removeItem(this.currentUser.id, item.id);
      await this.getItems(this.currentUser);
    },
    async updateItem() {
      await updateItem(this.currentUser.id, this.itemInput);
      await this.getItems(this.currentUser);
      this.closeModal();
    },
    openModal(item, mode = "edit") {
      switch (mode) {
        case "add":
          this.$store.commit("resetItem", item);
          break;
        case "edit":
        default:
          this.$store.commit("setItem", item);
          break;
      }
      const { id, name, image_path } = this.selectedItem;
      this.itemInput = { id, name, image_path };
      this.dialogMode = mode;
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
