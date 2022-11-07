import { Place, Type } from "react-tooltip";
import { WebRoute } from ".";

export class WebArea {
  constructor(options?: {
    id: string;
    title: string;
    icon?: JSX.Element;
    iconPrefix?: string;
    routes: WebRoute[];
    tooltip?: string;
    tooltipColor?: Type;
    tooltipPlacement?: Place;
  }) {
    if (options) {
      this.id = options.id;
      this.title = options.title;
      this.icon = options.icon;
      this.iconPrefix = options.iconPrefix;
      this.routes = options.routes;
      this.tooltip = options.tooltip;
      this.tooltipColor = options.tooltipColor;
      this.tooltipPlacement = options.tooltipPlacement ?? "right";
    }
  }

  public id: string;
  public title: string;
  public icon?: JSX.Element;
  public iconPrefix?: string;
  public routes: WebRoute[];
  public tooltip?: string;
  public tooltipColor?: Type;
  public tooltipPlacement?: Place;
}
