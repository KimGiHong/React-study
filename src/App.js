import React, {useRef} from 'react';
import Helllo from './Components/Hello';
import './App.css';
import Wrapper from './Components/Wrapper';
import Counter from './Components/Counter';
import InputSample from './Components/InputSample';
import UserList from './Components/UserList';

function App() {
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

  const nextId = useRef(4);
  
  const onCreate = () => {
    console.log(nextId.current);
    nextId.current += 1;
  }
  return (
    <UserList users={users}/>
    // <InputSample />

    //<Counter />

    // <Wrapper>
    //   <Helllo name = "react" color = "red" isSpecial={true}/>
    //   <Helllo color = "pink"/>
    // </Wrapper>

    // <>
    // {/* jsx 내부에서 주석을 사용하려면 {}를 사용하자.*/}
    //   <Helllo 
    //     //이런식으로 작성하는 주석은 화면에 나타나지 않는다.
    //   /> 
    //   <div style = {style}>{name}</div>
    //   <div className = "gray-box"></div>
    // </>
  );
}
export default App;

/*

jsx작성시 input과 같은 태그들은 self closing 태그를 사용한다.
두개 이상의 태그는 하나의 태그로 감싸져야 한다. 이럴때 귀찮다면 비어있는 태그fragment를 사용해라 <> </>
jsx 내부에서 javascript의 값을 나타내고싶다면 {}를 사용한다.
jsx에서 인라인 스타일을 설정할 때에는 객체를 생성하고 위와 같은 방법으로 작성하면 된다.
jsx에서는 class 대신 className이란걸 사용한다.


*Props Hello.js

name과 color 같은 것들을 props라고 칭한다.
Hello컴포넌트에서 name,color라는 props값을 파라미터를 통해 받아올 수 있는데 비구조화 할당을 해주면 바로 추출하여 사용할 수 있다.
기본값을 사용하기 위해서 defaultprops를 이용하도록 하자.
태그와 태그 사이에 넣는 내용을 의미하는것이 children props 이다.


*조건부 렌더링 Wrapper.js
:특정 조건이 참인지 거짓인지에 따라서 다른 결과를 보여주는 것을 의미한다.
조건부 렌더링을 사용할때에는 삼항연산자 또는 and연산자를 사용하자.
isSpecial의 값에 아무런 값을 넣지 않으면 true값을 출력함.



*useState Counter.js

컴포넌트에서 동적인 값을 상태(state)라고 부릅니다. 리액트에 useState 라는 함수가 있는데요, 이것을 사용하면 컴포넌트에서 상태를 관리 할 수 있습니다.
useState 를 사용 할 때에는 상태의 기본값을 파라미터로 넣어서 호출해줍니다. 이 함수를 호출해주면 배열이 반환되는데요, 여기서 첫번째 원소는 현재 상태, 두번째 원소는 첫번째 원소를 변환시키는 값인 Setter 함수입니다.
원래는 다음과 같이 해야하지만,

const numberState = useState(0);
const number = numberState[0];
const setNumber = numberState[1];

배열 비구조화 할당을 통하여 각 원소를 추출해준것.

함수형 업데이트

지금은 Setter 함수를 사용 할 때, 업데이트 하고 싶은 새로운 값을 파라미터로 넣어주고 있는데요, 그 대신에 기존 값을 어떻게 업데이트 할 지에 대한 함수를 등록하는 방식으로도 값을 업데이트 할 수 있습니다.
ex)const onIncrease = () => {
    setNumber(prevNumber => prevNumber + 1);
  }



*input 상태 관리하기 inputSample.js

리액트 상태에서 객체를 수정해야 할 때에는,

inputs[name] = value;
이런식으로 직접 수정하면 안됩니다.

그 대신에, 새로운 객체를 만들어서 새로운 객체에 변화를 주고, 이를 상태로 사용해주어야 합니다.

setInputs({
  ...inputs,
  [name]: value
});

여기서 사용한 ... 문법은 js의 spread 문법입니다. 객체의 내용을 모두 "펼쳐서" 기존 객체를 복사해주는데요

이러한 작업을, "불변성을 지킨다" 라고 부릅니다. 불변성을 지켜주어야만 리액트 컴포넌트에서 상태가 업데이트가 됐음을 감지 할 수 있고 이에 따라 필요한 리렌더링이 진행됩니다. 
만약에 inputs[name] = value 이런식으로 기존 상태를 직접 수정하게 되면, 값을 바꿔도 리렌더링이 되지 않습니다.
추가적으로, 리액트에서는 불변성을 지켜주어야만 컴포넌트 업데이트 성능 최적화를 제대로 할 수 있습니다.



*useRef inputSample.js

useRef() 를 사용하여 Ref 객체를 만들고, 이 객체를 우리가 선택하고 싶은 DOM 에 ref 값으로 설정해주어야 합니다. 그러면, Ref 객체의 .current 값은 우리가 원하는 DOM 을 가르키게 됩니다.
onReset 함수에서 input 에 포커스를 하는 focus() DOM API 를 호출해줄 수 있습니다.



*배열 렌더링 UserList.js

배열이 고정적이라면 상관없겟지만, 배열의 인덱스를 하나하나 조회해가면서 렌더링하는 방법은 동적인 배열을 렌더링하지 못합니다.
동적인 배열을 렌더링해야 할 때에는 자바스크립트 배열의 내장함수 map() 을 사용합니다.
map() 함수는 배열안에 있는 각 원소를 변환하여 새로운 배열을 만들어줍니다. 
리액트에서 동적인 배열을 렌더링해야 할 때는 이 함수를 사용하여 일반 데이터 배열을 리액트 엘리먼트로 이루어진 배열로 변환해주면 됩니다.

리액트에서 배열을 렌더링 할 때에는 key 라는 props 를 설정해야합니다. key 값은 각 원소들마다 가지고 있는 고유값으로 설정을 해야합니다. 
지금의 경우엔 id 가 고유 값이지요.

만약 배열 안의 원소가 가지고 있는 고유한 값이 없다면 map() 함수를 사용 할 때 설정하는 콜백함수의 두번째 파라미터 index 를 key 로 사용하시면 됩니다.
각 고유 원소에 key 가 있어야만 배열이 업데이트 될 때 효율적으로 렌더링 될 수 있습니다.
*/
