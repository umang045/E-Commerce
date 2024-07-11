export const base_url = "http://localhost:4545/api/";


const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage?.updateUser?.refreshToken : ""
    }`,
    Accept: "application/json",
  },
};
