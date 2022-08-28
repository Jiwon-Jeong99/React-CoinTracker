import styled from "styled-components";
import {useState} from "react";

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
  text?: string;
}

// bgColor의 형태는 CircleProps를 기반으로 해야 한다
const Circle = ({
  bgColor,
  borderColor,
  text = "default text",
}: CircleProps) => {
  const [counter, setCounter] = useState(1);
  return (
    <>
      {/* borderColor에 아무것도 적지 않으면 기본값으로 white를 주겠다 */}
      <Container bgColor={bgColor} borderColor={borderColor ?? "white"}>
        {text}
      </Container>
    </>
  );
};

export default Circle;
