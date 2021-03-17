# State and Lifecycle

## State 올바르게 사용하기

### 직접 State를 수정하지 말자.

```javascript
// Wrong
this.state.comment = 'Hello';
```
이 코드는 컴포넌트를 다시 렌더링하지 않는다.

대신에 setState()를 사용한다.

```javascript
// Correct
this.setState({comment: 'Hello'});
```

`this.state`를 지정할 수 있는 유일한 공간은 바로 constructor이다.

### State 업데이트는 비동기적일 수도 있다.

React는 성능을 위해 여러 `setState()`호출을 단일 업데이트로 한꺼번에 처리할 수 있다.

`this.props`와 `this.state`가 비동기적으로 업데이트될 수 있기 떄문에 다음 state를 계산할 때 해당 값에 의존해서는 안된다.

```javascript
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

이를 수정하기 위해 객체보다는 함수를 인자로 사용하는 다른 형태의 `setState()`를 사용한다. 그 함수는 이전 state를 첫 번째 인자로 받아들일 것이고, 업데이트가 적용된 시점의 props를 두 번째 인자로 받아들일 것이다.

```javascript
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```
위에 코드에서 화살표 함수가 아니더라도 정상적으로 작동한다.

```javascript
// Correct
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```

### State 업데이트는 병합된다.

`setState()`를 호출할 때 React는 제공한 객체를 현재 state로 병합한다.

예로, state는 다양한 독립적인 변수를 포함할 수 있다.

```javascript
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```

별도의 `setState()`호출로 이러한 변수를 독립적으로 업데이트 가능하다.

```javascript
componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```
병합은 얕게 이루어지기 때문에 `this.State({comments})`는 `this.state.posts`에 영향을 주진 않지만 `this.state.comments`는 완전히 대체 된다.

### 데이터는 아래로 흐른다.

부모 컴포넌트나 자식 컴포넌트 모두 특정 컴포넌트가 유상태인지 또는 무상태인지 알 수 없고, 그들이 함수나 클래스로 정의되었는지에 대해서 관심을 가질 필요가 없다.

이 때문에 state는 종종 로컬 또는 캡슐화라고 불린다. state가 소유하고 설정한 컴포넌트 이외에는 어떠한 컴포넌트에도 접근 불가하다.

컴포넌트는 자신의 state를 자식 컴포넌트에 props로 전달 가능하다.

```javascript
<FormattedData dadt={this.state.data}>
```

`FormattedData`컴포넌트는 `data`를 자신의 props로 받을 것이고 이것이 `Clock`의 state로부터 왔는지, `Clock`의 props에서 왔는지, 수동으로 입력한 것인지 알지 못한다.

```javascript
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```

일반적으로 이를 `"하향식(top-down)"`또는 `"단방향식"`데이터 흐름이라고 한다. 모든 state는 항상 특정한 컴포넌트가 소유하고 있으며 그 state로부터 파생된 UI 또는 데이터는 오직 트리구조에서 자신의 "아래"에 있는 컴포넌트에만 영향을 미친다.

트리구조가 props들의 폭포라고 상상하면 각 컴포넌트의 state는 임의의 점에서 만나지만 동시에 아래로 흐르는 부가적인 수원(water source)이라고 할 수 있다.

## LifeCycle Method

LifeCycle Method는 한국어러 "생명주기 메서드"라고 부른다. 생명주기 메서드는 컴포넌트가 브라우저상에 나타나고, 업데이트되고, 사라지게 될 때 호출되는 메서드들이다. 추가적으로 컴포넌트에서 에러가 났을 때 호출되는 메서드도 있다.

생명주기 메서드는 클래스형 컴포넌트에서만 사용 가능하다, 우리가 기존에 알고있던 `useEffect`랑 비슷하다고 생각하면 될 것 같다.(물론 작동방식은 매우 다르다.)

별로 중요치 않으니 문서를 보고 사용 할 수 있을 정도만 학습해두도록하자.

### [목차로](Intro.md)