import React, { Component } from 'react'
import Login from './components/login'

class LoginView extends Component {
  render() {
    return (
        <div style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                height: '100vh',
                position:'relative'
            }}>
            <Login />
        </div>
    );
    }
}

export default LoginView;