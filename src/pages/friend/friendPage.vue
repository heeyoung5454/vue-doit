<template>
  <div>친구 메인</div>
  <div class="setting">
    <v-btn color="red" @click="handleBlock()">
      {{ state === "BLOCK" ? "차단취소" : "차단하기" }}
    </v-btn>
    <v-btn color="purple" @click="handleFollow()" v-if="state !== 'BLOCK'">
      {{ state === "FOLLOW" ? "팔로우 취소" : "팔로우" }}
    </v-btn>
  </div>
</template>

<script>
import http from "@/util/http";

export default {
  name: "friendPage",
  props: {
    id: {
      type: [Number, String],
    },
    state: {
      type: String,
    },
  },

  created() {},
  methods: {
    /**
     * 팔로우 (친구 신청)
     */
    handleFollow() {
      // 이미 팔로우 된 상태라면 팔로우 취소
      if (this.state === "FOLLOW") {
        http
          .post(`/friends/cancel?friendId=${this.id}`)
          .then((res) => {
            if (res.data.result === "suc") {
              alert("팔로우를 취소하였습니다.");
            } else if (res.data.result === "err") {
              alert("팔로우를 취소 실패하셨습니다.");
            }
          })
          .catch((err) => console.log("catch" + err))
          .finally(() => {
            history.back();
          });

        return;
      }

      http
        .post(`/friends?friendId=${this.id}`)
        .then((res) => {
          if (res.data.result === "suc") {
            alert("팔로우 요청에 성공하셨습니다.");
          } else if (res.data.result === "err") {
            alert("팔로우 오청 실패하셨습니다.");
            return;
          }
        })
        .catch((err) => console.log("catch :: " + err));
    },

    /**
     * 차단하기 / 차단 취소
     */
    handleBlock() {
      // 차단 취소 (이미 차단 되었을 경우)
      if (this.state === "BLOCK") {
        return;
      }

      // 기본값은 차단하기
      http
        .post(`/friends/block?friendId=${this.id}`)
        .then((res) => {
          if (res.data.result === "suc") {
            alert("차단하였습니다.");
          } else if (res.data.result === "err") {
            alert("차단실패하셨습니다.");
          }
        })
        .catch((err) => console.log("catch" + err))
        .finally(() => {
          // 차단 후 페이지 이동
          history.back();
        });
    },
  },
};
</script>

<style scoped lang="scss">
.setting {
  display: flex;
  height: 40px;
  position: relative;
  justify-content: end;
  align-items: center;
  font-size: 15px;
}
</style>
