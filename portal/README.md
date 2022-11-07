
# Portal Web

## Pre-requisitos:
* Node.js v16.16.0 [(Clique aqui para baixar)](https://nodejs.org/en/download/)
Node.js é um interpretador (runtime envirioment) código aberto (open-source) de JavaScript utilizado para executar a aplicação.
* Yarn v1.22.19 [(Clique aqui para baixar)](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)
Yarn é o gerenciador de pacotes utilizados no projeto

## Execução da Aplicação

### Dev
1. Executar o commando ``yarn`` para instalar as depedências
 ```console
 $ yarn
 ```
 
 2. Executar o comando ``yarn start``
 ```console
 $ yarn start
 ```
 3. Dentro de alguns minutos a aplicação irá abrir automaticamente no seu navegador padrão.

### Prod
1. Caso necessário, configurar um ambiente novo no [``env.json``](https://git.inova.serpro.gov.br/equipe29/hackcompras/-/blob/main/portal/env.json)

2. Executar o commando ``yarn`` para instalar as depedências
 ```console
 $ yarn
 ```
 
 3. Executar o comando ``yarn build``
 ```console
 $ yarn build
 ```
 4. Selecionar o número de versão quando o script solicitar.
 5. Selecionar o ambiente desejado quando o  script solicitar.
 6. O script gera os arquivos na pasta especificada no [``env.json``](https://git.inova.serpro.gov.br/equipe29/hackcompras/-/blob/main/portal/env.json), campo ``dir``
 7. Publicar os arquivos gerados em um servidor web

### Publicar com a API do Projeto
1. Seguir os [passos para iniciar](https://git.inova.serpro.gov.br/equipe29/hackcompras/-/blob/main/api/README.md) o serviço da API.
2. Mover os arquivos gerados para a pasta ``./public``
3. Acessar normalmente pelo localhost na porta configurada, ou pelo acesso externo caso tenha sido configurado no firewall.

### Videos do Projeto
[clique aqui para visualizar o video de demostração](https://youtu.be/JGXjHtH6oVo)
[clique aqui para visualizar o video do pitch](https://youtu.be/JGXjHtH6oVo)
