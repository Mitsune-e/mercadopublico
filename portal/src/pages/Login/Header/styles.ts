import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Logo = styled.img<any>`
  width: 80px;
  margin-bottom: 20px;
`;

export const Titulo = styled.h4`
  font-size: 30px;
  margin-bottom: 10px;
`;

export const Subtitulo = styled.h4`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin-bottom: 50px;
  color: #000;
  font-weight: bold;
`;
