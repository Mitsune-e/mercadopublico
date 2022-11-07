import React, { useEffect, useState } from "react";
import { Alert, Box, Col, LoadingComponent, Row } from "@components";
import { ParametrosBuscaEfetivador, ParametrosEfetivador, WebProtocoloEntidade } from "@entidades";
import { EfetivadorService } from "@services";
import { Pesquisa } from "./Pesquisa";
import { Resultados } from "./Resultados";
import { useMasterPage } from "@contexts";

export const Efetivador: React.FC = () => {
  useMasterPage();

  const [Parametros, setParametros] = useState<ParametrosEfetivador>(new ParametrosEfetivador());
  const [Protocolos, setProtocolos] = useState<WebProtocoloEntidade[]>([]);
  const [Loading, setLoading] = useState<boolean>(true);
  const [LoadingResultado, setLoadingResultado] = useState<boolean>(false);
  const [Erro, setErro] = useState<string>('');

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const parametros = await EfetivadorService.BuscarParametros();
        setParametros(parametros);
      } catch (e: any) {
        setErro(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function RealizarPesquisa(parametros: ParametrosBuscaEfetivador) {
    setLoadingResultado(true)
    try {
      const protocolos = await EfetivadorService.Buscar(parametros);
      setProtocolos(protocolos);
    }
    catch (e: any) {
      setErro(e);
    }
    finally {
      setLoadingResultado(false)
    }
  }

  return (
    <>
      {Loading && <LoadingComponent />}

      {!Loading && Erro && <Alert type="danger">{Erro}</Alert>}

      {!Loading && !Erro && <>
        <Row>
          <Col>
            <Pesquisa
              parametros={Parametros}
              realizarPesquisa={RealizarPesquisa}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            {LoadingResultado && <LoadingComponent />}

            {!LoadingResultado &&
              <Row>
                {Protocolos.map((item, index) => {
                  return (<Col className={"col-4"} key={index}>
                    <Box>
                      <Resultados
                        protocolo={item}
                      />
                    </Box>
                  </Col>
                  )
                })}
              </Row>
            }
          </Col>
        </Row>
      </>}
    </>
  );
}