# Formulário com Validação em React

Este é um projeto simples que demonstra a criação de um formulário com validação de dados em tempo real utilizando React, TypeScript e a biblioteca Zod.

## ✨ Funcionalidades

-   Formulário com campos para nome, email, telefone, senha e confirmação de senha.
-   Validação dos dados do formulário no momento do envio.
-   Exibição de mensagens de erro específicas para cada campo inválido.
-   Máscara de entrada para o campo de telefone utilizando `react-imask`.
-   Modal de confirmação exibido após o envio bem-sucedido do formulário.
-   Estilização moderna com Tailwind CSS.

## 🚀 Tecnologias Utilizadas

-   [React](https://reactjs.org/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Vite](https://vitejs.dev/)
-   [Zod](https://zod.dev/) para validação de esquemas
-   [React IMask](https://imask.js.org/guide.html) para máscaras de input
-   [Tailwind CSS](https://tailwindcss.com/) para estilização

## ⚙️ Como Executar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone <url-do-seu-repositorio>
    ```

2.  **Navegue até o diretório do projeto:**
    ```bash
    cd formValidation
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ``

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
 
    ```

5.  Abra seu navegador e acesse `http://localhost:5173` (ou a porta indicada no seu terminal).

## 📝 Lógica de Validação

A validação é controlada pela função `handleSubmit` no componente `App.tsx`.

1.  Quando o formulário é submetido, a função `handleSubmit` previne o comportamento padrão e coleta os dados dos campos usando `FormData`.
2.  Um objeto `data` é criado com os valores do formulário.
3.  O método `formSchema.parse(data)` (definido em `src/schemas/formSchema.ts`) é chamado para validar os dados contra o esquema Zod.
4.  **Se a validação for bem-sucedida:**
    -   O estado de erros é limpo.
    -   O formulário é resetado.
    -   Um modal de confirmação é exibido.
5.  **Se a validação falhar:**
    -   Um erro do tipo `ZodError` é capturado.
    -   As mensagens de erro são extraídas do array `error.issues`.
    -   O estado `errors` é atualizado, fazendo com que as mensagens de erro sejam renderizadas na UI abaixo dos campos correspondentes.