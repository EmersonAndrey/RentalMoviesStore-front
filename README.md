# 🎬 Rental Movies Store – Frontend

Este é o **frontend** da aplicação **Rental Movies Store**, construído com **React**, **Bootstrap**, **HTML** e **CSS**, que se comunica com o backend desenvolvido em Spring Boot. O sistema permite salvar filmes favoritos em forma de catálogo.

---

## 📹 Vídeo Demonstrativo
[Ver post no LinkedIn](https://www.linkedin.com/feed/update/urn:li:activity:7297731819163049984/)  

---

## 🚀 Instruções de Instalação

### 1️⃣ Pré-requisitos
Certifique-se de que seu ambiente possui os seguintes softwares instalados:

- **Node.js** (versão 16 ou superior)
- **npm** (ou `yarn` como alternativa)

---

### 2️⃣ Clone o Repositório

```bash
git clone https://github.com/EmersonAndrey/RentalMoviesStore-front.git
cd RentalMoviesStore-front
```

---

### 3️⃣ Instale as Dependências

```bash
npm install
# ou
yarn install
```

---

### 4️⃣ Execute o Projeto

```bash
npm run dev
# ou
yarn dev
```

---

### 🌐 Acesso à Aplicação

Após iniciar, acesse a aplicação pelo navegador:  
[http://localhost:5173](http://localhost:5173)

---

## ⚠️ Observações

- O backend deve estar em execução na porta padrão `http://localhost:8080`.
- O `docker-compose.yml` que orquestra front e back está neste repositório.

---

## 🐳 Rodando com Docker Compose
Este projeto inclui um arquivo docker-compose.yml para facilitar o desenvolvimento e execução do sistema completo (frontend + backend) em containers Docker.

### Passos para rodar com Docker Compose:
- Certifique-se de ter o Docker e o Docker Compose instalados na sua máquina.
- Clone este repositório (frontend) e o repositório do backend.
- Execute o comando:
  ```bash
    docker-compose up --build
  ```
  
Este comando irá:
- Construir as imagens Docker do frontend e backend (se necessário)
- Subir os containers com ambos os serviços
- Mapear as portas (ex: frontend na 5173, backend na 8080)

### 🌐 Acesso à Aplicação

Após iniciar, acesse a aplicação pelo navegador:  
[http://localhost:5173](http://localhost:5173)

---

## 🛠️ Funcionalidades

- Tela de login e cadastro
- Página inicial com exibição de filmes
- Marcar filmes como favoritos
- Visualização e remoção de favoritos
- Comunicação com API backend em Java Spring Boot

---

## 🧱 Tecnologias Utilizadas

🔹 **Frontend**
- ⚛️ React
- 🎨 HTML + CSS
- 🎛️ Bootstrap

🔹 **Backend**
- ☕ Java 17  
- 🧩 Spring Boot  

---

## 🧩 Integração com o Backend

🔗 [Repositório do Backend – RentalMoviesStore-back](https://github.com/EmersonAndrey/RentalMoviesStore-back)

---

## 👨‍💻 Desenvolvido por

**Emerson Andrey Fausto dos Santos**  
