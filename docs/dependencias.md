# Controle de Dependências - SIGA

Abaixo está o registro técnico das pilhas de tecnologias e as bibliotecas chave adotadas ao longo das camadas deste sistema.

## 🌐 Frontend (React + Vite)
Localizado na pasta `/frontend/`. A gestão de módulos no ambiente Javascript é orquestrada via `npm`.

### Core da Aplicação
- **React (^19.2) e ReactDOM (^19.2)**: Bibliotecas base para a construção das interfaces declarativas.
- **Vite (^8.0)**: Executa a compilação local (dev server) mais eficiente através do rollup.
- **React Router DOM (^7.13)**: Responsável pelas transições de URL e "Single Page Application" das telas de Layouts e rotas dinâmicas.

### Gerenciamento de Estado
- **Zustand (^5.0.12)**: Ferramenta levíssima e pragmática adotada para substituir contextos pesados e armazenar todo estado global do App.

### UI (Interface Gráfica e Estilização)
- **Tailwind CSS (^4.2)**: Ferramenta base utilitária de design e folha de estilos. Já configurada e utilizando os novos recursos da versão 4 via plugin do Vite (`@tailwindcss/vite`).
- **Shadcn/UI & Radix UI (^2.x / ^1.x)**: Abordagem de componentes "copie os arquivos e adapte-os". Uma forte mescla destas primitivas para acessibilidade superior, como Popovers, Tabs, Dropdown e Dialogs modais (utiliza `class-variance-authority` e `clsx` para merge seguro).
- **Lucide React (^1.7) & React Icons (^5.6)**: Componentes para renderização flexível de ícones escaláveis (SVGs).
- **Sonner (^2.0.7)**: Sistema de alertas popup amigáveis na aplicação, com fila e customização rápida.

### Ferramentas e DevTools
- **TypeScript (~5.9)**: Adição e compilação de tipagem estática no ciclo de trabalho do Vite.
- **Babel (React Compiler)**: Já possui introdução com plugins em versão inicial em busca das otimizações automáticas de `useMemo` na camada compilada nativa do React. 
- **ESlint (^9)**: Verificador e corretor rígido das diretivas de qualidade.

---

## ⚙️ Backend (Python)
*Atualmente em fase de planejamento, viverá na pasta raiz `/backend/`.*

### Projeções de adoção:
- Será construído empregando **Python**.
- Poderá fazer uso de Frameworks de alta velocidade baseados em tipagem para o lançamento da nova fase do ecossistema, como FastAPI.
