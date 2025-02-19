// import { createContext, useContext, useReducer } from "react";

// const AuthContext = createContext();

// const initialState = {
//   user: null,
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case "login":
//       return { ...state, user: action.payload };
//     case "logout":
//       return { ...state, user: null };
//     default:
//       throw new Error("Unknown Action ");
//   }
// }
// // const FAKE_USER = {
// //   name: "Arpan",
// //   email: "arpan@gmail.com",
// //   password: "abcd",
// //   avatar: "https://i.pravatar.cc/100?u=zz",
// // };

// function AuthProvider({ children }) {
//   const [{ user, isAuthenticated }, dispatch] = useReducer(
//     reducer,
//     initialState
//   );

//   async function login(email, password) {
//     if (email && password) {
//       try {
//         const res = await fetch(
//           `${import.meta.env.VITE_BACKEND_URL}auth/login`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ email, password }),
//           }
//         );
//         if (!res.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await res.json();
//         const { token } = data;

//         if (!token) {
//           throw new Error("Login failed: Token is missing in the response");
//         }

//         // Dispatch login action and store token
//         dispatch({ type: "login", payload: token });
//         localStorage.setItem("token", token);
//         localStorage.setItem("tokenTimestamp", Date.now().toString());

//         console.log("Login successful");
//       } catch (err) {
//         console.error("Login failed:", err.message);
//       }
//     }
//     // if (email === FAKE_USER.email && password === FAKE_USER.password)
//     // dispatch({ type: "login", payload: FAKE_USER });
//   }

//   function logout() {
//     dispatch({ type: "logout" });
//     localStorage.removeItem("token");
//   }

//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined)
//     throw new Error("AuthContext was used outside AuthProvider");
//   return context;
// }

// export { AuthProvider, useAuth };
