
import React, { Component } from 'react'

import {
    Router,
    Route,
    Switch
} from 'react-router-dom'

import Header from './header'
import Body from './body'
import Login from './login'
import { createBrowserHistory } from 'history'

const Dashboard = () => (!localStorage.getItem('token'))
    ? window.location.href = '/login'
    : (
    <div>
        <Header />
        <Body />
    </div>
)

const history = createBrowserHistory()

export default class App extends Component {
    render() {
        return <div style={{ flex:10, borderRadius: 10 }} >
            <Router history={history}>
                <Switch>
                    <div style={{ flex:10, borderRadius: 10 }} >
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/" component={Dashboard}/>
                    </div>
                </Switch>
            </Router>
        </div>
    }
}