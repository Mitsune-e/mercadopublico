import React, { memo, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import ReactTooltip from "react-tooltip";
import { WebRoute, WebArea } from "../../..";
import MenuItem from "../MenuItem";

import { AreaButton, ChevronIcon, Container, Content, Icon, Title, Tooltip } from "./styles";

interface IAreaItemProps {
  iconPosition: "left" | "right";
  area?: WebArea;
}

const AreaItem: React.FC<IAreaItemProps> = ({ iconPosition = "right", area }) => {
  const [ContentOpened, setContentOpened] = useState(false);

  function handleOnClick() {
    setContentOpened((old) => !old);
  }

  return (
    <Container>
      <AreaButton onClick={handleOnClick}>
        {area.icon && iconPosition === "left" && <Icon position={iconPosition}>{area.icon}</Icon>}

        {area.tooltip && (
          <>
            <Tooltip color={""} data-tip data-for={area.id}>
              <Title>{area.title}</Title>
            </Tooltip>

            <ReactTooltip place={area.tooltipPlacement} type={area.tooltipColor} effect="solid" id={area.id}>
              {area.tooltip}
            </ReactTooltip>
          </>
        )}

        {!area.tooltip && <Title>{area.title}</Title>}

        <ChevronIcon position={"right"}>
          {ContentOpened && <FaChevronUp />}
          {!ContentOpened && <FaChevronDown />}
        </ChevronIcon>
      </AreaButton>

      {ContentOpened && (
        <Content>
          {area.routes.map((route, index) => {
            if (route instanceof WebRoute && route.showInMenu) {
              return <MenuItem key={index} route={route as WebRoute} iconPosition={"left"} />;
            } else return null;
          })}
        </Content>
      )}
    </Container>
  );
};

export default memo(AreaItem);
