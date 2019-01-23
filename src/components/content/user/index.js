import React from 'react'
import { Table, Button, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import '../../../assets/css/content.css'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import FontAwesome from 'react-fontawesome'



export default class User extends React.Component {

    state = { datas: [] }
    async getUser() {
        const res = await fetch(`http://${process.env.REACT_APP_DEV_API_URL}/living`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        const { success, message, data } = await res.json()
        if (success) {
            if (data.length === 0) {
                NotificationManager.warning('Chưa có người dùng nào', '');
            } else {
                this.setState({ datas: data })
            }
        } else {
            NotificationManager.error(message, '');
        }
    }

    componentDidMount() {
        this.getUser()
    }

    render() {
        return (
            <div style={{
                flex: 10,
                borderRadius: 10
            }} >
                <div className="card" style={{ width: '100%', }} >
                    <div className="card-header" >
                        <h5>Danh sách người dùng</h5>
                        <a href="/#/user/add" style={{ float: "right" }} ><Button className="btn btn-primary" size="sm" style={{ float: 'right', marginTop: -36 }} >Thêm mới</Button></a>
                    </div>
                    <div className="card-body" >
                        <Table className="body-table" >
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'center' }} >Tên</th>
                                    <th>Ở phòng</th>
                                    <th>Số điện thoại</th>
                                    <th className="d-md-down-none" >Thông tin</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.datas.map(data =>
                                    <tr>
                                        <td style={{ textAlign: 'center' }} >{data.user.username}</td>
                                        <td>{data.room && data.room.roomNumber}</td>
                                        <td>{data.user.phone}</td>
                                        <td className="nav-item d-md-down-none" style={{ paddingLeft: 37, float: 'left' }} >
                                            <a href={'/#/user/edit/' + data.user._id}>
                                                <FontAwesome
                                                    name='info-circle'
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
                <div style={{ marginTop: '15px', float: 'right' }} >
                    <Pagination size="md" aria-label="Page navigation example">
                        <PaginationItem>
                            <PaginationLink previous href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink active href="#">
                                1
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">
                                3
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink next href="#" />
                        </PaginationItem>
                    </Pagination>
                </div>
              <NotificationContainer />
            </div>
        )
    }
}


