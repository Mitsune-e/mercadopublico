import React from 'react';
import { Container, Logo, Subtitulo, Titulo } from './styles';

import LogoEmpresa from '@assets/logo_mp.png';

const Header: React.FC = () => {
  return (
    <Container>
      <Logo src={LogoEmpresa} />

      <Titulo>Bem-vindo(a) ao Portal do Compras Governamentais!</Titulo>

      <Subtitulo>Área de Acesso Restrito</Subtitulo>
    </Container>
  );
};

export default Header;
