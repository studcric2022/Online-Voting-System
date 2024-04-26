import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";
import React from "react";

export default function PreventLoginPage() {
  const auth = useAuth();

  return auth ?  <Navigate to='/dashboard' /> : <Outlet />;
}