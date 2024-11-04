## Задание 1:
### List of components from App.js:
1. EditProfilePopup
2. AddPlacePopup
3. PopupWitForm (remove-card confirm)
4. EditAvatarPopup
5. ImagePopup
6. InfoTooltip
7. Header + Footer
8. Main (avatar,name, about of the current user + list of cards) - route "/"
9. Login (/signin)
10. Register (/signup)


### List of components by styles
1. auth-from
2. card
3. content
4. footer+header
5. login
6. page
7. places
8. popup
9. profile


### routes
/signin
/signup
/ (main, protectedroute) (if you are not logged in, it will redirect to /signin)


### deps:
1. testing:
   "@testing-library/jest-dom": "^5.11.4",
   "@testing-library/react": "^11.1.0",
   "@testing-library/user-event": "^12.1.10",
2. framework:
   "react": "^17.0.2",
   "react-dom": "^17.0.2",
   "react-scripts": "4.0.3",
3. routing:
   "react-router-dom": "^5.2.0",
4. monitoring:
   "web-vitals": "^1.0.1"

### state:
React.useState

### utils:
api.js - api client for backend (content + media)
auth.js - api for authentication and authorization 

### runtime or build time ?
Предположим что есть несколько команд (раз нам пришла в голову идея разделить это приложение), которые хотят 
разрабатывать независимо. Так же предположим что у нас уже используется k8s и настроить CI/CD для нас не проблема.

В этом случае выбираем runtime метод интеграции. 

Т.к. build time имеет ряд недостатков. Самые неприятные из них:
1. Если появятся изменения в зависимостях, вам придётся развёртывать пакет заново.
2. Нужно синхронизировать разные версии библиотек, иначе возникнут проблемы со сборкой.

А плюсы - упрощение развертывания, тесное взаимодействие ф-й, оптимизация производительности - исходя из предположений,
для нас не входят в ключевые требования

Runtime метод же больше подходит под предположения. 

### Метод компоновки

Судя по функционалу (основной роут закрыт за авторизацией) плюсы серверной компоновки - подходит для SEO - нем не нужны. 
Усложнять логику с Service Side Rendering мы также не хотим.
Поэтому выбираем клиентскую компоновку.

### Инструмент

Предположим что проект планируют развивать. В частности: появится новый функционал с большим количеством форм.
Мы не знаем какой фреймворк мы выберем для нового функционала и хотим отложить это решение на потом - в компании нет 
каких-то регламентов, что надо обязательно использовать React. Так, чтобы оставить себе возможность выбрать фреймворк
в будущем, сейчас мы выбираем Single SPA.

### Microfrontend decomposition

1. root-config (приложение-контейнер)
2. header + footer
3. mf-profile 
4. mf-auth
5. mf-cards


