import React, { useCallback } from "react";
import Spinner from "./Spinner";

function PopupWithForm({
  formId,
  isOpen,
  title,
  children,
  onClose,
  button,
  onSubmit,
  isLoadingPopup,
}) {
  // console.log();
  const closeByOverlay = useCallback(
    (evt) => {
      if (evt.target !== evt.currentTarget) return;
      onClose();
    },
    [onClose]
  );

  const handleEscClose = useCallback(
    (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  React.useEffect(() => {
    if (isOpen) {
      const Popup = document.querySelector(`.${formId}`);
      document.body.addEventListener("keyup", handleEscClose);
      Popup.addEventListener("click", closeByOverlay);
    }
    return () => {
      const Popup = document.querySelector(`.${formId}`);
      document.body.removeEventListener("keyup", handleEscClose);
      Popup.removeEventListener("click", closeByOverlay);
    };
  }, [isOpen, formId, closeByOverlay, handleEscClose]);

  return (
    <div className={`popup ${formId} ${isOpen && "popup_opened"}`}>
      <form
        className={`form popup__container`}
        name={formId}
        onSubmit={onSubmit}
        noValidate
      >
        <h2 className="popup__title">{title}</h2>
        {children}
        <button className="popup__save" type="submit">
          {button}
        </button>
        <button
          className="popup__close"
          type="button"
          onClick={function (evt) {
            evt.preventDefault();
            onClose();
          }}
        ></button>
        {isLoadingPopup ? <Spinner /> : ""}
      </form>
    </div>
  );
}

export default PopupWithForm;
