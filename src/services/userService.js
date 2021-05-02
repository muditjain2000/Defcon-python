import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.appUrl + "/register";
const apiEndpoint1 = config.appUrl + "/python";
const apiEndpoint2 = config.appUrl + "/python1";
const apiEndpoint3 = config.appUrl + "/dashboard";
const apiEndpoint4 = config.appUrl + "/dashboard1";

export function register(user) {
  return http.post(apiEndpoint, {
    file: user.file,
    email: user.email,
    password: user.password,
    name: user.name,
  });
}

export function python(){
  return http.post(apiEndpoint1)
}
export function python1(){
  return http.post(apiEndpoint2)
}
export function getFaceData() {
  return http.get(apiEndpoint3);
}
export function getCountData() {
  return http.get(apiEndpoint4);
}