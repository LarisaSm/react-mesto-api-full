import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateAvatar, isLoadingPopup }) {
  const avatarRef = React.useRef();
  // console.log();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      button="Сохранить"
      title="Обновить аватар"
      formId="edit-user-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(e) => handleSubmit(e)}
      isLoadingPopup={isLoadingPopup}
    >
      <input
        id="avatar-input"
        type="url"
        className="popup__input popup__input_type_name"
        autoComplete="off"
        placeholder="Ссылка на аватар"
        name="name"
        ref={avatarRef}
        minLength="2"
        maxLength="200"
        required
      />
      <span id="avatar-input-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
