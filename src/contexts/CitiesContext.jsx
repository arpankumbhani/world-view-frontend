import { createContext, useContext, useReducer, useCallback } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

// const BASE_URL = "http://localhost:7000";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: " ",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city._id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
}

function invalidTokenLogOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("tokenTimestamp");
  Navigate("/login");
  toast.error("something went wrong", {
    autoClose: 1000,
  });
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const token = localStorage.getItem("token") || "";

  const fetchCities = useCallback(
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const token = (await localStorage.getItem("token")) || "";

        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/cities/getAllCities`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data?.data });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "there was an error Loading data",
        });
        if (err.code === 401) {
          invalidTokenLogOut();
        }
      }
    },
    [token]
  );

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity._id) return;
      dispatch({ type: "loading" });
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/cities/getCityById/${id}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data?.data });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "there was an error Loading city...",
        });
        if (err.code === 401) {
          invalidTokenLogOut();
        }
      }
    },
    [currentCity._id]
  );

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/cities/addCities`,

        {
          method: "POST",
          body: JSON.stringify(newCity),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "there was an error creating city...",
      });
      if (err.code === 401) {
        invalidTokenLogOut();
      }
    }
  }
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/cities/deleteCityById/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "there was an error  Deleting City....",
      });
      if (err.code === 401) {
        invalidTokenLogOut();
      }
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        fetchCities,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
