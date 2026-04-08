# 🚀 SIGA

O **SIGA** é uma aplicação web robusta com uma arquitetura moderna operando sob um modelo de **Monorepo**. Esse formato divide as responsabilidades e configurações físicas da aplicação em duas frentes independentes dentro do mesmo projeto: a Interface de Usuário (`frontend/`) e a infraestrutura de dados da API (`backend/`).

## 📚 Documentação Auxiliar

Preparamos artefatos detalhados sobre todas as decisões chave do projeto e controle das bibliotecas. Recomendamos muito a leitura:
- [📖 Arquitetura e Comunicação](docs/arquitetura.md): Como as pastas operam e se preparam juntas.
- [📦 Tecnologias e Dependências](docs/dependencias.md): Todas as ferramentas específicas, bibliotecas (Shadcn, Zustand, Tailwind etc.) e suas devidas razões de uso.

---

## 🛠️ O que compõe o projeto?

Atualmente, o repositório orgulha-se de utilizar configurações "Edge" da comunidade, com foco pleno em performance extrema no cliente:

* **React 19 & Vite 8**: O "coração" da plataforma UI na construção de interfaces com o compilador em rollup ultrarrapido para HMR (Hot Module Replacement).
* **Zustand**: Adotado isoladamente para lidar com o Estado Global da aplicação (State Management) de maneira atômica e menos verbosa que o Redux ou puramente ContextAPI.
* **Tailwind CSS v4 & Shadcn/ui**: Combinação primária em relação a componentes e interfaces limpas, unindo utilitários dinâmicos de renderização com preceitos vitais de Acessibilidade mantidos abertamente pela Radix UI.
* **TypeScript Estrito**: Prevenindo bugs vitais durante fase de refatoração nos componentes, exigindo que todas respostas do sistema sejam mapeadas visualmente.
* **Python API (Futura)**: As projeções base delineiam o backend e banco de dados para adoção em ecossistema do Python.

---

## 🏗️ Como iniciar o Desenvolvimento

Por ser organizado no modelo de monorepo sem um pacote "master" de `package.json`, você precisará entrar ativamente na pasta que deseja testar.

### 👉 Rodando o Frontend

Você precisará estar com o `Node.js` v18+ instalado. Pelo seu terminal na raiz:

1. Acesse o escopo da UI e instale localmente todas as depedências NPM:
   ```bash
   cd frontend
   npm install
   ```
2. Então suba a aplicação com um servidor de Reload Instantâneo:
   ```bash
   npm run dev
   ```
Prontinho, os arquivos estarão expostos acessando a URL provida no terminal (geralmente [http://localhost:5173/](http://localhost:5173/)).

### 👉 Rodando o Backend
*(A infraestrutura desta sessão logo será populada dentro de `/backend`)*
