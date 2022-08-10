# Hackcompras



# Pre-requisitos:
* Node.js v16.16.0 [(Clique aqui para baixar)](https://nodejs.org/en/download/)
Node.js é um interpretador (runtime envirioment) código aberto (open-source) de JavaScript utilizado para executar a aplicação.
* Yarn v1.22.19 [(Clique aqui para baixar)](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)
Yarn é o gerenciador de pacotes utilizados no projeto

# Execução do Projeto

 1. Criar um arquivo dotenv ``.env`` no diretório ``./api`` de forma que fique ``./api/.env`` e popula-lo com os seguintes parâmetros conforme [``.env.exemplo``](https://git.inova.serpro.gov.br/equipe29/hackcompras/-/blob/main/api/.env.exemplo) :
 ```dotenv
PORT=80
DB_HOST=<<nome do host do banco sql>>
DB_PORT=<<porta do host do banco sql>>
DB_USER=<<usuário do banco sql>>
DB_PASS=<<senha do banco sql>>
DB_NAME=<<nome do banco sql>>
SALT_ROUNDS=10
TOKEN_KEY=12345
 ```
 2. Restaurar o backup do banco de dados fornecido pela equipe ou criar um novo conforme os scripts, ambos localizados no diretório ``./modelodb``
 
 3. Navegar para o diretório ``./portal``
 ```console
 $ cd ./portal
 ```
 4. Executar o comando ``yarn start:prod``
 ```console
 $ yarn start:prod
 ```
 5. O script irá baixar todas as dependências necessárias e compilar o projeto, ao final a seguinte mensagem irá aparecer para sinalizar que a aplicação iniciou corretamente:
 ```console
 $ Hi!! Port = <<valor do campo PORT no ,env>>
 ```

### Execução passo-a-passo
Cada uma das três camadas da aplicação possui instruções específicas, os arquivos ``README.md`` de cada camada possui as devidas instruções.

### Camadas do Projeto
1. "front-end" aplicação web (porta) feito com React. [(Visualizar)](https://git.inova.serpro.gov.br/equipe29/hackcompras/-/tree/main/portal)
2. "back-end" servidor de dados (api) feito com Node.js. [(Visualizar)](https://git.inova.serpro.gov.br/equipe29/hackcompras/-/tree/main/api)
Ambos escritos em [TypeScript](https://www.typescriptlang.org/)
3. Banco de dados MSSQL. [(Visualizar)](https://git.inova.serpro.gov.br/equipe29/hackcompras/-/tree/main/modelodb)

### Videos do Projeto
[clique aqui para visualizar o video de demostração](https://youtu.be/JGXjHtH6oVo)
[clique aqui para visualizar o video do pitch](https://youtu.be/JGXjHtH6oVo)