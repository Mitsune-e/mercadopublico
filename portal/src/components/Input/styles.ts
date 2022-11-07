import { darken, lighten } from "polished";
import styled from "styled-components";

export const Container = styled.div``;
export const ShowPasswordContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  color: ${(props) => darken(0.1, props.theme.colors.gray)};

  &:hover {
    cursor: pointer;
    color: ${(props) => lighten(0.1, props.theme.colors.gray)};
  }
`;
