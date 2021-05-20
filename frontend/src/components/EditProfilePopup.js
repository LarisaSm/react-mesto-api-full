import React from "react";
import PopupWithForm from "./PopupWithForm";

import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoadingPopup }) {
  const [inputAboutValue, setInputAboutValue] = React.useState("");
  const [inputNameValue, setInputNameValue] = React.useState("");
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(evt) {
    setInputNameValue(evt.target.value);
  }

  function handleAboutChange(evt) {
    setInputAboutValue(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(inputNameValue, inputAboutValue);
  }

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setInputAboutValue(currentUser.about);
    setInputNameValue(currentUser.name);
  }, [currentUser]);

  return (
    <PopupWithForm
      button="Сохранить"
      title="Редактировать профиль"
      formId="edit-user"
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
        placeholder="Имя"
        name="name"
        minLength="2"
        maxLength="40"
        value={inputNameValue}
        onChange={(e) => handleNameChange(e)}
        required
      />
      <span id="name-input-error" className="popup__input-error"></span>
      <input
        id="about-input"
        type="text"
        className="popup__input popup__input_type_about"
        autoComplete="off"
        placeholder="О себе"
        name="about"
        value={inputAboutValue}
        minLength="2"
        maxLength="200"
        required
        onChange={handleAboutChange}
      />
      <span id="about-input-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
