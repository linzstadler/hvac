import React from 'react';
import './index.sass';
import {
    Switch,
    Route, BrowserRouter as Router,
} from "react-router-dom";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./shared/routes/ProtectedRoute/ProtectedRoute";

function App() {
    return (
        <div className="App full_height">
            <Router>
                <Switch>
                    <Route path="/auth" component={Login}/>
                    <ProtectedRoute path="/" component={Dashboard}/>

                </Switch>
            </Router>
        </div>
    );
}

export default App;
