import React from "react";
import { Switch } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ProtectedRoute from "./ProtectedRoute";
import { EVENT_NAME_CLOSE_ALL_POPUPS, EVENT_NAME_USER_UPDATED, getApiClient } from "@fourcheese-pizza/mf-common"
import Profile from "./Profile";

function App() {
  const api = getApiClient()
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  // В корневом компоненте App создана стейт-переменная currentUser. Она используется в качестве значения для провайдера контекста.
  const [currentUser, setCurrentUser] = React.useState({});


 React.useEffect(() => {
     api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  const closeAllPopupEventDetail = 'profile popup';
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
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

  function handleUpdateUser(userUpdate) {
    api
      .setUserInfo(userUpdate)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        document.dispatchEvent(new CustomEvent(EVENT_NAME_USER_UPDATED, {detail: newUserData}))
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatarUpdate) {
    api
      .setUserAvatar(avatarUpdate)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        document.dispatchEvent(new CustomEvent(EVENT_NAME_USER_UPDATED, {detail: newUserData}))
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return (
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Profile}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
          />
        </Switch>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          onClose={closeAllPopups}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
  );
}

export default App;
