<template>
  <div class="card" style="width: 50rem;">
    <img :src="path" class="card-img-top">
    <div class="card-body">
      <h5 class="card-title">{{name}}</h5>
      <button class="btn btn-primary" data-toggle="modal" @click="$emit('modify')">수정</button>
      <button class="btn btn-primary" @click="$emit('remove')">삭제</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  }
};
</script>
