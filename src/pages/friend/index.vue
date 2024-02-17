<template>
  <div class="friend-page">
    <div class="friend-title">
      <h2>친구 관리</h2>
      <RequestList />
    </div>

    <BlockList />
    <div class="friend-wrapper">
      <v-card class="friend-box">
        <v-list density="compact">
          <v-list-subheader><h2>맞팔 친구</h2></v-list-subheader>

          <v-list-item
            class="friend-list"
            v-for="(item, index) in followBackList"
            :key="index"
          >
            <div>{{ item.nickname }}</div>
            <v-btn @click="goMemberHome(item)"> 바로가기</v-btn>
          </v-list-item>
        </v-list>
      </v-card>

      <v-card class="friend-box">
        <v-list density="compact">
          <v-list-subheader> <h2>팔로잉 친구</h2></v-list-subheader>

          <v-list-item v-for="(item, index) in followingList" :key="index">
            <div class="friend-list">
              <div>{{ item.nickname }}</div>
              <div>
                <v-btn
                  variant="plain"
                  color="nomarl"
                  @click="goMemberHome(item)"
                >
                  바로가기</v-btn
                >
                <v-btn
                  variant="tonal"
                  color="error"
                  @click="cancelFollow(item.friendId)"
                  >팔로우 취소</v-btn
                >
              </div>
            </div>
          </v-list-item>
        </v-list>
      </v-card>
    </div>

    <FindFriendPop />
  </div>
</template>

<script>
import { http } from "@/util/http";
import RequestList from "./comp/RequestList";
import BlockList from "./comp/BlockList";
import FindFriendPop from "./comp/FindFriendPop";

export default {
  name: "FriendIndex",
  components: { RequestList, BlockList, FindFriendPop },
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
      http.get("/friends").then((res) => {
        if (res.data.result === "suc") {
          this.followBackList = res.data.data.followBackList;
          this.followingList = res.data.data.followingList;
        } else {
          alert("실패");
        }
      });
    },

    /**
     * 팔로우 취소
     */
    cancelFollow(id) {
      http
        .post(`/friends/cancel?friendId=${id}`)
        .then((res) => {
          if (res.data.result === "suc") {
            alert("팔로우 취소되었습니다.");
          } else if (res.data.result === "err") {
            alert("실패하였습니다");
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          // 친구 목록 재호출
          this.getFriend();
        });
    },

    /**
     * 친구 페이지 바로 가기
     */
    goMemberHome(item) {
      this.$router.push({
        name: "friendPage",
        params: {
          id: item.memberId,
          state: item.state,
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.friend-page {
  padding: 10px;

  .friend-title {
    display: flex;
    align-items: center;
  }

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

      .friend-list {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
    }
  }
}
</style>
