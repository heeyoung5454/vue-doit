<template>
  <div class="request-list-comp">
    <v-btn color="primary" variant="tonal" @click="dialog = true"> 알림 </v-btn>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-text>
          <div
            class="msg-list"
            v-for="(item, index) in receivedList"
            :key="index"
            :class="{ disabled: item.view === 'Y' }"
          >
            <div class="msg-content">
              {{ item.content }}
            </div>
            <div>
              <v-icon
                class="read icon"
                color="primary"
                icon="mdi-checkbox-marked-circle"
                @click="handlerMessage(0, item.id)"
              ></v-icon>

              <v-icon
                class="del icon"
                color="red"
                icon="mdi-delete"
                @click="handlerMessage(1, item.id)"
              ></v-icon>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" variant="tonal" block @click="dialog = false"
            >닫기</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { http } from "@/util/http";

export default {
  name: "RequestList",

  data() {
    return {
      dialog: false,
      receivedList: [],
    };
  },
  created() {
    this.receivedFriend();
  },
  methods: {
    /*
     ** 친구요청 목록 불러오기
     */
    receivedFriend() {
      http.get("/alarm").then((res) => {
        if (res.data.result === "suc") {
          this.receivedList = res.data.data.friendAlarmList;
        } else {
          alert("실패");
        }
      });
    },

    /**
     *  요청메세지 관리
     *  type 0 읽음 / 1 삭제
     */
    handlerMessage(type, msgId) {
      let apiUrl = "/alarm";

      if (type === 1) {
        apiUrl += "/delete";
      }
      http
        .patch(`${apiUrl}/${msgId}`)
        .then((res) => {
          if (res.data.result === "suc") {
            alert("알람 핸들러 성공");
          } else {
            alert("실패");
          }
        })
        .finally(() => {
          // 알람메세지 재 조회
          this.receivedFriend();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.msg-list {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0;

  .icon {
    margin: 0 5px;
  }

  // 읽은 메세지
  &.disabled {
    .msg-content {
      opacity: 0.5;
    }
    .read {
      display: none;
    }
  }
}
</style>
