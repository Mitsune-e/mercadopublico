import { DadosComprovante, LoadingComponent } from '@components';
import { WebProtocoloEntidade } from '@entidades';
import { Alert, Button } from '@components';
import { useMasterPage } from '@contexts';
import { ComprovantesService } from '@services';
import React, { useEffect, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { useHistory, useParams } from 'react-router-dom';

export const ComprovanteDetalhe: React.FC<any> = () => {
  useMasterPage();

  const history = useHistory();
  const params = useParams<any>();

  const [Loading, setLoading] = useState(false);
  const [Erro, setErro] = useState<string>('');

  const [Comprovante, setComprovante] = useState<WebProtocoloEntidade>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {

        const comprovante = await ComprovantesService.BuscarPorOid(params.oid);
        setComprovante(comprovante);
      } catch (e: any) {
        setErro(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [params.oid]);

  return (
    <>
      <div>
        <Button className="mb-3 mr-3" title="Voltar" icon={<FaChevronLeft />} onClick={() => history.goBack()} />
      </div>

      {Loading && <LoadingComponent />}

      {!Loading && Erro && <Alert type="danger">{Erro}</Alert>}

      {!Loading && !Erro && Comprovante && (
        <div>
          <DadosComprovante
            Comprovante={Comprovante}
            FontSize={21}
            LabelPosition={"left"}
          />
        </div>
      )}
    </>
  );
};
