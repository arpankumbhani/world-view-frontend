import React, { useEffect } from "react";
import styles from "./CityList.module.css";
import SpinnerFullPage from "./SpinnerFullPage";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

export default function CityList() {
  const { fetchCities, cities, isLoading } = useCities();
  useEffect(
    function () {
      fetchCities();
    },
    [fetchCities]
  );
  if (isLoading) return <SpinnerFullPage />;
  if (cities && cities?.length === 0) {
    return (
      <Message message="Adding your first city by clicking on a city on the map " />
    );
  }

  return (
    <ul className={styles.cityList}>
      {cities &&
        cities?.map((city, index) => (
          <CityItem city={city} key={city._id || index} />
        ))}
    </ul>
  );
}
