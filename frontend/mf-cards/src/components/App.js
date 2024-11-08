import React from "react";
import { Switch } from "react-router-dom";
import CardList from "./CardList";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import { EVENT_NAME_CLOSE_ALL_POPUPS, EVENT_NAME_USER_UPDATED, getApiClient } from "@fourcheese-pizza/mf-common"

function App() {
  const api = getApiClient()
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);

  // В корневом компоненте App создана стейт-переменная currentUser. Она используется в качестве значения для провайдера контекста.
  const [currentUser, setCurrentUser] = React.useState({});

  // Запрос к API за информацией о пользователе и массиве карточек выполняется единожды, при монтировании.
  React.useEffect(() => {
    api
      .getCardList()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  const closeAllPopupEventDetail = 'card popup';
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    document.dispatchEvent(new CustomEvent(EVENT_NAME_CLOSE_ALL_POPUPS, {detail: closeAllPopupEventDetail}));
  }
  React.useEffect(() => {
    const listener = (event) => {
      if (event.detail === closeAllPopupEventDetail) {
        return
      }
      closeAllPopups()
    }
    document.addEventListener(EVENT_NAME_CLOSE_ALL_POPUPS, listener)
    return () => {
      document.removeEventListener(EVENT_NAME_CLOSE_ALL_POPUPS, listener)
    }
  },[])

  React.useEffect(() => {
    const listener = (event) => {
      setCurrentUser(event.detail)

    }
    document.addEventListener(EVENT_NAME_USER_UPDATED, listener)
    return () => {
      document.removeEventListener(EVENT_NAME_USER_UPDATED, listener)
    }
  },[])

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .addCard(newCard)
      .then((newCardFull) => {
        setCards([newCardFull, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return (
    // В компонент App внедрён контекст через CurrentUserContext.Provider
    <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={CardList}
            cards={cards}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        </Switch>
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}
          onClose={closeAllPopups}
        />
        <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да" />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
