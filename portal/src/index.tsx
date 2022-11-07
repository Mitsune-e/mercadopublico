import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import logo from '@assets/logo_mp.png';
import GlobalStyle from '@styles/global';
import '@styles/global.scss';
import theme from '@styles/theme';

import { headerRoutes, routes } from '@routes';

import config from './config.json';
import { ThemeProvider } from 'styled-components';

import Package from './../package.json';
import { CarrinhoProvider, MasterPageProvider, ModalProvider } from '@contexts';
declare global {
  interface Navigator {
    // eslint-disable-next-line
    msSaveBlob?: (blob: any, defaultName?: string) => boolean;
  }
}

ReactDOM.render(
  <HashRouter>
    <ThemeProvider theme={theme}>
      <CarrinhoProvider>
        <ModalProvider>
          <MasterPageProvider
            headerRoutes={headerRoutes}
            routes={routes}
            logo={logo}
            version={Package.version}
            menuRoute={config.apiUrl + '/auth/menu'}
          ></MasterPageProvider>
        </ModalProvider>
      </CarrinhoProvider>
      <GlobalStyle />
    </ThemeProvider>
  </HashRouter>,
  document.getElementById('root')
);
