import React, { useCallback, useEffect, useState } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { WebRoute, WebArea } from '..';
import { Navbar } from './Navbar';
import { Header } from './Header';
import { Block, BlockTitle, PageWrapper, PageWrapperContent } from './styles';
import { FaBan } from 'react-icons/fa';
import { Session } from '@session';

interface IProps {
  admin: boolean;
  username: string;
  logo: string;
  routes: Array<WebRoute | WebArea>;
  version: string;
  showMenu: boolean;
  menuRoute: string;
  blocked: boolean;
  headerRoutes: WebRoute[];

  title?: string;
  noPadding?: boolean;
}

export const SideMenuPage: React.FC<IProps> = ({ headerRoutes, admin, username, logo, routes, version, showMenu, title, noPadding, menuRoute, blocked }) => {
  const location = useLocation();
  const history = useHistory();
  const [MenuOpen, setMenuOpen] = useState(false);
  const [Routes, setRoutes] = useState([]);
  const [NavbarRoutes, setNavbarRoutes] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        if (location.pathname == '/login') {
          setRoutes([routes.filter((x) => x.id === 'login')[0]]);
        } else {
          const token = await Session.getToken();

          if (!token || token === null || token === undefined) {
            return history.push("/login");
          }

          const { data } = await axios.get(menuRoute, { headers: { Authorization: `Bearer ${token}` } });
          const menus = data;

          const routesList: WebRoute[] = [];
          const navbarRoutesList = [];

          for (const route of routes) {
            if (menus.includes(route.id) && route instanceof WebRoute) {
              routesList.push(route);
              navbarRoutesList.push(route);
            }
            if (menus.includes(route.id) && route instanceof WebArea) {
              const area = Object.assign<WebArea, any>(new WebArea(), route);
              area.routes = [];
              for (const areaRoute of route.routes) {
                if (menus.includes(areaRoute.id)) {
                  routesList.push(areaRoute);
                  area.routes.push(areaRoute);
                }
              }
              navbarRoutesList.push(area);
            }
          }

          setNavbarRoutes(navbarRoutesList);
          setRoutes(routesList);
        }
      }
      catch (e: any) {
        console.log(e);
        history.push("/login");
      }
    })();
  }, [routes, location.pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleToggleMenu = useCallback(() => {
    setMenuOpen((old) => !old);
  }, [showMenu]);

  return (
    <>
      {showMenu && <Navbar logo={logo} routes={NavbarRoutes} version={version} isOpened={MenuOpen} toggleMenu={handleToggleMenu} />}

      <PageWrapper marginLeft={showMenu}>
        {showMenu && <Header headerRoutes={headerRoutes} isMenuOpened={MenuOpen} toggleMenu={handleToggleMenu} title={title} admin={admin} routes={routes} username={username} />}

        <PageWrapperContent noPadding={noPadding || !showMenu} headerHidden={!showMenu}>
          {blocked && (
            <Block>
              <FaBan size={100} />
              <BlockTitle>Funcionalidade bloqueada temporariamente.</BlockTitle>
            </Block>
          )}

          {!blocked && (
            <Switch>
              {Routes.map((item, index: number) => {
                if (!item.externalLink) {
                  return <Route key={index} exact={item.exactPath} path={item.path} component={item.component} />;
                } else return null;
              })}
            </Switch>
          )}
        </PageWrapperContent>
      </PageWrapper>
    </>
  );
};
