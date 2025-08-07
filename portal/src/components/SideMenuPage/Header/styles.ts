import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div<any>`
  display: flex;
  flex-direction: row;

  height: ${(p) => p.theme.sizes.header};

  background: ${(props) => props.theme.backgrounds.pageHeader};
  border-top: 0;
  padding: 15px 10px 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  justify-content: space-between;
  align-items: center;
`;

export const MenuButtonContainer = styled.div`
  color: #fff;

  @media (min-width: 1024px) {
    display: none;
  }
`;

export const MenuButton = styled.button<any>`>
  color: #fff;
`;

export const PageNames = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-top: 5px;
  padding: 0 10px;

  @media not 1024px {
    flex-direction: column;
    display: none;
  }
  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

export const PageTitle = styled.div`
  display: flex;
  flex: 1;
  font-size: 18px;
  color: ${(props) => props.theme.colors.pageHeaderText};
`;

export const PageUser = styled.div<any>`
  display: flex;
  font-size: 10pt;
  color: #fff;
`;

export const PageHeaderButtons = styled.span`
  margin-left: 20px;
`;

export const PageUserButton = styled(Link)`
  font-size: 12pt;
  color: #fff;
  padding: 7px;

  &:hover {
    color: ${(props) => lighten(0.3, props.theme.colors.gray)};
  }
`;
