import React from 'react'
import '../../../assets/css/user.css'
import {NotificationContainer, NotificationManager} from 'react-notifications';


export default class UserInRoom extends React.Component {
    state = { users: [] }
    async getUsers() {
        const { match: { params } } = this.props
        const res = await fetch(`http://${process.env.REACT_APP_DEV_API_URL}/room/${params.id}/user`, {
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
                const usersInRoom = await data.map(x => {
                    return x.user
                })
                this.setState({ users: usersInRoom })
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
                { this.state.users.map(user =>
                <div className="col-md-3" style={{ margin: 'auto', marginTop: '70px' }} >
                    <div className="card card-profile" >
                        <div className="card-avata" style={{ maxWidth: '110px' }} >
                            <a>
                                <img src="/img/default-avatar.png" ></img>
                            </a>
                        </div>
                        <div className="card-body" style={{ margin: '10px 0', textAlign: 'center' }} >
                            <h6 style={{ color: '#999' }} >{ user.role }</h6>
                            <h4>{ user.username }</h4>
                            <button className="btn btn-primary" >Thông tin</button>
                        </div>
                    </div>
                </div>
                ) }
              <NotificationContainer />
            </div>
        )
    }
}


