# AgilStore - Gerenciamento de Produtos

AgilStore é uma aplicação para gestão automatizada de inventário de produtos, desenvolvida com NestJS e MongoDB. Ela substitui o controle manual por planilhas, permitindo operações rápidas e seguras de cadastro, listagem, busca e exclusão de itens de eletrônicos.

Relacionado a esse [Desafio](https://drive.google.com/file/d/1IQIwMOHFahJq95vKn6XjpreThqlxn9i9/view)

## 🚀 Tecnologias Utilizadas

- **Framework**: [NestJS](https://nestjs.com/)
- **Banco de Dados**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Documentação**: [Swagger](https://swagger.io/)
- **Containerização**: [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- **Testes**: [Jest](https://jestjs.io/) & [Supertest](https://github.com/visionmedia/supertest)

## 📦 Como Rodar o Projeto

### 🐳 Usando Docker (Recomendado)

A forma mais rápida de rodar o projeto completo (API + Banco de Dados) é usando o Docker Compose.

1.  **Subir os containers**:
    ```bash
    docker-compose up -d --build
    ```
2.  **Acessar a API**:
    - API: [http://localhost:3000](http://localhost:3000)
    - Swagger UI (Documentação): [http://localhost:3000/api](http://localhost:3000/api)

---

### 💻 Rodando Localmente

Se preferir rodar a API localmente (fora do Docker), você ainda precisará do banco de dados MongoDB.

1.  **Subir apenas o banco de dados**:
    ```bash
    docker-compose up -d mongodb
    ```
2.  **Instalar dependências**:
    ```bash
    npm install
    ```
3.  **Iniciar em modo de desenvolvimento**:
    ```bash
    npm run start:dev
    ```

## 🧪 Testes

O projeto conta com testes unitários e testes de integração (E2E).

- **Unitários**:
  ```bash
  npm run test
  ```
- **E2E (End-to-End)**:
  ```bash
  npm run test:e2e
  ```

## 📖 Endpoints da API

A documentação completa pode ser visualizada via Swagger em `http://localhost:3000/api`.

### Principais Funcionalidades:

- **POST `/products`**: Adicionar novo produto.
- **GET `/products`**: Listar produtos (suporta filtros por categoria e ordenação por nome, preço ou estoque).
- **GET `/products/:idOrName`**: Buscar produto específico por ID ou parte do nome.
- **PATCH `/products/:id`**: Atualizar informações de um produto.
- **DELETE `/products/:id`**: Remover um produto.

## 🛠️ Docker Multi-stage Build

Este projeto utiliza um `Dockerfile` multi-stage para otimizar o tamanho da imagem de produção:

1.  **Build Stage**: Instala dependências de desenvolvimento e compila o TypeScript.
2.  **Production Stage**: Copia apenas o código transpilado e as dependências necessárias para execução.

---

Desenvolvido por **Antigravity AI**.
