<template>
  <v-row justify="center">
    <v-dialog persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props"> 친구 찾기 </v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="친구 찾기">
          <v-card-text>
            <v-form v-model="form" @submit.prevent="onSearch">
              <v-text-field
                v-model="keyword"
                :readonly="loading"
                :rules="[required]"
                class="mb-2"
                clearable
                placeholder="닉네임"
              ></v-text-field>

              <div class="member-list">
                <div
                  class="member"
                  v-for="(item, index) in memberList"
                  :key="index"
                >
                  <span :class="getState(item.state)">{{ item.nickname }}</span>
                  <v-btn color="info" @click="goMemberHome(item)" class="go">
                    바로가기
                  </v-btn>
                </div>
              </div>

              <v-btn
                :disabled="!form"
                :loading="loading"
                block
                color="success"
                size="large"
                type="submit"
                variant="elevated"
              >
                검색
              </v-btn>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text="닫기" @click="isActive.value = false"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-row>
</template>

<script>
import http from "@/util/http";

export default {
  name: "FindFriendPop",
  data: () => ({
    form: false,
    keyword: null,
    loading: false,
    memberList: [],
  }),

  methods: {
    // 상태값에 따른 클래스
    getState(state) {
      if (state === "FOLLOW") {
        return "state-follow";
      } else if (state === "BLOCK") {
        return "state-block";
      }
    },

    /**
     * 검색하기
     **/
    onSearch() {
      if (!this.form) return;

      this.loading = true;

      // 사용자 검색 api 호출
      http
        .get("/members?condition=" + this.keyword)
        .then((res) => {
          if (res.data.result === "suc") {
            this.memberList = res.data.data.searchMemberList;
          } else if (res.data.result === "err") {
            alert("사용자 목록 불러오기에 실패하셨습니다.");
          }
        })
        .catch((err) => console.log("catch" + err))
        .finally(() => {
          this.loading = false;
        });
    },

    /**
     * 입력창 필수 기입 체크
     */
    required(v) {
      return !!v || "닉네임을 입력해주세요";
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
.member-list {
  margin-top: 15px;

  .member {
    display: flex;
    height: 40px;
    position: relative;
    justify-content: center;
    align-items: center;
    font-size: 15px;

    button {
      margin-left: 10px;
    }

    // 팔로우 중인 친구
    .state-follow {
      position: relative;
      &::after {
        content: "";
        top: 10%;
        right: -10px;
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background-color: #1867c0;
      }
    }

    // 차단 중인 친구
    .state-block {
      position: relative;
      &::after {
        content: "";
        top: 10%;
        right: -10px;
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background-color: #2e2e2e;
      }
    }
  }
}
</style>
