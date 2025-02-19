import React from "react";
import AppNav from "./AppNav.jsx";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import { Outlet } from "react-router-dom";

export default function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()}
          by Worldview
        </p>
      </footer>
    </div>
  );
}


git remote add origin git@github.com:arpankumbhani/world-view-frontend.git
git branch -M main
git push -u origin main