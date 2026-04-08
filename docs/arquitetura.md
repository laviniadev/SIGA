# Arquitetura do Projeto SIGA

A estrutura adotada no repositório atual segue um modelo de **Monorepo**, onde o **Frontend** e um provável **Backend** coexistem no mesmo repositório do Git, mas possuem ferramentas, configurações e dependências completamente isoladas em suas próprias pastas.

## Árvore de Pastas Base

```text
SIGA/
├── frontend/             # 🌐 Aplicação React + Vite
│   ├── src/              # Código fonte (Páginas, componentes, layouts)
│   ├── public/           # Recursos estáticos
│   ├── package.json      # Dependências e scripts Node.js
│   └── vite.config.ts    # Integrações e configurações do Vite
│
├── backend/              # ⚙️ (Placeholder) API em Python
│   ├── main.py           # Futuro ponto de entrada
│   └── requirements.txt  # Futuras listagens de pacotes do PIP
│
├── dependencias.md       # Informações sobre pacotes
├── arquitetura.md        # Mapeamento do projeto (Este arquivo)
├── README.md             # Guia de introdução
└── .gitignore            # Regras para ignorar o Node.js e Python juntos
```

## Como as partes se comunicarão?

Durante o desenvolvimento local (na sua máquina), cada serviço rodará de modo independente em um terminal diferente:
- O **Frontend Vite** iniciará um servidor de desenvolvimento na porta `http://localhost:5173`.
- O **Backend Python** poderá rodar seu servidor, por exemplo, na porta `http://localhost:8000`.

Para exibir dados dinâmicos, o React emitirá requisições HTTP (Ajax/Fetch) pedindo informações nas rotas (URLs) expostas pelo Backend. 

Para evitar conflitos com `CORS` durante o desenvolvimento de ambas as interfaces localmente, uma prática recomendada será adicionar um `proxy` no arquivo `vite.config.ts` para capturar as rotas que começam com `/api/` e redirecioná-las de modo invisível ao Python.
