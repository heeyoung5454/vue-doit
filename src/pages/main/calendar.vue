<template>
  <div class="calendar">
    <div class="calendar-title">
      <button @click="prevMonth">&lt;</button>
      <div>{{ currentMonth }} {{ currentYear }}</div>
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
        class="calendar-day"
        @mousedown="handleMouseDown(day)"
        @mouseup="handleMouseUp(day)"
        @mousemove="handleMouseMove(day)"
      >
        {{ day }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calendar-vue",
  data() {
    return {
      currentMonthIndex: 0,
      currentYear: new Date().getFullYear(), // 현재 년도 추가
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
    };
  },
  computed: {
    currentMonth() {
      return this.months[this.currentMonthIndex];
    },
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
    handleMouseDown(index) {
      console.log("donw", this.currentMonth, this.currentYear, index);
      // Handle mouse down event
    },
    handleMouseUp(index) {
      console.log("up", this.currentMonth, this.currentYear, index);

      // Handle mouse up event
    },
    handleMouseMove(index) {
      console.log("move", this.currentMonth, this.currentYear, index);

      // Handle mouse move event
    },
  },
  mounted() {
    this.initCalendarDays();
  },
};
</script>

<style>
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

.calendar-day {
  display: flex;
  justify-content: start;
  align-items: top;
  height: 100px;
  border: 1px solid #ccc;
}
</style>
