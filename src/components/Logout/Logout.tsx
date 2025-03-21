import axios from "axios";
import { api, requestConfig } from "../../constants";
import { Button } from "react-bootstrap";
import AuthContext from "../../contexts/AuthContext";
import { useContext } from "react";

const Logout: React.FC = () => {
  const { handleAuthorization } = useContext(AuthContext);

  const handleLogout = () => {
    const url = `${api}auth/logout`;
    axios
      .post(url, requestConfig)
      .then((response) => {
        console.log("logout", response);
        handleAuthorization(false);
      })
      .catch((error) => {
        console.error("error logging out", error);
      });
  };
  return <Button onClick={handleLogout}>Logout</Button>;
};

export default Logout;
