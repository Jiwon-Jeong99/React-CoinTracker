# React-CoinTracker with React-query

# Typescript tip

## 타입스크립트 타입 선언 방법 2가지

1. 변수가 되는 함수에 직접 타입 선언 (함수는 2번과 같은 방식으로도 사용 가능)

```tsx
const {coinId} = useParams<{coinId:string}>();
```

1. 객체 내 데이터의 타입을 선언

```tsx
interface Params {
	coinId:string;
}

function Coin() {
	const {coinId} = useParams<Params>();
	return <>Coin</>
}
```

다른 예시 - props를 줄 때

```tsx
interface CoinProps {
	text:string;
}

//CoinProps에 명시된 선언을 바탕으로
function Coin({text}:CoinProps) {
	return <>{text}</>
}

function App() {
	return <><Coin text="hello"></>
}
```

### yarn 명령어

1. CRA 생성
    
    `yarn create react-app 이름`
    
2. `yarn add react-router-dom@6`
3. `yarn add styled-components`

## Styled-components

[https://sangjuntech.tistory.com/11](https://sangjuntech.tistory.com/11)

### 스타일 컴포넌트의 기본

1. **스타일 컴포넌트 기본 이용**

```jsx
import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

const BoxOne = styled.div`
  background-color: teal;
  width: 100px;
  height: 100px;
`;

const Text = styled.span`
  color: white;
`;

function App() {
  return (
    <Father>
      <BoxOne />
      <Text>Hello</Text>
      <BoxTwo />
    </Father>
  );
}

export default App;
```

1. **스타일 컴포넌트 확장 이용** 
    - 다른 컴포넌트를 상속받아서

```jsx
import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;

// extended styled components
const Circle = styled(Box)`
  border-radius: 50px;
`;

function App() {
  return (
    <Father>
      <Box bgColor="teal" />
      <Circle bgColor="tomato" />
    </Father>
  );
}

export default App;
```

1. **as**
    - 스타일 컴포넌트를 다른 html 태그로 이용하고 싶을 때

```jsx
const Btn = styled.button`
  color: white;
  background-color: tomato;
  border: 0;
  border-radius: 15px;
`

function App() {
  return (
    // Father 컴포넌트를 header로 사용
    <Father as="header">
      <Box bgColor="teal" />
      <Circle bgColor="tomato" />
      <Btn>Log in</Btn>
      {/* btn을 a태그로 사용하고 싶을 때 */}
      <Btn as="a" href="/">Log in</Btn>
    </Father>
  );
}

export default App;
```

1. **attrs**
    - 해당 스타일 컴포넌트 전체에 기본 속성을 먹이고 싶을 때

```jsx
// attrs로 Input 컴포넌트 전체에 required:true 속성을 먹일 수 있음
const Input = styled.input.attrs({required: true})`
  color: tomato;
`

function App() {
  return (
      <Input />
  );
}

export default App;
```

### 스타일 컴포넌트 animation

1. **기본 animation 추가하기**
    - 보통 css만 쓰면 됨

```jsx
import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const rotateAnimation = keyframes`
  0%{
    transform: rotate(0deg);
    border-radius: 0px;
  }
  50%{
    transform: rotate(360deg);
    border-radius: 100px;
  }
  100%{
    transform: rotate(0deg);
    border-radius: 0px;
  }
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  animation: ${rotateAnimation} 1s linear infinite;
`;

function App() {
  return (
    <Wrapper>
      <Box />
    </Wrapper>
  );
}

export default App;
```

---

```jsx
import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const rotateAnimation = keyframes`
  0%{
    transform: rotate(0deg);
    border-radius: 0px;
  }
  50%{
    transform: rotate(360deg);
    border-radius: 100px;
  }
  100%{
    transform: rotate(0deg);
    border-radius: 0px;
  }
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotateAnimation} 1s linear infinite;
  span {
    font-size: 36px;
    &:hover {
      font-size: 100px;
    }
  }
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <span>☺️</span>
      </Box>
    </Wrapper>
  );
}

