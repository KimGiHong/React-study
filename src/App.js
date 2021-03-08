import React, {useRef, useState, useMemo} from 'react';
// import Helllo from './Components/Hello';
// import Wrapper from './Components/Wrapper';
// import Counter from './Components/Counter';
// import InputSample from './Components/InputSample';
import UserList from './Components/UserList';
import CreateUser from './Components/CreateUser';

function countActiveUsers(users){  // 활성 사용자 수를 세는 함수
  console.log('활성 사용자 수를 세는중 ...');
  return users.filter(user => user.active).length;
}

function App() {
  const  [inputs, setInputs] = useState({
    username: '',
    email: '',
  });
  const { username , email} = inputs;

  const onChange = e => {
    const { name , value} = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  const [users,setUsers] = useState([
    {
        id: 1,
        username: 'Gihong',
        email: 'kimgihong9@naver.com',
        active: true,
    },
    {
        id: 2,
        username: 'Hongsi',
        email: 'kimgihong04@naver.com',
        active: false,
    },
    {
        id: 3,
        username: 'KimHong',
        email: 'kimgihong1127@naver.com',
        active: false,
    },
]);

  const nextId = useRef(4);

  const onCreate = () => { //배열 추가할 때
    const user = {
      id: nextId.current,
      username,
      email,
    };
    //setUsers([...users,user]);
    setUsers(users.concat(user));
    setInputs({
      username:'',
      email:''
    });
    nextId.current += 1;
  };
  
  const onRemove = id => { //배열 제거할 때
    setUsers(users.filter(user => user.id !== id));
  };

  const onToggle = id => { //배열 수정할 때
      setUsers(users.map(
        user => user.id === id
          ? { ...user, active : !user.active}
          :user
      ));
  };
  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}  
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
      <div>활성 사용자 수: {count}</div>
    </>


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

지금은 Setter 함수를 사용 할 때, 업데이트 하고 싶은 새로운 값을 파라미터로 넣어주고 있는데, 그 대신에 기존 값을 어떻게 업데이트 할 지에 대한 함수를 등록하는 방식으로도 값을 업데이트 할 수 있다.
ex)const onIncrease = () => {
    setNumber(prevNumber => prevNumber + 1);
  }

*input 상태 관리하기 inputSample.js

리액트 상태에서 객체를 수정해야 할 때에는,

inputs[name] = value;
이런식으로 직접 수정 X

그 대신에, 새로운 객체를 만들어서 새로운 객체에 변화를 주고, 이를 상태로 사용해주어야 한다.

setInputs({
  ...inputs,
  [name]: value
});

여기서 사용한 ... 문법은 js의 spread 문법입니다. 객체의 내용을 모두 "펼쳐서" 기존 객체를 복사해줍니다.

이러한 작업을, "불변성을 지킨다" 라고 부릅니다. 불변성을 지켜주어야만 리액트 컴포넌트에서 상태가 업데이트가 됐음을 감지 할 수 있고 이에 따라 필요한 리렌더링이 진행된다.
만약에 inputs[name] = value 이런식으로 기존 상태를 직접 수정하게 되면, 값을 바꿔도 리렌더링이 되지 않는다.
추가적으로, 리액트에서는 불변성을 지켜주어야만 컴포넌트 업데이트 성능 최적화를 제대로 할 수 있다.



*useRef inputSample.js

useRef() 를 사용하여 Ref 객체를 만들고, 이 객체를 우리가 선택하고 싶은 DOM 에 ref 값으로 설정해주어야 한다. 그러면, Ref 객체의 .current 값은 우리가 원하는 DOM 을 가르키게 된다.
onReset 함수에서 input 에 포커스를 하는 focus() DOM API 를 호출해줄 수 있다.



*배열 렌더링 UserList.js

배열이 고정적이라면 상관없겟지만, 배열의 인덱스를 하나하나 조회해가면서 렌더링하는 방법은 동적인 배열을 렌더링하지 못함.
동적인 배열을 렌더링해야 할 때에는 자바스크립트 배열의 내장함수 map() 을 사용한다.
map() 함수는 배열안에 있는 각 원소를 변환하여 새로운 배열을 만들어준다.
리액트에서 동적인 배열을 렌더링해야 할 때는 이 함수를 사용하여 일반 데이터 배열을 리액트 엘리먼트로 이루어진 배열로 변환해주면 된다.

리액트에서 배열을 렌더링 할 때에는 key 라는 props 를 설정해야합니다. key 값은 각 원소들마다 가지고 있는 고유값으로 설정을 해야한다.
지금의 경우엔 id 가 고유 값이다.

만약 배열 안의 원소가 가지고 있는 고유한 값이 없다면 map() 함수를 사용 할 때 설정하는 콜백함수의 두번째 파라미터 index 를 key 로 사용하면 된다.
각 고유 원소에 key 가 있어야만 배열이 업데이트 될 때 효율적으로 렌더링 될 수 있다.


*배열 추가 UserList.js , CreateUser.js

배열에 변화를 줄 때에는 객체와 마찬가지로, 불변성을 지켜주어야 한다. 
그렇기 때문에, 배열의 push, splice, sort 등의 함수를 사용하면 안된다. 
만약에 사용해야 한다면, 기존의 배열을 한번 복사하고 나서 사용해야 할 것.

불변성을 지키면서 배열에 새 항목을 추가하는 방법 두가지.

첫번째 spread 연산자를 사용하는 것
둘 째 concat 함수를 사용하는 것
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    setUsers([...users,user]); -> 이처럼 spread연산자를 이용하여 배열을 추가할 수 있다.
    setUsers([users.concat(user)]); -> concat 함수는 기존의 배열을 수정하지 않고, 새로운 원소가 추가된 새로운 배열을 만들어준다
    setInputs({
      username:'',
      email:''
    });
    nextId.current += 1;
  }

