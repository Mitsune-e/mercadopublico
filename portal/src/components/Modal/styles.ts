import styled from "styled-components";

export const ModalContainer = styled.div<any>`
  position: fixed;
  display: flex;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999 !important;
  justify-content: ${props => props.align === "right" ? "flex-end" : "center"};
  align-items: center;
`;