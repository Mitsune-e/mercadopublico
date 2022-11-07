import React, { createContext, useCallback, useState } from "react";
import { WebProdutosEntidade } from "@entidades";

interface ICarrinhoContext {
  buscarProdutos: () => Promise<WebProdutosEntidade[]>;
  localizarProduto: (produto: WebProdutosEntidade) => Promise<WebProdutosEntidade>;// eslint-disable-line no-unused-vars
  adicionarProduto: (produto: WebProdutosEntidade) => void;// eslint-disable-line no-unused-vars
  removerProduto: (produto: WebProdutosEntidade) => void;// eslint-disable-line no-unused-vars
  limparProdutos: () => void;
}

export const CarrinhoContext = createContext<ICarrinhoContext | null>(null);

export const CarrinhoProvider: React.FC = ({ children }) => {
  const [Produtos, setProdutos] = useState<WebProdutosEntidade[]>([])

  const buscarProdutos = useCallback(async () => {
    return Produtos;
  }, [Produtos]);

  const localizarProduto = useCallback(async (value: WebProdutosEntidade) => {
    const produto = Produtos.filter(x => x.PK_PRODUTO === value.PK_PRODUTO);
    return produto[0];
  }, [Produtos]);

  const adicionarProduto = useCallback(async (value: WebProdutosEntidade) => {
    const produtos = [...Produtos, value];
    setProdutos(produtos);
  }, [Produtos]);

  const removerProduto = useCallback(async (value: WebProdutosEntidade) => {
    const produtos = Produtos.filter(x => x.PK_PRODUTO !== value.PK_PRODUTO);
    setProdutos(produtos);
  }, [Produtos]);

  const limparProdutos = useCallback(async () => {
    setProdutos([]);
  }, [])

  return (
    <CarrinhoContext.Provider value={{
      buscarProdutos, localizarProduto, adicionarProduto, removerProduto, limparProdutos
    }}>
      {children}
    </CarrinhoContext.Provider>
  );
}