이처럼 배열에 새 항목을 추가 할 때에는 이렇게 spread 연산자를 사용하거나, concat 을 사용하도록 하자.


*배열 삭제 UserList.js , CreateUser.js

User 컴포넌트의 삭제 버튼이 클릭 될 때는 user.id 값을 앞으로 props 로 받아올 onRemove 함수의 파라미터로 넣어서 호출해주어야 한다.
여기서 onRemove "id 가 __인 객체를 삭제해라" 라는 역할을 가지고 있습니다.
이 onRemove 함수는 UserList 에서도 전달 받을것이며, 이를 그대로 User 컴포넌트에게 전달해줄것입니다.

onRemove 구현
배열에 있는 항목을 제거할 때에는, 추가할떄와 마찬가지로 불변성을 지켜가면서 업데이트를 해주어야 합니다.
불변성을 지키면서 특정 원소를 배열에서 제거하기 위해서는 filter 배열 내장 함수를 사용하는것이 가장 편할 것이다.
이 함수는 배열에서 특정 조건이 만족하는 원소들만 추출하여 새로운 배열을 만들어줍니다.

onClick={() => onRemove(user.id)} 이런식으로 함수를 넣어주지 않고
onClick={onRemove(user.id)} 이 코드 처럼 함수를 호출했을 시에는 렌더링한 부분이 모두 사라지게 된다.


*배열 항목 수정 UserList.js

배열의 불변성을 유지하면서 배열을 업데이트 할 때에 map 함수를 사용 할 수 있다.
id 값을 비교해서 id 가 다르다면 그대로 두고, 같다면 active 값을 반전시키도록 구현
onToggle를 받아와서 User 에게 전달해주고, onRemove 를 구현했었던것처럼 onToggle 에 id 를 넣어서 호출하면 수정이 가능하다.


*useEffect UserList.js

마운트 : 컴포넌트가 화면상으로 나타나는 것
언마운트 : 컴포넌트가 화면상에서 사라지는 것

useEffect를 이용하여 호출시키면 호출이되고 추가적으로 호출시 호출 가능하다. 하지만 컴포넌트 삭제 또는 업데이트시에는 호출이 되지않는다.

useEffect 를 사용 할 때에는 첫번째 파라미터에는 함수, 두번째 파라미터에는 의존값이 들어있는 배열 (deps)을 넣는다. 
만약에 deps 배열을 비우게 된다면, 컴포넌트가 처음 나타날때에만 useEffect 에 등록한 함수가 호출된다.

그리고, useEffect 에서는 함수를 반환 할 수 있는데 이를 cleanup 함수라고 부른다. 
cleanup 함수는 useEffect 에 대한 뒷정리를 해준다, deps 가 비어있는 경우에는 컴포넌트가 사라질 때 cleanup 함수가 호출된다.

마운트 시에 하는 작업들.

1.props 로 받은 값을 컴포넌트의 로컬 상태로 설정
2.외부 API 요청 (REST API 등)
3.라이브러리 사용 (D3, Video.js 등...)
4.setInterval 을 통한 반복작업 혹은 setTimeout 을 통한 작업 예약

언마운트 시에 하는 작업들.

1.setInterval, setTimeout 을 사용하여 등록한 작업들 clear 하기 (clearInterval, clearTimeout)
2.라이브러리 인스턴스 제거

deps 에 특정 값을 넣게 된다면, 컴포넌트가 처음 마운트 될 때에도 호출이 되고, 지정한 값이 바뀔 때에도 호출이 된다. 
그리고, deps 안에 특정 값이 있다면 언마운트시에도 호출이되고, 값이 바뀌기 직전에도 호출이 된다.

    useEffect(() => {
        console.log('user값이 설정됨')
        console.log(user);
        return() => {
            console.log('user값이 바뀌기 전');
            console.log(user)
        }
    }, [user]);  -> 이렇게 뒤에 값을 넣는게 deps배열인것 같다.

    이렇게 코드를 작성했다면 컴포넌트를 추가 삭제 또는 업데이트 하기 전에 
    'user값이 설정됨'이 호출되고 user값들이 호출된다음 'user값이 바뀌기 전'이 호출된다.

useEffect 안에서 사용하는 상태나, props 가 있다면, useEffect 의 deps 에 넣어주어야 한다. 그렇게 하는게, 규칙이라고 한다.
만약 useEffect 안에서 사용하는 상태나 props 를 deps 에 넣지 않게 된다면 useEffect 에 등록한 함수가 실행 될 때 최신 props / 상태를 가르키지 않게 된다.

참고로 리액트 컴포넌트는 기본적으로 부모컴포넌트가 리렌더링되면 자식 컴포넌트 또한 리렌더링이 된다. 바뀐 내용이 없다 할지라도.
물론, 실제 DOM 에 변화가 반영되는 것은 바뀐 내용이 있는 컴포넌트에만 해당한다. 하지만, Virtual DOM 에는 모든걸 다 렌더링하고 있다는 것이다.

알아둬야하는것, useEffect을 사용할땐 첫번째 파라미터에는 함수를 등록하고 두번째 파라미터에는 deps라는 배열을 등록한다.


*useMemo UserList.js

useMemo 의 첫번째 파라미터에는 어떻게 연산할지 정의하는 함수를 넣어주면 되고 두번째 파라미터에는 deps 배열을 넣어주면 되는데, 
이 배열 안에 넣은 내용이 바뀌면, 등록한 함수를 호출해서 값을 연산해주고, 만약에 내용이 바뀌지 않았다면 이전에 연산한 값을 재사용하게 된다.

성능 최적화를 위한 useMemo Hook


*/
