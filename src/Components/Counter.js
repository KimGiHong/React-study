import React, {useReducer} from 'react';

function reducer(state, action) {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1;
      case 'DECREMENT':
        return state - 1;
      default:
        return state;
        // throw new Error('Unhandled action');
    }
  } 

function Counter() {
    const [number, dispatch] = useReducer(reducer, 0);

    const onIncrease = () => {
        dispatch({
            type: 'INCREMENT'
        })
    }
    const onDecrease = () => {
        dispatch({
            type: 'DECREMENT'
        })
    }
    return (
        <div>
            <h1>{number}</h1>
            <button onClick={onIncrease}>+1</button> {/* 리액트에서 엘리먼트에 이벤트를 설정해줄때에는 on이벤트이름={실행하고싶은함수} 형태로 설정해주어야 합니다. */}
            <button onClick={onDecrease}>-1</button> 
            {/* 주의할 점 : 함수형태를 넣어주어야 하지, 함수를 다음과 같이 실행하면 안된다. -> onClick={onIncrease()}
            이렇게 하면 렌더링되는 시점에서 함수가 호출되버리기 때문. 이벤트를 설정할때에는 함수타입의 값을 넣어주어야 한다는 것
            */}
        </div>
    )
}

export default Counter;