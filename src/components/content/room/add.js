import React from 'react'
import { Button } from 'reactstrap';
import '../../../assets/css/content.css'
import FontAwesome from 'react-fontawesome'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css'



export default class AddRoom extends React.Component {
    state = {}

    async onSubmitData() {
        if (!this.state.roomNumber) {
            return NotificationManager.error('Số phòng không được để trống','')
        }
        if (!this.state.roomPrice) {
            return NotificationManager.error('Tiền phòng không được để trống','')
        }
        const res = await fetch(`http://${process.env.REACT_APP_DEV_API_URL}/room`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(this.state)
        })
        const { success, message } = await res.json()
        if (!success) {
            NotificationManager.error(message, '');
        } else {
            NotificationManager.success('Tạo phòng thành công', '')
            setTimeout(() => {
                window.location.href = '/#/room'
            }, 1500)
        }
    }

    render() {
        return (
            <div style={{
                flex: 10,
                borderRadius: 10
            }} >
                <div className="col-md-4" >
                    <div className="card-header" ><h5>Đăng kí phòng</h5></div>
                    <div className="form-body" >
                        <form  >
                            <div className="form-group">
                                <div className="input-group" >
                                    <div style={{
                                        border: '1px solid #ced4da',
                                        marginRight: '-1px',
                                        borderTopLeftRadius: '0.25rem',
                                        borderBottomLeftRadius: '0.25rem',
                                    }} >
                                        <span  >
                                            <FontAwesome
                                                name='home'
                                                size='lg'
                                                style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', marginTop: '9px' }}
                                            />
                                        </span>
                                    </div>
                                    <input type="text" id="roomNumber" name="roomNumber" placeholder="Nhập số phòng" className="form-control" onChange={(e) => {
                                        this.setState({
                                            roomNumber: e.target.value
                                        })
                                    }} />
                                </div>
                            </div>
                            <div className="form-group" >
                                <div className="input-group">
                                    <div style={{
                                        border: '1px solid #ced4da',
                                        marginRight: '-1px',
                                        borderTopLeftRadius: '0.25rem',
                                        borderBottomLeftRadius: '0.25rem',

                                    }} >
                                        <span  >
                                            <FontAwesome
                                                name='dollar-sign'
                                                size='lg'
                                                style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', marginTop: '9px', width: '26px' }}
                                            />
                                        </span>
                                    </div>
                                    <input type="text" id="roomPrice" name="roomPrice" placeholder="Nhập giá tiền" className="form-control" onChange={(e) => {
                                        this.setState({
                                            roomPrice: e.target.value
                                        })
                                    }} />
                                </div>
                            </div>
                            <div  >
                                <Button className="btn btn-success" type="button" id="submit" size="sm" onClick={() => this.onSubmitData()} >Tạo phòng</Button>
                            </div>
                        </form>
                    </div>
                </div>
                <NotificationContainer />
            </div>
        )
    }
}


