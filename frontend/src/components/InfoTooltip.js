import React from "react";
import img_ok from "../images/infoToolTip_ok.png";
import img_no from "../images/infoToolTip_no.png";

function InfoTooltip({ isOpen, onClose, isConfirmAuth }) {
  const text_ok = "Вы успешно зарегистрировались!";
  const text_no = "Что-то пошло не так! Попробуйте ещё раз.";

  // const closeByOverlay = useCallback(
  //   (evt) => {
  //     if (evt.target !== evt.currentTarget) return;
  //     onClose();
  //   },
  //   [onClose]
  // );

  // const handleEscClose = useCallback(
  //   (evt) => {
  //     if (evt.key === "Escape") {
  //       onClose();
  //     }
  //   },
  //   [onClose]
  // );
  // React.useEffect(() => {
  //   if (isOpen) {
  //     const Popup = document.querySelector(`.${formId}`);
  //     document.body.addEventListener("keyup", handleEscClose);
  //     Popup.addEventListener("click", closeByOverlay);
  //   }
  //   return () => {
  //     const Popup = document.querySelector(`.${formId}`);
  //     document.body.removeEventListener("keyup", handleEscClose);
  //     Popup.removeEventListener("click", closeByOverlay);
  //   };
  // }, [isOpen, formId, closeByOverlay, handleEscClose]);

  return (
    <div className={`infoToolTip ${isOpen && "infoToolTip_opened"}`}>
      <div className="infoToolTip__container">
        <img
          className="infoToolTip__img"
          src={isConfirmAuth ? img_ok : img_no}
          alt=""
        ></img>
        <h2 className="infoToolTip__text">
          {isConfirmAuth ? text_ok : text_no}
        </h2>
        <button
          className="infoToolTip__close"
          type="button"
          onClick={function (evt) {
            evt.preventDefault();
            onClose();
          }}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
