import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import { SideMenuPage, WebArea, WebRoute } from '@components';
import { Session } from '@session';

interface IMasterPageContext {
  navigate: (route: string) => void;// eslint-disable-line no-unused-vars
  title: (value: string) => void;// eslint-disable-line no-unused-vars
  setUserName: (value: string) => void;// eslint-disable-line no-unused-vars
  getUsername: () => string;
  noPadding: (value: boolean) => void;// eslint-disable-line no-unused-vars
  showMenu: (value: boolean) => void;// eslint-disable-line no-unused-vars
}

const MasterPageContext = createContext<IMasterPageContext | null>(null);

interface IMasterPageProps {
  menuRoute: string;
  logo: any;
  version: string;
  routes: Array<WebArea | WebRoute>;
  headerRoutes: Array<WebRoute>;
}

export const MasterPageProvider: React.FC<IMasterPageProps> = ({ headerRoutes, menuRoute, logo, version, routes }) => {
  const history = useHistory();
  const location = useLocation();

  const [Routes, setRoutes] = useState<Array<WebRoute | WebArea>>(routes);
  const [Title, setTitle] = useState('');
  const [ShowMenu, setShowMenu] = useState(true);

  // const [Admin, setAdmin] = useState(false);
  const [Username, setUsername] = useState('');
  const [NoPadding, setNoPadding] = useState(false);
  const [Blocked, setBlocked] = useState(false);

  useEffect(() => {
    setRoutes([...routes, ...headerRoutes]);
  }, [routes]);

  useEffect(() => {
    (async () => {
      setBlocked(false);

      const token = await Session.getToken();

      if (!token || token === null || token === undefined) {
        history.push("/login");
      }
    })();
  }, [location.pathname]);

  const navigate = useCallback((route: string) => {
    history.push(route);
  }, []);

  const title = useCallback((value: string) => {
    setTitle(value);
  }, []);

  const setUserName = useCallback((value: string) => {
    setUsername(value);
  }, []);

  const getUsername = useCallback(() => Username, []);

  const noPadding = useCallback((value) => {
    setNoPadding(value);
  }, []);

  const showMenu = useCallback((value) => {
    setShowMenu(value);
  }, []);

  return (
    <MasterPageContext.Provider value={{ navigate, title, setUserName, getUsername, noPadding, showMenu }}>
      <SideMenuPage
        admin={false}
        logo={logo}
        routes={Routes}
        username={Username}
        version={version}
        noPadding={NoPadding}
        title={Title}
        showMenu={ShowMenu}
        menuRoute={menuRoute}
        blocked={Blocked}
        headerRoutes={headerRoutes}
      />
    </MasterPageContext.Provider>
  );
};

interface IProps {
  title?: string;
  numFuncionalidade?: number;
  usaLog?: boolean;
  usaBloqueio?: boolean;
}

export function useMasterPage(props?: IProps): IMasterPageContext {
  const context = useContext(MasterPageContext);

  if (!context) throw new Error('useMasterPage must be user within a MasterPageProvider');

  if (props?.title) context.title(props.title);
  else context.title('');

  return context;
}
