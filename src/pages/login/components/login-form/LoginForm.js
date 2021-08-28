import * as React from "react";
import style from './LoginForm.module.sass'
import {Button, Divider, Form, Input, message} from "antd";
import {Link} from "react-router-dom";
import AuthService from "../../services/AuthService";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
    const history = useHistory();
    const onFinish = (values) => {
        AuthService.login(values.username, values.password, history).then(
            response => {
                message.success({ content: 'ورود باموفقیت انجام شد.'});
                history.push("/");
            },
            error => {
                message.error({ content: 'ورود خطا مواجه شد.'});
            }
        );
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>

            <div className={style.LoginForm}>
                <div className={style.all}>
                    <div className={style.body}>
                        <h3>وارد حساب کاربری شوید</h3>
                        <Form
                            name="login"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <label>
                                <span>نام کاربری:</span>
                                <Form.Item
                                    name="username"
                                    rules={[{required: true, message: 'نام کاربری را وارد کنید'}]}
                                >
                                    <Input/>
                                </Form.Item>
                            </label>
                            <label className="mt-1">
                                <span>کلمه عبور:</span>
                                <Form.Item
                                    name="password"
                                    rules={[{required: true, message: 'کلمه عبور را وارد کنید'}]}
                                >
                                    <Input.Password/>
                                </Form.Item>
                            </label>
                            <Form.Item>
                                <Button className={"primary_btn block " + style.primary_btn} htmlType="submit">
                                    ورود
                                </Button>
                            </Form.Item>
                        </Form>
                        <Divider />
                        <div className= {"text_center " + style.newAccount}>
                            <Link to={`/auth/register`}>حساب کاربری بسازید!</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginForm;
