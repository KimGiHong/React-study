# 엘리먼트 렌더링
* 엘리먼트는 React앱의 가장 작은 단위이고, 화면에 표시할 내용을 기술한다.

```javascript
const element = <h1>Hello, world</h1>;
```
브라우저 DOM 엘리먼트와 달리 React 엘리먼트는 일반 객체이며(plan object) 쉽게 생성이 가능하다.
React DOM은 React 엘리먼트와 일치하도록 DOM을 업데이트한다.
> 컴포넌트와 엘리먼트를 혼동하지 않도록 주의하자.
* * *
## DOM에 엘리먼트 렌더링하기

이러한 코드가 있다고 가정해보자
```html
<div id="root"></div>
```

이 안에 들어가는 모든 엘리먼트를 React DOM에서 관리하기 떄문에 이것을 "루트(root)" DOM 노드라고 부른다.

React로 구현된 애플리케이션은 일반적으로 하나의 루트 DOM 노드가 있다. React 기존 앱에 통합하려는 경우 원하는 만큼 많의 수의 독립된 루트 DOM 노드가 있을 수 있다.

React 엘리먼트를 루트 DOM 노드에 렌더링하려면 둘 다 `ReactDOM.render()`로 전달하면 된다.

```javascript
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```
결과는 "Hello, world"가 출력될 것이다.

* * *

## 렌더링 된 엘리먼트 업데이트하기

React 엘리먼트는 불변객체이다. 엘리먼트를 생성한 이후에는 해당 엘리먼트의 자식이나 속성을 변경할 수 없다.
엘리먼트는 영화에서 하나의 프레임과 같이 득정 시점의 UI를 보여준다.

UI를 업데이트하는 방법은 새로운 엘리먼트를 생성하고, 이를 ReactDOM.render()로 전달하면 된다.

예시로 시계를 만들어 보았다.
```javascript
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
```
위 함수에서 `setInterval()`콜백을 이용해 초마다 `ReactDOM.render()`을 호출한다.
* * *

## 변경된 부분만 업데이트하기

React DOM은 해당 엘리먼트와 그 자식 엘리먼트 이전의 엘리먼트와 비교하고 DOM을 원하는 사앹로 만드는데 필요한 경우에만 DOM을 업데이트한다.

개발자 도구를 이용해 코드를 살펴보면 이를 확인가능하다.

```javascript
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  // highlight-next-line
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
```

매초 전체 UI를 다시 그리도록 엘리먼트를 만들었지만 React DOM은 내용이 변경된 텍스트 노드만 업데이트하였다.

### [다음장 Components & Props](Component&props.md) 