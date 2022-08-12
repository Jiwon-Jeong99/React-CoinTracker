import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    // 내 테마가 어떻게 보일지 설명하는 부분
    textColor: string;
    bgColor: string;
    accentColor: string;
  }
}
