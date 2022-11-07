import React, { useState } from 'react';

import { FaQuestionCircle } from 'react-icons/fa';
import { AdminButton } from '../AdminButton';
import { Info, HeaderTitle, HeaderUsername, MenuButton } from './styles';

export const HeaderInfo: React.FC<any> = (props) => {
  const [Height, setHeight] = useState<"max" | "min">("max");
  const [Style, setStyle] = useState<any>({ "maxHeight": `1.25em` });

  function toggleHeaderInfo() {
    setHeight(Height === "min" ? "max" : "min");
    setStyle(Height === "max" ? { "minHeight": `1.25em` } : { "maxHeight": `1.25em` })
  }

  return (
    <>
      <Info style={Style}>
        <HeaderTitle>
          {props.title}
        </HeaderTitle>
        <HeaderUsername>
          {props.username}
          <AdminButton admin={props.admin} />
        </HeaderUsername>
      </Info>

      <MenuButton className={"btn btn-link"} onClick={toggleHeaderInfo}>
        <FaQuestionCircle />
      </MenuButton>
    </>
  );
}
