<template>
  <div class="header-title">
    <div>스케줄러</div>
    <div class="logout" @click="logOut()">로그아웃</div>
  </div>
</template>

<script>
import { logOutHttp } from "@/util/http";

export default {
  name: "HeaderTitle",
  data() {
    return {};
  },

  methods: {
    /**
     * 로그아웃
     */
    logOut() {
      logOutHttp
        .post("/logout")
        .then((res) => {
          if (res.data.result === "suc") {
            alert("로그아웃 되었습니다.");

            setTimeout(() => {
              this.$router.push({ name: "login" });
            }, 1000);
          } else if (res.data.result === "err") {
            alert("로그아웃에 실패하였습니다");
            return;
          }
        })
        .catch((err) => {
          alert("catch:: " + JSON.stringify(err));
        });
    },
  },
};
</script>

<style scoped lang="scss">
.header-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  padding: 10px 15px;
  background-color: #1867c0;
  color: #fff;

  .logout {
    font-size: 15px;
    cursor: pointer;
  }
}
</style>
