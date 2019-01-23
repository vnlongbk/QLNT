import React from 'react'
import { Input } from 'reactstrap';
import '../../../assets/css/content.css'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import FontAwesome from 'react-fontawesome'



export default class User extends React.Component {

    state = {user: []}
    async getUser() {
        const { match: { params } } = this.props;
        const res = await fetch(`http://${process.env.REACT_APP_DEV_API_URL}/user/${params.id}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        const { success, message, user } = await res.json()
        if (success) {
            this.setState({ user })
        } else {
            NotificationManager.error(message, '')
        }
    }

    componentDidMount() {
        this.getUser()
    }
    render() {
        return (
            <div style={{
                flex:10,
                borderRadius: 10
            }} >
                <div className="col-sm-4" >
                    <div className="card-header" ><h5>Thông tin người dùng</h5></div>
                    <div className="form-body" >
                        <form method="post" >
                            <div className="form-group">
                                <div className="input-group" >
                                    <div style={{
                                        border: '1px solid #ced4da',
                                        marginRight: '-1px',
                                        borderTopLeftRadius: '0.25rem',
                                        borderBottomLeftRadius:'0.25rem',
                                    }}>
                                        <span  >
                                            <FontAwesome
                                                name='user'
                                                size='lg'
                                                style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', marginTop:'9px' }}
                                            />
                                        </span>
                                    </div>
                                    <input type="text" id="name" name="name" placeholder="Nhập tên" className="form-control" ></input>
                                </div>
                            </div>
                            <div className="form-group" >
                                <div className="input-group" >
                                        <div style={{
                                            border: '1px solid #ced4da',
                                            marginRight: '-1px',
                                            borderTopLeftRadius: '0.25rem',
                                            borderBottomLeftRadius:'0.25rem',
                                        }} >
                                            <span  >
                                                <FontAwesome
                                                    name='phone'
                                                    size='lg'
                                                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', marginTop:'9px',width:'26px' }}
                                                />
                                            </span>
                                        </div>
                                        <input type="text" id="phone" name="phone" placeholder="Nhập số điện thoại" className="form-control" ></input>
                                </div>
                            </div>
                            <div className="form-group" >
                                <div className="input-group" >
                                        <div style={{
                                            border: '1px solid #ced4da',
                                            marginRight: '-1px',
                                            borderTopLeftRadius: '0.25rem',
                                            borderBottomLeftRadius:'0.25rem',
                                            
                                        }} >
                                            <span  >
                                                <FontAwesome
                                                    name='address-card'
                                                    size='lg'
                                                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', marginTop:'9px',width:'26px' }}
                                                />
                                            </span>
                                        </div>
                                        <input type="text" id="cmnd" name="cmnd" placeholder="Nhập số chứng minh" className="form-control" ></input>
                                </div>
                            </div>
                            <div className="form-group" >
                                <div className="input-group" >
                                        <div style={{
                                            border: '1px solid #ced4da',
                                            marginRight: '-1px',
                                            borderTopLeftRadius: '0.25rem',
                                            borderBottomLeftRadius:'0.25rem',
                                        }} >
                                            <span  >
                                                <FontAwesome
                                                    name='birthday-cake'
                                                    size='lg'
                                                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', marginTop:'9px',width:'26px' }}
                                                />
                                            </span>
                                        </div>
                                        <input type="text" id="birth" name="birth" placeholder="dd/mm/yy" className="form-control" ></input>
                                </div>
                            </div>
                            <div className="form-group" >
                                <div className="input-group" >
                                        <div style={{
                                            border: '1px solid #ced4da',
                                            marginRight: '-1px',
                                            borderTopLeftRadius: '0.25rem',
                                            borderBottomLeftRadius:'0.25rem',
                                        }} >
                                            <span  >
                                                <FontAwesome
                                                    name='home'
                                                    size='lg'
                                                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', marginTop:'9px',width:'26px' }}
                                                />
                                            </span>
                                        </div>
                                        <input type="text" id="hometown" name="hometown" placeholder="Nhập quê quán" className="form-control" ></input>
                                </div>
                            </div>
                            <div className="form-group" >
                                <div className="input-group" >
                                        <div style={{
                                            border: '1px solid #ced4da',
                                            marginRight: '-1px',
                                            borderTopLeftRadius: '0.25rem',
                                            borderBottomLeftRadius:'0.25rem',
                                        }} >
                                            <span  >
                                                <FontAwesome
                                                    name='user-secret'
                                                    size='lg'
                                                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', marginTop:'9px',width:'26px' }}
                                                />
                                            </span>
                                        </div>
                                        <Input  id="img" name="img" className="form-control" placeholder="Chỗ đăng hình đại diện(chưa cập nhật)"></Input>       
                                </div>
                            </div>
                            <div>
                                <button className="btn btn-success" type="button" onClick="submit()"  >Đồng ý</button>
                            </div>
                        </form>
                    </div>
                </div>
                <NotificationContainer />
            </div>
        )
    }
}


