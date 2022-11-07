import { Place, Type } from "react-tooltip";

export class WebRoute {
  constructor(options?: {
    id: string;
    title: string;
    path?: string;
    component?: any;
    icon?: JSX.Element;
    iconPrefix?: string;
    showInMenu?: boolean;
    exactPath?: boolean;
    linkPath?: string;
    externalLink?: string;
    tooltip?: string;
    tooltipColor?: Type;
    tooltipPlacement?: Place;
  }) {
    if (options) {
      this.id = options.id;
      this.title = options.title;
      this.path = options.path;
      this.component = options.component;
      this.icon = options.icon;
      this.iconPrefix = options.iconPrefix;
      this.showInMenu = options.showInMenu;
      this.exactPath = options.exactPath;
      this.linkPath = options.linkPath;
      this.externalLink = options.externalLink;
      this.tooltip = options.tooltip;
      this.tooltipColor = options.tooltipColor;
      this.tooltipPlacement = options.tooltipPlacement ?? "right";
    }
  }

  public id: string;
  public title: string;
  public component?: any;
  public path?: string;
  public icon?: JSX.Element;
  public iconPrefix?: string;
  public showInMenu?: boolean;
  public exactPath?: boolean;
  public linkPath?: string;
  public externalLink?: string;
  public tooltip?: string;
  public tooltipColor?: Type;
  public tooltipPlacement?: Place;
}
