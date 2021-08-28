import * as React from "react";
import style from './Devices.module.sass'
import {Space, Table, message } from "antd";
import {useEffect, useState} from "react";
import DevicesService from './services/devices.service'
import {useHistory} from "react-router-dom";
import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined";
import {withGlobalState} from "react-globally";
const key1 = 'turnOn';
const key2 = 'turnOff';
const {Column} = Table;
const Devices = (props) => {
    const history = useHistory();
    const [data, setData] = useState([]);

    function turnOffCooler(record) {
        message.loading({ content: 'درحال انجام...', key2 });
        DevicesService.turnOffCooler(history,{aid: record.aid, oid: record.oid, status: 'off'}).then(
            response => {
                message.loading({ content: 'درحال انجام...', key2 });
                if (response) {
                    message.success({ content: 'کولر مورد نظر باموفقت خاموش شد.', key2 });
                    load();
                }
            },
            error => {
                message.error({ content: 'مشکل در ارتباط با سرور', key2 });
                console.log(error)
            }
        );
    }
    function turnOnCooler(record) {
        message.loading({ content: 'درحال انجام...', key1 });
        DevicesService.turnOnCooler(history,{
            aid : record.aid,
            oid : record.oid,
            status : "on",
            temperature : 22,
            engineSpeed : 1}).then(
            response => {
                if (response) {
                    message.success({ content: 'کولر مورد نظر باموفقت روشن شد.', key1 });
                    load();
                }
            },
            error => {
                message.error({ content: 'مشکل در ارتباط با سرور', key1 });
                console.log(error)
            }
        );
    }

    useEffect(() => {
        props.setGlobalState(prevGlobalState => ({
            routeState: 'دستگاه ها'
        }))

        load();

    }, [])
    function load() {
        DevicesService.getAllDevices(history).then(
            response => {
                if (response) {
                    setData(response.data.listOfAllDevices)
                }
            },
            error => {
                console.log(error)
            }
        );
    }

    return (
        <>
            <div className={style.devices} dir="rtl">
                <div className={"white_container"}>
                    {
                        data.length > 0 ? (
                            <Table dataSource={data} pagination = {false}>
                                <Column title="نام ساختمان" dataIndex="departmentOfName" key="oid"/>
                                <Column title="تعداد اتاق" dataIndex="roomOfNumber" key="oid"/>
                                <Column title="نام اتاق" dataIndex="roomOfName" key="oid"/>
                                <Column title="دما" dataIndex="temperature" key="oid"/>
                                <Column title="آخرین دیتای ثبت شده" dataIndex="time" key="oid"/>
                                <Column title="مصرف" dataIndex="powerConsumtion" key="oid"/>
                                <Column title="وضعیت" dataIndex="status" key="oid"/>
                                <Column
                                    title="عملیات"
                                    dataIndex="status"
                                    key="oid"
                                    render={(text, record) => (
                                        <Space size="middle">
                                            {
                                                text === 'on' ?
                                                    <a className={style.danger} onClick={e => turnOffCooler(record)}>خاموش
                                                        کردن</a> :
                                                    <a className={style.success} onClick={e => turnOnCooler(record)}>روشن کردن</a>
                                            }
                                        </Space>
                                    )}
                                />
                            </Table>
                        ) : (
                            <div className="loadingArea"><LoadingOutlined /></div>
                        )


                    }

                </div>
            </div>
        </>
    );
}

export default withGlobalState(Devices);
