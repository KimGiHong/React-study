# useCallback

useCallback 은 useMemo와 상당히 비슷한 함수이다. 주로 렌더링 성능을 최적화해야 하는 상황에서 사용하는데, 이 Hook을 사용하면 이벤트 핸들러 함수를 필요할 때만 생성 가능하다.

[useMemo](useMemo.md)에서 구현한 Average 컴포넌트를 보면, onChange 와 onInsert 라는 함수를 선언하였다. 이렇게 선언을 하게 되면 컴포넌트가 리렌더링 될 때마다 이 함수들이 새로 생성된다.

대부분의 경우에는 이러한 방식이 문제가 되지 않지만, 컴포넌트의 렌더링이 자주 발생하거나, 렌더링 해야 할 컴포넌트의 개수가 많아진다면 이 부분을 최적화 해주는 것이 좋다.

* Average.js

```javascript
const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState('');

  const onChange = useCallback(e => {
    setNumber(e.target.value);
  }, []); // 컴포넌트가 처음 렌더링 될 때만 함수 생성
  const onInsert = useCallback(
    e => {
      const nextList = list.concat(parseInt(number));
      setList(nextList);
      setNumber('');
    },
    [number, list]
  ); // number 혹은 list 가 바뀌었을 때만 함수 생성
```

onChange 와 onInsert 함수를 이렇게 바꿔준다음 useCallback을 추가로 import 시켜준다.

useCallback 의 첫번째 파라미터에는 우리가 생성해주고 싶은 함수를 넣어주고, 두번째 파라미터에는 배열을 넣어주면 되는데 이 배열에는 어떤 값이 바뀌었을 때 함수를 새로 생성해줘야 하는지 명시해줘야 한다.

만약 onChange 처럼 비어있는 배열을 넣게 되면 컴포넌트가 렌더링 될 때 단 한번만 함수가 생성되며, onInsert 처럼 배열 안에 number 와 list 를 넣게 되면 인풋 내용이 바뀌거나 새로운 항목이 추가 될 때마다 함수가 생성된다.

함수 내부에서 기존의 상태 값을 의존해야 할 때는 꼭 두번째 파라미터 안에 포함을 시켜줘야 한다. 예를 들어 onChange 의 경우, 기존의 number 와 list 를 조회해서 nextList 를 생성하기 때문에 배열 안에 number 와 list 를 꼭 넣어주어야 한다.

```javascript
useCallback(() => {
  console.log('hello world!');
}, [])

useMemo(() => {
  const fn = () => {
    console.log('hello world!');
  };
  return fn;
}, [])
```

위 두 코드는 똑같은 코드이다.

useCallback 은 결국 useMemo 에서 함수를 반환하는 상황에서 더 편하게 사용 할 수 있는 Hook이다. 숫자, 문자열, 객체 처럼 일반 값을 재사용하기 위해서는 useMemo를, 그리고 함수를 재사용 하기 위해서는 useCallbak을 사용하자.

## [목차로](Contents.md)