import { lighten } from "polished";
import { FiX } from "react-icons/fi";
import styled from "styled-components";

export const ModalContent = styled.div`
  position: relative;
  width: 450px;
  height: 100%;
  background: #fff;
  padding: 20px;
  overflow: auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

export const ButtonClose = styled.div<any>`
  padding: 10px;

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