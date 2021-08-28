import * as React from "react";
import style from './Report.module.sass'
import {Space, Table, message, Col, Row, Select, Radio, Button, Divider} from "antd";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import ReportService from "../dashboard/components/body/services/ReportService";
import {withGlobalState} from "react-globally";
import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined";

const {Option} = Select;

const Report = (props) => {

    const [columns, setColumns] = useState([])


    const history = useHistory();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(null);
    const [value, setValue] = React.useState('temperature');
    const [date, setDate] = React.useState('today');
    const onRadioChange = e => {
        setValue(e.target.value);
    };

    function handleSubscribersChange(value) {
        setDate(value)
    }

    useEffect(() => {
        props.setGlobalState(prevGlobalState => ({
            routeState: 'گزارش'
        }))
    }, [])

    function columnGenerator(data, result) {
        const len = 1;
        const cols = [
            {
                title: 'aid',
                width: 100,
                dataIndex: 'aid',
                key: 'aid',
                fixed: 'left',
            }, {
                title: 'شماره اتاق',
                width: 100,
                dataIndex: 'roomNumber',
                key: 'aid',
                fixed: 'left',
            }
        ];
        data.dates.map(item => {
            cols.push({
                title: `${item.year}/${item.month}/${item.day}`,
                width: 230,
                render: (text, record) => (
                    <div className={style.temperatureConsumArea}>
                        <Row gutter={16} align="middle">
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <div className={"text_center " + style.consumtionArea}>
                                    {record[`powerConsumtion${item.year}${item.month}${item.day}`]}
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <div className={"text_center " + style.temperatureArea}>
                                    {record[`temperature${item.year}${item.month}${item.day}`] ? record[`temperature${item.year}${item.month}${item.day}`].toFixed(2) : 'null'}
                                </div>
                            </Col>
                        </Row>

                    </div>
                ),
            })
        })
        setColumns(cols);
        setData(result)

    }

    function submit() {
        setLoading(true)
        ReportService.getTempAndPower(history, date).then(
            response => {
                if (response) {
                    // columnGenerator(response.data);
                    const result = dataPack(response.data);
                    columnGenerator(response.data, result);
                }
                setLoading(false)
            },
            error => {
                setLoading(false)
                console.log(error)
            }
        );
    }

    const dataPack = (data) => {
        if (data.dates.length > 0) {

            const filter = data.allData.filter(item => item.date === `${data.dates[0].year}${data.dates[0].month}${data.dates[0].day}`);
            const result = []
            filter.map(dataItem => {
                const aidFilter = data.allData.filter(item => item.aid === dataItem.aid);
                const obj = {
                    aid: null,
                    roomNumber: null
                }
                aidFilter.map((item, index) => {
                    if (index === 0) {
                        obj.aid = item.aid;
                        obj.roomNumber = item.roomNumber;
                        obj[`temperature${item.date}`] = item.temperature
                        obj[`powerConsumtion${item.date}`] = item.powerConsumtion;
                    } else {
                        obj[`temperature${item.date}`] = item.temperature
                        obj[`powerConsumtion${item.date}`] = item.powerConsumtion;
                    }
                });
                result.push(obj)
            });
            return result;
        }
    }
    return (
        <>
            <div className={style.devices} dir="rtl">
                <div className={"white_container"}>
                    <div className={style.area}>
                        <Row gutter={32} align="bottom">
                            <Col xs={19} sm={19} md={19} lg={19} xl={6}>
                                <label>نام امور:</label>
                                <Select defaultValue="zanjan" onChange={handleSubscribersChange}>
                                    <Option value="zanjan">غرب زنجان</Option>

                                </Select>
                            </Col>
                            <Col xs={19} sm={19} md={19} lg={19} xl={6}>
                                <label>بازه زمانی:</label>
                                <Select defaultValue="today" onChange={handleSubscribersChange}>
                                    <Option value="today">امروز</Option>
                                    <Option value="yesterday">روز گذشته</Option>
                                    <Option value="current_week">هفته جاری</Option>
                                    <Option value="last_week">هفته گذشته</Option>
                                    <Option value="current_month">ماه جاری</Option>
                                    <Option value="last_month">ماه گذشته</Option>
                                    <Option value="current_year">سال جاری</Option>

                                </Select>
                            </Col>

                            <Col xs={19} sm={19} md={19} lg={19} xl={12}>
                                <div className="text_left">
                                    <Button className={"primary_btn block " + style.primary_btn} onClick={submit}>
                                        دریافت گزارش
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className={style.dataArea}>
                        {
                            loading !== null && (
                                <>
                                    <Divider/>
                                    <div className={style.guide}>
                                        <Row gutter={16} align="middle">
                                            <Col xs={6} sm={6} md={6} lg={6} xl={6}>

                                            </Col>
                                            <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                                <div className={style.consumtionArea}></div>
                                            </Col>
                                            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                                مصرف
                                            </Col>

                                            <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                                                <div className={style.temperatureArea}></div>
                                            </Col>
                                            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                                دما
                                            </Col>
                                        </Row>
                                    </div>
                                    <div>

                                        {
                                            loading === false ? (
                                                <Table columns={columns} dataSource={data} scroll={{x: 200}}/>

                                            ) : (
                                                <div className="loadingArea"><LoadingOutlined/></div>
                                            )
                                        }
                                    </div>
                                </>
                            )

                        }
                    </div>

                </div>
            </div>
        </>
    );
}

export default withGlobalState(Report);
