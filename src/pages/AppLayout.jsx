import React from "react";
import styles from "./AppLayout.module.css";
import Map from "../components/Map";
import User from "../components/User";
import SideBar from "../components/Sidebar";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
      <User />
    </div>
  );
}
