# useRef

useRef Hook 은 함수형 컴포넌트에서 ref 를 쉽게 사용 할 수 있게 해준다. Average 컴포넌트에서 등록 버튼을 눌렀을 때 포커스가 인풋 쪽으로 넘어가도록 코드를 작성해보자.

* Average.js

```javascript
const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState('');
  const inputEl = useRef(null);

  const onChange = useCallback(e => {
    setNumber(e.target.value);
  }, []); // 컴포넌트가 처음 렌더링 될 때만 함수 생성
  const onInsert = useCallback(
    e => {
      const nextList = list.concat(parseInt(number));
      setList(nextList);
      setNumber('');
      inputEl.current.focus();
    },
    [number, list]
  ); // number 혹은 list 가 바뀌었을 때만 함수 생성
```

위 코드처럼 수정한뒤 useCallback 대신 useRef를 import해주도록 하자.

useRef 를 사용하여 ref 를 설정하면, useRef 를 통해 만든 객체 안의 current 값이 실제 엘리먼트를 가르키게 된다.

## 로컬 변수 사용하기

추가적으로, 컴포넌트 로컬 변수를 사용해야 할 때도 useRef를 활용 가능하다. 여기서 로컬 변수라 함은, 렌더링이랑은 관계 없이 바뀔 수 있는 값을 의미한다.

함수형 컴포넌트로 작성한다면 다음과 같이 작성할 수 있다.

```javascript
import React, { useRef } from 'react';

const RefSample = () => {
  const id = useRef(1);
  const setId = (n) => {
    id.current = n;
  }
  const printId = () => {
    console.log(id.current);
  }
  return (
    <div>
      refsample
    </div>
  );
};

export default RefSample;
```

주의 할 점은, 이렇게 넣는 ref 안의 값은 바뀌어도 컴포넌트가 렌더링 되지 않는다는 점이다. 렌더링과 관련 되지 않은 값을 관리 할 때만 이러한 방식으로 코드를 작성하자.

## [목차로](Contents.md)