# useState

useState는 가장 기본적인 Hook 으로서, 함수형 컴포넌트에서도 가변적인 상태를 지니고 있을 수 있게 해준다. 만약에 함수형 컴포넌트에서 상태를 관리해야 되는 일이 발생한다면 이 Hook을 사용하도록 하자.

예시로 useState를 이용한 숫자 카운터를 구현 해보자,

* Counter.js

```javascript
import React, { useState } from 'react';

const Counter = () => {
  const [value, setValue] = useState(0);
  return (
    <div>
      <p>
        현재 카운터 값은 <b>{value}</b> 입니다.
      </p>
      <button onClick={() => setValue(value + 1)}>+1</button>
      <button onClick={() => setValue(value - 1)}>-1</button>
    </div>
  );
};
```

useState를 사용 할 땐 코드의 상단에서 import 구문을 통해 불러오고, 다음과 같이 사용한다.

```javascript
const [value, setValue] = useState(0);
```

이 문법은 배열 비구조화 할당 문법이다. 다음 코드는 배열 비구조화 할당의 더 쉬운 예제이다.

```javascript
const array = ['dog', 'cat', 'sheep'];
const [first, second] = array;
console.log(first, second); // dog cat
```

이제 다시 useState Hook을 이해 해보자면, 이 함수의 파라미터에는 상태의 기본값을 넣어준다. 현재 0을 넣어주었는데, 결국 카운터의 기본값을 0으로 설정하겠다는 의미이다. 이 함수가 호출되고 나면 배열을 반환하는데, 그 배열의 첫번째 원소는 상태 값이고, 두번째 원소는 상태를 설정하는 함수이다. 이 함수에 파라미터를 넣어서 호출하게 되면 전달받은 파라미터로 값이 바뀌게 되고 컴포넌트는 정상적으로 리렌더링 된다.

함수형 컴포넌트에서 상태 관리를 하기 위하여 굳이 클래스 형태로 변환 할 필요가 없어서 매우 편리하다.

## useState를 호출하는 것은 무엇을 하는 것일까?

"state변수"를 선언할 수 있다. 변수는 아무 이름으로 지어도 된다. 하지만 어떤 역할을 하는가에 따라서 변수명을 짓도록하자. `useState`는 클래스 컴포넌트의 `this.state`가 제공하는 기능과 같다. 일반적으로 일반 변수는 함수가 끌날 때 사지지만, state변수는 React에 의해 사리지지 않는다.

## useState의 인자로 무엇을 넘겨주어야 할까?

`useState()`Hook의 인자로 넘겨주는 값은 state의 초기 값이다. 함수 컴포넌트의 state는 클래스와 달리 객체일 필요는 없고, 숫자 타입과 문자 타입을 가질 수 있다. 위의 예시는 사용자가 버튼을 얼마나 많이 클릭했는지 알기를 원하므로 0 을 해당 state의 초기 값으로 선언했다. (2개의 다른 변수를 저장하기를 원한다면 `useState()`를 두 번 호출하면 된다.)

## useState는 무엇을 반환할까? 

state 변수, 해당 변수를 갱신할 수 있는 함수 이 두가지 쌍을 반환한다. 이것이 바로 `const [value, setValue] = useState()`라고 쓰는 이유이다. 클래스 컴포넌트의 `this.state.count`와 `this.setState`와 유사하다.

## 여러개의 useState 사용하기

하나의 useState 함수는 하나의 상태 값만 관리를 할 수 있기 때문에 만약에 컴포넌트에서 관리해야 할 상태가 여러 개라면 useState를 여러번 사용하면 된다.

```javascript
function ExampleWithManyStates() {
  // 여러 개의 state를 선언할 수 있습니다!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
```

위 코드는 `age`, `fruit`, `todos`라는 지역 변수를 가지며 개별적으로 갱신이 가능하다.

## [목차로](Contents.md)