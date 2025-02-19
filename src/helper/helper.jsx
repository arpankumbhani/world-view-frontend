import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export function LogOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("tokenTimestamp");
  Navigate("/login");
  toast.success("Logged out successfully", {
    autoClose: 2000,
  });
}
