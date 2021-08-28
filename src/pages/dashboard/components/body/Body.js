import * as React from "react";
import style from './Body.module.sass'
import {Col, Popover, Row, message} from "antd";
import UserHeadset from "../../../../assets/icons/light/user-headset.svg";
import TachometerFastest from "../../../../assets/icons/light/tachometer-fastest.svg";
import TemperatureAvg from "./components/temperature-avg/TemperatureAvg";
import InstantConsumption from "./components/instant-consumption/InstantConsumption";
import AllConsumptionChart from "./components/all-consumption-chart/AllConsumptionChart";
import {useHistory} from "react-router-dom";
import SubsidiaryConsumptionChart from "./components/subsidiary-consumption-chart/SubsidiaryConsumptionChart";
import StateConsumptionChart from "./components/state-consumption-chart/StateConsumptionChart";
import ReportService from "./services/ReportService";
import TemperatureHigh from "../../../../assets/icons/light/temperature-high.svg";
import TemperatureLow from "../../../../assets/icons/light/temperature-low.svg";
import TemperatureFrigid from "../../../../assets/icons/light/temperature-frigid.svg";
import NetworkWired from "../../../../assets/icons/light/network-wired.svg";
import {useEffect, useState} from "react";
import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined";
import {withGlobalState} from "react-globally";

