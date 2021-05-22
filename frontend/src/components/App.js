import React, { useCallback } from "react";
import ImagePopup from "./ImagePopup";
import Confirm from "./Confirm";
import { getInitialCards, addNewCard, editUserInfo, getUserInfo, deleteCard, likeCard, deleteLikeCard,getLikesCard, setUserAvatar } from "../utils/api";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import PageNotFound from "./PageNotFound";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";

import { Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupState] = React.useState(
    false
  );
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setAddPlacerPopupState] = React.useState(false);
  const [isImagePopupOpen, setImagePopupState] = React.useState(false);
  const [isConfirmOpen, setConfirmOpen] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [isConfirmAuth, setConfirmAuth] = React.useState(false);

  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    src: "",
    nameImg: "",
  });
  const [isLoadingConfirm, setIsLoadingConfirm] = React.useState(false);
  const [isLoadingPopup, setIsLoadingPopup] = React.useState(false);

  const [currentUser, setСurrentUser] = React.useState({ name: "", about: "", email: "", token: "" });
  const [currentUserHeaders, setCurrentUserHeaders] = React.useState();

  const [currentCard, setСurrentCard] = React.useState({
    ownerId: "",
    cardId: "",
  });

  // const [userData, setUserData] = React.useState({});

  const [confirmAction, setConfirmAction] = React.useState({});

  const history = useHistory();

  const [loggedIn, setLoggedIn] = React.useState(false);


  // React.useEffect(() => {
  //   console.log('123123123123');
  //   tokenCheck();
  //   console.log()
  // }, []);

  React.useEffect(() => {
      getUserInfo(currentUserHeaders)
      .then((res) => {
        setСurrentUser(res);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }, [currentUserHeaders]);

  React.useEffect(() => {
    getInitialCards(currentUserHeaders)
    .then((res) => {
      setCards(
          res.map((item) => ({
            src: item.link,
            nameImg: item.name,
            like: item.likes,
            cardId: item._id,
            ownerId: item.owner,
          }))
        );
        setIsLoading(false);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
}, [currentUserHeaders]);



  function closeAllPopups() {
    setEditProfilePopupState(false);
    setEditAvatarPopupState(false);
    setAddPlacerPopupState(false);
    setImagePopupState(false);
    setInfoTooltipOpen(false);
    setSelectedCard([]);
    setIsLoadingPopup(false);
    setСurrentCard({
      ownerId: "",
      cardId: "",
    });
  }

  function handleCardClick({ src, nameImg }) {
    setSelectedCard({ src, nameImg });
    setImagePopupState(true);
  }

  function handleConfirmClick() {
    setConfirmOpen(true);
  }

  function handleEditProfileClick(evt) {
    evt.preventDefault();
    setEditProfilePopupState(true);
  }

  function handleEditAvatarClick(e) {
    e.preventDefault();
    setEditAvatarPopupState(true);
  }

  function handleAddPlaceClick(evt) {
    evt.preventDefault();
    setAddPlacerPopupState(true);
  }

  function cardDelete() {
    const isOwn = currentCard.ownerId === currentUser._id;
    if (isOwn) {
        deleteCard(currentCard.cardId, currentUserHeaders)
        .then(() => {
          const newCards = cards.filter((c) => c.cardId !== currentCard.cardId);
          setCards(newCards);
        })
        .then(() => {
          setConfirmOpen(false);
          setIsLoadingConfirm(false);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  }

  function handleCardDelete(obj) {
    setConfirmAction("cardDelete");
    setСurrentCard({
      ownerId: obj.ownerId,
      cardId: obj.cardId,
    });
  }

  function handleCardLike(like, cardId) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = like.some((i) => i === currentUser._id);
    // console.log('main -> handleCardLike');
    if (!isLiked) {
      // console.log("main -> handleCardLike -> like")
      likeCard(cardId, currentUserHeaders)
        .then((newCard) => {
          const newCards = cards.map((c) =>
            c.cardId === newCard._id
              ? {
                  src: newCard.link,
                  nameImg: newCard.name,
                  like: newCard.likes,
                  cardId: newCard._id,
                  ownerId: newCard.owner,
                }
              : c
          );
          setCards(newCards);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    } else {
      // console.log("main -> handleCardLike -> deleteLike")
      deleteLikeCard(cardId, currentUserHeaders)
        .then((newCard) => {
          const newCards = cards.map((c) =>
            c.cardId === newCard._id
              ? {
                  src: newCard.link,
                  nameImg: newCard.name,
                  like: newCard.likes,
                  cardId: newCard._id,
                  ownerId: newCard.owner,
                }
              : c
          );
          setCards(newCards);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  }

  function handleUpdateUser(name, about) {
    setIsLoadingPopup(true);
    editUserInfo(name, about, currentUserHeaders)
      .then((res) => setСurrentUser(res))
      .then(() => {
        setIsLoadingPopup(false);
        setEditProfilePopupState(false);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleUpdateAvatar(obj) {
    setIsLoadingPopup(true);
    setUserAvatar(obj.avatar, currentUserHeaders)
      .then((res) => setСurrentUser(res))
      .then(() => {
        setIsLoadingPopup(false);
        setEditAvatarPopupState(false);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleAddPlaceSubmit(obj) {
    setIsLoadingPopup(true);
    addNewCard(obj.name, obj.link, currentUserHeaders)
      .then((newCard) => {
        newCard.key = newCard._id;
        newCard.like = newCard.likes;
        newCard.ownerId = newCard.owner;
        newCard.src = newCard.link;
        newCard.nameImg = newCard.name;
        newCard.cardId = newCard._id;
        setCards([newCard, ...cards]);
      })
      .then(() => {
        setIsLoadingPopup(false);
        setAddPlacerPopupState(false);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleLogin(inputEmailValue, inputPassValue) {
    auth
      .authorize(inputPassValue, inputEmailValue)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          // setUserData({ email: inputEmailValue });
          setСurrentUser({ email: inputEmailValue });
          setCurrentUserHeaders(data.token);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegister(inputPassValue, inputEmailValue) {
    auth
      .register(inputPassValue, inputEmailValue)
      .then((data) => {
        if (data._id) {
          setConfirmAuth(true);
          history.push("/sign-in");
        }
        setInfoTooltipOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setConfirmAuth(false);
        setInfoTooltipOpen(true);
      });
  }

  function signOut() {
    localStorage.removeItem("jwt");
    history.push("/sign-in");
  }

  function tokenCheck () {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      // проверим токен
      auth
        .getContent(jwt)
        .then((res) => {
          console.log(res);
          if (res) {
            // авторизуем пользователя
            setLoggedIn(true);
            // setUserData({ email: res.data.email });
            setСurrentUser({ email: res.email });
            setCurrentUserHeaders(jwt);

            // обернём App.js в withRouter
            // так, что теперь есть доступ к этому методу
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  }

  React.useEffect(() => {
    console.log("use effect 1");
    setIsLoading(true);
    tokenCheck();
    getInitialCards(currentUserHeaders)
      .then((res) => {
        setCards(
          res.map((item) => ({
            src: item.link,
            nameImg: item.name,
            like: item.likes,
            cardId: item._id,
            ownerId: item.owner,
          }))
        );
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }, []);

  React.useEffect(() => {
    console.log("use effect 2");

    getUserInfo(currentUserHeaders)
    .then((res) => {
      setСurrentUser(res);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
}, [currentUserHeaders]);

React.useEffect(() => {
  console.log("use effect 3");

  getInitialCards(currentUserHeaders)
  .then((res) => {
    setCards(
        res.map((item) => ({
          src: item.link,
          nameImg: item.name,
          like: item.likes,
          cardId: item._id,
          ownerId: item.owner,
        }))
      );
      setIsLoading(false);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
}, [currentUserHeaders]);


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header loggedIn={loggedIn} userData={currentUser} signOut={signOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            loggedIn={loggedIn}
            cards={cards}
            onEditProfile={(e) => handleEditProfileClick(e)}
            onEditAvatar={(e) => handleEditAvatarClick(e)}
            onAddPlace={(e) => handleAddPlaceClick(e)}
            onCardClick={handleCardClick}
            setConfirmOpen={handleConfirmClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            isLoading={isLoading}
          />
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>
          {/* <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route> */}
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoadingPopup={isLoadingPopup}
        ></EditProfilePopup>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoadingPopup={isLoadingPopup}
        ></EditAvatarPopup>
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoadingPopup={isLoadingPopup}
        ></AddPlacePopup>

        <Confirm
          isOpen={isConfirmOpen}
          setIsOpen={setConfirmOpen}
          confirmAction={confirmAction}
          setСurrentUser={setСurrentUser}
          isLoadingConfirm={isLoadingConfirm}
          setIsLoadingConfirm={setIsLoadingConfirm}
          cardDelete={cardDelete}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isConfirmAuth={isConfirmAuth}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
