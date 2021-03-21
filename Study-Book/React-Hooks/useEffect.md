# useEffect 

useEffect 는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정 할 수 있는 Hook 이다.

`Effect Hook`을 사용하면 컴포넌트에서 side effect를 수행할 수 있다.

* Info.js
```javascript
import React, { useState, useEffect } from 'react';

const Info = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  useEffect(() => {
    console.log('렌더링이 완료되었습니다!');
    console.log({
      name,
      nickname
    });
  });

  const onChangeName = e => {
    setName(e.target.value);
  };

  const onChangeNickname = e => {
    setNickname(e.target.value);
  };

  return (
    (...)
  );
};

export default Info;
```

데이터 가져오기, 구독 설정하기, 수동으로 리액트 컴포넌트의 DOM을 수정하는 것까지 이 모든 것이 sied effects이다. 이런 기능들을 side effect(혹은 effect)라 부르는 것이 익숙하지 않을 수도 있다.

## 마운트 될 때만 실행하고 싶을 때

만약 useEffect 에서 설정한 함수가 컴포넌트가 화면에 가장 처음 렌더리 될 때만 실행되고 업데이트 할 경우에는 실행 할 필요가 없는 경우엔 함수의 두번째 파라미터로 비어있는 배열을 넣어주면 된다.

```javascript
  useEffect(() => {
    console.log('마운트 될 때만 실행됩니다.');
  }, []);
```

위 코드처럼 함수의 두번째 파라미터로 비어있는 배열을 넣어준다면 컴포넌트가 처음 나타날 때만 콘솔에 문구가 나타나고 그 이후에는 나타나지 않을 것이다.

## 특정 값이 업데이트 될 때만 실행하고 싶을 때

useEffect 를 사용 할 때 특정 값이 변경이 될 때만 호출하게 하고 싶을 경우도 있을 것이다.

useEffect 의 두번째 파라미터로 전달되는 배열 안에 검사하고 싶은 값을 넣어주면 된다.

```javascript
  useEffect(() => {
    console.log(name);
  }, [name]);
```

이 배열 안에는 useState를 통해 관리하고 있는 상태를 넣어줘도 되고, props로 전달받은 값을 넣어줘도 된다.

## 뒷정리(cleanup) 하기

useEffect 는 기본적으로 렌더링 되고난 직후마다 실행되며, 두번째 파라미터 배열에 무엇을 넣느냐에 따라 실행되는 조건이 달라지낟.

만약 컴포넌트가 언마운트되기 전이나, 업데이트 되기 직전에 어떠한 작업을 수행하고 싶다면 useEffect 에서 뒷정리(cleanup) 함수를 반환해주어야한다.

```javascript
 useEffect(() => {
    console.log('effect');
    console.log(name);
    return () => {
      console.log('cleanup');
      console.log(name);
    };
  });
```

* App.js

```javascript
import React, { useState } from 'react';
import Info from './Info';

const App = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {visible ? '숨기기' : '보이기'}
      </button>
      <hr />
      {visible && <Info />}
    </div>
  );
};

export default App;
```

이렇게 App컴포넌트를 작성했다면 보이기 / 숨기기 버튼을 눌러 컴포넌트가 나타날 때 콘솔에 effect가 보이고, 사라질 때 cleanup이 보여지게 될것이다.

만약 input에 이름을 적는다면 렌더링이 될 때마다 뒷정리 함수가 계속 보여질 것이다. 그리고, 뒷정리 함수가 호출 될 때에는 업데이트 되기 직전의 값을 보여주고 있다.

만약에, 오직 언마운트 될 때만 뒷정리 함수를 호출하고 있다면 useEffect 함수의 두번째 파라미터에 비어있는 배열을 넣으면 된다.

* Info.js
```javascript
  useEffect(() => {
    console.log('effect');
    console.log(name);
    return () => {
      console.log('cleanup');
      console.log(name);
    };
  }, []);

```

## useEffect가 하는 일은 무엇인가?

useEffect Hook을 이용하는 우리는 리액트에게 컴포넌트가 렌더링 이후에 어떤 일을 수행해야하는 지를 말한다. 리액트는 우리가 넘긴 함수를 기억했다가 DOM 업데이트를 수행한 이후에 불러낼 것이다. useEffec는 effect를 통해 문서 타이틀을 지정할 수도있고, 데이터를 가져오거나 다른 명령형 API를 불러내는 일도 할 수 있다.

## useEffect를 컴포넌트 안에서 불러내는 이유는 뭘까?

`useEffect`를 컴포넌트 내부에 둠으로써 effect를 통해 state변수(또는 그 어떤 props에도)에 접근할 수 있게 된다. 함수 범위 안에 존재하기 때문에 특별한 API 없이도 값을 얻을 수 있는 것이다. Hook은 자바스크립트의 클로저를 이용하여 리액트에 한정된 API를 고안하는 것보다 자바스크립트가 이미 가지고 있는 방법을 이용하여 문제를 해결한다.

## useEffect는 렌더링 이후에 매번 수행되는 것일까?

맞다, 기본적으로 첫번째 렌더링과 이후의 모든 업데이트에서 수해왼다.그래서 위에서 뒷정리 함수를 사용하여 한번만 수행되게 만들어본것이다.

## [목차로](Contents.md)