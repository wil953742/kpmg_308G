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
        -moz-box-sizing: border-box; 
        -webkit-box-sizing: border-box; 
        box-sizing: border-box; 
    }

    a:focus,
    a:visited,
    button:focus,
    input:focus {
        outline: none;
    }
`;

export default GlobalStyle;
