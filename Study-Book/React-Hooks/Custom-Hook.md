# 커스텀 Hooks

만약 여러 컴포넌트에서 비슷한 기능을 공유하게 되는 일이 발생한다면 이를 자신만의 Hook 을 작성하여 로직을 재사용 할 수 있다.

## useInputs

기존에 Info 컴포넌트에서 여러개의 인풋을 관리하기 위해 useReducer 로 해결했던 작성했던 로직을 useInputs 라는 Hook 으로 따로 분리해보자.

* useInputs.js

```javascript
import { useReducer } from 'react';

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value
  };
}

export default function useInputs(initialForm) {
  const [state, dispatch] = useReducer(reducer, initialForm);
  const onChange = e => {
    dispatch(e.target);
  };
  return [state, onChange];
}
```

이제 이 Hook을 Info 컴포넌트에서 사용해보자.

* Info.js

```javascript
import React from 'react';
import useInputs from './useInputs';

const Info = () => {
  const [state, onChange] = useInputs({
    name: '',
    nickname: ''
  });
  const { name, nickname } = state;

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

훨씬 깔끔해진 것 같다.

## usePromise

이번에는 함수형 컴포넌트에서 Promise를 더 쉽게 사용 할 수 있는 Hook을 만들어보자.

* usePromise.js

```javascript
import { useState, useEffect } from 'react';

export default function usePromise(promiseCreator, deps) {
  const [resolved, setResolved] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const process = async () => {
    setLoading(true);
    try {
      const result = await promiseCreator();
      setResolved(result);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    process();
  }, deps);

  return [loading, resolved, error];
}
```

위 커스텀 훅에서는 useState 와 useEffect 를 함께 사용하였다. 이 함수는 프로미스를 생성하는 promiseCreator 와, 언제 프로미스를 새로 만들지에 대한 조건을 위한 deps 배열을 파라미터로 받아온다. 이 deps 배열은 useEffect 의 두번째 파라미터로 전달되며, 기본값은 비어있는 배열이다.

useEffect 를 사용할 때 주의할점이 있다, useEffect 에 파라미터로 전달해주는 함수에서 async를 사용하면 안된다. 아래 코드는 오류를 발생하게 하는 코드이다.

```javascript
useEffect(async () -> {});
```

useEffect 에서는 뒷정리 함수를 반환해야 하는데, async 를 사용하게 되면 함수가 아닌 프로미스를 반환하기 때문에 오류가 발생하게 된다.

이제 이 Hook 을 사용하는 예제 컴포넌트를 작성해보자.

* UsePromiseSample.js

```javascript
import React from 'react';
import usePromise from './usePromise';

const wait = () => {
  // 3초 후에 끝나는 프로미스를 반환
  return new Promise(resolve =>
    setTimeout(() => resolve('Hello hooks!'), 3000)
  );
};
const UsePromiseSample = () => {
  const [loading, resolved, error] = usePromise(wait, []);

  if (loading) return <div>로딩중..!</div>;
  if (error) return <div>에러 발생!</div>;
  if (!resolved) return null;

  return <div>{resolved}</div>;
};

export default UsePromiseSample;

```

이 코드를 실행하면 "로딩중..!"이 뜨면서 로딩이 되고 "Hello hooks!"라는 문구가 뜰 것이다. 만약 에러가 난다면 "에러 발생!"이라는 문구가 뜰것이다.

## [목차로](Contents.md)