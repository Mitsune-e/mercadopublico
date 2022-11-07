import { Link } from "react-router-dom";
import styled from "styled-components";
import { lighten } from 'polished';

export const PageHeaderButtons = styled.span`
  margin-left: 20px;
`;

export const PageUserButton = styled(Link)`
  font-size: 12pt;
  color: #fff;
  padding: 7px;

  &:hover {
    color: ${props => lighten(0.3, props.theme.colors.gray)};
  }
`;
