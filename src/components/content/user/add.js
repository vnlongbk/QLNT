import React from 'react'
import '../../../assets/css/content.css'
import FontAwesome from 'react-fontawesome'
import {NotificationContainer, NotificationManager} from 'react-notifications';




export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.fileUpload = React.createRef();
        this.chooseFile = this.chooseFile.bind(this)
    }

    state={ 
        rooms:[]
    }
    async getRoom() {
        const res = await fetch(`http://${process.env.REACT_APP_DEV_API_URL}/room`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        const { data } = await res.json()
        this.setState({ rooms: data })
    }

    componentDidMount() {
        this.getRoom()
    }

    chooseFile() {
        this.fileUpload.current.click()
    } 

    async onSubmitData() {
        if (!this.state.name) {
            return NotificationManager.error('Tên người dùng không được để trống','') 
        }
        if (!this.state.phone) {
            return NotificationManager.error('Số điện thoại người dùng không được để trống','') 
        }
        if (!this.state.cmnd) {
            return NotificationManager.error('Số CMND người dùng không được để trống','') 
        }
        if (!this.state.room) {
            return NotificationManager.error('Số phòng người dùng không được để trống','') 
        }
        const res = await fetch('http://localhost:8888/user', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(this.state)
        })
        const { success, message } = await res.json()
        if (success) {
            NotificationManager.success('Thêm người sử dụng thành công','')
            setTimeout(() => {
                window.location.href = '/#/user'
            }, 1500)
        } else {
            NotificationManager.error(message,'')
        }
    }

    render() {
        return (
            <div style={{
                flex:10,
                borderRadius: 10
            }} >
                <div className="col-md-4" >
                    <div className="card-header" ><h5>Đăng kí người dùng</h5></div>
                    <div className="form-body" >
                        <form method="post" >
                            <div style={{margin:'auto'}} >
                                <div className="picture-container" onClick={this.chooseFile} >
                                    <div className='picture' >
                                        <img src='/img/default-avatar.png' style={{width:'100%'}} ></img>
                                        <input id="file" type='file' ref={this.fileUpload} ></input>
                                    </div>
                                    <h6>Chọn hình đại diện</h6>
                                </div>
                            </div>
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
                                    <input type="text" id="name" name="name" placeholder="Nhập tên" className="form-control" onChange={(e) => {
                                        this.setState({
                                            name: e.target.value
                                        })
                                    }} ></input>
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
                                        <input type="text" id="phone" name="phone" placeholder="Nhập số điện thoại" className="form-control" onChange={(e) =>{
                                            this.setState({
                                                phone: e.target.value
                                            })
                                        }} ></input>
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
                                        <input type="text" id="cmnd" name="cmnd" placeholder="Nhập số chứng minh" className="form-control" onChange={(e) =>{
                                            this.setState({
                                                cmnd: e.target.value
                                            })
                                        }} ></input>
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
                                        <input type="date" id="birth" name="birth" className="form-control" onChange={(e) =>{
                                            this.setState({
                                                birth: e.target.value
                                            })
                                        }} ></input>
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
                                            <span>
                                                <FontAwesome
                                                    name='home'
                                                    size='lg'
                                                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', marginTop:'9px',width:'26px' }}
                                                />
                                            </span>
                                        </div>
                                        <input type="text" id="hometown" name="hometown" placeholder="Nhập quê quán" className="form-control" onChange={(e) =>{
                                            this.setState({
                                                hometown: e.target.value
                                            })
                                        }}></input>
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
                                            <span>
                                                <FontAwesome
                                                    name='building'
                                                    size='lg'
                                                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', marginTop:'9px',width:'26px' }}
                                                />
                                            </span>
                                        </div>
                                        <select className="form-control" id="room" name="room" required style={{height:35}} onChange={(e) =>{
                                                this.setState({
                                                    room: e.target.value
                                                })
                                            }}>
                                            <option value="" hidden >Chọn phòng</option>
                                            {this.state.rooms.map(room =>
                                            <option value={room._id} id="room" name="room" >{room.roomNumber}</option>
                                            )}
                                        </select>
                                </div>
                            </div>
                            <div>
                                <button className="btn btn-success" type="button" onClick={() => this.onSubmitData()} >Đồng ý</button>
                            </div>
                        </form>
                    </div>
                </div>
                <NotificationContainer />
                
            </div>
        )
    }
}


