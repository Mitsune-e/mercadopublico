import styled from 'styled-components';
import { Button } from '../../Button';

export const NavbarContainer = styled.nav<any>`
  position: fixed;
  flex-direction: column;
  width: ${(p) => (p.isOpened ? p.theme.sizes.navbar : 0)};
  height: 100%;
  background: ${(p) => p.theme.backgrounds.nav};
  overflow: auto;
  z-index: 9998;

  @media (min-width: 1024px) {
    display: block !important;
    width: ${(p) => p.theme.sizes.navbar} !important;
  }
`;

export const NavbarHeader = styled.li`
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding: 33px 40px;
  float: none;
  position: relative;
  display: block;
`;

export const NavbarHeaderLogo = styled.img`
  width: 100%;
`;

export const NavbarHeaderSubLogo = styled.img`
  width: 100% !important;
`;

export const NavbarMenu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const NavbarMenuItem = styled.li`
  position: relative;
  display: block;
`;

export const NavbarCloseButton = styled(Button) <any>`
  display: ${(p) => (p.isOpened ? 'block' : 'none')};
  position: fixed;
  left: 232px;
  z-index: 9999;
  border-radius: 0;

  @media (min-width: 1024px) {
    display: none;
  }
`;

export const Version = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(p) => p.theme.colors.gray};
  font-size: 12px;
  padding: 10px;
`;
