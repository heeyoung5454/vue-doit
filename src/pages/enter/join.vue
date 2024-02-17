<template>
  <div class="join-page">
    <h2>회원가입</h2>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form v-model="form" @submit.prevent="join">
        <v-text-field
          v-model="nickname"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          clearable
          label="ID"
          placeholder="ID를 입력하세요"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="[required]"
          clearable
          label="Password"
          type="password"
          placeholder="비밀번호를 입력하세요"
        ></v-text-field>

        <v-text-field
          v-model="introduction"
          :readonly="loading"
          :rules="[required]"
          clearable
          label="Introduction"
          placeholder="소개말을 입력해주세요"
        ></v-text-field>

        <br />

        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="secondary"
          size="large"
          type="submit"
          variant="elevated"
        >
          회원가입
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { noTokenHttp } from "@/util/http";

export default {
  name: "joinIndex",
  data: () => ({
    form: false,
    nickname: null,
    password: null,
    introduction: null,

    loading: false,
  }),

  methods: {
    join() {
      if (!this.form) return;

      this.loading = true;

      let joinParams = {
        nickname: this.nickname,
        password: this.password,
        introduction: this.introduction,
      };

      noTokenHttp
        .post("/members/add", joinParams)
        .then((res) => {
          if (res.data.result === "suc") {
            alert("회원가입에 성공하였습니다");
            this.$router.push({ name: "login" });
          } else if (res.data.result === "err") {
            alert("회원가입에 실패하였습니다");
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          this.loading = false;
        });
    },

    required(v) {
      return !!v || "값을 입력해주세요";
    },
  },
};
</script>

<style lang="scss" scoped>
.join-page {
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  .join {
    margin-top: 20px;
  }
}
</style>