export default App;
```

1. **스타일 컴포넌트에 속하지 않는 엘리먼트 css 먹이기**
    - Box 태그 안의 span 태그에 속성 먹이기
    
    ```jsx
    const Box = styled.div`
      span {
        font-size: 36px;
      }
    `;
    ```
    
2. **hover** 
    - `&:hover{}` : 여기서 &가 상위 태그 span 이라는 뜻
    
    ```jsx
    const Box = styled.div`
      span {
        font-size: 36px;
        &:hover {
          font-size: 100px;
        }
      }
    `;
    ```
    
3. **스타일 컴포넌트 >(안) 스타일 컴포넌트를 건드리고 싶을 때**
    - Emoji 컴포넌트 자체를 바꿀 수 있기 때문에 태그가 span이든 p이든 상관x
    
    ```jsx
    const Emoji = styled.span`
      font-size: 36px;
    `;
    
    // html태그가 아니기 때문에 & 안쓰고 :hover 그대로
    const Box = styled.div`
      ${Emoji}:hover {
          font-size: 100px;
      }
    `;
    
    function App() {
      return (
        <Wrapper>
          <Box>
            <Emoji as="p">☺️</Emoji>
          </Box>
        </Wrapper>
      );
    }
    
    export default App;
    ```
    

---

## Theme

> 기본적으로 모든 색상들을 가지고 있는 object
> 
- App.js

```jsx
import styled from "styled-components";

const Title = styled.h1`
  /* index.js에서 ThemeProvider에 감싸진 태그는 theme에 접근 가능 */
  color: ${(props) => props.theme.textColor};
`;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundColor};
`;

function App() {
  return (
    <Wrapper>
      <Title>Hello</Title>
    </Wrapper>
  );
}

export default App;
```

- index.js
    - ThemeProvider를 import해서 App을 감싸준다.

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";

const root = ReactDOM.createRoot(document.getElementById("root"));

// dark, light 속성이 같기 때문에 app.js에서 listen해주기만 하면 됨
const darkTheme = {
  textColor: "whitesmoke",
  backgroundColor: "#111",
};

const lightTheme = {
  textColor: "#111",
  backgroundColor: "whitesmoke",
};

root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

---

## TypeScript

> strongly-typed, 프로그래밍 언어가 작동하기 전에 type을 확인
> 
- 데이터 타입이 무엇인지 미리 선언할 수 있어 에러를 미리 잡아줄 수 있음
- 코드가 실행되기 전에 **어디서** 에러가 난 건지 알려줌
- 타입스크립트로 작성하면 브라우저에는 JS로 컴파일해서 보내줌
- .ts인데 react랑 같이 쓰면 `.tsx`

**CRA에 타입스크립트 설치 방법**

1. 모든걸 다 지우고 새로 시작
    
    `yarn create react-app 내앱이름 —template typescript`
    
2. 이미 있는 CRA에 타입스크립트 추가
    
    `yarn add typescript @types/node @types/react @types/react-dom @types/jest`
    

- 타입스크립트는 styled-components를 모름
    
    (어떤 라이브러리나 패키지는 JS로 만들어졌기에)
    
    `yarn add styled-components @types/styled-components`
    

### @types

> 아주 큰 Github 레포, 모든 유명한 npm 라이브러리 저장소
> 

### interface

> 객체 모양(object shape)을 타입스크립트에게 설명해주는 타입스크립트의 개념
> 

```tsx
//PlayerShape라는 객체는 name, age가 있고 각각의 형태는 string,number
interface PlayerShape {
  name: string;
  age: number;
}

//playerObj 객체는 PlayerShape에서 명시한 걸 기반으로 하는 props
const sayHello = (playerObj: PlayerShape) =>
  "Hello ${playerObj.name} you are ${playerObj.age} year old";

sayHello({name:"jiwon",age:24})
```

- Circle.tsx

```tsx
import styled from "styled-components";

// CircleProps의 bgColor는 string 형태일 것이다.
interface CircleProps {
    bgColor: string;
  }

// ContainerProps를 상속받은 Container 컴포넌트의 속성
const Container = styled.div<CircleProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
`;

// bgColor의 형태는 CircleProps를 기반으로 해야 한다
const Circle = ({ bgColor }: CircleProps) => {
  return (
    <>
      <Container bgColor={bgColor} />
    </>
  );
};

export default Circle;
```

- App.tsx

```tsx
import Circle from "./Circle";

//여기서 props는 default props라 Circle bgColor가 없으면 에러가 뜸
function App() {
  return (
    <>
      <Circle bgColor="teal" />
      <Circle bgColor="tomato" />
    </>
  );
}

export default App;
```

### Default props & Optional props

- Default props : 반드시 App.tsx에서 bgColor props를 사용해야 함
- Optional props : bgColor props가 있어도 되고 없어도 됨 (선택적)
    - borderColor`?`:string;
    - 기본값을 주기 : borderColor `??` "white”

```tsx
interface CircleProps {
		//default props
    bgColor: string;
		//optional props
    borderColor?:string;
  }
```

- Circle.tsx

```tsx
import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
  //   여기서는 borderColor가 required-default
  borderColor: string;
}

