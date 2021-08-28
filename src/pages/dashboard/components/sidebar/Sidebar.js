import * as React from "react";
import style from './Sidebar.module.sass'
import logo from "../../../../assets/img/icon_gray.png";
import {Link, NavLink} from "react-router-dom";
import Home from "../../../../assets/icons/light/home.svg";
import Tasks from "../../../../assets/icons/light/tasks.svg";
import FileChartLine from "../../../../assets/icons/light/file-chart-line.svg";
import NetworkWired from "../../../../assets/icons/light/network-wired.svg";
import Database from "../../../../assets/icons/light/database.svg";

const Sidebar = () => {

    return (
        <>
            <div className={style.sidebar}>
                <div className={style.head}>
                    <img src={logo} className={style.logo}/>
                </div>
                <div className={style.body}>
                    <NavLink exact to="/"><Home className = {"svg_icon " + style.svgIcon} activeclassname="activeLink"/>داشبورد</NavLink>
                    {/*<NavLink exact to="/jobs"><Tasks className = {"svg_icon " + style.svgIcon} activeclassname="activeLink" />امور</NavLink>*/}
                    {/*<NavLink exact to={`/report`}><FileChartLine className = {"svg_icon " + style.svgIcon} activeclassname="activeLink" />گزارش گیری</NavLink>*/}
                    <NavLink exact to="/devices"><NetworkWired className = {"svg_icon " + style.svgIcon} activeclassname="activeLink" />دستگاه ها</NavLink>
                    <NavLink exact to={`/log`}><Database className = {"svg_icon " + style.svgIcon} activeclassname="activeLink" />لاگ</NavLink>
                    <NavLink exact to={`/report`}><Database className = {"svg_icon " + style.svgIcon} activeclassname="activeLink" />گزارش</NavLink>

                </div>
            </div>
        </>
    );
}

export default Sidebar;
