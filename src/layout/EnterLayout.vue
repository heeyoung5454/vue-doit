<template>
  <div>
    <v-sheet class="bg-primary pa-12 enter-layout">
      <router-view />
    </v-sheet>
  </div>
</template>

<script>
export default {
  name: "EnterLayout",
};
</script>

<style scoped lang="scss">
.enter-layout {
  min-height: 100vh;
}
</style>
