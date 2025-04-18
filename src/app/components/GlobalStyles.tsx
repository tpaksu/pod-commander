import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Inter', sans-serif;
    background: #f4f4f9;
    margin: 0;
    color: #333;
  }

  h2 {
    font-size: 1.5rem;
    color: #1e1e2f;
  }

  button {
    font-family: inherit;
    font-size: 1rem;
  }
`;

export default GlobalStyles;
