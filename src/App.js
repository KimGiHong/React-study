import React from 'react';
import Helllo from './Hello';
import './App.css';
import Wrapper from './Wrapper';
import Counter from './Counter';
import InputSample from './InputSample';

function App() {
  return (
    <InputSample />

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


*Props

name과 color 같은 것들을 props라고 칭한다.
Hello컴포넌트에서 name,color라는 props값을 파라미터를 통해 받아올 수 있는데 비구조화 할당을 해주면 바로 추출하여 사용할 수 있다.
기본값을 사용하기 위해서 defaultprops를 이용하도록 하자.
태그와 태그 사이에 넣는 내용을 의미하는것이 children props 이다.


*조건부 렌더링
:특정 조건이 참인지 거짓인지에 따라서 다른 결과를 보여주는 것을 의미한다.
조건부 렌더링을 사용할때에는 삼항연산자 또는 and연산자를 사용하자.
isSpecial의 값에 아무런 값을 넣지 않으면 true값을 출력함.

*useState

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

*input 상태 관리하기

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
*/
