import React from 'react'
import { Button } from 'reactstrap';
import '../../../assets/css/content.css'
import FontAwesome from 'react-fontawesome'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'


export default class EditRoom extends React.Component {

    state = {
        room: {
            roomNumber: '',
            roomPrice: ''
        }
    }

    async getRoom() {
        const { match: { params } } = this.props;
        const res = await fetch(`http://${process.env.REACT_APP_DEV_API_URL}/room/${params.id}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        const { success, message, data } = await res.json()
        if (success) {
            this.setState({ room: data })
        } else {
            NotificationManager.error(message, '')
        }
    }

    componentDidMount() {
        this.getRoom()
    }
    async onSubmitData() {
        if (!this.state.room.roomNumber) {
            return NotificationManager.error('Số phòng không được để trống','')
        }
        if (!this.state.room.roomPrice) {
            return NotificationManager.error('Tiền phòng không được để trống','')
        }
        const { match: { params } } = this.props;
        const res = await fetch(`http://${process.env.REACT_APP_DEV_API_URL}/room/${params.id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(this.state.room)
        })
        const { success, message } = await res.json()
        if (success) {
            NotificationManager.success('Cập nhật phòng thành công', '')
            setTimeout(() => {
                window.location.href = '/#/room'
            }, 1500)
        } else {
            NotificationManager.error(message, '')
        }
    }

    submit = () => {
        confirmAlert({
            message: 'Bạn muốn xóa phòng này',
            buttons: [
                {
                    label: 'Đồng ý',
                    onClick: () => this.deleteData()
                },
                {
                    label: 'Hủy'
                }
            ]
        })
    };

    async deleteData() {
        const { match: { params } } = this.props;
        const res = await fetch(`http://${process.env.REACT_APP_DEV_API_URL}/room/${params.id}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        const { success, message } = await res.json()
        if (success) {
            NotificationManager.success('Xóa phòng thành công', '')
            setTimeout(() => {
                window.location.href = '/#/room'
            }, 1500)
        } else {
            NotificationManager.error(message, '')
        }
    }

    render() {
        return (
            <div style={{
                flex: 10,
                borderRadius: 10
            }} >
                <div className="col-md-4" >
                    <div className="card-header" ><h5>Chỉnh sửa thông tin phòng</h5></div>
                    <div className="form-body" >
                        <form>
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
                                    <input type="text" id="roomNumber" name="roomNumber" className="form-control" value={this.state.room.roomNumber} onChange={(e) => {
                                        const { room } = this.state
                                        room.roomNumber = e.target.value
                                        this.setState({
                                            room
                                        })
                                    }} />
                                </div>
                            </div>
                            <div className="form-group" >
                                <div className="input-group" >
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
                                    <input type="text" id="roomPrice" name="roomPrice" className="form-control" value={this.state.room.roomPrice} onChange={(e) => {
                                        const { room } = this.state
                                        room.roomPrice = e.target.value
                                        this.setState({
                                            room
                                        })
                                    }} />
                                </div>
                            </div>
                            <div  >
                                <Button className="btn btn-success" type="button" id="submit" size="sm" onClick={() => this.onSubmitData()} >Cập nhật</Button>
                                <Button className="btn btn-danger" type="button" size="sm" onClick={this.submit} style={{ float: 'right' }} >Xóa phòng</Button>
                            </div>
                        </form>
                    </div>
                </div>
                <NotificationContainer />
            </div>
        )
    }
}
