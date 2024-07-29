const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
// console.log(getTokenFromLocalStorage);
const token = getTokenFromLocalStorage?.refreshToken;
console.log(token);
export const config = {
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
    Accept: "application/json",
  },
};
