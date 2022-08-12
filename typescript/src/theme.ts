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