// ContainerProps를 상속받은 Container 컴포넌트의 속성
const Container = styled.div<CircleProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
  /* 왜냐하면 Container 속성에 borderColor가 있기 때문에 borderColor는 default로 필요 */
  border: 1px solid ${(props) => props.borderColor};
`;

// CircleProps의 bgColor는 string 형태일 것이다.
interface CircleProps {
  bgColor: string;
  borderColor?: string;
}

// bgColor의 형태는 CircleProps를 기반으로 해야 한다
const Circle = ({ bgColor, borderColor }: CircleProps) => {
  return (
    <>
      {/* borderColor에 아무것도 적지 않으면 기본값으로 white를 주겠다 */}
      <Container bgColor={bgColor} borderColor={borderColor ?? "white"} />
    </>
  );
};

export default Circle;
```

- App.tsx

```jsx
import Circle from "./Circle";

function App() {
  return (
    <>
      <Circle borderColor="yellow" bgColor="teal" />
      <Circle bgColor="tomato" />
    </>
  );
}

export default App;
```

### State

> 타입스크립트에서는 타입 명시가 중요함. any 타입 최대한 배제하기
> 
- 타입스크립트에서는 useState(1)의 초기값을 보고 counter가 number형식일 것이라 추론함
- 그래서 setCounter(”hello”)하면 에러가 남

```jsx
const [counter, setCounter] = useState(1);
```

- value가 number or string 이다 라고 명시
    
    `useState<number | string>`
    

```tsx
const [value, setValue] = useState<number|string>(0);
```

![Untitled](React%20-%20Master%20Class%20d5c2a4dd8cfb4ff7aa463983fda98242/Untitled.png)

![Untitled](React%20-%20Master%20Class%20d5c2a4dd8cfb4ff7aa463983fda98242/Untitled%201.png)

```tsx
import { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  // form 이벤트는 html input에 의해 작동한다
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    // 타입스크립트에서는 target을 currentTarget이라 쓴다-기능은 같음
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("hello", value);
  };
  return (
    <>
      {/* onSubmit 또한 이벤트 중 하나이다 */}
      <form onSubmit={onSubmit}>
        <input
          value={value}
          onChange={onChange}
          type="text"
          placeholder="username"
        />
        <button>Log in</button>
      </form>
    </>
  );
}

export default App;
```

### Themes

**styled-components**

- declarations file 만들기 - `styled.d.ts`
    
    → index.d.ts라는 기본 스타일 컴포넌트 형식이 @types에서 불러와지는데 이에 덧붙여서 스타일링을 하고 싶을 때 
    

> react와 겹치는 파일 - `.tsx`, 아닌 경우 - `.ts`
> 
- styled.d.ts
    - 스타일 컴포넌트에서 쓰일 변수들의 타입을 설정

```tsx
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    // 내 테마가 어떻게 보일지 설명하는 부분
    textColor: string;
    bgColor: string;
    btnColor: string;
  }
}
```

- theme.ts
    - theme에 대한 정의 - aka circles.tsx

```tsx
// 테마 만들기
import { DefaultTheme } from "styled-components";

// styled.d.ts에서 선언한 변수는 다 써야됨
export const lightTheme: DefaultTheme = {
  bgColor: "white",
  textColor: "black",
  btnColor: "tomato",
};

export const darkTheme: DefaultTheme = {
  bgColor: "black",
  textColor: "white",
  btnColor: "teal",
};
```

- index.tsx
    - ThemeProvider theme으로 다크모드 전환

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { lightTheme, darkTheme } from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

- App.tsx
    - Dummy의 props를 설명하기 위해서는 interface 사용
    - **interface : 타입스크립트에게 객체 내의 데이터를 설명해주는 것**

```tsx
import React, { useState } from "react";
import styled from "styled-components";

// theme 내부로 접근 가능(props도)
const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;
const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

interface DummyProps {
  text: string;
  otherThingHere?: boolean;
}

function Dummy({ text, otherThingHere }: DummyProps) {
  return <h1>{text}</h1>;
}

function App() {
  return (
    <Container>
      <Dummy text="hello" />
    </Container>
  );
}

export default App;
```

---

## Crypto Tracker

### Setup

- 설치
    
    `yarn add react-router-dom@6` : 어플리케이션에 URL을 가질 수 있게 해줌
    
    `yarn add react-query`
    
- <Link to>
    
    coin.name을 클릭하면 url/해당coin.id로 연결
    
    ```tsx
    <Link to={`/${coin.id}`}>{coin.name}</Link>
    ```
    

코드설명

- Coins.tsx
    
    `<Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>`
    
    coin.name이 명시되어 있는 곳을 클릭하면 /coin.id에 해당하는 URL로 넘어감
    
