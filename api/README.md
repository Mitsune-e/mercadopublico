
# Servidor de Dados (API)

## Pre-requisitos:
* Node.js v16.16.0 [(Clique aqui para baixar)](https://nodejs.org/en/download/)
Node.js é um interpretador (runtime envirioment) código aberto (open-source) de JavaScript utilizado para executar a aplicação.

## Execução da Aplicação

1.  Criar um arquivo dotenv `.env` na raiz de forma que fique `./.env` e popula-lo com os seguintes parâmetros conforme [`.env.exemplo`](https://git.inova.serpro.gov.br/equipe29/hackcompras/-/blob/main/api/.env.exemplo) :

```
PORT=80
DB_HOST=<<nome do host do banco sql>>
DB_PORT=<<porta do host do banco sql>>
DB_USER=<<usuário do banco sql>>
DB_PASS=<<senha do banco sql>>
DB_NAME=<<nome do banco sql>>
SALT_ROUNDS=10
TOKEN_KEY=12345
```

2. Executar o commando ``npm install`` para instalar as depedências
 ```console
 $ npm install
 ```
 
 3. Executar o comando ``npm start`` para iniciar a aplicação
 ```console
 $ yarn start
 ```
 4. Dentro de alguns minutos a seguinte mensagem irá aparecer para sinalizar que a aplicação iniciou corretamente:

```
$ Hi!! Port = <<valor do campo PORT no ,env>>
```

### Videos do Projeto
[clique aqui para visualizar o video de demostração](https://youtu.be/JGXjHtH6oVo)
[clique aqui para visualizar o video do pitch](https://youtu.be/JGXjHtH6oVo)