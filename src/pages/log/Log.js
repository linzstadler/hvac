import * as React from "react";
import style from './Log.module.sass'
import {useEffect, useState} from "react";
import LogService from './../log/services/Log.service'
import {useHistory} from "react-router-dom";
import {Space, Table} from "antd";
import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined";
import {withGlobalState} from "react-globally";

const {Column} = Table;
const Log = (props) => {
    const history = useHistory()
    const [data, setData] = useState(null);
    useEffect(() => {
        props.setGlobalState(prevGlobalState => ({
            routeState: 'لاگ'
        }))
        LogService.getLogs(history).then(
            response => {
                if (response) {
                    setData(response.data.logs)
                }
            },
            error => {
                console.log(error)
            }
        );

    }, []);
    return (
        <>
            <div className={style.log}>
                <div className={"white_container"}>
                    {
                        data ?
                            data.length > 0 ? (
                                <Table dataSource={data} pagination={false}>
                                    <Column title="aid" dataIndex="aid" key="aid"/>
                                    <Column title="تعداد اتاق" dataIndex="roomNumber" key="aid"/>
                                    <Column title="سطح" dataIndex="level" key="aid"/>
                                    <Column
                                        title="تاریخ"
                                        dataIndex="date"
                                        key="oid"
                                        render={(text, record) => (
                                            <div>
                                                {record.date.y}/{record.date.m}/{record.date.d}

                                            </div>
                                        )}
                                    />
                                    <Column title="زمان" dataIndex="time" key="aid"/>
                                    <Column title="توضیحات" dataIndex="detail" key="aid"/>

                                </Table>
                            ) : (
                                <div className="text_center">
                                    داده ای وجود ندارد
                                </div>
                            )
                            : (
                                <div className="loadingArea"><LoadingOutlined/></div>
                            )


                    }
                </div>
            </div>
        </>
    );
}

export default withGlobalState(Log);
