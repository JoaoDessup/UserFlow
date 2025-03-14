📌 Projeto sendo iniciado.

---

## ▶️ Como iniciar o projeto

1. Acesse a pasta do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Crie o arquivo `.env` com sua chave JWT (baseado no `.env.example`):
```env
JWT_SECRET=SUA_CHAVE_SECRETA
```

4. Crie o banco de dados SQLite automaticamente ao iniciar o servidor:
> O arquivo `database.db` será criado automaticamente ao iniciar a aplicação caso não exista, através da função `createUserTable()`.

5. Inicie o servidor:
```bash
npm run dev
```

> O servidor estará disponível em `http://localhost:3000`

---
