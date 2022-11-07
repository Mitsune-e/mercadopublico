import React, { ReactNode, useEffect, useState } from "react";
import { Alert, Box, Button, Col, ComboCategorias, Input, LoadingComponent, Row } from "@components";
import { FaCheck, FaRedo } from "react-icons/fa";
import { WebProdutosEntidade } from "@entidades";
import { dateFormat } from "@helpers/date";
import { ProdutosService } from "@services";

export const ProdutosCadastrar: React.FC = () => {

  const [Nome, setNome] = useState<string>("");
  const [Descricao, setDescricao] = useState<string>("");
  const [Valor, setValor] = useState<number>(0);
  const [Link, setLink] = useState<string>("");
  const [Prazo, setPrazo] = useState<number>(0);
  const [CategoriaSelecionada, setCategoriaSelecionada] = useState<number>(0);
  const [SubCategoriaSelecionada, setSubCategoriaSelecionada] = useState<number>(0);
  const [MsgFinal, setMsgFinal] = useState<string>("");
  const [Loading, setLoading] = useState(false);
  const [Erro, setErro] = useState<string>('');
  const [FormErro, setFormErro] = useState<ReactNode>('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
      } catch (e: any) {
        setErro(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function Cadastrar() {
    try {
      const erros = [];

      if (!Nome) {
        erros.push(
          <li>{"Campo 'Nome' obrigatório."}</li>
        );
      }

      if (!Valor) {
        erros.push(
          <li>{"Campo 'Preço' obrigatório."}</li>
        );
      }

      if (!Prazo) {
        erros.push(
          <li>{"Campo 'Prazo de Resposta' obrigatório."}</li>
        );
      }

      if (!CategoriaSelecionada) {
        erros.push(
          <li>{"Campo 'Categoria' obrigatório."}</li>
        );
      }

      if (!SubCategoriaSelecionada) {
        erros.push(
          <li>{"Campo 'SubCategoria' obrigatório."}</li>
        );
      }

      if (erros.length > 0) {
        setFormErro(
          <ul>
            {erros}
          </ul>
        );
        return;
      }

      const produto: WebProdutosEntidade = {
        PK_PRODUTO: null,
        COD_CATEGORIA: CategoriaSelecionada,
        DS_CATEGORIA: "",
        COD_SUB_CATEGORIA: SubCategoriaSelecionada,
        DS_SUB_CATEGORIA: "",
        NOM_PRODUTO: Nome,
        VAL_PRODUTO: Valor,
        DS_PRODUTO: Descricao,
        IMG_REF_PRODUTOS: Link,
        NUM_PRAZO_PRODUTO: Prazo,
        DTA_CADASTRO: dateFormat(new Date())
      };

      const msg = await ProdutosService.Cadastrar(produto);
      setMsgFinal(msg);
    } catch (e: any) {
      setErro(e);
    }
  }

  async function Reiniciar() {
    setLoading(true);
    try {
      setNome("");
      setDescricao("");
      setValor(0);
      setLink("");
      setPrazo(0);
      setCategoriaSelecionada(0);
      setSubCategoriaSelecionada(0);
      setMsgFinal("");
    } catch (e: any) {
      setErro(e);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <>
      {Loading && <LoadingComponent />}

      {!Loading && Erro && <Alert type="danger">{Erro}</Alert>}

      {!Loading && !Erro && MsgFinal === "" && <>
        <Box>
          <Row>
            <Col>
              <Input
                value={Nome}
                onChange={setNome}
                title={"Nome"}
                labelSize={2}
                required
              />
            </Col>
          </Row>

          <br />

          <Row>
            <Col>
              <Input
                value={Descricao}
                onChange={setDescricao}
                title={"Descrição"}
                labelSize={2}
              />
            </Col>
          </Row>

          <br />

          <Row>
            <Col>
              <Input
                value={Valor}
                onChange={setValor}
                title={"Preço"}
                labelSize={2}
                type={"money"}
                required
              />
            </Col>
          </Row>

          <br />

          <Row>
            <Col>
              <Input
                value={Link}
                onChange={setLink}
                title={"Link da Foto"}
                labelSize={2}
              />
            </Col>
          </Row>

          <br />

          <Row>
            <Col>
              <Input
                value={Prazo}
                onChange={setPrazo}
                title={"Prazo de Resposta"}
                labelSize={2}
                required
              />
            </Col>
          </Row>

          <br />

          <ComboCategorias
            CategoriaSelecionada={CategoriaSelecionada}
            setCategoriaSelecionada={setCategoriaSelecionada}
            SubCategoriaSelecionada={SubCategoriaSelecionada}
            setSubCategoriaSelecionada={setSubCategoriaSelecionada}
            required
          />

          <Row>
            <Col>
              <Alert type={"danger"}>{FormErro}</Alert>
            </Col>
          </Row>
        </Box>

        <Row>
          <Col>
            <Button
              title={"Cadastrar"}
              type={"success"}
              icon={<FaCheck />}
              onClick={Cadastrar}
              loadingText={"Cadastrando..."}
              usesLoading
            />
          </Col>
        </Row>
      </>}

      {MsgFinal !== "" && <>
        <Row>
          <Col>
            <Alert type={"info"}>{MsgFinal}</Alert>
          </Col>
        </Row>

        <Row>
          <Col>
            <Button
              title={"Cadastrar Outro Produto"}
              type={"secondary"}
              icon={<FaRedo />}
              onClick={Reiniciar}
              loadingText={"Reiniciando..."}
              usesLoading
            />
          </Col>
        </Row>
      </>}
    </>
  );
}