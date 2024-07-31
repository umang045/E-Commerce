import React from "react";
import { useSelector, shallowEqual } from "react-redux";

const useAuth = () => {
  const authState = useSelector((state) => state?.auth, shallowEqual);
  return authState;
};
export default useAuth;
