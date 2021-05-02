import http from "./httpService";
import config from "../config.json";
import jwt_decode from "jwt-decode";

const apiEndpoint = config.appUrl + "/login";
const apiEndpoint2 = config.appUrl + "/register";
const apiEndpoint3 = config.appUrl + "/account";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  
  localStorage.setItem(tokenKey, jwt.token);
}

export function loginWithJwt(jwt) {
  
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

/*export function getUser(userId){
  return http.get(apiEndpoint2 + "/"+ userId);
}*/

export async function saveUser(user,id){
  const { data: jwt }= await http.put(apiEndpoint2 + "/"+ id, user);
  localStorage.removeItem(tokenKey);
  localStorage.setItem(tokenKey, jwt.token);
  
  }
 


/*export async function saveUser(user,data){
  await http.delete(apiEndpoint2 +"/"+ user.id)
  console.log(user.id)
  return http.post(apiEndpoint2,{
    _id: user.id,
    email: data.email,
    password: data.password,
    name: data.name});
}*/

export function currentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);

    return jwt_decode(jwt);
  } catch (ex) {
    console.log(ex);
    return null;
  }
}
