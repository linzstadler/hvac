import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {hasToken} from './../../services/token.service'

const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={
            props => {
                if (props.location.pathname === "/auth/login") {
                    if (!hasToken()) {
                        return <Component {...rest} {...props} />
                    } else {
                        return <Redirect to={
                            {
                                pathname: '/',
                                state: {
                                    from: props.location
                                }
                            }
                        }/>
                    }
                } else {
                    if (hasToken()) {
                        return <Component {...rest} {...props} />
                    } else {
                        return <Redirect to={
                            {
                                pathname: '/auth/login',
                                state: {
                                    from: props.location
                                }
                            }
                        }/>
                    }
                }
            }
        }/>
    )
}

export default ProtectedRoute;
