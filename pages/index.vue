<template>
  <div class="row" style="margin: 20px;">
    <div id="container" class="col-md-12">
      <div class="row">
        <div id="user-list" class="col-md-6" style="height:80vh; overflow:scroll;">
          <h3>유저 목록</h3>
          <ul class="list-group">
            <li
              class="list-group-item justify-content-between align-items-center"
              v-for="(user, index) in users"
              :class="{active: user.id == currentUser.id}"
              :key="index"
              @click="selectUser(user)"
            >
              <span>{{user.name}}</span>
              <div style="display: flex; justify-content: flex-end">
                <button
                  class="btn btn-success"
                  @click="openModal(null, 'add')"
                  data-toggle="modal"
                >생성</button>
              </div>
            </li>
          </ul>
        </div>
        <div id="card-list" class="col-md-6">
          <div class="col-md-6">
            <h3>아이템 목록</h3>
            <div style="position: relative; margin-bottom: 10px;">
              <label style="display: inline; margin-right: 10px;">정렬</label>
              <div class="dropdown" style="display: inline;">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >{{(order && order.value) ? order.key : '선택하세요'}}</button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <button
                    class="dropdown-item"
                    href="#"
                    v-for="(item, index) in ordering"
                    :key="index"
                    @click="sortList(item)"
                  >{{item.key}}</button>
                </div>
              </div>
            </div>
          </div>
          <div style="height:80vh; overflow:scroll;">
            <div v-if="items.length === 0">아이템이 없습니다!</div>
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
    </div>

    <modal v-if="dialog" @close="closeModal">
      <h3 slot="header">
        <h5 class="modal-title">아이템 {{isAddMode ? '생성': '수정'}}</h5>
      </h3>
      <div slot="body">
        <div class="form-group">
          <label for="name">이름</label>
          <input
            class="form-control"
            :class="{'is-valid': itemInput.name }"
            type="text"
            name="name"
            id="name"
            v-model="itemInput.name"
          >
        </div>
        <div class="form-group">
          <label for="path">경로</label>
          <input
            class="form-control"
            :class="urlChecker(itemInput.image_path) ? 'is-valid' : 'is-invalid'"
            type="text"
            name="path"
            id="path"
            placeholder="예: http://www.example.com/image.png"
            v-model="itemInput.image_path"
            :disabled="isEditMode"
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
    Modal,
    Card
  },
  async asyncData ({ req, $axios, params, redirect, env }) {
    try {
      const { data } = await $axios.get(`/user`)
      if (!data) {
        redirect('/404')
      }
      return {
        users: data
      }
    } catch (e) {
      redirect('/404')
    }
  },
  data() {
    return {
      currentUser: {
        id: null,
        name: null
      },
      dialog: false,
      dialogMode: "",
      // users: [],
      items: [],
      ordering: [
        { key: "선택안함", value: null },
        { key: "내림차순", value: "DESC" },
        { key: "오름차순", value: "ASC" }
      ],
      order: null,
      itemInput: {
        id: null,
        name: null,
        image_path: null
      }
    };
  },
  // async mounted() {
  //   this.fetch();
  // },
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
    // async fetch() {
    //   this.users = await getUsers();
    // },
    async addItem() {
      if (!this.validate()) {
        return;
      }
      this.items = await addItem(this.currentUser.id, this.itemInput);
      await this.getItems(this.currentUser);
      this.closeModal();
    },
    async selectUser(user) {
      this.order = null;
      this.getItems(user);
    },
    async getItems(user) {
      this.currentUser = user;
      const order = this.order && this.order.value;
      this.items = await getItems(this.currentUser.id, order);
    },
    async removeItem(item) {
      if (window.confirm("정말 삭제하시겠습니까?")) {
        await removeItem(this.currentUser.id, item.id);
        await this.getItems(this.currentUser);
      }
    },
    async updateItem() {
      if (!this.validate()) {
        return;
      }
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
    async sortList(item) {
      this.order = item;
      await this.getItems(this.currentUser);
    },
    validate() {
      const { id, name, image_path } = this.itemInput;

      if (!name) {
        window.alert("이름을 입력해주세요");
        return false;
      }

      if (!this.urlChecker(image_path)) {
        window.alert("URL이 맞는지 올바로 확인해주세요.");
        return false;
      }

      return true;
    },
    urlChecker(url) {
      const urlRegExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
      return urlRegExp.test(url);
    }
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 80vh;
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
