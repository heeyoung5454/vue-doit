<template>
  <div
    class="calendar-container"
    ref="calendarContainer"
    v-scroll="handleScroll"
  >
    <div class="calendar">
      <div class="calendar-header">
        <div
          v-for="dayOfWeek in daysOfWeek"
          :key="dayOfWeek"
          class="day-of-week"
        >
          {{ dayOfWeek }}
        </div>
      </div>
      <div class="month" v-for="(month, index) in months" :key="index">
        <div
          v-for="day in month"
          :key="day.date"
          @click="handleDayClick(day)"
          :class="{
            day: true,
            inactive: !day.isCurrentMonth,
            selected: day.isSelected,
          }"
        >
          {{ day.date }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "mainIndex",
  data() {
    return {
      daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
      months: [],
      currentMonth: moment(),
      selectedDate: moment().format("D"),
    };
  },
  mounted() {
    this.generateCalendar();
  },
  methods: {
    generateCalendar() {
      this.months = [];

      const startOfMonth = this.currentMonth.clone().startOf("month");
      const endOfMonth = this.currentMonth.clone().endOf("month");
      const startDate = startOfMonth.clone().startOf("week");
      const endDate = endOfMonth.clone().endOf("week");

      let currentDay = startDate.clone();

      while (currentDay.isSameOrBefore(endDate)) {
        const week = [];

        for (let i = 0; i < 7; i++) {
          week.push({
            date: currentDay.format("D"),
            isCurrentMonth: currentDay.isSame(this.currentMonth, "month"),
            isSelected: currentDay.format("D") === this.selectedDate,
          });
          currentDay.add(1, "day");
        }

        this.months.push(week);
      }
    },
    handleScroll() {
      const container = this.$refs.calendarContainer;
      const scrollTop = container.scrollTop;

      if (scrollTop === 0) {
        this.currentMonth.subtract(1, "month");
        this.generateCalendar();
        container.scrollTop = container.scrollHeight - container.clientHeight;
      } else if (
        scrollTop ===
        container.scrollHeight - container.clientHeight
      ) {
        this.currentMonth.add(1, "month");
        this.generateCalendar();
        container.scrollTop = 0;
      }
    },
    handleDayClick(day) {
      if (day.isCurrentMonth) {
        this.selectedDate = day.date;
        console.log(`Clicked on day ${day.date}`);
      }
    },
  },
  directives: {
    scroll: {
      mounted(el, binding) {
        const onScroll = () => {
          binding.value();
        };

        el.addEventListener("scroll", onScroll);

        el._onScrollDestroy = () => {
          el.removeEventListener("scroll", onScroll);
        };
      },
      beforeUnmount(el) {
        el._onScrollDestroy();
      },
    },
  },
};
</script>

<style scoped lang="scss">
.calendar-container {
  height: 300px;
  overflow-y: scroll;

  .calendar {
    .calendar-header {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 0px;
      font-weight: bold;

      .day-of-week {
        padding: 10px;
        text-align: center;
      }
    }

    .month {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 0px;

      .day {
        padding: 10px;
        cursor: pointer;
      }

      .is-current-month {
        background-color: #fff;
      }

      .inactive {
        color: #ccc;
      }

      .selected {
        background-color: #3498db;
        color: #fff;
      }
    }
  }
}
</style>
