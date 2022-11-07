import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    width: 100vw;
    height: 100vh;

    background: ${(props) => props.theme.backgrounds.pageContent};
    color: ${(props) => props.theme.colors.text};

    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.01em;
    -webkit-font-smoothing: antialiased;

    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;

    font-feature-settings: "kern" 1;
    -webkit-font-feature-settings: "kern" 1;
    -moz-font-feature-settings: "kern" 1;
  }

  *, body, input, button {
    font-family: Roboto, Arial, Helvetica, sans-serif;
  }

  .btn-primary {
    color: #fff !important;
  }

  nav {
    li:first-child {
      display: flex;
      justify-content: center;
    }

    img {
      width: 100px !important;
    }
  }
`;
