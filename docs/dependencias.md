# Registro de Dependências e Stack Tecnológica - SIGA

Este documento cataloga de forma técnica as pilhas de tecnologias, bibliotecas e versões fundamentais que sustentam o ecossistema SIGA. Ele serve como referência para auditoria de segurança e padronização do ambiente de desenvolvimento.

---

## 🌐 Frontend (React Ecosystem)

A camada de interface reside no diretório `/frontend/`. O projeto utiliza uma abordagem de ponta, priorizando performance via compilação nativa e tipagem estática.

### Core e Engine de Renderização
- **React (^19.2)**: Utilizando as APIs mais recentes do React 19 para gestão de estado e renderização.
- **Vite (^8.0)**: Build tool de última geração que orquestra o HMR (Hot Module Replacement) e o bundling via Rollup.
- **React Router DOM (^7.13)**: Gestão de roteamento declarativo e navegação entre subpáginas.

### Gerenciamento de Estado e Dados
- **Zustand (^5.0.12)**: Framework de estado global minimalista, eliminando o overhead de Context Providers complexos.
- **React Router Hooks**: Utilizados para manipulação de parâmetros de busca e filtros dinâmicos de URL.

### Design System e Styling
- **Tailwind CSS (^4.2)**: Motor de estilização utilitária integrado via engine `@tailwindcss/vite`.
- **Shadcn/UI & Radix UI**: Primitivas de componentes acessíveis (WAI-ARIA) que compõem a biblioteca de UI customizada.
- **Lucide React & React Icons**: Conjunto de ícones vetoriais escaláveis.
- **Sonner**: Sistema de notificações (Toasts) de alta performance.

### Ferramentas de Qualidade
- **TypeScript (~5.9)**: Tipagem estática rigorosa em todo o ciclo de vida do componente.
- **Babel & React Compiler**: Plugins configurados para otimização automática de memoization em tempo de compilação.
- **ESLint (^9)**: Linter configurado com regras modernas para manutenção da consistência de código.

---

## ⚙️ Backend (Python Services)

O backend é estruturado como uma série de serviços especializados em lógica de negócio, residindo no diretório `/backend/`.

### Core Backend
- **Python 3**: Linguagem base para processamento de inteligência e logística.
- **Flask (^3.0)**: Micro-framework utilizado para a exposição dos endpoints de API.
- **Flask-CORS (^4.0)**: Middlewares para autorização de requisições Cross-Origin entre o frontend e os serviços.
- **Werkzeug (^3.0)**: Biblioteca WSGI que fornece utilitários de roteamento e debugging.

### Serviços Especializados
- **Chatbot Service**: Motor de processamento de linguagem natural e lógica de FAQ, localizado em `/backend/chatbot/`.
- **Freight Service**: Motor de cálculo logístico baseado em CEP, localizado em `/backend/freight/`.

---

## 🚀 Infraestrutura e Integração (Serverless)

A ponte de comunicação entre as camadas é otimizada para implantação moderna.

- **Vercel Serverless Functions**: O projeto utiliza Python Runtime no Vercel para escalar os serviços de backend de forma sob demanda.
- **Mapeamento de Rotas**: Configurado via `vercel.json` para rotear `/api/*` diretamente para os scripts em `/api/`.
- **Concurrency**: Gerenciamento de execução paralela no ambiente local via biblioteca `concurrently`.
