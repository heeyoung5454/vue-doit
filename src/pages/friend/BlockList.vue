<template>
  <div>
    <!-- 차단 목록 -->
    <v-dialog transition="dialog-top-transition" min-width="400">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props">차단목록</v-btn>
      </template>
      <template v-slot:default="{ isActive }">
        <v-card>
          <v-toolbar color="primary" title="차단목록"></v-toolbar>
          <v-card-text>
            <div v-for="(item, index) in blockList" :key="index">
              {{ item.nickname }}
            </div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn variant="text" @click="isActive.value = false">닫기</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script>
import http from "@/util/http";
export default {
  name: "BlockList",
  data() {
    return {
      blockList: [],
    };
  },
  created() {
    this.getBlockList();
  },
  methods: {
    getBlockList() {
      // 차단 목록 api호출
      http
        .get("/friends/block")
        .then((res) => {
          if (res.data.result === "suc") {
            this.blockList = res.data.data.blockList;
          } else if (res.data.result === "err") {
            alert("차단목록 불러오기에 실패하셨습니다.");
          }
        })
        .catch((err) => console.log("catch" + err));
    },
  },
};
</script>
