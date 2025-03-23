import { useState, useCallback, useEffect, useContext } from "react";
import axios from "axios";
import { api, requestConfig } from "../../constants";
import styles from "./LoginForm.module.scss";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import AuthContext from "../../contexts/AuthContext";

const LoginForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [displayError, setDisplayError] = useState<boolean>(false);

  const { handleSetAuthorization } = useContext(AuthContext);

  const submitCredentials = useCallback(() => {
    const url = `${api}auth/login`;
    const data = {
      name: name,
      email: email,
    };

    axios
      .post(url, data, requestConfig)
      .then((response) => {
        console.log(response);
        handleSetAuthorization(true);
        setDisplayError(false);
      })
      .catch((error) => {
        console.error(error.message);
        if (error.status === 401) {
          handleSetAuthorization(false);
          setDisplayError(false);
        } else if (error.status === 400) {
          setDisplayError(true);
        }
      });
  }, [name, email]);

  const handleSetNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSetEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    console.log(name, email);
  }, [name, email]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.loginLabel}>
          {" "}
          <Form.Label htmlFor="inputPassword5">Login</Form.Label>
        </div>
        <div className={styles.loginForm}>
          <Form.Text id="nameHelpBlock" muted>
            Name
          </Form.Text>
          <Form.Control
            type="text"
            id="inputName"
            value={name}
            onChange={handleSetNameChange}
            aria-describedby="nameHelpBlock"
          />
          <Form.Text id="emailHelpBlock" muted>
            Email
          </Form.Text>
          <Form.Control
            type="email"
            id="inputEmail"
            value={email}
            onChange={handleSetEmailChange}
            aria-describedby="emailHelpBlock"
          />
          {displayError ? (
            <div className={styles.error}>
              Must provide valid name/email combo
            </div>
          ) : null}
        </div>
        <div className={styles.loginButton}>
          <Button variant="light" onClick={submitCredentials}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
