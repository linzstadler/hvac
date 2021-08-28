import * as React from "react";
import style from './Dashboard.module.sass'
import Sidebar from "./components/sidebar/Sidebar";
import Head from "./components/head/Head";
import Body from "./components/body/Body";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Devices from "../devices/Devices";
import Log from "../log/Log";
import Report from "../report/Report";


const Dashboard = () => {

    return (
        <>

            <div className={" " + style.dashboard}>
                <div className={style.sidebar}>
                    <Sidebar/>
                </div>
                <div className={style.body}>

                    <Head/>
                    <Switch>
                        <Route path="/" exact component={Body}/>
                        <Route path="/devices" component={Devices}/>
                        <Route path="/log" component={Log}/>
                        <Route path="/report" component={Report}/>
                    </Switch>

                </div>

            </div>
        </>
    );
}

export default Dashboard;
