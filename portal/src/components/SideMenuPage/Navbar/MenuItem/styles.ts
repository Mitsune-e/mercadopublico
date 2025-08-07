import styled from "styled-components";
import { darken } from "polished";

export const ContainerA = styled.a<any>`
  display: flex;
  flex-direction: row;
  padding: 5px 15px;
  text-decoration: none;

  color: #7c7e80;
  font-weight: 400;
  font-size: ${(props) => props.theme.sizes.navMenuItem};

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    text-decoration: none;
    cursor: pointer;
  }
`;

export const Title = styled.div <any>`
  display: flex;
  flex: 1;
  align-items: center;
`;

interface IconProps {
  position: "left" | "right";
}

export const Icon = styled.div<any & IconProps>`
  display: flex;
  padding: 7px;
  border-radius: 3px;

  background: ${(props) => darken(0.03, props.theme.backgrounds.nav)};
  margin-right: ${(props) => (props.position === "left" ? "10px" : 0)};
`;

export const Tooltip = styled.div<any>`
  align-self: center;
  color: ${(props) => props.color} !important;

  &:hover {
    cursor: pointer;
  }
`;
