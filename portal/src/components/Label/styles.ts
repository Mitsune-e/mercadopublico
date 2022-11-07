import styled from "styled-components";

export const Container = styled.label`
  margin-bottom: 0px;
`;

export const Tooltip = styled.a`
  position: relative;
  top: -1px;
  margin-right: 5px;
  color: ${(props) => props.color} !important;
  z-index: 9999;

  &:hover {
    cursor: pointer;
  }
`;
