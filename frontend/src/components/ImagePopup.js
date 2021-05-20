import React, { useCallback } from 'react';

function ImagePopup ({card, isOpen, onClose}) {
  
  const src = card.src;
  const nameImg = card.nameImg;

  const closeByOverlay = useCallback((evt) => {
    if (evt.target !== evt.currentTarget) return;
    onClose();
  }, [onClose])

  const handleEscClose = useCallback((evt) => {
    if (evt.key === "Escape") {
      onClose();
    }
  }, [onClose])


  React.useEffect(() => {
    if(isOpen) {
      const Popup = document.querySelector('.image');
      Popup.classList.add("popup_opened");
      document.body.addEventListener("keyup", handleEscClose);
      Popup.addEventListener("click", closeByOverlay);
    }
    return () => {
      const Popup = document.querySelector('.image');
      Popup.classList.remove("popup_opened");
      document.body.removeEventListener("keyup", handleEscClose);
      Popup.removeEventListener("click", closeByOverlay);
    };
  }, [isOpen, closeByOverlay, handleEscClose]); 

return (
  <div className="popup image">
    <div className="popup__container image__container">
      <img
        src={src}
        alt={nameImg}
        className="popup__image"
      />
      <p className="popup__figcaption-image">{nameImg}</p>
      <button className="popup__close" type="button" onClick={onClose}></button>
      
    </div>
  </div>
)

}

export default ImagePopup