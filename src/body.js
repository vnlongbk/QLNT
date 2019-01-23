import React, { Component } from 'react';
import Menu from './components/menu';
import Content from './components/content'

class Body extends Component {
  render() {
    return (
        <div style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                height: 'auto',
                position:'relative'
            }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                width: 260
            }} >
            <Menu />
            </div>
                <div style={{
                display: 'flex',
                flexDirection: 'row',
                padding: 20,
                float:"right",
                width:'calc(100% - 260px)'
            }} >
            <Content /> 
            </div>
        </div>
        );
    }
}

export default Body;