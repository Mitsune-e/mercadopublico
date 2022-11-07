import React, { useEffect, useState } from "react";
import { Session } from "@session";
import { useMasterPage } from "@contexts";
import LoginForm from "./LoginForm";
import LoginHome from "./LoginHome";
import Package from "./../../../package.json";

import { Container, Content, Versao, Wrapper } from "./styles";
import PrimeiroAcessoForm from "./PrimeiroAcessoForm";

export const Login: React.FC = () => {
  const masterPage = useMasterPage();

  const [HomeActive, setHomeActive] = useState(true);
  const [LoginActive, setLoginActive] = useState(false);
  const [PrimeiroAcessoActive, setPrimeiroAcessoActive] = useState(false);

  useEffect(() => {
    (async () => {
      masterPage.showMenu(false);
      await Session.clear();
    })();
  }, []);

  function handleGotoLogin() {
    setHomeActive(false);
    setLoginActive(true);
  }

  function handleGotoPrimeiroAcesso() {
    setHomeActive(false);
    setPrimeiroAcessoActive(true);
  }

  function handleGoBack() {
    setHomeActive(true);
    setLoginActive(false);
    setPrimeiroAcessoActive(false);
  }

  return (
    <Wrapper id="wrapper">
      <Container>
        <Content>
          {HomeActive && <LoginHome onGotoLogin={handleGotoLogin} onGotoPrimeiroAcesso={handleGotoPrimeiroAcesso} />}
          {LoginActive && <LoginForm onGoBack={handleGoBack} />}
          {PrimeiroAcessoActive && <PrimeiroAcessoForm onGoBack={handleGoBack} />}
        </Content>
      </Container>
      <Versao>Versão: {Package.version}</Versao>
    </Wrapper>
  );
};

export default Login;
