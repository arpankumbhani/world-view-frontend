import { useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/FakeAuthContext";
import styles from "./User.module.css";
import { toast } from "react-toastify";

const FAKE_USER = {
  name: "Arpan",
  email: "arpan@gmail.com",
  password: "abcd",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function User() {
  const user = JSON.parse(localStorage.getItem("user"));

  // const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("tokenTimestamp");
    navigate("/");
    toast.success("Logged out successfully", {
      autoClose: 2000,
    });
  }

  return (
    <div className={styles.user}>
      <img src={FAKE_USER.avatar} alt={user.username} />
      <span>Welcome, {user.username}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
