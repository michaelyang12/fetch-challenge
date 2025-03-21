import "./App.css";
import LoginForm from "./components/LoginForm/LoginForm";
import Home from "./pages/Home";
import AuthContext from "./contexts/AuthContext";
import { useContext, useEffect } from "react";
import HeaderBar from "./components/HeaderBar/HeaderBar";
import axios from "axios";
import { api, requestConfig } from "./constants";

function App() {
  const { authorized, handleAuthorization } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(`${api}dogs/breeds`, requestConfig)
      .then((response) => {
        handleAuthorization(true);
      })
      .catch((error) => {
        handleAuthorization(false);
      });
  }, []);

  return !authorized ? (
    <LoginForm />
  ) : (
    <>
      <HeaderBar />
      <Home />
    </>
  );
}

export default App;
