import React from 'react';
import ReactTooltip from 'react-tooltip';
import { WebRoute } from '../../../WebRoutes';

import { PageHeaderButtons, PageUserButton } from './styles';

interface IProps {
  route: WebRoute;
}

export const HeaderButton: React.FC<IProps> = ({
  route
}) => {

  return (
    <PageHeaderButtons>
      {!route.tooltip &&
        <PageUserButton to={route.externalLink ? route.externalLink : route.path}>
          {route.icon ? route.icon : route.title}
        </PageUserButton>
      }

      {route.tooltip &&
        <>
          <PageUserButton to={route.externalLink ? route.externalLink : route.path} data-tip data-for={route.id}>
            {route.icon ? route.icon : route.title}
          </PageUserButton>

          <ReactTooltip place={route.tooltipPlacement || "bottom"} type={route.tooltipColor} effect="solid" id={route.id}>
            {route.tooltip}
          </ReactTooltip>
        </>}
    </PageHeaderButtons>
  );
}
