export const base_url = "http://localhost:4545/api/";

const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

const token = getTokenFromLocalStorage?.updateUser?.refreshToken;
console.log(token);

export const config = {
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage !== null ? token : ""}`,
    Accept: "application/json",
  },
};
