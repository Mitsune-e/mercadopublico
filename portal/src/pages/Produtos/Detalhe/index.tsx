import { Breadcrumb, Col, LoadingComponent, Row } from '@components';
import { WebCategoriaEntidade, WebProdutosEntidade } from '@entidades';
import { Alert, Box, Button, StaticField } from '@components';
import { CarrinhoContext, useMasterPage } from '@contexts';
import { CategoriaService, ProdutosService } from '@services';
import React, { useContext, useEffect, useState } from 'react';
import { FaCartPlus, FaChevronLeft, FaTimes } from 'react-icons/fa';
import { useHistory, useParams } from 'react-router-dom';
import { addDay } from '@helpers/date';
import { Img } from './styles';

export const ProdutosDetalhe: React.FC<any> = () => {
  useMasterPage();

  const history = useHistory();
  const params = useParams<any>();
  const carrinho = useContext(CarrinhoContext);

  const [ProdutoCarrinho, setProdutoCarrinho] = useState<boolean>(false);

  const [Loading, setLoading] = useState(false);
  const [Erro, setErro] = useState<string>('');

  const [Produto, setProduto] = useState<WebProdutosEntidade>(null);
  const [ArvoreCategorias, setArvoreCategorias] = useState<WebCategoriaEntidade[]>(new Array<WebCategoriaEntidade>());

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const produto = await ProdutosService.BuscarPorId(params.oid);
        setProduto(produto);

        const arvoreCategorias = await CategoriaService.BuscarArvorePelaSub(produto.COD_SUB_CATEGORIA);
        setArvoreCategorias(arvoreCategorias);
      } catch (e: any) {
        setErro(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [params.oid]);

  useEffect(() => {
    (async () => {

      try {
        const produtoCarrinho = await carrinho.localizarProduto(Produto);
        setProdutoCarrinho(produtoCarrinho !== null && produtoCarrinho !== undefined);
      } catch (e: any) {
        setErro(e);
      }
    })();
  }, [carrinho, Produto]);

  return (
    <>
      {Loading && <LoadingComponent />}

      {!Loading && Erro && <Alert type={"danger"}>{Erro}</Alert>}

      {!Loading && !Erro && Produto && (
        <div>
          <Box title={Produto.NOM_PRODUTO}>
            <Breadcrumb categorias={ArvoreCategorias} />

            <Img className={"mb-3"} src={Produto.IMG_REF_PRODUTOS} alt={`foto ${Produto.NOM_PRODUTO}`} />

            <StaticField title={"Descrição"} value={Produto.DS_PRODUTO} labelSize={3} />

            <StaticField
              title={"Preço"}
              value={Produto.VAL_PRODUTO}
              labelSize={3}
              type={"money"}
            />

            <Alert type={"warning"}>{`Prazo Máximo para Entrega: ${addDay(new Date(), Produto.NUM_PRAZO_PRODUTO)}`}</Alert>

            <Row>
              <Col>
                <Button
                  title={"Voltar"}
                  icon={<FaChevronLeft />}
                  onClick={() => history.goBack()}
                  block
                />
              </Col>

              <Col>
                {!ProdutoCarrinho &&
                  <Button
                    title={"Adicionar"}
                    type={"primary"}
                    icon={<FaCartPlus />}
                    onClick={() => {
                      carrinho.adicionarProduto(Produto);
                      setProdutoCarrinho(true);
                    }}
                    block
                  />}

                {ProdutoCarrinho &&
                  <Button
                    title={"Remover"}
                    type={"danger"}
                    icon={<FaTimes />}
                    onClick={() => {
                      carrinho.removerProduto(Produto);
                      setProdutoCarrinho(false);
                    }}
                    block
                  />}
              </Col>
            </Row>
          </Box>
        </div>
      )}
    </>
  );
};
