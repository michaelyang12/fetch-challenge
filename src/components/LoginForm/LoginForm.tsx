import { useState, useCallback, useEffect, useContext } from "react";
import axios from "axios";
import { api, requestConfig } from "../../constants";
import styles from "./LoginForm.module.scss";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import AuthContext from "../../contexts/AuthContext";

interface LoginFormProps {
  // handleAuthorization: (value: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({}) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const { handleAuthorization } = useContext(AuthContext);

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
        handleAuthorization(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [name, email]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    console.log(name, email);
  }, [name, email]);

  return (
    <div className={styles.container}>
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
          onChange={handleNameChange}
          aria-describedby="nameHelpBlock"
        />
        <Form.Text id="emailHelpBlock" muted>
          Email
        </Form.Text>
        <Form.Control
          type="text"
          id="inputEmail"
          value={email}
          onChange={handleEmailChange}
          aria-describedby="emailHelpBlock"
        />
      </div>
      <div className={styles.loginButton}>
        <Button variant="light" onClick={submitCredentials}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
