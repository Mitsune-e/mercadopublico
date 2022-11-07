import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Col, DadosComprovante, Form, Input, LoadingComponent, Row } from '@components';
import { WebProtocoloEntidade } from '@entidades';
import { Alert, Button } from '@components';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { EfetivadorService } from '@services';
import { DMN_SITUACAO, TYPE_IND_SITUACAO } from '@domains';

interface IProps {
  protocolo: WebProtocoloEntidade;
}

export const Resultados: React.FC<IProps> = ({ protocolo }) => {
  const form = useRef<Form>(null);

  const SITUACOES_SEM_ACAO = [
    DMN_SITUACAO.EFETIVADO,
    DMN_SITUACAO.RECUSADO
  ];

  const [Loading, setLoading] = useState(false);
  const [Erro, setErro] = useState<string>('');
  const [FormErros, setFormErros] = useState<ReactNode>('');

  const [JaEfetivado, setJaEfetivado] = useState<boolean>(false);
  const [PreparaRecusa, setPreparaRecusa] = useState<boolean>(false);
  const [MotivoRecusa, setMotivoRecusa] = useState<string>("");
  const [Comprovante, setComprovante] = useState<WebProtocoloEntidade>(null);
  const [MsgFinal, setMsgFinal] = useState<string>("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        setComprovante(protocolo);
        setJaEfetivado(SITUACOES_SEM_ACAO.includes(protocolo.DES_SITUACAO as TYPE_IND_SITUACAO));
      } catch (e: any) {
        setErro(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [protocolo]);

  async function Efetivar() {
    setLoading(true);
    try {
      const msg = await EfetivadorService.Efetivar({ protocolo: protocolo.COD_IDENTIFICADOR });
      setMsgFinal(msg);
    } catch (e: any) {
      setErro(e);
    } finally {
      setLoading(false);
    }
  }

  async function PrepararRecusa() {
    setPreparaRecusa(true);
  }

  async function CancelarRecusa() {
    setPreparaRecusa(false);
    setMotivoRecusa("");
  }

  async function Recusar() {
    const erros = await form?.current?.validate();

    if (erros) {
      setFormErros(erros);
      return;
    }

    setLoading(true);
    try {
      const msg = await EfetivadorService.Recusar({ protocolo: protocolo.COD_IDENTIFICADOR, motivo: MotivoRecusa });
      setMsgFinal(msg);
      setPreparaRecusa(false);
    } catch (e: any) {
      setErro(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {Loading && <LoadingComponent />}

      {!Loading && Erro && <Alert type="danger">{Erro}</Alert>}

      {!Loading && !Erro && Comprovante && (
        <>
          {MsgFinal === "" && <>
            <DadosComprovante
              Comprovante={Comprovante}
              FontSize={15}
              LabelPosition={"up"}
            />

            {PreparaRecusa && <>
              <Row className={"mb-3"}>
                <Col>
                  <Form ref={form}>
                    <Input
                      value={MotivoRecusa}
                      onChange={setMotivoRecusa}
                      title={"Motivo da Recusa"}
                      labelPosition={"up"}
                      required
                    />

                    <Alert type="danger">{FormErros}</Alert>
                  </Form>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Button
                    title={"Cancelar"}
                    type={"danger"}
                    icon={<FaTimes />}
                    onClick={CancelarRecusa}
                    block
                  />
                </Col>

                <Col>
                  <Button
                    title={"Confirmar Recusa"}
                    type={"success"}
                    icon={<FaCheck />}
                    onClick={Recusar}
                    block
                  />
                </Col>
              </Row>
            </>}

            {!PreparaRecusa && !JaEfetivado &&
              <Row>
                <Col>
                  <Button
                    title={"Recusar"}
                    type={"danger"}
                    icon={<FaTimes />}
                    onClick={PrepararRecusa}
                    block
                  />
                </Col>

                <Col>
                  <Button
                    title={"Efetivar"}
                    type={"success"}
                    icon={<FaCheck />}
                    onClick={Efetivar}
                    block
                  />
                </Col>
              </Row>
            }
          </>}

          {MsgFinal && <Alert type={"info"}>{MsgFinal}</Alert>}
        </>
      )}
    </>
  );
};
