# Arquitetura Sistêmica - Projeto SIGA

A SIGAstore é estruturada sob uma arquitetura de **Monorepo Híbrido**, unificando uma interface reativa de alto desempenho com micro-serviços de inteligência e logística distribuídos. Esta escolha garante coesão no desenvolvimento e agilidade na implantação contínua.

---

## 1. Topologia do Repositório

O projeto organiza-se de forma modular, permitindo que cada camada evolua com suas próprias dependências, mantendo uma ponte de integração coesa via API.

```text
SIGA/
├── frontend/             # 🌐 Aplicação React 19 + Vite (Core UI)
│   ├── src/              # Código fonte (Páginas, componentes, layouts)
│   ├── public/           # Ativos estáticos e manifestos
│   └── package.json      # Configurações de build e dependências Node
│
├── backend/              # ⚙️ Micro-serviços de Lógica de Negócio (Python)
│   ├── chatbot/          # Serviço de IA e processamento de FAQ
│   ├── freight/          # Motor de cálculo logístico e prazos
│   └── tests/            # Suítes de testes de integração e unitários
│
├── api/                  # 🚀 Serverless Functions (Vercel Entrypoints)
│   ├── chat.py           # Endpoint para comunicação com Chatbot
│   └── freight.py        # Endpoint para comunicação com Frete
│
├── docs/                 # 📚 Documentação Técnica e Estudos de UX
│   └── backend/          # Documentos específicos de features do backend
│
├── vercel.json           # Configurações de Proxy e Roteamento Cloud
└── package.json          # Orquestração de ambiente de desenvolvimento
```

---

## 2. Modelo de Execução e Comunicação

A SIGAstore opera em dois modos distintos de orquestração para garantir a melhor experiência de desenvolvimento e produção:

### 2.1 Fluxo em Desenvolvimento Local (Local Dev)
Utilizamos a biblioteca `concurrently` para disparar três processos simultâneos em um único terminal (`npm run dev`):
- **Vite Server**: Hospeda o frontend em `http://localhost:5173`.
- **Chatbot Service**: Roda a lógica de IA.
- **Freight Service**: Roda a calculadora logística.

### 2.2 Fluxo em Produção (Serverless Hybrid)
Ao ser implantada no **Vercel**, a arquitetura transforma os pontos de entrada em funções lambda:
1. O **Frontend** envia uma requisição para `/api/chat` ou `/api/freight`.
2. O **Vercel Runtime** intercepta a rota através do `vercel.json`.
3. O script correspondente em `/api/` processa a lógica de negócio importando os módulos do diretório `/backend/`.
4. A resposta é enviada de volta ao frontend de forma assíncrona.

---

## 3. Estratégia de Escalabilidade

- **Desacoplamento**: A lógica de cálculo e inteligência é separada dos drivers de rede, permitindo testes isolados sem necessidade de servidores HTTP ativos.
- **Proxy Inteligente**: O uso de rotas `/api/` no frontend abstrai a localização física dos micro-serviços, facilitando a troca de provedores de nuvem ou a transição para orquestração de containers no futuro.
- **Segurança**: Políticas de CORS são rigorosamente aplicadas no backend para permitir apenas origens autorizadas pela plataforma.

---

Desenvolvido por Lavinia Ogawa
