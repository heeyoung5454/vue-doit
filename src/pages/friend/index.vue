<template>
  <div class="friend-page">
    <h2>친구 페이지</h2>

    <BlockList />
    <div class="friend-wrapper">
      <v-card class="friend-box">
        <v-list density="compact">
          <v-list-subheader><h2>맞팔 친구</h2></v-list-subheader>

          <v-list-item v-for="(item, index) in followBackList" :key="index">
            <v-list-item-title v-text="item.nickname"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>

      <v-card class="friend-box">
        <v-list density="compact">
          <v-list-subheader> <h2>팔로잉 친구</h2></v-list-subheader>

          <v-list-item v-for="(item, index) in followingList" :key="index">
            <v-list-item-title v-text="item.nickname"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </div>

    <FindFriendPop />
  </div>
</template>

<script>
import { http } from "@/util/http";
import BlockList from "./comp/BlockList";

import FindFriendPop from "./comp/FindFriendPop";

export default {
  name: "FriendIndex",
  components: { BlockList, FindFriendPop },
  data: () => ({
    followBackList: [],
    followingList: [],
  }),
  created() {
    this.getFriend();
  },
  methods: {
    /*
     ** 친구 목록 불러오기
     */
    getFriend() {
      http
        .get("/friends")
        .then((res) => {
          if (res.data.result === "suc") {
            this.followBackList = res.data.data.followBackList;
            this.followingList = res.data.data.followingList;
          } else {
            alert("실패");
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped lang="scss">
.friend-page {
  padding: 10px;
  .friend-wrapper {
    padding: 20px 0;
    display: flex;
    justify-content: space-between;

    .friend-box {
      min-width: 50%;
      min-height: 300px;
      h2 {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
