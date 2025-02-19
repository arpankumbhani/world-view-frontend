import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // const token = data?.token;

  useEffect(() => {
    const tokenTimestamp = localStorage.getItem("tokenTimestamp");
    const tokenExpirationTime = 5 * 60 * 60 * 1000; // 5 hours in milliseconds

    if (token && tokenTimestamp) {
      const currentTime = Date.now();
      const elapsedTime = currentTime - parseInt(tokenTimestamp, 10);

      if (elapsedTime > tokenExpirationTime) {
        console.log("Token expired. Logging out...");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("tokenTimestamp");
        navigate("/login");
        toast.error("something went wrong", {
          autoClose: 1000,
        });
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return token ? children : null;
}
