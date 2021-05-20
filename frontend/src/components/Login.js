import React from "react";
import AuthForm from "./AuthForm";
import { withRouter } from "react-router-dom";

function Login({ onLogin }) {
  const [inputEmailValue, setInputEmailValue] = React.useState("");
  const [inputPassValue, setInputPassValue] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(inputEmailValue, inputPassValue);
    setInputEmailValue("");
    setInputPassValue("");
  }

  function handleEmailChange(evt) {
    setInputEmailValue(evt.target.value);
  }

  function handlePassChange(evt) {
    setInputPassValue(evt.target.value);
  }

  return (
    <AuthForm
      button="Войти"
      title="Вход"
      formId="auth"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        id="email-input"
        type="email"
        className="auth__input"
        autoComplete="off"
        placeholder="Email"
        name="email"
        value={inputEmailValue}
        onChange={handleEmailChange}
        required
      />
      <span id="email-input-error" className="auth__input-error"></span>
      <input
        id="pass-input"
        type="password"
        className="auth__input"
        autoComplete="new-password"
        placeholder="Пароль"
        name="pass"
        value={inputPassValue}
        minLength="2"
        maxLength="200"
        required
        onChange={handlePassChange}
      />
      <span id="pass-input-error" className="auth__input-error"></span>
    </AuthForm>
  );
}

export default withRouter(Login);
