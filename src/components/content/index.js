import React from 'react'
import {
    Route,
    HashRouter
} from 'react-router-dom'

import UserList from './user'
import AddUser from './user/add'
import EditUser from './user/edit'
import InfoUser from './user/info'
import RoomList from './room'
import AddRoom from './room/add'
import EditRoom from './room/edit'
import UserInRoom from './room/user'
import Bill from './room/bill'




export default class Content extends React.Component {

    render() {
        return (
            <HashRouter>
                <div style={{ flex:10, borderRadius: 10 }} >
                    <Route exact path="/user" component={UserList}/>
                    <Route path="/user/edit/:id" component={EditUser}/>
                    <Route path="/user/add" component={AddUser}/>
                    <Route path="/user/info" component={InfoUser}/>
                    <Route exact path="/room" component={RoomList}/>
                    <Route path="/room/add" component={AddRoom}/>
                    <Route path="/room/edit/:id" component={EditRoom}/>
                    <Route path="/room/:id/user" component={UserInRoom}/>
                    <Route path="/room/:id/bill" component={Bill}/>
                </div>
            </HashRouter>
        )
    }
}


