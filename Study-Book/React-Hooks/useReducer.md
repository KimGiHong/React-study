# useReducer

useReducer 는 useState 보다 컴포넌트에서 더 다양한 상황에 따라 다양한 상태를 다른 값으로 업데이트해주고 싶을 때 사용하는 Hook이다. 리듀서 라는 개념은 Redux를 공부할떄 더 자세히 알아보자.

리듀서는 현재 상태와, 업데이트를 위해 필요한 정보를 담은 액션(action) 값을 전달 받아 새로운 상태를 반환하는 함수이다. 리듀서 함수에서 새로운 상태를 만들 때는 꼭 `불변성`을 지켜주어야 한다.

```javascript
function reducer(state, action) {
  return { ... }; // 불변성을 지키면서 업데이트한 새로운 상태를 반환합니다
}
```

액션값은 주로 다음과 같은 형태이다.

```javascript
{
type: 'INCREMENT',
// 다른 값들이 필요하다면, 추가적으로 들어감
}
```

Redux 에서는 액션 객체에는 어떤 액선인지 알려주는 type 필드가 꼭 있어야 하지만, useReducer 에서 사용하는 액션 객체는 꼭 type을 지니고 있을 필요가 없다. 심지어, 객체가 아니라 문자열이나, 숫자여도 상관이 없다.

이제 기존의 Counter컴포넌트를 Reducer를 사용하여 다시 구현해보자.

* Counter.js

```javascript
import React, { useReducer } from 'react';

function reducer(state, action) {
  // action.type 에 따라 다른 작업 수행
  switch (action.type) {
    case 'INCREMENT':
      return { value: state.value + 1 };
    case 'DECREMENT':
      return { value: state.value - 1 };
    default:
      // 아무것도 해당되지 않을 때 기존 상태 반환
      return state;
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0 });

  return (
    <div>
      <p>
        현재 카운터 값은 <b>{state.value}</b> 입니다.
      </p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
    </div>
  );
};

export default Counter;
```

useReducer 의 첫번째 파라미터는 리듀서 함수, 그리고 두번째 파라미터는 해당 리듀서의 기본 값을 넣어준다. 이 Hook을 사용 했을 때에는 state 값과 dispatch 함수를 받아오게 되는데, 여기서 state는 현재 가르키고 있는 상태이고, dispatch 는 액선을 발생시키는 함수이다. dispatch(action)와 같은 형태로, 함수 안에 파라미터로 액션 값을 넣어주면 리듀서 함수가 호출되는 구조이다.

useReducer를 사용했을 때의 가장 큰 장점은 컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낼 수 있다는 점이다.

### 인풋 상태 관리하기

이번에는 useReducer를 사용하여 info 컴포넌트에서 인풋 상태를 관리해보겠다.

* Info.js

```javascript
import React, { useReducer } from 'react';

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value
  };
}

const Info = () => {
  const [state, dispatch] = useReducer(reducer, {
    name: '',
    nickname: ''
  });
  const { name, nickname } = state;
  const onChange = e => {
    dispatch(e.target);
  };

  return (
    <div>
      <div>
        <input name="name" value={name} onChange={onChange} />
        <input name="nickname" value={nickname} onChange={onChange} />
      </div>
      <div>
        <div>
          <b>이름:</b> {name}
        </div>
        <div>
          <b>닉네임: </b>
          {nickname}
        </div>
      </div>
    </div>
  );
};

export default Info;
```

useReducer 에서의 액션은 그 어떤 값이 되어도 된다. 그래서 이번에 이벤트 객체가 지니고있는 e.target 값 자체를 액션 값으로 사용하였다.

이런 식으로 인풋을 관리하면, 아무리 인풋의 개수가 많아져도 코드를 짧고 깔끔하게 유지할 수 있다.

## [목차로](Contents.md)