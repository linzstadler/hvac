import * as React from "react";
import style from './Head.module.sass'
import {Col, Popover, Row} from "antd";
import {Link} from "react-router-dom";
import profile from './../../../../assets/img/profile-photo.png'
import {useHistory} from "react-router-dom";
import {withGlobalState} from "react-globally";

const content = (
    <div style={{width: '100px'}}>
        <Link to={`/auth/login`}>خروج</Link>
    </div>
);
const Head = ({ globalState }) => {
    const history = useHistory();

    return (
        <>
            <div className={style.head}>
                <Row>

                    <Col xs={12} sm={12} md={12} lg={12} xl={22}>
                        <h2>{globalState.routeState}</h2>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={2}>
                        <div className="text_left">
                            <Popover content={content} title="" trigger="click">
                                <a href="" className={style.profile}>
                                    <Row align="middle">
                                        <Col flex="auto">
                                            <h4>کاربر گرامی</h4>
                                        </Col>
                                        <Col flex="30px">
                                            <img
                                                src={profile}/>
                                        </Col>
                                    </Row>
                                </a>
                            </Popover>

                        </div>
                    </Col>
                </Row>

            </div>
        </>
    );
}

export default withGlobalState(Head);
