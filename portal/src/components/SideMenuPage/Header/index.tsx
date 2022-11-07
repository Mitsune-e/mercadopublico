import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MenuButtonContainer, MenuButton, PageTitle, PageUser, PageNames, Container } from './styles';
import { FaBars } from 'react-icons/fa';
import { AdminButton } from './AdminButton';
import { WebArea, WebRoute } from '../..';
import { HeaderButton } from './HeaderButton';

interface IProps {
  username: string;
  admin: boolean;
  isMenuOpened: boolean;
  routes: Array<WebRoute | WebArea>;
  toggleMenu: any;
  headerRoutes: Array<WebRoute>;

  title?: string;
}

export const Header: React.FC<IProps> = ({ routes, title, toggleMenu, username, admin, headerRoutes }) => {
  const location = useLocation();

  const [Title, setTitle] = useState('');
  const [Routes, setRoutes] = useState<WebRoute[]>([]);

  useEffect(() => {
    if (routes && routes.length > 0) {
      const result: WebRoute[] = [];

      for (const route of routes) {
        if (route instanceof WebRoute) result.push(route);

        if (route instanceof WebArea) for (const areaRoute of route.routes) result.push(areaRoute);
      }

      setRoutes(result);
    }
  }, [routes]);

  useEffect(() => {
    if (title) {
      setTitle(title);
      return;
    }

    if (Routes && Routes.length > 0) {
      const routeName = location.pathname;

      for (const route of Routes) {
        if (routeName === route.path || routeName === route.linkPath || routeName.includes(route.linkPath)) {
          setTitle(route.title);
          return;
        }
      }
    }
  }, [location.pathname, title, Routes]);

  async function handleToggleMenu() {
    await toggleMenu();
  }

  return (
    <Container>
      <MenuButtonContainer>
        <MenuButton className="btn btn-link" onClick={handleToggleMenu}>
          <FaBars />
        </MenuButton>
      </MenuButtonContainer>

      <PageNames>
        <PageTitle>{Title}</PageTitle>

        <PageUser className={'text-right d-none d-sm-block'}>
          {username}

          {headerRoutes.map((route: WebRoute, index: number) =>
            <HeaderButton key={index} route={route} />
          )}

          <AdminButton admin={admin} />
        </PageUser>
      </PageNames>
    </Container>
  );
};
