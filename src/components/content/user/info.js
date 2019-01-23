import React from 'react'
import '../../../assets/css/user.css'


export default class User extends React.Component {

    render() {
        return (
            <div className="col-md-4" style={{ marginTop: 50 }} >
                <div className="card card-profile" >
                    <div className="card-avata" >
                        <a>
                            <img src="/img/avata1.jpg" ></img>
                        </a>
                    </div>
                    <div className="card-body" style={{ margin: '10px 0', textAlign: 'center' }} >
                        <h6 style={{ color: '#999' }} >Quản lí</h6>
                        <h4>Võ Nhựt Long</h4>
                        <button className="btn btn-danger" >Chỉnh sửa</button>
                    </div>
                </div>
            </div>
        )
    }
}


