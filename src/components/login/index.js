import React from 'react'
import FontAwesome from 'react-fontawesome'
import '../../assets/css/login.css'
import '../../assets/css/index.css'
import { NotificationContainer, NotificationManager } from 'react-notifications';
// import 'react-notifications/lib/notifications.css'

export default class Login extends React.Component {
    state = {}
    async login() {
        if (!this.state.username) {
            return NotificationManager.error('Tên đăng nhập không được để trống', '')
        }
        if (!this.state.password) {
            return NotificationManager.error('Mật khẩu không được để trống', '')
        }
        const res = await fetch(`http://${process.env.REACT_APP_DEV_API_URL}/user/login`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        const data = await res.json()
        if (!data) {
            NotificationManager.error('Đã có lỗi xảy ra', '');
        } else {
            if (!data.token) {
                NotificationManager.error(data.message, '');
            } else {
                NotificationManager.success(data.message, '')
                await localStorage.setItem('token', data.token)
                if (data.role === 'SUPERADMIN' || data.role === 'MOD') {
                    setTimeout(() => {
                        window.location.href = '/#/'
                    }, 1500)
                } else if (data.role === 'ADMIN') {
                    setTimeout(() => {
                        window.location.href = '/#/'
                    }, 1500)
                }
            }
        }
    }

    render () {
        return (
            <div id="root" style={{
                flexDirection: 'row',
                width: '100%'
                }}>
                <div>
                    <header className="jss557">
                        <div className="jss558">
                            <div className="jss179">
                                <div className="jss3394">
                                    <a className="jss3395" tabIndex="0">
                                        <span className="jss143" > Phần mềm quản lí nhà trọ </span>
                                        <span className="jss167" ></span>
                                    </a>
                                </div>
                            </div>
                            <div className="jss179">
                                <ul className="jss567">
                                    <li className="jss568">
                                        <a className="jss569">
                                            <span style={{ marginTop: '-4px' }} className="nav-item jss570" >
                                                <FontAwesome
                                                    name='user-plus'
                                                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                                />
                                            </span>
                                            <div className="jss571" >đăng kí</div>
                                        </a>
                                    </li>
                                    <li className="jss568">
                                        <a className="jss569">
                                            <span className="nav-item jss570">
                                                <FontAwesome
                                                    name='sign-in'
                                                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', marginRight: '0px' }}
                                                />
                                            </span>
                                            <div className="jss571" >đăng nhập</div>
                                        </a>
                                    </li>
                                    <li className="jss568">
                                        <a className="jss569">
                                            <span className="nav-item jss570">
                                                <FontAwesome
                                                    name='credit-card'
                                                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                                />
                                            </span>
                                            <div className="jss571" >giá dịch vụ</div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </header>
                    <div>
                        <div>
                            <div className="jss578">
                                <div className="jss575">
                                    <div className="jss277">
                                        <div className="jss369">
                                            <form>
                                                <div className="jss386">
                                                    <div className="jss577 primary" style={{ padding: '15px' }} >
                                                        <h4 className="jss576" >Đăng nhập</h4>
                                                    </div>
                                                    <div className="jss426" style={{ width: '330px' }} >
                                                        <div className="form-group" >
                                                            <div className="input-group">
                                                                <div style={{
                                                                    border: '1px solid #ced4da',
                                                                    marginRight: '-1px',
                                                                    borderTopLeftRadius: '0.25rem',
                                                                    borderBottomLeftRadius: '0.25rem',
                                                                    paddingTop: '5px'
                                                                }}>
                                                                    <span>
                                                                        <FontAwesome
                                                                            name='user'
                                                                            size='lg'
                                                                            style={{marginTop: '5px', width: '26px' }}
                                                                        />
                                                                    </span>
                                                                </div>
                                                                <input type="text" id="username" name="username" placeholder="Tên đăng nhập" className="form-control" onChange={(e) => {
                                                                    this.setState({
                                                                        username: e.target.value
                                                                    })
                                                                }} />
                                                            </div>
                                                            <div className="input-group" style={{ marginTop: '15px' }}>
                                                                <div style={{
                                                                    border: '1px solid #ced4da',
                                                                    marginRight: '-1px',
                                                                    borderTopLeftRadius: '0.25rem',
                                                                    borderBottomLeftRadius: '0.25rem',
                                                                    paddingTop: '5px'
                                                                }}>
                                                                    <span>
                                                                        <FontAwesome
                                                                            name='key'
                                                                            size='lg'
                                                                            style={{textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',marginTop: '5px', width: '26px'}}
                                                                        />
                                                                    </span>
                                                                </div>
                                                                <input type="password" id="password" name="password" placeholder="Mật khẩu" className="form-control" onChange={(e) => {
                                                                    this.setState({
                                                                        password: e.target.value
                                                                    })
                                                                }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="jss579">
                                                        <button className="jss120" tabIndex="0" type="submit" id="submit" onClick={(e) => this.login(e.preventDefault())} >
                                                            <span className="jss143 jss121" style={{ margin: 'auto' }}> Đồng ý </span>
                                                            <span className="jss167"></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <footer className="jss483">
                                <div className="jss484">
                                    <h4 className="jss482"> 2018 Hung-Long-Team, make the world better </h4>
                                </div>
                            </footer>
                            <div className="jss566"></div>
                        </div>
                    </div>
                </div>
                <NotificationContainer />
            </div>
        )
    }
}