import React from 'react';
import '../../assets/css/menu.css'
import { Collapse, CardBody, Card } from 'reactstrap';
import FontAwesome from 'react-fontawesome'
export default class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  async logout(){
    await localStorage.removeItem('token')
    window.location.reload()
  }

  componentDidMount() {
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <div className="Menu" style={{
        top: '55px',
      }}>
        <div>
          <div className="user" >
            <div className="photo" >
              <img src="/img/avata1.jpg"></img>
            </div>
            <div className="user-info" style={{ borderBottom: '1px solid hsla(0,0%,71%,.3)' }} >
              <a data-toggle="collapse" className="username" aria-expanded="true" onClick={this.toggle} style={{ marginBottom: '0.5rem' }} >
                <span>
                  Võ Nhựt Long
                  <b className="caret" ></b>
                </span>
              </a>
              <Collapse isOpen={this.state.collapse}  >
                <Card className="menu-card"  >
                  <CardBody className="menu-card" style={{ paddingTop: 0 }} >
                    <div>
                      <ul style={{ display: "block", listStyle: 'none', paddingLeft: 0, marginBottom: 10 }} >
                        <li  >
                          <a href="/#/user/info" >
                            <span className="sidebar-mini" >HS</span>
                            <span className="sidebar-normal" >Hồ sơ</span>
                          </a>
                        </li>
                        <li style={{ marginTop: "5px" }} >
                          <a>
                            <span className="sidebar-mini" >CS</span>
                            <span className="sidebar-normal" >Chỉnh sửa</span>
                          </a>
                        </li>
                        <li onClick={() => this.logout()} style={{ marginTop: "5px" }} >
                          <a>
                            <span className="sidebar-mini" >ĐX</span>
                            <span className="sidebar-normal" >Đăng xuất</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </CardBody>
                </Card>
              </Collapse>
            </div>
          </div>
          <ul className="user-info" style={{ display: "block", listStyle: 'none', paddingLeft: 20, marginBottom: 0, width: 240 }} >
            <li>
              <a>
                <p className="sidebar-mini" style={{ marginTop: -3 }} >
                  <FontAwesome
                    name='tachometer'
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', fontSize: 20 }}
                  />
                </p>
                <p className="sidebar-normal" >Thông báo</p>
              </a>
            </li>
            <li style={{ marginTop: "10px" }} >
              <a href="/#/user" >
                <p className="sidebar-mini" style={{ marginTop: -3 }} >
                  <FontAwesome
                    name='user'
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', fontSize: 20 }}
                  />
                </p>
                <p className="sidebar-normal" >QL Người dùng</p>
              </a>
            </li>
            <li style={{ marginTop: "10px" }} >
              <a href="/#/room" >
                <p className="sidebar-mini" style={{ marginTop: -3 }} >
                  <FontAwesome
                    name='building'
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', fontSize: 20 }}
                  />
                </p>
                <p className="sidebar-normal" >QL Phòng</p>
              </a>
            </li>
            <li style={{ marginTop: "10px" }}>
              <a>
                <p className="sidebar-mini" style={{ marginTop: -3 }} >
                  <FontAwesome
                    name='chart-pie'
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', fontSize: 20 }}
                  />
                </p>
                <p className="sidebar-normal" >Thống kê</p>
              </a>
            </li>
            <li style={{ marginTop: "10px" }} >
              <a>
                <p className="sidebar-mini" style={{ marginTop: -3 }} >
                  <FontAwesome
                    name='history'
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', fontSize: 20 }}
                  />
                </p>
                <p className="sidebar-normal" >Lịch sử</p>
              </a>
            </li>
            <li style={{ marginTop: "10px" }} >
              <a>
                <p className="sidebar-mini" style={{ marginTop: -3 }} >
                  <FontAwesome
                    name='wrench'
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', fontSize: 20 }}
                  />
                </p>
                <p className="sidebar-normal" >Cài đặt</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}