const key1 = 'updatable1';
const key2 = 'updatable2';
const Body = (props) => {
    const history = useHistory()
    const [gCoolers, setGCoolers] = useState('-/-');
    const [getAllSumTemp, setGetAllSumTemp] = useState(null);
    const [getAllSumPower, setGetAllSumPower] = useState(null);
    const [getSumOfPower, setGetSumOfPower] = useState(null);
    const [forceOff, setForceOff] = useState(null)
    useEffect(() => {
        props.setGlobalState(prevGlobalState => ({
            routeState: 'داشبورد'
        }))
        const unsubscribe = ReportService.gCoolers(history).then(
            response => {

                if (response) {
                    setGCoolers(`${response.data.NumberTurnOnGCoolers.toString()}/${response.data.NumberOfActiveCoolers.toString()}`)
                }
            },
            error => {
                console.log(error)
            }
        );
        ReportService.getAllSumTemp(history).then(
            response => {
                if (response) {
                    setGetAllSumTemp(response.data.midTempInADay)
                }
            },
            error => {
                console.log(error)
            }
        );
        ReportService.getAllSumPower(history).then(
            response => {
                if (response) {
                    setGetAllSumPower(response.data.SumOfPower)
                }
            },
            error => {
                console.log(error)
            }
        );
        ReportService.getSumOfPower(history).then(
            response => {
                if (response) {
                    const result = response.data.SumPower === 0 ? 0 : (response.data.SumPower / 1000)
                    setGetSumOfPower(result)
                }
            },
            error => {
                console.log(error)
            }
        );
        superAdminForceOff();
        return ReportService.cancel
    }, []);


    function powerOff() {
        message.loading({content: 'در حال انجام...', key1});
        ReportService.superAdminForceOff(history).then(
            response => {
                if (response) {
                    setForceOff(false)
                    message.success({content: 'دستگاه ها با موفقیت خاموش شدند!', key1, duration: 3});
                }
            },
            error => {
                message.success({content: 'مشکلی پیش آمد', key1, duration: 3});
            }
        );
    }

    // اجازه روشن کردن دستگاه به صورت دستی
    function activate() {
        message.loading({content: 'در حال انجام...', key1});
        ReportService.turnOffForceOff(history).then(
            response => {
                if (response) {
                    setForceOff(true)
                    message.success({content: 'دستگاه ها با موفقیت خاموش شدند!', key1, duration: 3});
                }
            },
            error => {
                message.success({content: 'مشکلی پیش آمد', key1, duration: 3});
            }
        );
    }

    function superAdminForceOff() {
        ReportService.getSuperAdminPolicy(history).then(
            response => {
                if (response) {
                    setForceOff(response.data.superAdminPolicy.forceOff)
                }
            },
            error => {

            }
        );
    }

    function turnOn() {
        message.loading({content: 'در حال انجام...', key2});
        ReportService.turnOnAllGCooler(history).then(
            response => {
                if (response) {

                    message.success({content: 'دستگاه ها با موفقیت روشن شدند!', key2, duration: 3});
                }
            },
            error => {
                message.success({content: 'مشکلی پیش آمد', key2, duration: 3});
            }
        );
    }

    return (
        <>
            <div className={style.body}>
                <div className={style.cardArea}>
                    <Row align="middle">


                        <Col xs={19} sm={19} md={19} lg={19} xl={17}>
                            <Row gutter={32}>

                                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                    <div className={"white_container " + style.card}>
                                        <Row gutter={20} align='middle'>
                                            <Col flex="70px">
                                                <div className={style.iconArea}>
                                                    <TemperatureHigh className={"svg_icon " + style.svgIcon}/>
                                                </div>
                                            </Col>
                                            <Col flex="auto">
                                                <h3><b>{getSumOfPower === null ? '-' : getSumOfPower.toFixed(2) + 'kW/h'}</b></h3>
                                                <h5>کل مصرف کنونی امور</h5>
                                            </Col>
                                        </Row>


                                    </div>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                    <div className={"white_container " + style.card}>
                                        <Row gutter={20} align='middle'>
                                            <Col flex="70px">
                                                <div className={style.iconArea}>
                                                    <TemperatureLow className={"svg_icon " + style.svgIcon}/>
                                                </div>
                                            </Col>
                                            <Col flex="auto">
                                                <h3><b>{getAllSumPower === null ? '-' : (getAllSumPower / 1000).toFixed(2) + 'kW/h'}</b>
                                                </h3>
                                                <h5>کل مصرف امروز</h5>
                                            </Col>
                                        </Row>


                                    </div>

                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                    <div className={"white_container " + style.card}>
                                        <Row gutter={20} align='middle'>
                                            <Col flex="70px">
                                                <div className={style.iconArea}>
                                                    <TemperatureFrigid className={"svg_icon " + style.svgIcon}/>
                                                </div>
                                            </Col>
                                            <Col flex="auto">
                                                <h3><b>{getAllSumTemp === null ? '-' : getAllSumTemp.toFixed(2) + 'C'}</b></h3>
                                                <h5>دمای متوسط روز</h5>
                                            </Col>
                                        </Row>


                                    </div>

                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                    <div className={"white_container " + style.card}>
                                        <Row gutter={20} align='middle'>
                                            <Col flex="70px">
                                                <div className={style.iconArea}>
                                                    <NetworkWired className={"svg_icon " + style.svgIcon}/>
                                                </div>
                                            </Col>
                                            <Col flex="auto">
                                                <h3><b>{gCoolers}</b></h3>
                                                <h5>تعداد دستگاه های روشن</h5>
                                            </Col>
                                        </Row>


                                    </div>

                                </Col>
                            </Row>
                        </Col>
                        <Col xs={5} sm={5} md={6} lg={6} xl={7}>
                            <div className={"text_center " + style.shortcuts}>
                                <Popover content="تست نرم افزار" title="" trigger="hover">
                                    <a href="#" onClick={e => turnOn()}><TachometerFastest
                                        className={"svg_icon " + style.svgIcon}/></a>
                                </Popover>

                                {(() => {
                                    if (forceOff === null) {
                                        return (
                                            <a className={style.loading}><LoadingOutlined /></a>
                                        )
                                    } else if (forceOff === false) {
                                        return (
                                            <Popover content="فعال کردن تمام دستگاه ها" title="" trigger="hover">
                                                <a href="#" className={style.powerOn} onClick={e => activate()}>ON</a>

                                            </Popover>
                                        )
                                    } else {
                                        return (
                                            <Popover content="خاموش کردن تمام دستگاه ها" title="" trigger="hover">
                                                <a href="#" className={style.powerOff} onClick={e => powerOff()}>OFF</a>

                                            </Popover>
                                        )
                                    }
                                })()}

                                <Popover content="درخواست پشتیبانی" title="" trigger="hover">
                                    <a href="#" onClick={e => e.preventDefault()}><UserHeadset
                                        className={"svg_icon " + style.svgIcon}/></a>
                                </Popover>
                            </div>
                        </Col>
                    </Row>

                </div>
                <div className={style.chartsArea}>
                    <Row gutter={32}>
                        <Col xs={19} sm={19} md={19} lg={19} xl={17}>
                            <AllConsumptionChart/>
                        </Col>
                        <Col xs={5} sm={5} md={6} lg={5} xl={7}>
                            <TemperatureAvg/>
                            <InstantConsumption/>
                        </Col>
                    </Row>
                    <Row gutter={32}>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <StateConsumptionChart/>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <SubsidiaryConsumptionChart/>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
}

export default withGlobalState(Body);
