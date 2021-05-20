import React from "react";

function AuthForm({ button, title, formId, children, onSubmit }) {
  return (
    <div className="auth">
      <form
        className={`form ${formId}`}
        name="auth__form"
        onSubmit={onSubmit}
        noValidate
      >
        <h2 className="auth__title">{title}</h2>

        {children}

        <button className="auth__save" type="submit">
          {button}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
