# JSX

```javascript
const element = <h1>Hello, world!</h1>;
```
위 코드는 JSX라고 하며 Javascript를 확장한 문법이다.
JSX는 React "엘리먼트"를 생성한다.
jsx작성시 input과 같은 태그들은 self closing 태그를 사용한다.
두개 이상의 태그는 하나의 태그로 감싸져야 한다. 비어있는 태그fragment를 사용하자 `<>` `</>`
* * *
## JSX란?

React에서는 이벤트가 처리되는 방식, 시간에 따라 state(상태)가 변하는 방식,화면에 표기하기 위해 데이터가 준비되는 방식 등 렌더링 로직이 본질적으로 다른 UI 로직과 연결된다는 사실을 받아들인다.

React는 JSX 사용이 필수가 아니지만, 대부분의 사람은 JavaScript 코드 안에서 UI 관련 작업을 할 때 시각적으로 더 도움이 된다고 생각한다. 또한 React가 더욱 도움이 되는 에러 및 경고 메시지를 표시할 수 있게 해준다.
* * *

## JSX도 표현식이다.

컴파일이 끝나면, JSX 표현식이 정규 Javascript 함수 호출이 되고 Javascript 객체로 인식이 된다.

즉, JSX를 `if`문 구분 및 `for` loop 안에 사용하고, 변수에 할당하고, 인자로서 받아들이고, 함수로부터 반환이 가능하다.

```javascript
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```
* * *
## JSX 속성 정의

속성에 따옴표를 이용해 문자열 리터럴을 정의 할 수 있다.
```javascript
const element = <div tabIndex="0"></div>;
```

중괄호를 사용하여 어트리뷰트에 Javascript 표현식도 삽입할 수 있다.

```javascript
const element = <img src={user.avatarUrl}></img>;
```

어트리뷰트에 Javascript 표현식을 삽입할 때 중괄호 주변에 따옴표를 입력하지 말자.따옴표(문자열 값에) 또는 중괄호(표현식에 사용) 중 하나만 사용하고, 동일한 어트리뷰트에 두 가지를 동시에 사용하면 안된다.

> JSX는 HTML 보다는 Javascript에 가깝기 때문에, React DOM은 HTML 어트리뷰트 이름 대신 `camelCase`프로퍼티 명명 규칙을 사용한다.
예를 들어, JSX에서 class는 className 이 되고 tabindex는 tabindex가 된다.
* * *
## JSX로 자식 정의

태그가 비어있다면 XML처럼 `/>`를 이용하여 닫아주면 된다.
```javascript
const element = <img src={user.avatarUrl} />;
```
JSX 태그는 자식을 포함할 수 있다.
```javascript
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```
* * *
## JSX는 객체를 표현한다.

Babel은 JSX를 `React.createElement()` 호출로 컴파일한다.

```javascript
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

```javascript
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

위 두 코드는 동일하다.

`React.createElement()`는 버그가 없는 코드를 작성하는 데 도움이 되도록 몇 가지 검사를 수행하며, 기본적으로 다음과 같은 객체를 생성한다.

```javascript
// 주의: 다음 구조는 단순화되었다
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```
이러한 객체를 `React 엘리먼트`라고 하며, 화면에서 보고 싶은 것을 나타내는 표현이라 생각하면 된다.
React는 이 객체를 읽어서, DOM을 구성하고 최신 상태로 유지하는데 사용이 된다.

### [목차로](Intro.md)