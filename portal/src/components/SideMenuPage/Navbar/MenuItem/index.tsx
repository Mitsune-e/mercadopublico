import React, { memo, useCallback } from 'react';
import { Title, Icon, ContainerA, Tooltip } from './styles';
import { WebRoute } from '../../../WebRoutes';
import ReactTooltip from 'react-tooltip';
import { useMasterPage } from '@contexts';

interface IMenuItemProps {
  iconPosition: 'left' | 'right';
  route?: WebRoute;
  onClick?: (route: WebRoute) => void;// eslint-disable-line no-unused-vars
}

const MenuItem: React.FC<IMenuItemProps> = ({ iconPosition = 'right', route, onClick }) => {
  const masterPage = useMasterPage();

  const handleOnClick = useCallback(
    (e) => {
      if (!route.externalLink) {
        e.preventDefault();

        masterPage.navigate(route.linkPath ?? route.path);
      }
      if (onClick) onClick(route);
    },
    [route]
  );

  function Content() {
    return (
      <>
        {route.icon && iconPosition === 'left' && <Icon position={iconPosition}>{route.icon}</Icon>}

        {route.tooltip && (
          <>
            <Tooltip color={''} data-tip data-for={route.id}>
              <Title id={route.id}>{route.title}</Title>
            </Tooltip>

            <ReactTooltip place={route.tooltipPlacement} type={route.tooltipColor} effect="solid" id={route.id}>
              {route.tooltip}
            </ReactTooltip>
          </>
        )}

        {!route.tooltip && (
          <>
            <Title id={route.id}>{route.title}</Title>
          </>
        )}

        {route.icon && iconPosition === 'right' && <Icon position={iconPosition}>{route.icon}</Icon>}
      </>
    );
  }

  if (route.externalLink) {
    return (
      <ContainerA target="_blank" href={route.externalLink} onClick={handleOnClick}>
        <Content />
      </ContainerA>
    );
  }

  return (
    <ContainerA href="#" onClick={handleOnClick}>
      <Content />
    </ContainerA>
  );
};

export default memo(MenuItem);
