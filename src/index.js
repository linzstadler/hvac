import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ConfigProvider} from "antd";
import {Provider} from "react-globally";

const initialState = {
    routeState: 'داشبورد'
}
ReactDOM.render(
    // <React.StrictMode>
        <Provider globalState={initialState}>
            <ConfigProvider direction="rtl">
                <App/>
            </ConfigProvider>
        </Provider>,
    // </React.StrictMode>
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
