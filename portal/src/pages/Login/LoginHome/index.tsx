import React from 'react';

import { Button } from '@components';
import { FaArrowRight, FaQuestion } from 'react-icons/fa';
import { Instrucoes, Instrucoes2 } from './styles';
import Header from '../Header';

const LoginHome: React.FC<any> = ({ onGotoLogin, onGotoPrimeiroAcesso }) => {
  return (
    <>
      <Header />

      <Button
        title={"Entrar"}
        type={"primary"}
        className={"mb-4"}
        icon={<FaArrowRight />}
        onClick={onGotoLogin}
        block
      />

      <Button
        title={"Primeiro Acesso / Esqueci Minha Senha"}
        type={"secondary"}
        onClick={onGotoPrimeiroAcesso}
        icon={<FaQuestion />}
        block
      />

      <Instrucoes>
        <b>{"INSTRUÇÕES DE ACESSO AO PORTAL:"}</b>
        <br />
        {"Utilizar os navegadores Google Chrome ou Mozila Firefox (não utilizar internet explorer)"}
      </Instrucoes>

      <Instrucoes2>
        {"Para informações, entre em contato via nossos canais de atendimento"}
      </Instrucoes2>
    </>
  );
};

export default LoginHome;
