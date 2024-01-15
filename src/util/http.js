import axios from "axios";

let token = "";
if (localStorage.getItem("accessToken")) {
  token = localStorage.getItem("accessToken");
}

// AccessToken 필요 api (로그인 이후)
export const http = axios.create({
  baseURL: "http://3.35.93.119:8080",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// AccessToken 필요하지 않을때
export const noTokenHttp = axios.create({
  baseURL: "http://3.35.93.119:8080",
});

// 로그아웃 전용 api
export const logOutHttp = axios.create({
  baseURL: "http://3.35.93.119:8080",
  headers: {
    AccessToken: ` ${token}`,
  },
});

export default http;
