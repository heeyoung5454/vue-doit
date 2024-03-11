<template>
  <div class="day-update-modal-comp">
    <div class="content">
      <div class="title">
        <input type="text" v-model="title" />
      </div>
      .>> {{ updateData }}
      <div class="date">
        {{ startDate }}
        ~ {{ endDate }}
      </div>

      <v-btn color="primary" @click="handleBtn()" class="insert">
        {{ this.updateData.id ? "수정" : "등록" }}
      </v-btn>
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
    //이미 등록된 스케줄 정보
    updateData: {
      type: Object,
    },
  },
  emits: ["clickBtn"],
  data() {
    return {
      title: "새로운 이벤트",
      startDate: null,
      endDate: null,
    };
  },
  watch: {
    updateData() {
      this.title = this.updateData.title;
      this.startDate = this.updateData.startDate;
      this.endDate = this.updateData.endDate;
    },
  },
  mounted() {
    this.startDate = this.dayList[0];
    this.endDate = this.dayList[this.dayList.length - 1];

    if (this.mainId) {
      this.title = this.updateData.title;
      this.startDate = this.updateData.startDate;
      this.endDate = this.updateData.endDate;
    }
  },
  methods: {
    /**
     * 팝업 내 버튼 제어
     */
    handleBtn() {
      let emitParam = {
        startDate: this.startDate,
        endDate: this.endDate,
        title: this.title,
        type: "insert",
      };

      if (this.updateData.id) {
        emitParam.type = "update";
        emitParam.mainId = this.updateData.id;
      }
      this.$emit("clickBtn", emitParam);
    },
  },
};
</script>

<style scoped lang="scss">
.day-update-modal-comp {
  .content {
    min-width: 300px;
    min-height: 200px;
    padding: 0 20px 20px;
    background-color: #ffffff;
    animation: modal-bg-show 0.3s;

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
