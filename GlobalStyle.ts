import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        font-family: 'Noto Sans KR', sans-serif;
        width: 100%;
        height: 100%;
    }
    p {
        display: inline;
    }

    * {
        margin: 0;
    }
`;

export default GlobalStyle;
