<template>
  <div class="calendar">
    <div class="calendar-title">
      <button @click="prevMonth">&lt;</button>
      <div>{{ currentYear + "년" }} {{ currentMonth + "월" }}</div>
      <button @click="nextMonth">&gt;</button>
    </div>
    <div class="calendar-grid">
      <div
        class="calendar-header"
        v-for="(day, index) in daysOfWeek"
        :key="index"
      >
        {{ day }}
      </div>
      <div
        v-for="(day, index) in calendarDays"
        :key="index"
        class="calendar-content"
      >
        <div
          class="calendar-day"
          @mousedown="handleMouseDown(day)"
          @mouseup="handleMouseUp(day)"
          @mousemove="handleMouseMove(day)"
        >
          {{ day }}
        </div>
        <div :class="getSchedule(day, 'class')" class="sch-title">
          {{ getSchedule(day, "title") }}
        </div>

        <DayUpdateModal
          v-if="handleDayModal(day)"
          :dayList="selectDateList"
          @clickBtn="handleSchedule"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { http } from "@/util/http";
import DayUpdateModal from "@/components/DayUpdateModal.vue";

export default {
  name: "Calendar-vue",
  components: { DayUpdateModal },
  data() {
    return {
      currentMonthIndex: 0,
      currentYear: new Date().getFullYear(), // 현재 년도 추가

      // 렌더링 관련 변수
      months: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ],
      daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      calendarDays: [],

      // 드래그 관련 변수
      selectStartDay: null, // 드래그 시작일
      selectMoveDay: null, // 드래그 중..
      selectEndDay: null, // 드래그 종료일
      selectDateList: [],

      //실제 데이터 담을 변수
      mainScheduleList: [], // 메인스케줄 리스트
      isOpenModal: false, // 모달창 오픈 여부
    };
  },
  computed: {
    currentMonth() {
      return this.months[this.currentMonthIndex];
    },
  },
  created() {
    this.initCalendarDays();
  },
  methods: {
    /**
     * 달력 날짜 셋팅
     */
    initCalendarDays() {
      const today = new Date();
      const firstDayOfMonth = new Date(
        this.currentYear, // 변경된 부분
        today.getMonth() + this.currentMonthIndex,
        1
      );
      const lastDayOfMonth = new Date(
        this.currentYear, // 변경된 부분
        today.getMonth() + this.currentMonthIndex + 1,
        0
      ).getDate();

      const days = [];
      for (let i = 1; i <= lastDayOfMonth; i++) {
        days.push(i);
      }

      // Add empty placeholders for days before the first day of the month
      for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
        days.unshift("");
      }

      this.calendarDays = days;

      this.getMainSchedule();
    },

    /**
     * 스케줄 존재 여부 확인
     */
    getSchedule(day, type) {
      for (let i = 0; i < this.mainScheduleList.length; i++) {
        let startDay = this.mainScheduleList[i].startDate.slice(-2);
        let endDay = this.mainScheduleList[i].endDate.slice(-2);

        if (day >= startDay && day <= endDay) {
          if (type === "class") return "chk";
        }

        if (day == startDay) {
          if (type === "title") return this.mainScheduleList[i].title;
        }
      }

      return;
    },

    /**
     * 메인 스케줄 조회
     */
    getMainSchedule() {
      http
        .get(`/main-schedule/${this.currentYear}/${this.currentMonth}`)
        .then((res) => {
          if (res.data.result === "suc") {
            this.mainScheduleList = res.data.data.mainScheduleList;
          } else {
            alert("실패");
          }
        });
    },
    /**
     * 이전 달
     */
    prevMonth() {
      this.currentMonthIndex--;
      if (this.currentMonthIndex < 0) {
        this.currentMonthIndex = 11;
        this.currentYear--; // 변경된 부분
      }
      this.initCalendarDays();
    },

    /**
     * 다음 달
     */
    nextMonth() {
      this.currentMonthIndex++;
      if (this.currentMonthIndex > 11) {
        this.currentMonthIndex = 0;
        this.currentYear++; // 변경된 부분
      }
      this.initCalendarDays();
    },
    /**
     * 마우스 클릭 시작
     */
    handleMouseDown(index) {
      // 드래그 관련 변수 초기화
      this.selectStartDay = null;
      this.selectEndDay = null;

      this.selectDateList = [];
      this.selectStartDay = index; // 드래그 시작 인덱스 저장
    },

    /**
     * 드래그 중...
     */
    handleMouseMove(index) {
      if (this.selectStartDay !== null) {
        this.selectMoveDay = index; // 드래그 중인 인덱스 업데이트
      }
    },

    /**
     * 마우스 클릭 끝
     */
    handleMouseUp(index) {
      this.selectEndDay = index;

      // end가 더 작으면 switch
      if (this.selectEndDay < this.selectStartDay) {
        let temp = this.selectStartDay;
        this.selectStartDay = this.selectEndDay;
        this.selectEndDay = temp;
      }

      for (let i = this.selectStartDay; i <= this.selectEndDay; i++) {
        let day = i;
        if (i < 10) {
          day = "0" + i;
        }

        this.selectDateList.push(
          this.currentYear + "-" + this.currentMonth + "-" + day
        );
      }
    },

    /**
     * 모달 핸들러
     */
    handleDayModal(day) {
      if (!this.selectStartDay || !this.selectEndDay) {
        return false;
      }

      if (day === this.selectStartDay) {
        return true;
      }

      return false;
    },

    /**
     * 스케줄 등록/수정
     */
    handleSchedule(emitParam) {
      // 등록 API 호출
      if (emitParam.type === "insert") {
        let insertParams = {
          title: emitParam.title,
          startDate: emitParam.dayList[0],
          endDate: emitParam.dayList[emitParam.dayList.length - 1],
        };

        http
          .post("/main-schedule", insertParams)
          .then((res) => {
            if (res.data.result === "suc") {
              alert("스케줄 등록에 성공하셨습니다.");

              // 페이지 새로고침
              window.location.reload();
            } else if (res.data.result === "err") {
              alert("스케줄 등록에 실패하셨습니다.");
              return;
            }
          })
          .catch((err) => alert("catch" + JSON.stringify(err)));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.calendar {
  /* width: 300px; */
  border: 1px solid #ccc;
}

.calendar-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.calendar-header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  background-color: rgb(205, 229, 255);
}

.calendar-content {
  position: relative;
  height: 100px;
  border: 1px solid #ccc;
  cursor: pointer;
  .calendar-day {
  }
  .chk {
    width: 100%;
    height: 17px;
    background-color: red;

    &.sch-title {
      color: #fff;
      font-size: 13px;
    }
  }
}
</style>
