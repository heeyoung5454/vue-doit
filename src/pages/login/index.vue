<template>
  <v-sheet class="bg-deep-purple pa-12 home-page">
    <h2>환영합니다</h2>

    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model="id"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          clearable
          label="ID"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="[required]"
          clearable
          label="Password"
          placeholder="Enter your password"
        ></v-text-field>

        <br />

        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
        >
          로그인
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script>
import { noTokenHttp } from "@/util/http";

export default {
  name: "LoginIndex",
  data: () => ({
    form: false,
    id: null,
    password: null,
    loading: false,
  }),

  methods: {
    onSubmit() {
      if (!this.form) return;

      this.loading = true;

      let loginParams = {
        nickname: this.id,
        password: this.password,
      };

      noTokenHttp
        .post("/login", loginParams)
        .then((res) => {
          if (res.data.result === "suc") {
            this.$router.push({ name: "main" });
          } else {
            alert("로그인실패");
          }
        })
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

<style scoped lang="scss">
.home-page {
  min-height: 100vh;
  h2 {
    text-align: center;
    margin-bottom: 30px;
  }
}
</style>
