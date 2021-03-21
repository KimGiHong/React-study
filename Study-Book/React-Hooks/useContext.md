# useContext

이 Hook 을 사용하면 함수형 컴포넌트에서 Context를 보다 더 쉽게 사용 가능하다.

* ContextSample.js

```javascript
import React, { createContext, useContext } from 'react';

const ThemeContext = createContext('black');
const ContextSample = () => {
  const theme = useContext(ThemeContext);
  const style = {
    width: '24px',
    height: '24px',
    background: theme
  };
  return <div style={style} />;
};

export default ContextSample;
```

위 코드를 ContextSample 컴포넌트에 적었다면 App 컴포넌트에서 렌더링해보자.

검정색 사각형이 나타날 것이다.

## [목차로](Contents.md)