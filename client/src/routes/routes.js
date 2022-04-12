import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import UsersPage from '../pages/UsersListPage'
import RegPage from '../pages/SignUpPage'
import AuthPage from "../pages/SignIn"


export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/users" exact component={UsersPage}/>
                <Redirect to="/users"/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact component={AuthPage}/>
            <Route path="/signup" exact component={RegPage}/>
            <Redirect to="/"/>
        </Switch>
    )
}
