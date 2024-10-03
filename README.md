# API Vendas

Esta API gerencia vendas, usuários, produtos, pedidos e clientes, utilizando TypeScript, Express e TypeORM para interagir com um banco de dados PostgreSQL. Funcionalidades adicionais incluem autenticação, envio de e-mails e controle de taxa de requisições.


# Tecnologias Utilizadas

- Node.js: Ambiente de execução JavaScript.
- TypeScript: Superconjunto de JavaScript com tipagem estática.
- Express: Framework para construção de APIs.
- TypeORM: ORM para TypeScript/JavaScript.
- PostgreSQL: Sistema de banco de dados relacional.
- Redis: Armazenamento em cache e gerenciamento de sessões.
- Nodemailer: Envio de e-mails.
- Multer: Manipulação de arquivos multipart/form-data.
- Celebrate: Validação de dados com Joi.
  
# Configuração

## Pré-requisitos
- Node.js (>= 14.x)
- PostgreSQL (>= 12.x)
- Redis


# Entidades

## Usuários

Descrição: Gerencia usuários.

Atributos: id, nome, email, senha.

Funcionalidades: Registro, autenticação e recuperação de senha.

## Produtos

Descrição: Gerencia os produtos disponíveis para venda.

Atributos: id, nome, descrição, preço, estoque.

Funcionalidades: Adicionar, editar, remover e listar produtos.

## Pedidos

Descrição: Representa um pedido realizado por um cliente.

Atributos: id, cliente_id, produtos, total, status.

Funcionalidades: Criar, atualizar e listar pedidos.

## Clientes

Descrição: Gerencia clientes que realizam compras.

Atributos: id, nome, email, telefone.

Funcionalidades: Cadastrar e gerenciar clientes.

# Rotas Principais

## Usuários

GET /users: Lista todos os usuários.

POST /users: Cria um novo usuário.

GET /users/:id: Busca um usuário pelo ID.

PUT /users/:id: Atualiza as informações de um usuário.

DELETE /users/:id: Remove um usuário.

## Sessões

POST /sessions: Autentica um usuário e gera um token JWT.

## Perfis

GET /profile: Exibe o perfil do usuário autenticado.

PUT /profile: Atualiza o perfil do usuário autenticado.

## Produtos

GET /products: Lista todos os produtos.

GET /products/:id: Busca um produto pelo ID.

POST /products: Adiciona um novo produto.

PUT /products/:id: Atualiza um produto existente.

DELETE /products/:id: Remove um produto.

## Pedidos 

GET /orders: Lista todos os pedidos.

GET /orders/:id: Busca um pedido pelo ID.

POST /orders: Cria um novo pedido.

PUT /orders/:id: Atualiza um pedido existente.

DELETE /orders/:id: Remove um pedido.

## Clientes 

GET /customers: Lista todos os clientes.

GET /customers/:id: Busca um cliente pelo ID.

POST /customers: Cadastra um novo cliente.

PUT /customers/:id: Atualiza as informações de um cliente.

DELETE /customers/:id: Remove um cliente.

## Como Executar
- Clone o repositório:

```
git clone git@github.com:marina-barbosa/api-vendas.git
cd api-vendas
```

- Instale as dependências:
  
```
npm install
```

- Configure as variáveis de ambiente no arquivo .env:

```
# env

PORT=3334
DATABASE_URL=postgres://usuario:senha@localhost:5432/apivendas
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASS=sua_senha
JWT_SECRET=sua_chave_secreta
```

- Inicie o servidor:

```
npm run dev
```

A API estará disponível em http://localhost:3333.
