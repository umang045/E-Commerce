const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const token = getTokenFromLocalStorage?.updateUser?.refreshToken;
console.log(token);
export const config = {
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
    Accept: "application/json",
  },
};