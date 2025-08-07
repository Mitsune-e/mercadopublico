import styled from "styled-components";
import { FiX } from "react-icons/fi";
import { lighten } from "polished";

export const ModalContent = styled.div`
  position: relative;
  width: 700px;
  background: #fff;
  border-radius: 5px;
`;

export const Header = styled.div`
  display: flex;
`;

export const Title = styled.h3`
  flex: 1;
  padding: 20px;
  margin: 0px;
`;

export const ButtonClose = styled.div<any>`
  padding: 20px;

  &:hover {
    cursor: pointer;
  }

  &:hover > svg {
    color: ${() => lighten(0.5, "#000")};
  }
`;

export const IconClose = styled(FiX)`
  color: #000;
`;

export const Footer = styled.div`
  padding: 10px;
  border-top: 1px solid #ccc;
  text-align: right;
`;

export const Content = styled.div`
  padding: 20px;
  overflow: auto;
  max-height: 400px;
  border-top: 1px solid #ccc;
`;
