import React, { useEffect, useState } from "react";
import { useMasterPage } from "@contexts";
import { WebProdutosEntidade } from "@entidades";
import { ProdutosService } from "@services";
import { Alert, Box, Card, Col, ComboCategorias, Empty, LoadingComponent, Row } from "@components";

export const Produtos: React.FC = () => {
  useMasterPage();

  const [TodosProdutos, setTodosProdutos] = useState<WebProdutosEntidade[]>([]);
  const [Produtos, setProdutos] = useState<WebProdutosEntidade[]>([]);
  const [CategoriaSelecionada, setCategoriaSelecionada] = useState<number>(0);
  const [SubCategoriaSelecionada, setSubCategoriaSelecionada] = useState<number>(0);
  const [Loading, setLoading] = useState<boolean>(true);
  const [Erro, setErro] = useState<string>('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const produtos = await ProdutosService.BuscarTodos();
        setProdutos(produtos);
        setTodosProdutos(produtos);
      } catch (e: any) {
        setErro(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let produtos = TodosProdutos;

        if (CategoriaSelecionada > 0) {
          produtos = produtos.filter(x => x.COD_CATEGORIA === CategoriaSelecionada);

          if (SubCategoriaSelecionada > 0) {
            produtos = produtos.filter(x => x.COD_SUB_CATEGORIA === SubCategoriaSelecionada);
          }
        }

        setProdutos(produtos)
      } catch (e: any) {
        setErro(e);
      }
    })();
  }, [CategoriaSelecionada, SubCategoriaSelecionada]);

  return (
    <>
      {Loading && <LoadingComponent />}

      {!Loading && Erro && <Alert type="danger">{Erro}</Alert>}

      {!Loading && !Erro && TodosProdutos.length === 0 && <Empty title={"Nenhum produto disponível no momento."} />}

      {!Loading && !Erro && TodosProdutos.length > 0 && <>
        <Box>
          <ComboCategorias
            CategoriaSelecionada={CategoriaSelecionada}
            setCategoriaSelecionada={setCategoriaSelecionada}
            SubCategoriaSelecionada={SubCategoriaSelecionada}
            setSubCategoriaSelecionada={setSubCategoriaSelecionada}
          />

          {Produtos.length === 0 && <Empty title={"Nenhum produto disponível no momento."} />}

          {Produtos.length > 0 &&
            <Row>
              {Produtos.map((produto: WebProdutosEntidade, index: number) => {
                return (
                  <Col key={index}>
                    <Card
                      produto={produto}
                    />
                  </Col>
                );
              })}
            </Row>
          }
        </Box>
      </>}
    </>
  );
}