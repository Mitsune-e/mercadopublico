import styled from 'styled-components';


export const LongForm = styled.div`
  width: 100%;
`;

export const Wrapper = styled.div<any>`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;
`;

export const Container = styled.div`
  /* Blank component for now. Add styles later. */
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 35px;
  background-size: cover;
  align-items: center;
  justify-content: center;
  max-width: 600px;
`;

export const Versao = styled.div`
  display: flex;
  margin: 20px 0;
`;
