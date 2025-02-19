import React, { useState } from "react";
import PageNav from "../components/PageNav";
import styles from "./SignIn.module.css";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!username || !email || !password) {
      toast.error("All fields are required.", {
        autoClose: 1500,
      });
      return;
    }
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );

      if (!res.ok) {
        toast.error("SignIn failed", {
          autoClose: 2000,
        });
        const responseData = await res.json();
        throw new Error(responseData.message || "Sign-in failed.");
      }

      const data = await res.json();
      const { token, user } = data;

      if (!token) {
        throw new Error("Sign-in failed: Token is missing in the response.");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("tokenTimestamp", Date.now().toString());

      toast.success("Sign in successfully", {
        autoClose: 2000,
      });

      navigate("/app", { replace: true });
    } catch (err) {
      console.error("Sign-in failed:", err.message);
    }
  }
  return (
    <main className={styles.signin}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.title}>Sign In</div>
        <div className={styles.row}>
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
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
            Sign In
          </Button>
          <Link to="/login" className={styles.login}>
            LogIn
          </Link>
        </div>
      </form>
    </main>
  );
}
