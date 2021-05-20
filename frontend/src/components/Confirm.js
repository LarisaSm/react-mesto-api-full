import React from "react";
import Spinner from "./Spinner";

function Confirm({
  isOpen,
  setIsOpen,
  confirmAction,
  isLoadingConfirm,
  setIsLoadingConfirm,
  cardDelete,
}) {
  function onClick() {
    // console.log("confirm -> onClick");
    // console.log(confirmAction);
    setIsLoadingConfirm(true);
    switch (confirmAction) {
      case "cardDelete":
        cardDelete();
        break;
      default:
        break;
    }
    // console.log("Confirm -> onCLick");
  }

  return (
    <div className={`confirm popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container confirm__container">
        <h2 className="popup__header">Вы уверены?</h2>

        <button className="popup__save" type="button" onClick={onClick}>
          Да
        </button>
        {isLoadingConfirm ? <Spinner /> : ""}
        <button
          className="popup__close"
          type="button"
          onClick={function (evt) {
            evt.preventDefault();
            setIsOpen(false);
          }}
        ></button>
      </div>
    </div>
  );
}

export default Confirm;
