import React from 'react'
import { Table, Button } from 'reactstrap';
import '../../../assets/css/content.css'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import FontAwesome from 'react-fontawesome'


export default class Room extends React.Component {


    state = { rooms: [] }
    async getRoom() {
        const res = await fetch(`http://${process.env.REACT_APP_DEV_API_URL}/room`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        const { success, message, data } = await res.json()
        if (success) {
            if (data.length === 0) {
                NotificationManager.warning('Chưa có phòng nào được tạo', '');
            } else {
                this.setState({ rooms: data })
            }
        } else {
            NotificationManager.error(message, '');
        }
    }

    componentDidMount() {
        this.getRoom()
    }
    render() {
        return (
            <div style={{
                flex: 10,
                borderRadius: 10
            }} >
                <div className="card" style={{ width: '100%', }} >
                    <div className="card-header" >
                        <h5>Danh sách phòng</h5>
                        <a href="/#/room/add" style={{ float: "right" }} ><Button className="btn btn-primary" size="sm" style={{ float: 'right', marginTop: -36 }} >Thêm mới</Button></a>
                    </div>
                    <div className="card-body">
                        <Table className="body-table" >
                            <thead>
                                <tr>
                                    <th style={{ width: '25%', textAlign: 'center' }} >Số Phòng</th>
                                    <th style={{ width: '22%', paddingLeft: 60 }} >Giá tiền</th>
                                    <th className="d-md-down-none" >Danh sách người ở</th>
                                    <th className="d-md-down-none" >Lịch sử hóa đơn</th>
                                    <th>Chỉnh sửa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.rooms.map(room =>
                                    <tr>
                                        <td style={{ textAlign: 'center' }} >{room.roomNumber}</td>
                                        <td className="d-md-down-none" style={{ paddingLeft: 60 }}>{Intl.NumberFormat().format(room.roomPrice)}</td>
                                        <td className="nav-item d-md-down-none">
                                            <a href={'/#/room/' + room._id +'/user'} style={{ paddingLeft: 50, float: 'left' }}>
                                                <FontAwesome
                                                    name='users'
                                                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', fontSize: 20 }}
                                                />
                                            </a>
                                        </td>
                                        <td className="nav-item d-md-down-none">
                                            <a href={'/#/room/' + room._id +'/bill'} style={{ paddingLeft: 38, float: 'left' }}>
                                                <FontAwesome
                                                    name='money'
                                                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', fontSize: 20 }}
                                                />
                                            </a>
                                        </td>
                                        <td className="nav-item d-md-down-none">
                                            <a href={'/#/room/edit/' + room._id} style={{ paddingLeft: 25, float: 'left' }}>
                                                <FontAwesome
                                                    name='edit'
                                                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', fontSize: 20 }}
                                                />
                                            </a>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <NotificationContainer />
            </div>
        )
    }
}


