<template>
  <div class="day-update-modal-comp">
    <div class="content">
      <div class="title">
        <input type="text" v-model="title" />
      </div>
      <div class="date">
        {{ dayList[0] }}
        ~ {{ dayList[dayList.length - 1] }}
      </div>

      <v-btn color="primary" @click="handleBtn()" class="insert"> 등록 </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "DayUpdateModal",
  props: {
    dayList: {
      type: Array,
    },
  },
  emits: ["clickBtn"],
  data() {
    return {
      title: "새로운 이벤트",
    };
  },
  methods: {
    /**
     * 팝업 내 버튼 제어
     */
    handleBtn() {
      let emitParam = {
        dayList: this.dayList,
        title: this.title,
        type: "insert",
      };
      this.$emit("clickBtn", emitParam);
    },
  },
};
</script>

<style scoped lang="scss">
.day-update-modal-comp {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  .content {
    position: absolute;
    z-index: 99;
    top: 10px;
    left: 20px;
    min-width: 300px;
    min-height: 200px;
    padding: 20px;
    background-color: rgb(205, 229, 255);
    animation: modal-bg-show 0.3s;
    border-radius: 12px;

    .insert {
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
  }
}

@keyframes modal-bg-show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
