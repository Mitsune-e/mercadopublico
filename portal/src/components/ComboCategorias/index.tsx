import React, { useEffect, useState } from "react";
import { Alert, Col, ComboBox, LoadingComponent, Row } from "@components";
import { CategoriaService } from "@services";
import { WebCategoriaEntidade } from "@entidades";

interface IProps {
  CategoriaSelecionada: number;
  setCategoriaSelecionada: React.Dispatch<React.SetStateAction<number>>;
  SubCategoriaSelecionada: number;
  setSubCategoriaSelecionada: React.Dispatch<React.SetStateAction<number>>;
  required?: boolean;
}

export const ComboCategorias: React.FC<IProps> = ({
  CategoriaSelecionada,
  setCategoriaSelecionada,
  SubCategoriaSelecionada,
  setSubCategoriaSelecionada,
  required = false
}) => {
  const [Categorias, setCategorias] = useState<WebCategoriaEntidade[]>([]);
  const [SubCategorias, setSubCategorias] = useState<WebCategoriaEntidade[]>([]);
  const [Loading, setLoading] = useState<boolean>(true);
  const [Erro, setErro] = useState<string>('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const categorias = await CategoriaService.BuscarTodos();
        setCategorias(categorias);
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
        if (CategoriaSelecionada > 0) {
          const subCategorias = await CategoriaService.BuscaSub(CategoriaSelecionada);
          setSubCategorias(subCategorias);
          setSubCategoriaSelecionada(0);
        }
        else {
          setSubCategorias([]);
          setSubCategoriaSelecionada(0);
        }
      } catch (e: any) {
        setErro(e);
      }
    })();
  }, [CategoriaSelecionada]);

  return (
    <>
      {Loading && <LoadingComponent />}

      {!Loading && Erro && <Alert type="danger">{Erro}</Alert>}

      {!Loading && !Erro && <>
        <Row>
          <Col>
            <ComboBox
              value={CategoriaSelecionada}
              data={Categorias}
              onChange={setCategoriaSelecionada}
              memberName={"DS_CATEGORIA"}
              memberValue={"COD_CATEGORIA"}
              emptyText={"Todas"}
              title={"Filtrar Por Categoria"}
              labelSize={2}
              required
            />
          </Col>
        </Row>

        <br />

        <Row>
          <Col>
            {CategoriaSelecionada === 0 && <Alert type={"info"}>{"Selecione uma Categoria para visualizar as SubCategorias"}</Alert>}

            {CategoriaSelecionada > 0 &&
              <ComboBox
                value={SubCategoriaSelecionada}
                data={SubCategorias}
                onChange={setSubCategoriaSelecionada}
                memberName={"DS_CATEGORIA"}
                memberValue={"COD_CATEGORIA"}
                emptyText={"Todas"}
                title={"Filtrar Por SubCategoria"}
                labelSize={2}
                required={required}
              />
            }
          </Col>
        </Row>
      </>}

      <br />
    </>
  );
}