import React from "react";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import Spinner from "./Spinner";

// const formatDate = (date) =>
//   new Intl.DateTimeFormat("en", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   }).format(new Date(date));

export default function CityItem({ city }) {
  const { currentCity, deleteCity, isLoading } = useCities();

  const { cityName, emoji, date, _id, position } = city;

  function handleClick(e) {
    e.preventDefault();
    deleteCity(_id);
  }

  if (isLoading) return <Spinner />;
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          _id === currentCity._id ? styles["cityItem--active"] : ""
        }`}
        to={`${_id}?lat=${position?.lat}&lng=${position?.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.time}>{date}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}
