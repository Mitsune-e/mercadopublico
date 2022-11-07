import styled from "styled-components";
import { Button } from "../../Button";

export const ModalContent = styled.div`
  position: relative;
  width: 700px;
  background: #fff;
  border-radius: 5px;
`;

export const ModalMessage = styled.div`
  padding: 30px;
`;

export const ModalMessageHeader = styled.div`
  margin: 20px;

  i {
      font-size: 50pt;
      margin-bottom: 30px;
  }
`;

export const ModalMessageBody = styled.div`
  color: ${props => props.theme.colors.gray};
  font-weight: 300;
  font-size: 12pt;
`;

export const ModalMessageLink = styled(Button)`
  margin-top: 20px;
  font-size: 12pt;
  text-transform: uppercase;
`;