import { Alert, Box, Card, Col, LoadingComponent, Row } from "@components";
import { WebProdutosEntidade } from "@entidades";
import { ProdutosService } from "@services";
import React, { useEffect, useState } from "react";

export const Home: React.FC = () => {
  const [ProdutosNovos, setProdutosNovos] = useState<WebProdutosEntidade[]>([]);
  const [Loading, setLoading] = useState(false);
  const [Erro, setErro] = useState<string>('');

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const produtosnovos = await ProdutosService.BuscarNovos();
        setProdutosNovos(produtosnovos)
        //codigo de iniciar tela
      }
      catch (e: any) {
        setErro(e);
      }
      finally {
        setLoading(false);
      }
    })();
  }, []);

  //codigo da tela
  return (
    <>
      {Loading && <LoadingComponent />}

      {!Loading && Erro && <Alert type="danger">{Erro}</Alert>}

      {!Loading && !Erro && ProdutosNovos.length > 0 && <>
        <Box title='Novos Produtos Disponiveis:'>
          <Row>
            {ProdutosNovos.map((produto: WebProdutosEntidade, index: number) => {
              return (
                <Col key={index}>
                  <Card
                    produto={produto}
                  />
                </Col>
              );
            })}
          </Row>
        </Box>
      </>
      }
    </>
  );
};