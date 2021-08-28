import * as React from "react";
import style from './Login.module.sass'

import logo from './../../assets/img/icon_gray.png'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Register from "./components/register/Register";
import LoginForm from "./components/login-form/LoginForm";

const Login = () => {

    return (
        <>
            <div className={style.login}>
                <div className={style.all}>
                    <div className={style.head}>
                        <img src={logo} className={style.logo}/>
                    </div>
                    <div className={style.body}>
                        <Switch>
                            <Route path="/auth/login" component={LoginForm}/>
                            <Route path="/auth/register" component={Register}/>
                        </Switch>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
