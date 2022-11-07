import styled from "styled-components";
import { Box } from "../Box";

interface IProps {
  height: number;
}

export const ControllerBox = styled.div<IProps>`
  transition-duration: 0.5s;
  overflow: hidden;
  height: ${props => `${props.height}px`}
`;

export const ContaierBox = styled.div<IProps>`
  transition-duration: 0.5s;
  position: relative;
  top: ${props => `-${props.height}px`}
`;

export const Container = styled(Box)`
  width: 400px;
  border: 0 !important;
`;

export const Title = styled.h4`
  fontWeight: bold;
`;

export const Subtitle = styled.p`
  fontSize: 12px;
`;
