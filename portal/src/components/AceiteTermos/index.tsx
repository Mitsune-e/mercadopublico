import React, { useEffect, useState } from 'react';
import { Item } from './Item';

interface IProps {
  texto: string | Array<string>;
  setAceitaTermos: (AceitaTermos: boolean) => void; // eslint-disable-line no-unused-vars
}

interface IAceite {
  Aceite: boolean;
  ID: number;
}

export const AceiteTermos: React.FC<IProps> = ({
  texto,
  setAceitaTermos
}) => {
  const [Textos, setTextos] = useState<Array<string>>([]);
  const [ListaAceitaTermos, setListaAceitaTermos] = useState<Array<IAceite>>([]);

  useEffect(() => {
    (async () => {
      try {
        if (typeof texto === "string") {
          setTextos([texto]);
          const novo: IAceite = { Aceite: false, ID: 0 };
          setListaAceitaTermos([novo]);
        }
        else {
          setTextos(texto);
          const lista = texto.map((t: string, index: number) => {
            const novo: IAceite = { Aceite: false, ID: index };
            return novo
          });
          setListaAceitaTermos(lista);
        }
      }
      catch (err) {
        console.log(err["response"] ? err["response"]["data"] : err);
      }
    })();
  }, []);

  function HandleAceitaTermos(aceite: boolean, id: number) {
    const lista = ListaAceitaTermos.filter(x => x.ID !== id);
    const novo: IAceite = { Aceite: aceite, ID: id };
    const listaNova = [...lista, novo];
    setListaAceitaTermos(listaNova);
    setAceitaTermos(listaNova.every(x => x.Aceite === true));
  }

  return (
    <>
      {Textos.map((texto: string, index: number) => {
        return (
          <Item
            key={index}
            id={index}
            texto={texto}
            setAceitaTermos={HandleAceitaTermos}
          />
        );
      })}
    </>
  )
}