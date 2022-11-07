import express from 'express'; // app server
import bodyParser from 'body-parser'; // parser for post requests
//const express = require("express");
//const bodyParser = require("bodyParser");

const app = express();
import { Auth, Version, Produtos, LGPD, Carrinho, Comprovantes, Categoria, Efetivador } from "./controllers";

// Add headers
app.use(function (_, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', "true");

  // Pass to next layer of middleware
  next();
});

// Bootstrap application settings
app.use(express.static('./public')); // load UI from public folder
app.use(bodyParser.json());

app.get(Version.check.Rota, Version.check.Metodo);

app.post(Auth.login.Rota, Auth.login.Metodo);
app.post(Auth.criar.Rota, Auth.criar.Metodo);
app.get(Auth.menu.Rota, Auth.validarJWT, Auth.menu.Metodo);

app.get(LGPD.buscar.Rota, Auth.validarJWT, LGPD.buscar.Metodo);
app.post(LGPD.inserir.Rota, Auth.validarJWT, LGPD.inserir.Metodo);

app.get(Produtos.buscarTodos.Rota, Auth.validarJWT, Produtos.buscarTodos.Metodo);
app.get(Produtos.buscarPorCategoria.Rota, Auth.validarJWT, Produtos.buscarPorCategoria.Metodo);
app.get(Produtos.buscarNovos.Rota, Auth.validarJWT, Produtos.buscarNovos.Metodo);
app.get(Produtos.buscarPorId.Rota, Auth.validarJWT, Produtos.buscarPorId.Metodo);
app.post(Produtos.cadastrar.Rota, Auth.validarJWT, Produtos.cadastrar.Metodo);

app.post(Carrinho.gravarLance.Rota, Auth.validarJWT, Carrinho.gravarLance.Metodo);

app.get(Comprovantes.buscarTodos.Rota, Auth.validarJWT, Comprovantes.buscarTodos.Metodo);
app.get(Comprovantes.buscarPorOid.Rota, Auth.validarJWT, Comprovantes.buscarPorOid.Metodo);

app.get(Categoria.buscarTodas.Rota, Auth.validarJWT, Categoria.buscarTodas.Metodo);
app.get(Categoria.buscarSub.Rota, Auth.validarJWT, Categoria.buscarSub.Metodo);
app.get(Categoria.buscarArvorePelaSub.Rota, Auth.validarJWT, Categoria.buscarArvorePelaSub.Metodo);
app.get(Categoria.buscarPorId.Rota, Auth.validarJWT, Categoria.buscarPorId.Metodo);

app.get(Efetivador.buscarParametros.Rota, Auth.validarJWT, Efetivador.buscarParametros.Metodo);
app.post(Efetivador.buscar.Rota, Auth.validarJWT, Efetivador.buscar.Metodo);
app.post(Efetivador.efetivar.Rota, Auth.validarJWT, Efetivador.efetivar.Metodo);
app.post(Efetivador.recusar.Rota, Auth.validarJWT, Efetivador.recusar.Metodo);

export default app;
