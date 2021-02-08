import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        font-family: 'Noto Sans KR', sans-serif;
    }
    p {
        display: inline;
    }
    
    * {
        margin: 0;
    }
`;

export default GlobalStyle;
