import React from 'react'
import FontAwesome from 'react-fontawesome'
import '../../assets/css/head.css'



export default class Header extends React.Component {
    render () {
        return (
            <div className="head"  style={{
                flexDirection: 'row',
                display: 'flex',
                flex:10,
                height: '55px',
                width: '100%'}} >
                <span className="nav-item d-lg-none" style={{marginTop:14}} >
                    <a>
                    <FontAwesome
                        name='bars'
                        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',fontSize:24 }}
                    />
                    </a>
                </span>
                <div className="logoHeader" ><a><h5 style={{marginTop:10}} >HL Hung-Long Team</h5></a></div>
                <span className="nav-item d-md-down-none" style={{marginTop:14}} >
                    <a>
                    <FontAwesome
                        name='bars'
                        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',fontSize:24 }}
                    />
                    </a>
                </span>
                <ul className='nav d-md-down-none' style={{
                    margin: '8px auto',
                    width: 'auto',
                    height: '20px',
                    color: '#9c27b0'
                }}>
                    <a><h2>Phần mềm quản lí nhà trọ</h2></a>
                </ul>
                <ul className='nav' style={{
                    marginLeft: 'auto',
                    marginTop: 17,
                    marginRight: '1rem'
                }} >
                    <li className='nav-item d-md-down-none' >
                        <a>
                            <FontAwesome
                            color='white'
                            name='bell'
                            size='lg'
                            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                            />
                        </a>
                    </li>
                    <li className='nav-item d-md-down-none' >
                        <a>
                            <FontAwesome
                            name='comment-alt'
                            size='lg'
                            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                            />
                        </a>
                    </li>
                    <li className='d-md-down-none' ></li>
                    <li className='nav-item d-md-down-none' >
                        <a>
                            <FontAwesome
                            name='cog'
                            size='lg'
                            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                            />
                        </a>
                    </li>
                    <li className='d-md-down-none' ></li>
                </ul>
            </div>
        )
    }
}