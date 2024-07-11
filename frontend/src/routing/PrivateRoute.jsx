import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const getTokenFromLocalStorage = localStorage.getItem("customer");
  //   console.log(getTokenFromLocalStorage);
  return getTokenFromLocalStorage?.updateuser.token !== undefined ? (
    children
  ) : (
    <Navigate to="/login"></Navigate>
  );
  //   return getTokenFromLocalStorage;
};
