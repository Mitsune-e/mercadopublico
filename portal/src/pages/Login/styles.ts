import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

export const LongForm = styled.div`
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  background: #fff;
  border-radius: 22px;

  ${breakpoint('tablet')`
    width: 1000px;
    height: 600px;
    font-size: 16px;

    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  `}
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
