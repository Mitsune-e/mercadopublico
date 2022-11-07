import styled from "styled-components";

interface IProps {
  fontSize: number;
}

export const Container = styled.div<IProps>`
  font-size: ${props => props.fontSize}px !important;
`;