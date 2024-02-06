<template>
  <h2>친구 페이지</h2>
  <v-card>
    <v-list density="compact">
      <v-list-subheader>맞팔 친구</v-list-subheader>

      <v-list-item v-for="(item, index) in followBackList" :key="index">
        <v-list-item-title v-text="item.nickname"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>

  <v-card>
    <v-list density="compact">
      <v-list-subheader>팔로잉 친구</v-list-subheader>

      <v-list-item v-for="(item, index) in followingList" :key="index">
        <v-list-item-title v-text="item.nickname"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>

  <BlockList />
</template>

<script>
import { http } from "@/util/http";
import BlockList from "./BlockList";

export default {
  name: "FriendIndex",
  components: { BlockList },
  data: () => ({
    items: [
      { name: "Real-Time", icon: "mdi-clock" },
      { name: "Audience", icon: "mdi-account" },
      { name: "Conversions", icon: "mdi-flag" },
    ],

    followBackList: [],
    followingList: [],
  }),
  created() {
    this.getFriend();
  },
  methods: {
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
