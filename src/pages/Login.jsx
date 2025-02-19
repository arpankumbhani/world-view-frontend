import { useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import Button from "../components/Button";
// import { useAuth } from "../contexts/FakeAuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      toast.error("All fields are required", {
        autoClose: 1000,
      });
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!res.ok) {
        throw new Error("Invalid email or password.");
      }

      const data = await res.json();
      const { token, user } = data;

      if (token) {
        toast.success("Logged in successfully", {
          autoClose: 2000,
        });
        navigate("/app", { replace: true });
      } else {
        throw new Error("Login failed: Token is missing in the response.");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("tokenTimestamp", Date.now().toString());

      console.log("Login successful");
    } catch (err) {
      toast.error("Login failed", {
        autoClose: 2000,
      });
      console.error("Login failed:", err.message);
    }
  }

  return (
    <>
      <main className={styles.login}>
        <PageNav />
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.title}>Log In</div>
          <div className={styles.row}>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className={styles.btns}>
            <Button type="primary" on>
              Login
            </Button>
            <Link to="/signin" className={styles.signin}>
              SignIn
            </Link>
          </div>
        </form>
      </main>
    </>
  );
}
