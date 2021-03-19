# 조건부 렌더링
* 특정 조건이 참인지 거짓인지에 따라서 다른 결과를 보여주는 것을 의미한다.
> React에서는 원하는 동작을 캡슐화하는 컴포넌트를 만들 수 있다. 이렇게 하면 애플리케이션의 상태에 따라 컴포넌트 중 몇 개만을 렌더링할 수 있습니다.

React에서 조건부 렌더링은 JavaScript에서 조건 처리와 같이 동작한다. `if`나 `삼항연산자 또는 and연산자` 와 같은 Javascript 연산자를 현재 상태를 나타내는 엘리먼트를 만드는 데에 사용하자. 그러면 React는 현재 상태에 맞게 UI를 업데이트할 것이다.

아래 두 컴포넌트가 있다.

```javascript
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}
```

이제 사용자의 로그인 상태에 맞게 위 컴포넌트 중 하나를 보여주는 `Greeting`컴포넌트를 만들어보자,

```javascript
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```

이 예시는 `isLoggedIn` prop에 따라서 다른 인사말을 렌더링 한다.


### [목차로](Intro.md)