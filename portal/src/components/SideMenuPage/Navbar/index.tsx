import React from "react";
import { WebRoute } from "../..";

import logoNome from '@assets/logo_nome.png';

import { NavbarContainer, NavbarHeader, NavbarHeaderLogo, NavbarMenu, NavbarCloseButton, Version, NavbarHeaderSubLogo } from "./styles";
import MenuItem from "./MenuItem";
import AreaItem from "./AreaItem";
import { FaTimes } from "react-icons/fa";
import { WebArea } from "../../WebRoutes/WebArea";

interface IProps {
  logo: string;
  routes: Array<WebRoute | WebArea>;
  version: string;
  isOpened: boolean;
  toggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navbar: React.FC<IProps> = ({ toggleMenu, isOpened, version, routes, logo }) => {
  return (
    <>
      <NavbarContainer isOpened={isOpened}>
        <NavbarHeader>
          <NavbarHeaderLogo src={logo} alt="logo" />
          <NavbarHeaderSubLogo src={logoNome} alt="logo" />
        </NavbarHeader>

        <NavbarMenu>
          {routes.map((route, index) => {
            if (route instanceof WebRoute && (route as WebRoute).showInMenu) {
              return <MenuItem key={index} route={route as WebRoute} iconPosition={"left"} />;
            } else if (route instanceof WebArea) {
              return <AreaItem key={index} area={route as WebArea} iconPosition={"left"} />;
            } else return null;
          })}
        </NavbarMenu>

        <Version>Versão {version}</Version>
      </NavbarContainer>

      <NavbarCloseButton type="danger" onClick={() => toggleMenu(false)} icon={<FaTimes size={24} />} isOpened={isOpened} />
    </>
  );
};
