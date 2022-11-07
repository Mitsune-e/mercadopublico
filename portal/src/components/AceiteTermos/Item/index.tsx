import React, { useState } from 'react';
import { ButtonSwitch, Col, Row } from '@components';

interface IProps {
  id: number;
  texto: string;
  setAceitaTermos: (AceitaTermos: boolean, ID: number) => void; // eslint-disable-line no-unused-vars
}

export const Item: React.FC<IProps> = ({
  id,
  setAceitaTermos,
  texto
}) => {
  const [AceitaTermosLocal, setAceitaTermosLocal] = useState<boolean>(false);

  return (
    <>
      <Row className={"mb-2"}>
        <Col className={"col-lg-1 align-self-center"}>
          <ButtonSwitch
            activeType={"success"}
            inactiveType={"light"}
            inactiveIcon={" "}
            checked={AceitaTermosLocal}
            onChange={() => {
              const Aceita = !AceitaTermosLocal;
              setAceitaTermosLocal(Aceita);
              setAceitaTermos(Aceita, id);
            }}
          />
        </Col>

        <Col className={"align-self-center"}>
          {texto}
        </Col>
      </Row>
    </>
  )
}