import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
  }
  *,
  *::before,
  *::after {
    margin: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  }
  a {
    text-decoration: none;
    color: #1FB58F;
  }
  ul,
  ol, li {
    padding: 0;
    margin: 0;
    list-style-type: none;
  } 
  
  #root {
    height: 100%;
    width: 100vw;
  }
  
  body::-webkit-scrollbar {
    width: 8px;
  }

  body::-webkit-scrollbar-track {
    background: #1FB58F40;      
  }

  body::-webkit-scrollbar-thumb {
    background-color: #1FB58F;
    border-radius: 6px;
  }
  h1,h2,h3,h4,h5, span {
    cursor: default;
  }
`;

export default GlobalStyle;
