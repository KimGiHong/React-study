import React from 'react';

function User({user}){
    return(
        <div>
            <b>{user.username}</b><span>({user.email})</span>
        </div>
    )
}

function UserList() {
    const users = [
        {
            id: 1,
            username: 'Gihong',
            email: 'kimgihong9@naver.com'
        },
        {
            id: 2,
            username: 'Hongsi',
            email: 'kimgihong04@naver.com'
        },
        {
            id: 3,
            username: 'KimHong',
            email: 'kimgihong1127@naver.com'
        },
    ];
    return(
        <div>
            {
                users.map(
                    user => (<User user ={user} key={user.id}/>)
                )
            }
        </div>
    )
}

export default UserList;