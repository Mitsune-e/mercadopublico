import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, LoadingComponent, Empty } from '@components';
import { useMasterPage } from '@contexts';
import { FaSearch } from 'react-icons/fa';
import { useHistory } from 'react-router';
import { WebProtocoloEntidade } from '@entidades';
import { ComprovantesService } from '@services';
import { SITUACAO, SITUACAO_COR, TYPE_IND_SITUACAO } from '@domains';
import { dateFormat } from '@helpers/date';

export const Comprovantes: React.FC = () => {
  const masterPage = useMasterPage();
  const history = useHistory();

  const [Loading, setLoading] = useState(false);
  const [Erro, setErro] = useState<string>('');

  const [ListaComprovantes, setListaComprovantes] = useState<WebProtocoloEntidade[]>([]);

  useEffect(() => {
    (async () => {
      masterPage.noPadding(false);
    })();
  }, [masterPage]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const lista = await ComprovantesService.Buscar();
        setListaComprovantes(lista);
      } catch (e: any) {
        setErro(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {Loading && <LoadingComponent />}

      {!Loading && Erro && <Alert type="danger">{Erro}</Alert>}
      {!Loading && !Erro && ListaComprovantes.length === 0 && <Empty id="comprovantes" title="Nao há nenhum comprovante registrado." />}

      {!Loading && !Erro && ListaComprovantes.length > 0 && (
        <Box id="comprovantes">
          <div className="table-responsive">
            <table id="table-comprovantes" className="table table-striped">
              <thead>
                <tr>
                  <th>Data Solicitação</th>
                  <th>Funcionalidade</th>
                  <th>Protocolo</th>
                  <th>Situação</th>
                  <th>Data Efetivação</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {ListaComprovantes.map((comprovante, index) => (
                  <tr key={index}>
                    <td>{dateFormat(comprovante.DTA_SOLICITACAO, "dd/MM/yyyy hh:mm:ss")}</td>
                    <td>{comprovante.DES_FUNCIONALIDADE}</td>
                    <td>{comprovante.COD_IDENTIFICADOR}</td>
                    <td>
                      <strong>
                        <span className={`text-${SITUACAO_COR[comprovante.DES_SITUACAO]}`}>{SITUACAO(comprovante.DES_SITUACAO as TYPE_IND_SITUACAO).Value}</span>
                      </strong>
                    </td>
                    <td>{dateFormat(comprovante.DTA_EFETIVACAO, "dd/MM/yyyy hh:mm:ss")}</td>
                    <td>
                      <Button
                        id={`button-detalhar-${index}`}
                        type="primary"
                        title="Detalhar"
                        icon={<FaSearch />}
                        onClick={() => history.push(`/comprovantes/${comprovante.OID_PROTOCOLO}`)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Box>
      )}
    </>
  );
};
