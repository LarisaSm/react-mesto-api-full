import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({
  cardId,
  src,
  nameImg,
  like,
  onCardClick,
  onCardLike,
  onCardDelete,
  ownerId,
  setConfirmOpen,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = ownerId === currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `element__trash ${
    isOwn ? " " : "element__trash_invisible"
  }`;


  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = like.some((i) => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_type_active" : " "
  }`;

  function handleImgClick() {
    onCardClick({ src, nameImg });
  }

  function handleLikeClick() {
    // console.log("========LIKE=======");
    // console.log(like);
    onCardLike(like, cardId);
  }

  function handleDeleteClick() {
    setConfirmOpen(true);
    onCardDelete({
      ownerId: ownerId,
      cardId: cardId,
    });
  }

  return (
    <div className="element">
      <img
        src={src}
        alt={nameImg}
        className="element__img"
        onClick={handleImgClick}
      />
      <div className="element__name">
        <h3 className="element__title">{nameImg}</h3>
        <div className="element__likes">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="element__like-counter">{like.length}</p>
        </div>
      </div>
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteClick}
      ></button>
    </div>
  );
}

export default Card;
