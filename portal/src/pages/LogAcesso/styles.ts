import { Row, Col } from '@components';
import styled from 'styled-components';

export const Totais = styled(Row)``;

export const TotalItem = styled(Col)`
  div {
    font-size: 24px;

    color: ${(p) => p.theme.colors.primary};
  }
`;
