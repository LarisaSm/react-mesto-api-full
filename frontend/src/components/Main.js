import React from "react";
import Card from "./Card";
import Spinner from "./Spinner";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  cards,
  onCardLike,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  setConfirmOpen,
  isLoading,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);


  return (
    <main className="main page__main">
      <section className="profile main__profile">
        <a href="/#" className="profile__avatar-edit" onClick={onEditAvatar}>
          <img
            src={currentUser.avatar}
            alt="Аватар"
            className="profile__avatar"
          />
        </a>
        <div className="profile__info">
          <div className="profile__name">
            <p className="profile__name-title">{currentUser.name}</p>
            <button
              className="profile__button profile__button_type_edit"
              type="button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          className="profile__button profile__button_type_add "
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements main__elements">
        {isLoading ? (
          <Spinner />
        ) : (
          cards.map(({ cardId, src, nameImg, like, ownerId }) => {
            return (
              <Card
                key={cardId}
                ownerId={ownerId}
                src={src}
                nameImg={nameImg}
                like={like}
                cardId={cardId}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
                setConfirmOpen={setConfirmOpen}
              />
            );
          })
        )}
      </section>
    </main>
  );
}

export default Main;
