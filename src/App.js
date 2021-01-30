import React from 'react';
import Helllo from './Hello';
import './App.css';

function App() {
  const name = 'react'
  const style = {
    backgroundColor : 'black',
    color : 'aqua',
    padding : '1rem'
  };
  return (
    <>
    {/* jsx 내부에서 주석을 사용하려면 {}를 사용하자.*/}
      <Helllo 
        //이런식으로 작성하는 주석은 화면에 나타나지 않는다.
      /> 
      <div style = {style}>{name}</div>
      <div className = "gray-box"></div>
    </>
  );
}

/*

jsx작성시 input과 같은 태그들은 self closing 태그를 사용한다.
두개 이상의 태그는 하나의 태그로 감싸져야 한다. 이럴때 귀찮다면 비어있는 태그fragment를 사용해라 <> </>
jsx 내부에서 javascript의 값을 나타내고싶다면 {}를 사용한다.
jsx에서 인라인 스타일을 설정할 때에는 객체를 생성하고 위와 같은 방법으로 작성하면 된다.
jsx에서는 class 대신 className이란걸 사용한다.

*/
export default App;
