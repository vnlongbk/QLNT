import React from 'react'
import '../../../assets/css/user.css'
import {NotificationContainer, NotificationManager} from 'react-notifications';
const date = new Date()
const month = date.getMonth() +1


export default class Bill extends React.Component {
    state = { bills: [] }
    async getUsers() {
        const { match: { params } } = this.props
        const res = await fetch(`http://${process.env.REACT_APP_DEV_API_URL}/bill/all/${params.id}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        const { success, message, data } = await res.json()
        if (success) {
            if (data.length === 0) {
                NotificationManager.warning('Chưa có hóa đơn nào được tạo', '');
            } else {
                this.setState({ bills: data })
            }
        } else {
            NotificationManager.error(message, '');
        }
    }

    componentDidMount() {
        this.getUsers()
    }
    render() {
        return (
            <div className="row" >
            { this.state.bills.map(bill =>
                <div className="col-md-3" >
                    <form>
                        <div className="jss386">
                            <div className={`jss577${bill.month === month ? ' warning' : ' primary'}`}>
                                <h4 className="jss576" >Tháng {bill.month}</h4>
                            </div>
                            <div className="jss426">
                                <div className="form-group" >
                                    <ul style={{listStyle: 'none', fontSize: '16px', width: '260px', margin: '10px -40px', height: '150px', lineHeight: '11px' }} >
                                        <li>
                                          <a>
                                            <p style={{ float: 'left' }} >Tiền phòng:</p>
                                            <p style={{ float: 'right'}}>{Intl.NumberFormat().format(bill.room.roomPrice)} VNĐ</p>
                                          </a>
                                        </li>
                                        <li>
                                          <a>
                                            <p style={{ float: 'left' }} >Tiền điện:</p>
                                            <p style={{ float: 'right'}}>{Intl.NumberFormat().format(bill.electricPrice)} VNĐ</p>
                                          </a>
                                        </li>
                                        <li>
                                            <p style={{ float: 'left' }} >Tiền nước:</p>
                                            <p style={{ float: 'right'}}>{Intl.NumberFormat().format(bill.waterPrice)} VNĐ</p>
                                        </li>
                                        <li>
                                            <p style={{ float: 'left' }} >Tiền internet:</p>
                                            <p style={{ float: 'right'}}>{Intl.NumberFormat().format(bill.internetPrice)} VNĐ</p>
                                        </li>
                                        <li>
                                            <p style={{ float: 'left' }} >Tiền cáp TV:</p>
                                            <p style={{ float: 'right'}}>{Intl.NumberFormat().format(bill.tvPrice)} VNĐ</p>
                                        </li>
                                        <li>
                                            <p style={{ float: 'left' }} >Tiền rác:</p>
                                            <p style={{ float: 'right'}}>{Intl.NumberFormat().format(bill.trashPrice)} VNĐ</p>
                                        </li>
                                    </ul>
                                    <hr width="100%"align="left" />
                                    <div style={{ display: 'flex', fontSize: '18px', marginBottom: '-10px', fontWeight: 'bolder' }} >
                                        <p>Tổng cộng:</p>
                                        <p style={{ marginLeft: '30px' }} >{Intl.NumberFormat().format(bill.total)} VNĐ</p>
                                    </div>
                                </div>
                            </div>
                            <div className="jss579">
                                <button className={`btn${bill.month === month ? ' btn-success' : ' btn-primary'}`} >Thông tin</button>
                            </div>
                        </div>
                    </form>
                </div>
                ) }
              <NotificationContainer />
            </div>
        )
    }
}


