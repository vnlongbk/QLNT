import React, { Component } from 'react';
import Header from './components/head'

class header extends Component {
  render() {
    return (
      <div style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        height: 55,
        width: '100%'
      }}>
        <Header />
      </div>
    );
  }
}

export default header;