- Routes.tsx
    
    `<Route path="/:coinId" element={<Coin />} />
     <Route path="/" element={<Coins />} />`
    
    url이 /coinId 이면 Coin.tsx로 넘어감
    
- Coin.tsx
    
    ```tsx
    const Coin = () => {
      const { coinId } = useParams<{ coinId: string }>();
    
      return <h1>Coin:{coinId}</h1>;
    };
    ```
    
    useParams를 이용해 /coinId에서 파라미터 coinId를 가지고 와서 화면에 Coin:{coinId}를 보여줌 
    
    (/btc-bitcoin이 coin.id이자 파라미터여서 Coin:btc-bitcoin을 보여준 것)
    

![Untitled](React%20-%20Master%20Class%20d5c2a4dd8cfb4ff7aa463983fda98242/Untitled%202.png)

### mock-data를 사용한 ver.

- Coins.tsx

```tsx
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 0px 20px;
`;

const Header = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.div``;

const Coin = styled.div`
  background-color: black;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    transition: color 0.2s ease-in;
    /* 박스의 끝부분을 클릭해도 연결 가능 a태그에 padding을 주었기 때문에*/
    display: block;
    padding: 20px;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const coins = [
  {
    id: "btc-bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    rank: 1,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "hex-hex",
    name: "HEX",
    symbol: "HEX",
    rank: 3,
    is_new: false,
    is_active: true,
    type: "token",
  },
];

const Coins = () => {
  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      <CoinsList>
        {coins.map((coin) => (
          <Coin key={coin.id}>
            <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
          </Coin>
        ))}
      </CoinsList>
    </Container>
  );
};

export default Coins;
```

### 데이터 패칭 ver.

- useState가 배열일 경우
    
    ```tsx
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    ```
    
- 함수를 즉시 실행하고 싶을 때
    
    ```tsx
    useEffect(() => {
        (async () => {
          fetch("https://api.coinpaprika.com/v1/coins");
        })();
      }, []);
    ```
    
    ```tsx
    useEffect(() => {
    	(() => console.log(1))();
    }, []);
    ```
    

- Coins.tsx
    
    ```tsx
    import styled from "styled-components";
    import { Link } from "react-router-dom";
    import { useEffect, useState } from "react";
    
    const Container = styled.div`
      padding: 0px 20px;
      max-width: 480px;
      margin: 0 auto;
    `;
    
    const Header = styled.div`
      height: 10vh;
      display: flex;
      justify-content: center;
      align-items: center;
    `;
    
    const CoinsList = styled.div``;
    
    const Coin = styled.div`
      background-color: black;
      color: ${(props) => props.theme.bgColor};
      margin-bottom: 10px;
      border-radius: 15px;
      a {
        transition: color 0.2s ease-in;
        /* 박스의 끝부분을 클릭해도 연결 가능 a태그에 padding을 주었기 때문에*/
        display: block;
        padding: 20px;
      }
      &:hover {
        a {
          color: ${(props) => props.theme.accentColor};
        }
      }
    `;
    
    const Title = styled.h1`
      font-size: 48px;
      color: ${(props) => props.theme.accentColor};
    `;
    
    const Loader = styled.div`
      text-align: center;
      display: block;
    `;
    
    interface CoinInterface {
      id: string;
      name: string;
      symbol: string;
      rank: number;
      is_new: boolean;
      is_active: boolean;
      type: string;
    }
    
    const Coins = () => {
      const [coins, setCoins] = useState<CoinInterface[]>([]);
      const [loading, setLoading] = useState(true);
      //  시작할 때 1번만 실행
      useEffect(() => {
        (async () => {
          const response = await fetch("https://api.coinpaprika.com/v1/coins");
          const json = await response.json();
          //   앞의 100개만 잘라서 보여줌
          setCoins(json.slice(0, 100));
          setLoading(false);
        })();
      }, []);
      console.log(coins);
      return (
        <Container>
          <Header>
            <Title>코인</Title>
          </Header>
          {/* loading = true면 Loading...을 false면 coin을 */}
          {/* coin목록을 다 불러왔을 때만 false로 변환됨 */}
          {loading ? (
            <Loader>Loading...</Loader>
          ) : (
            <CoinsList>
              {coins.map((coin) => (
                <Coin key={coin.id}>
                  <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
                </Coin>
              ))}
            </CoinsList>
          )}
        </Container>
      );
    };
    
    export default Coins;
    ```
    

### 파라미터를 전송하면서 데이터를 보내주는데 시간(로딩)이 걸리니 안 보이게 빨리 보내주자 ⇒ URL x → State 사용
