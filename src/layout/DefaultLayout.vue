<template>
  <div>
    <HeaderTitle />
    <router-view />
  </div>
</template>

<script>
import HeaderTitle from "@/components/HeaderTitle";

export default {
  name: "DefaultLayout",
  components: { HeaderTitle },
};
</script>
