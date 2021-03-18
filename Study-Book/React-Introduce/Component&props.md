# Components and Props

>컴포넌트를 통해 UI를 재사용 가능한 개별적인 여러 조각으로 나누고, 각 조각을 개별적으로 살펴볼 수 있다.

* 개념적으로 컴포넌트는 Javascript의 함수와 유사하다. "props"라고 하는 임의의 입력을 받은 후, 화면에 어떻게 표시되는지를 기술하는 React 엘리먼트를 반환한다.

* * *

### 함수 컴포넌트와 클래스 컴포넌트

컴포넌트를 정의하는 가장 간단한 방법은 Javascript 함수를 작성하는 것이다.

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
이 함수는 데이터를 가진 하나의 "props" (props는 속성을 나타내는 데이터이다) 객체인자를 받은 후 React 엘리먼트를 반환하므로 유효한 React 컴포넌트이다. 이러한 컴포넌트는 Javascript 함수이기 때문에 말 그대로 "함수 컴포넌트"라고 칭한다.

또한 ES6 class를 사용하여 컴포넌트를 정의할 수 있다. 

```javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

```
React의 관점에서 볼 때 위 두 가지 유형의 컴포넌트는 동일하다.

* * *

### 컴포넌트 렌더링

React 엘리먼트는 사용자 정의 컴포넌트로도 나타낼 수 있다.

```javascript
const element = <Welcome name="Hong" />;
```

React가 사용자 정의 컴포넌트로 작성한 엘리먼트를 발견하면 JSX 어트리뷰트와 자식을 해당 컴포넌트에 단일 객체로 전달한다. 이 객체를 "props"라고 한다.

아래 예시는 "Hello, Hong"을 렌더링하는 코드이다.

```javascript
function Welocome(props) {
    return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Hong" />;
ReactDOM.render(
    element,
    document.getElementById('root')
);
```
1. `<Welcome name="Hong" />` 엘리먼트로 `ReactDOM.render()` 를 호출한다.
2. React는 `{name: 'Hong'}` 를 props로 하여 Welcom 컴포넌트를 호출한다.
3. Welcome 컴포넌트는 결과적으로 `<h1>Hello, Hong</h1>` 엘리먼트를 반환한다.
4. React DOM은 `<h1>Hello, Hong</h1>` 엘리먼트와 일치하도록 DOM을 효율적으로 업데이트한다.

* * *

### 컴포넌트 합성

컴포넌트는 자신의 출력에 다른 컴포넌트를 참조 가능하다. 이는 모든 세부 단계에서 동일한 추상 컴포넌트를 사용할 수 있음을 의미한다. React 앱에서는 버튼, 폼, 다이얼로그, 화면 등의 모든 것들이 흔히 컴포넌트로 표현된다.

이러한 `App`컴포넌트를 작성할 수 있다.
```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

* * *

### 컴포넌트 추출

컴포넌트를 어러 개의 작은 컴포넌트로 나누는 것을 두려워하지 마라.

다음 `Comment` 컴포넌트를 살펴보면,
```javascript
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

`author(객체)`,`text(문자열)` 및 `data(날짜)`를 props로 받은 후 소셜미디어 웹 사이트의 코멘트를 날린다.

이 컴포넌트는 구성요소들이 모두 중첩 구조로 이루어져 있어서 변경하기 어려울 수 있으며, 각 구성요소를 개별적으로 재사용하기도 힘들다. 이 컴포넌트에서 몇 가지 컴포넌트를 추출하겠다.

먼저 `Avatar`

```javascript
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```

`Avatar`는 자신이 `Comment`내에서 렌더링 된다는 것을 알 필요가 없다. 따라서 props의 이름을 `author`에서 더욱 일반화된 `user`로 변경하였다.

props의 이름은 사용될 context가 아닌 컴포넌트 자체의 관점에서 짓는 것을 권장한다.

이제 `Comment`가 조금 단순해졌다.

```javascript
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

다음으로 사용자의 이름을 렌더링하는 `UserInfo`컴포넌트를 추출하겠다.

```javascript
unction UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

`Comment`가 훨씬 단순해졌다.

```javascript
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

처음에는 컴포넌트를 추출하는 작업이 지루해 보일 수 있다. 하지만 재사용 가능한 컴포넌트를 만들어 놓는 것은 더 큰 앱에서 작업할 때 두각을 나타낸다. UI 일부가 여러 번 사용되거나(Button, Panel, Avatar), UI일부가 자체적으로 복잡한 (App, FeddStory, Comment) 경우에는 별도의 컴포넌트로 만드는게 좋다.

* * *

### props는 읽기 전용이다.

함수 컴포넌트나 클래스 컴포넌트 모두 컴포넌트의 자체 props를 수정해서는 안된다.

```javascript
function sum(a,b) {
    return a + b;
}
```
이런 함수들을 순수 함수라고 칭한다. 입력값을 바꾸려 하지 않고 항상 동일한 입력값에 대해 동일한 결과를 반환하기 때문이다.

반면에 이 함수는 자신의 입력값을 변경하기 때문에 순수 함수가 아니다.

```javascript
function withdraw(account, amount) {
    account.total -= amount;
}
```

React는 매우 유연하지만 한 가지 엄격한 규칙이 있다.

* 모든 React 컴포넌트는 자신의 props를 다룰 때 반드시 순수 함수처럼 동작해야 한다.

### props 의 기본 사용법

예를 들어서, App 컴포넌트에서 Hello 컴포넌트를 사용 할 때 `name`이라는 값을 전달해주고 싶다고 가정해보자.

* App.js

```javascript
import React from 'react';
import Hello from './Hello';

function App() {
  return (
    <Hello name="react" />
  );
}

export default App;
```

* Hello.js
```javascript
import React from 'react';

function Hello(props) {
  return <div>안녕하세요 {props.name}</div>
}

export default Hello;
```

컴포넌트에게 전달되는 props는 파라미터를 통하여 조회 가능하다. props는 객체형태로 전달되며, 만약 `name`값을 조회하고 싶다면 `props.name`을 조회하면 된다.

### 여러개의 props, 비구조화 할당

Hello 컴포넌트에 또 다른 props를 전달해보자. `color`라는 값을 설정하자.

* App.js
```javascript
function App() {
  return (
    <Hello name="react" color="red"/>
  );
}
```

* Hello.js
```javascript
function Hello(props) {
  return <div style={{ color: props.color }}>안녕하세요 {props.name}</div>
}
```
props 내부의 값을 조회 할 떄마다 `props.`을 입력하고 있는데 함수의 파라미터에서 비구조화 할당(구조 분해) 문법을 사용하면 조금 더 코드를 간결하게 작성 할 수 있다.

* Hello.js
```javascript
function Hello({ color, name }) {
  return <div style={{ color }}>안녕하세요 {name}</div>
}
```

### defaultProps 로 기본값 설정

컴포넌트에 props를 지정하지 않았을 때 기본적으로 사용 할 값을 설정하고 싶다면 컴포넌트에 `defaultProps`라는 값을 설정하면 된다.

* Hello.js

```javascript
import React from 'react';

function Hello({ color, name }) {
  return <div style={{ color }}>안녕하세요 {name}</div>
}

Hello.defaultProps = {
  name: '이름없음'
}

export default Hello;
```

* App.js

```javascript
function App() {
  return (
    <>
      <Hello name="react" color="red"/>
      <Hello color="pink"/>
    </>
  );
}
```

### props.children

컴포넌트 태그 사이에 넣은 값을 조회하고 싶을 땐, `props.children`을 조회하면 된다.


### [목차로](Intro.md)