import React from "react";
import { Validations } from "@helpers/validations";
import { isValid, parse } from "date-fns";

import { ComboBox, Input } from "..";

interface IState {
  isValid: boolean;
  erros: string[];
}

interface IProps {
  children: any;
  id?: string;
}

export class Form extends React.Component<IProps, IState> {
  state = {
    isValid: true,
    erros: [],
  };

  clear = async (): Promise<void> => {
    await this.setState({ isValid: true, erros: [] });
  };

  validate = async (): Promise<JSX.Element> => {
    await this.clear();

    if (this.props.children.length > 0) await this.validarRecursivo(this.props.children);

    if (this.state.erros.length > 0) {
      const erros = this.state.erros.join("<br/>");

      return <div dangerouslySetInnerHTML={{ __html: erros }} />;
    }

    return null;
  };

  validarRecursivo = async (children: any[]): Promise<void> => {
    if (children.forEach) {
      children.forEach(async (campo) => {
        if (this.filtroCampos(campo)) {
          // Valida cada campo
          if (campo.props.required) {
            if (typeof campo.props.value === "undefined" || campo.props.value === "" || campo.props.value === 0)
              await this.adicionarErro(`Campo "${campo.props.title || campo.props.placeholder}" obrigatório.`);
          }

          /*
            Essa série de ifs existe mais para organização.
            Como o Combo não tem props como "tipo" os ifs
            internos do validarCampoTexto não são executados.
            Em tese.
          */
          if (campo.type === Input) {
            await this.validarCampoTexto(campo);
          }
        } else {
          if (campo.props && campo.props.children && campo.props.children.length > 0) await this.validarRecursivo(campo.props.children);
        }
      });
    }
  };

  validarCampoTexto = async (campo: { props: { value: string; type: string; title: any; placeholder: any; min: number; }; }): Promise<void> => {
    // Validações específicas de CampoTexto vão aqui
    if (campo.props.value && campo.props.type === "email" && Validations.email(campo.props.value)) await this.adicionarErro("E-mail inválido.");

    if (campo.props.value && campo.props.type === "date") {
      const dataValida = isValid(parse(campo.props.value, "dd/MM/yyyy", new Date()));

      if (!dataValida) await this.adicionarErro(`Campo "${campo.props.title || campo.props.placeholder}" inválido.`);
    }

    let valorSemMascara = null;
    if (campo.props.value !== undefined && campo.props.type !== "number" && campo.props.type !== "money" && campo.props.type !== "percent") {
      valorSemMascara = campo.props.value.split("_").join("");
    }

    if (campo.props.min && valorSemMascara.length < campo.props.min)
      await this.adicionarErro(`Campo "${campo.props.title || campo.props.placeholder}" inválido.`);
  };

  filtroCampos = (campo: { type: any }): boolean => campo.type === Input || campo.type === ComboBox;

  adicionarErro = async (erro: string): Promise<void> => {
    await this.setState((oldState) => {
      return {
        erros: [...oldState.erros, `• ${erro}`],
      };
    });
  };

  render(): JSX.Element {
    const { children } = this.props;

    return <form id={this.props.id}>{children}</form>;
  }
}
