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

const Btn = styled(Box)`
  color: white;
  background-color: tomato;
  border: 0;
  border-radius: 15px;
`

// attrs로 Input 컴포넌트 전체에 required:true 속성을 먹일 수 있음
const Input = styled.input.attrs({required: true})`
  color: tomato;
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
      <Input />
    </Father>
  );
}

export default App;
