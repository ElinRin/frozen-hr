import React, { useState, useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { navigate } from "hookrouter";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { firebaseTools } from "../../utils/firebase";
import { ProfileContext } from "../../app/Context";
import { loginUser, login } from "../../actions/user";
import { Loader } from "../../components";
import "./Login.css";

export const Login = ({ history }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["frozenToken"]);
  const [profile, profileDispatch] = useContext(ProfileContext);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    if (!(profile.userId && profile.userId.length)) {
      login(profileDispatch).then(id => {
        setStatus("notLoggedIn");
      });
    } else {
      navigate("/main", true);
      setStatus("loggedIn");
    }
  }, [cookies.frozenToken, profile.userId, profileDispatch, removeCookie]);

  const handleSubmit = async event => {
    event.preventDefault();
    if (
      email &&
      email.trim().length > 0 &&
      password &&
      password.trim().length > 0
    ) {
      await loginUser({ email, password }, profileDispatch).then(userId => {
        if (!userId) {
          setError(true);
        } else {
          const user = firebaseTools.currentUser();
          if (user) {
            user
              .getIdToken()
              .then(frozenToken => {
                setCookie("frozenToken", frozenToken, {
                  path: "/"
                });
              })
              .catch(() => {});
          }
        }
      });
    }
  };

  if (status === "pending") {
    return <Loader />;
  }

  return (
    <div className="login-container">
      <div className="login-form-container">
        <Form className="login-form" onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={({ currentTarget: { value } }) => {
                setError(false);
                setEmail(value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={({ currentTarget: { value } }) => {
                setError(false);
                setPassword(value);
              }}
            />
          </FormGroup>
          <Button color="primary">Log in</Button>
        </Form>

        <div className="error">
          {error && (
            <span>
              Неверный логин или пароль. Если Вы не помните свои данные для
              входа, обратитесь к вашему hr.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
