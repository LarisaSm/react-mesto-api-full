import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoadingPopup }) {
  const [inputCardName, setInputCardName] = React.useState("");
  const [inputCardLink, setInputCardLink] = React.useState("");

  function handleCardName(evt) {
    setInputCardName(evt.target.value);
  }

  function handleCardLink(evt) {
    setInputCardLink(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name: inputCardName, link: inputCardLink });
  }

  return (
    <PopupWithForm
      button="Создать"
      title="Новое место"
      formId="add-card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(e) => handleSubmit(e)}
      isLoadingPopup={isLoadingPopup}
    >
      <input
        id="name-input"
        type="text"
        className="popup__input popup__input_type_name"
        autoComplete="off"
        placeholder="Название"
        name="name"
        value={inputCardName}
        onChange={(e) => handleCardName(e)}
        minLength="2"
        maxLength="30"
        required
      />
      <span id="name-input-error" className="popup__input-error"></span>
      <input
        id="url-input"
        type="url"
        className="popup__input popup__input_type_about"
        autoComplete="off"
        placeholder="Ссылка на картинку"
        value={inputCardLink}
        onChange={(e) => handleCardLink(e)}
        name="link"
        required
      />
      <span id="url-input-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
