import React, { useContext, useEffect, useState } from "react";
import { CarrinhoContext, useMasterPage } from "@contexts";
import { WebProdutosEntidade } from "@entidades";
import { Alert, Box, Button, Empty, LoadingComponent, StaticField } from "@components";
import { FaCartArrowDown, FaCheck, FaTimes } from "react-icons/fa";
import { CarrinhoService } from "@services";
import { useHistory } from "react-router-dom";

export const Carrinho: React.FC = () => {
  useMasterPage();
  const carrinho = useContext(CarrinhoContext);
  const history = useHistory();

  const [Produtos, setProdutos] = useState<WebProdutosEntidade[]>([]);
  const [Loading, setLoading] = useState<boolean>(true);
  const [Erro, setErro] = useState<string>('');

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const produtos = await carrinho.buscarProdutos();
        setProdutos(produtos);
      } catch (e: any) {
        setErro(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [carrinho]);

  async function handleLancar() {
    try {
      const id = await CarrinhoService.GravarLance({ Produtos });
      carrinho.limparProdutos();
      history.push(`comprovantes/${id}`)
    }
    catch (e: any) {
      setErro(e);
    }
  }

  return (
    <>
      {Loading && <LoadingComponent />}

      {!Loading && Erro && <Alert type="danger">{Erro}</Alert>}

      {!Loading && !Erro && Produtos.length === 0 && <Empty title={"Nenhum produto disponível no momento."} />}

      {!Loading && !Erro && Produtos.length > 0 && <>
        <Box>
          <div className={"table-responsive"}>
            <table className={"table table-striped"}>
              <thead>
                <tr>
                  <th>{"Nome"}</th>
                  <th>{"Categoria"}</th>
                  <th>{"Sub Categoria"}</th>
                  <th>{"Preço"}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {Produtos.map((produto: WebProdutosEntidade, index: number) => {
                  return (
                    <tr key={index}>
                      <td>{produto.NOM_PRODUTO}</td>
                      <td>{produto.DS_CATEGORIA}</td>
                      <td>{produto.DS_SUB_CATEGORIA}</td>
                      <td><StaticField fontSize={21} value={produto.VAL_PRODUTO} type={"money"} /></td>
                      <td>
                        <Button
                          title={"Remover"}
                          type={"danger"}
                          icon={<FaTimes />}
                          onClick={() => carrinho.removerProduto(produto)}
                        />
                      </td>
                    </tr>
                  )
                })}
                <tr>
                  <td><b>{"Total"}</b></td>
                  <td></td>
                  <td></td>
                  <td><StaticField fontSize={21} value={Produtos.map(x => x.VAL_PRODUTO).reduce((x, y) => (x + y))} type={"money"} /></td>
                  <td>
                    <Button
                      title={"Limpar"}
                      type={"danger"}
                      icon={<FaCartArrowDown />}
                      onClick={() => carrinho.limparProdutos()}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <Button
            title={"Finalizar Lance"}
            type={"success"}
            icon={<FaCheck />}
            onClick={handleLancar}
            loadingText={"Finalizando..."}
            usesLoading
          />
        </Box>
      </>}
    </>
  );
}