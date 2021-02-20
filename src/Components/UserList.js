import React from 'react';

function User({user, onRemove, onToggle}){
    const { username, email, id, active} = user; /*이처럼 추출하여 쓸 수 있다 user.~ 반복 하기 귀찮을때*/
    return(
        <div>
            <b style={{
                color: active ? 'green' : 'black',
                cursor: 'pointer'
            }}
            onClick={() => onToggle(id)}
            >
                {username}
            </b>
            &nbsp;
            <span>({email})</span>
            <button onClick={() => onRemove(id)}>삭제</button>
        </div>
    )
}

function UserList({users, onRemove, onToggle}) {
    return(
        <div>
            {
                users.map(
                    user => (
                        <User 
                            user ={user} 
                            key={user.id} 
                            onRemove={onRemove}
                            onToggle={onToggle}
                    />)
                )
            }
        </div>
    )
}

export default UserList;