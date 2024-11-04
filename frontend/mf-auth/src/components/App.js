import React from "react";
import {Route, useHistory, Switch} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import './../blocks/auth-form/auth-form.css'
import {signOutEventType, checkToken, register, login} from "@fourcheese-pizza/mf-common"

export default function App(props) {
    const history = useHistory();
    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
    const [tooltipStatus, setTooltipStatus] = React.useState("");
    function onRegister({ email, password }) {
        register(email, password)
            .then((res) => {
                setTooltipStatus("success");
                setIsInfoToolTipOpen(true);
                history.push("/signin");
            })
            .catch((err) => {
                setTooltipStatus("fail");
                setIsInfoToolTipOpen(true);
            });
    }

    function onLogin({ email, password }) {
        login(email, password)
            .then((res) => {
                history.push("/");
            })
            .catch((err) => {
                setTooltipStatus("fail");
                setIsInfoToolTipOpen(true);
            });
    }
    function closeAllPopups() {
        setIsInfoToolTipOpen(false);
        document.dispatchEvent(new CustomEvent('close all popup', {detail: 'auth popup'}));
    }

    // при монтировании App описан эффект, проверяющий наличие токена и его валидности
    React.useEffect(() => {
        checkToken()
            .then((res) => {
                if (res) {
                    history.push("/");
                }
            });
    }, [history]);

    React.useEffect(() => {
        const listener = () => {
            // После успешного вызова обработчика onSignOut происходит редирект на /signin
            history.push("/signin");
        }
        document.addEventListener(signOutEventType, listener)

        return () => {
            document.removeEventListener(signOutEventType, listener)
        }
    }, [])

    return (
        <>
            <Switch>
                <Route path="/signup">
                    <Register onRegister={onRegister} />
                </Route>
                <Route path="/signin">
                    <Login onLogin={onLogin} />
                </Route>
            </Switch>
            <InfoTooltip
                isOpen={isInfoToolTipOpen}
                onClose={closeAllPopups}
                status={tooltipStatus}
            />
        </>
    );
}

