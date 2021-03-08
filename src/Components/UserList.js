import React, { useEffect } from 'react';

function User({user, onRemove, onToggle}){
    const { username, email, id, active} = user; /*이처럼 추출하여 쓸 수 있다 user.~ 반복 하기 귀찮을때*/

    useEffect(() => {
        console.log(user);
    });
    // 알아둬야하는것 useEffect을 사용할땐 첫번째 파라미터에는 함수를 등록하고 두번째 파라미터에는 deps라는 배열을 등록한다.

    // useEffect(() => {
    //     console.log('user값이 설정됨')
    //     console.log(user);
    //     return() => {
    //         console.log('user값이 바뀌기 전');
    //         console.log(user)
    //     }
    // }, [user]);
    //해당값이 바뀌기 직전에 cleanup함수가 호출되는것이고 처음 나타날때도 값이 호출된다.

    // useEffect(() => {
    //     return () => {
    //         console.log('컴포넌트가 화면에서 사라짐');
    //     }
    // }, []);
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