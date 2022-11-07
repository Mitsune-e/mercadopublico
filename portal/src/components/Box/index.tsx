import React from "react";
import classNames from "classnames";
import { Alert, Badge } from "..";
import { BadgeContainer, Container, Content, Header, HeaderText, Subtitle, Title } from "./styles";

interface IProps {
  title?: React.ReactNode | string;
  subtitle?: React.ReactNode | string;

  badgeText?: React.ReactNode | string;
  badgeType?: "secondary" | "danger" | "info" | "warning" | "success";

  className?: string;
  contentClassName?: string;
  children?: React.ReactNode;
  id?: string;
  noPadding?: boolean;
  titleSize?: number;
}

export const Box: React.FC<IProps> = ({
  children,
  title,
  subtitle,
  badgeText,
  badgeType = "secondary",

  className,
  contentClassName,
  id,
  noPadding,
  titleSize = 16
}) => {
  if (typeof title === "undefined" && typeof subtitle !== "undefined")
    return <Alert type={"danger"}>{"Para utilizar a propriedade \"subtitle\" do componente <Box />, defina um \"title\"."}</Alert>;

  const boxClassNames = classNames("box", className);

  contentClassName = classNames("box-content", contentClassName);

  return (
    <Container id={id} className={boxClassNames}>
      {title && (
        <Header className="header">
          <HeaderText>
            <Title titleSize={titleSize} className="title">{title}</Title>

            {subtitle && <Subtitle className="subtitle">{subtitle}</Subtitle>}
          </HeaderText>

          {badgeText && typeof badgeText === "string" && (
            <BadgeContainer className="badge-container">
              <Badge type={badgeType}>{badgeText}</Badge>
            </BadgeContainer>
          )}

          {badgeText && typeof badgeText !== "string" && <div className="badge">{badgeText}</div>}
        </Header>
      )}

      <Content className={contentClassName} noPadding={noPadding}>
        {children}
      </Content>
    </Container>
  );
};
