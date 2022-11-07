import React from 'react';
import { FaClipboard, FaCommentsDollar, FaHome, FaListOl, FaShoppingCart, FaSignOutAlt, FaUserLock } from 'react-icons/fa';
// import { RouteProps } from 'react-router-dom';
import { WebArea, WebRoute } from '@components';
import {
  Carrinho,
  Categorias,
  ComprovanteDetalhe,
  Comprovantes,
  Efetivador,
  Home,
  Login,
  Produtos,
  ProdutosCadastrar,
  ProdutosDetalhe
} from '@pages';

export const routes: Array<WebRoute | WebArea> = [
  new WebRoute({
    id: "home",
    path: "/",
    title: "Tela Inicial",
    component: () => <Home />,
    icon: <FaHome />,
    exactPath: true,
    showInMenu: true
  }),
  new WebRoute({
    id: 'produtos',
    path: "/produtos",
    title: "Produtos",
    component: () => <Produtos />,
    icon: <FaCommentsDollar />,
    exactPath: true,
    showInMenu: true
  }),
  new WebRoute({
    id: 'produtosDetalhe',
    title: 'Detalhamento do Produto',
    icon: <FaCommentsDollar />,
    path: '/produtos/:oid',
    linkPath: '/produtos',
    component: () => <ProdutosDetalhe />,
    showInMenu: false,
    exactPath: true
  }),
  new WebRoute({
    id: "categorias",
    path: "/categorias",
    title: "Categorias",
    component: () => <Categorias />,
    icon: <FaListOl />,
    showInMenu: true,
    exactPath: true
  }),
  new WebRoute({
    id: "categorias",
    path: "/categorias/:oid",
    linkPath: "/categorias",
    title: "Categorias",
    component: () => <Categorias />,
    icon: <FaListOl />,
    showInMenu: false,
    exactPath: true
  }),
  new WebRoute({
    id: 'comprovantes',
    title: 'Comprovantes',
    icon: <FaClipboard />,
    path: '/comprovantes',
    component: () => <Comprovantes />,
    showInMenu: true,
    exactPath: true
  }),
  new WebRoute({
    id: 'comprovantesDetalhe',
    title: 'Detalhamento do Comprovante',
    icon: <FaClipboard />,
    path: '/comprovantes/:oid',
    linkPath: '/comprovantes',
    component: () => <ComprovanteDetalhe />,
    showInMenu: false,
    exactPath: true
  }),
  new WebArea({
    id: "administracao",
    title: "Administração",
    icon: <FaUserLock />,
    routes: [
      new WebRoute({
        id: "efetivador",
        path: "/efetivador",
        title: "Efetivar Transações",
        component: () => <Efetivador />,
        showInMenu: true,
        exactPath: true
      }),
      new WebRoute({
        id: "cadastrar",
        path: "/cadastrar",
        title: "Cadastrar Produtos",
        component: () => <ProdutosCadastrar />,
        showInMenu: true,
        exactPath: true
      })
    ]
  }),
  new WebRoute({
    id: 'login',
    path: '/login',
    title: 'Sair',
    component: () => <Login />,
    icon: <FaSignOutAlt />,
    exactPath: true,
    showInMenu: true
  })
];

export const headerRoutes: Array<WebRoute> = [
  new WebRoute({
    id: "carrinho",
    path: "/carrinho",
    title: "Carrinho",
    component: () => <Carrinho />,
    icon: <FaShoppingCart />,
    exactPath: true,
    showInMenu: false,
    tooltip: "Carrinho"
  })
];
