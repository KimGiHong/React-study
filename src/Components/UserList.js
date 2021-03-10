import React, { useContext } from 'react';
import { UserDispatch } from '../App'

//deps파라미터를 생략해서 이렇게 코드를 짤수 있다.
const User = React.memo(function User({ user }) {
    const { username, email, id, active } = user;
    const dispatch  = useContext(UserDispatch);

// function User({user, onRemove, onToggle}){
//     const { username, email, id, active} = user; 
    /*이처럼 추출하여 쓸 수 있다 user.~ 반복 하기 귀찮을때*/

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
                color: user.active ? 'green' : 'black',
                cursor: 'pointer'
            }}
            onClick={() => dispatch({
                type: 'TOGGLE_USER',
                id
            })}
            >
                {user.username}
            </b>
            &nbsp;
            <span>({user.email})</span>
            <button onClick={() => dispatch({
                type: 'REMOVE_USER',
                id
            })}>삭제</button>
        </div>
    )
});

function UserList({users }) {
    return(
        <div>
            {
                users.map(
                    user => (
                        <User 
                            user ={user} 
                            key={user.id} 
                    />)
                )
            }
        </div>
    )
}

export default React.memo(
    UserList, (prevProps, nextProps) => nextProps.users === prevProps.users
);

