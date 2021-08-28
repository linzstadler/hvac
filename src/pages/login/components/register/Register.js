import * as React from "react";
import style from './Register.module.sass'
import AuthService from "./../../services/AuthService";
import {Button, Divider, Form, Input, message, Select} from "antd";
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";
const {Option} = Select;

const Register = () => {
    const history = useHistory();
    const onFinish = (values) => {
        AuthService.register(values.username, values.password, values.confirmPassword, values.role, history).then(
            response => {
                message.success({ content: 'ثبت نام باموفقیت انجام شد.'});

            },
            error => {
                message.error({ content: 'ثبت نام با خطا انجام شد.'});
            }
        );
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <div className={style.register}>
                <div className={style.all}>

                    <div className={style.body}>
                        <h3>حساب کاربری بسازید</h3>
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
                            <label className="mt-1">
                                <span>تکرار کلمه عبور:</span>
                                <Form.Item
                                    name="confirmPassword"
                                    rules={[{required: true, message: 'تکرار کلمه عبور را وارد کنید'}]}
                                >
                                    <Input.Password/>
                                </Form.Item>
                            </label>
                            <label className="mt-1">
                                <span>نقش کاربر:</span>
                                <Form.Item name="role" rules={[{required: true}]}>
                                    <Select
                                        placeholder="Select a option and change input text above"
                                        allowClear
                                    >
                                        <Option value="client">کاربر</Option>
                                        <Option value="admin">ادمین</Option>
                                        <Option value="superAdmin">سوپر ادمین</Option>
                                    </Select>
                                </Form.Item>
                            </label>
                            <Form.Item>
                                <Button className={"primary_btn block " + style.primary_btn} htmlType="submit">
                                    ورود
                                </Button>
                            </Form.Item>
                        </Form>
                        <Divider/>
                        <div className={"text_center " + style.newAccount}>
                            <Link to={`/auth/login`}>وارد حساب کاربری شوید!</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
