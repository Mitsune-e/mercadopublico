import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Card, Col, Collapse, Empty, LoadingComponent, Row } from "@components";
import { WebCategoriaEntidade, WebProdutosEntidade } from "@entidades";
import { CategoriaService, ProdutosService } from "@services";
import { useHistory, useParams } from "react-router-dom";
import { FaChevronLeft, FaReplyAll } from "react-icons/fa";

export const Categorias: React.FC = () => {
  const params = useParams<any>();
  const history = useHistory();

  const [IdCategoriaAtual, setIdCategoriaAtual] = useState<number>(0);
  const [Categorias, setCategorias] = useState<WebCategoriaEntidade[]>([]);
  const [Produtos, setProdutos] = useState<WebProdutosEntidade[]>([]);
  const [Loading, setLoading] = useState<boolean>(true);
  const [Erro, setErro] = useState<string>('');

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const id = params.oid;

        if (id !== null && id !== undefined && id > 0) {
          const categoria = await CategoriaService.BuscarPorId(id);
          setCategorias([categoria]);
          const produtos = await ProdutosService.BuscaPorCategoria(id);
          setProdutos(produtos);
        }
        else {
          const categorias = await CategoriaService.BuscarTodos();
          setCategorias(categorias);
          const produtos = await ProdutosService.BuscarTodos();
          setProdutos(produtos);
        }

        setIdCategoriaAtual(id);
      } catch (e: any) {
        setErro(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [params.oid]);

  return (
    <>
      {Loading && <LoadingComponent />}

      {!Loading && Erro && <Alert type="danger">{Erro}</Alert>}

      {!Loading && !Erro && Categorias.length === 0 && <Empty title={"Nenhuma categoria disponível no momento."} />}

      {!Loading && !Erro && Categorias.length > 0 && <>
        <Box>
          <Row>
            {Categorias.map((categoria, index) => {
              return (
                <Col key={index}>
                  <Collapse
                    categoria={categoria}
                    categoriaAberta={IdCategoriaAtual === categoria.COD_CATEGORIA}
                  />
                </Col>
              )
            })}
          </Row>

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

          {IdCategoriaAtual > 0 && <>
            <div>
              <Button
                className={"m-3"}
                title={"Voltar"}
                icon={<FaChevronLeft />}
                onClick={() => history.goBack()}
              />

              <Button
                className={"m-3"}
                title={"Ver Todas"}
                icon={<FaReplyAll />}
                onClick={() => history.push("/categorias")}
              />
            </div>
          </>}
        </Box>
      </>}
    </>
  );
}