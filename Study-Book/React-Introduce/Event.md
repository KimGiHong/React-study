# 이벤트 처리
> React 엘리먼트에서 이벤트를 처리하는 방식은 DOM 엘리먼트에서 이벤트를 처리하는 방식과 매우 유사하다. 몇 가지 문법 차이는 다음과 같다.

* React의 이벤트는 소문자 대신 캐멀 케이스를 사용한다.
* JSX를 사용하여 문자열이 아닌 함수로 이벤트 핸들러를 전달한다.

예를 들어,HTML은 다음과 같다.

```html
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

하지만 React에서는 약간 다르다.

```javascript
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

또 다른 차이점으로, React에서는 `false`를 반환해도 기본 동작을 방지할 수 없다.
반드시 `preventDefault`를 명시적으로 호출해야 한다. 예를 들어, 일반 HTML에서는 새 페이지를 여는 링크의 기본 동작을 방지하기 위해 다음과 같은 코도를 작성한다.

```javascript
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
```

React에서는 아래와 같이 작성 가능하다.

```javascript
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

여기서 `e`는 합성 이벤트이다. React는 [W3C 명세](https://www.w3.org/TR/DOM-Level-3-Events/)에 따라 합성 이벤트를 정의하기 떄문에 브라우저 호환성에 대해 걱정할 필요가 없다. React 이벤트는 브라우저 고유 이벤트와 정확히 동일하게 동작하지는 않는다.

### 이벤트 핸들러에 인자 전달하기

루프 내부에서는 이벤트 핸들러에 추가적인 매개변수를 전달하는 것이 일반적이다. 예를 들어, id가 행의 ID일 경우 다음 코드가 모두 작동한다.

```javascript
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

위 두줄은 동등하며 각각 `화살표 함수`와 `Function.prototype.bind`를 사용한다.

두 경우 모드 React 이벤트를 나타내는 e 인자가 ID 뒤에 두 번째 인자로 전달된다. 화살표 함수를 사용하면 명시적으로 인자를 전달해야 하지만 bind를 사용할 경우 추가 인자가 자동으로 전달된다.

### [목차로](Intro.md)