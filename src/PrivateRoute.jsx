import React from "react";
import { Navigate } from "react-router-dom"; // ✅ ensure correct import
import { UserAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { session } = UserAuth();

  // Session এখনো লোড হয়নি
  if (session === undefined) {
    return <p>Loading....</p>;
  }

  // যদি session থাকে, children দেখাও, না থাকলে /signin page এ নিয়ে যাও
  return session ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
