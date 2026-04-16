# SIGAstore - Plataforma de E-commerce

Este projeto é uma **Prova de Conceito (PoC)** de uma plataforma SaaS de larga escala. O desenvolvimento atual corresponde à **Fase 1 de 8** do cronograma de implementação do ecossistema completo.

Para detalhes específicos sobre o projeto, acesse os documentos técnicos:
- [Arquitetura do Sistema](./docs/arquitetura.md)
- [Gestão de Dependências](./docs/dependencias.md)
- [Especificações de Frete e Logística](./docs/backend/feat-Frete_Calculo.md)
- [Inteligência e Funcionalidades do Chatbot](./docs/backend/feat-Chatbot_IA.md)

Este sistema foi desenvolvido com foco em alta performance, design minimalista e inteligência conversacional. A arquitetura é composta por um front-end moderno em React e um ecossistema de micro-serviços em Python para processamento de lógica de negócio.

## Arquitetura do Projeto

O repositório está organizado como um monorepo para facilitar o desenvolvimento integrado:

- /frontend: Interface do usuário desenvolvida em React.
- /backend: Lógica de negócio e serviços em Python.
- /api: Pontos de entrada para funções serverless otimizadas para o Vercel.

## Funcionalidades Principais

### Front-end
- Interface responsiva com foco em dispositivos móveis.
- Layout de página inicial em sistema de Bento Grid.
- Sistema de busca avançada com filtros dinâmicos.
- Fluxo de checkout completo com suporte a diversos métodos de pagamento.
- Área do cliente protegida por autenticação.
- Lista de desejos persistente.
- Calculadora de frete integrada à API ViaCEP e cálculos regionais.
- Widget de Chatbot humanizado com animações de digitação.

### Back-end e Inteligência
- Serviço de Chatbot (Flask):
  - Base de conhecimento integrada para FAQ.
  - Redirecionamento inteligente para categorias e páginas do site.
  - Filtros de busca por estilo (Urbano, Minimalista, Atemporal).
  - Detecção de mensagens aleatórias (Gibberish Detection).
- Serviço de Frete:
  - Cálculo baseado no primeiro dígito do CEP (Zonas Regionais).
  - Implementação de teto máximo de preço solicitado pela regra de negócio.
  - Prazo de entrega dinâmico por distância estimada.

## Tecnologias Utilizadas

### Front-end
- React.js 18
- Vite
- Tailwind CSS
- Lucide React (Ícones)
- Shadcn/ui (Componentes de Design)

### Back-end
- Python 3
- Flask (Web Framework)
- Flask-CORS (Tratamento de políticas de acesso)

### Infraestrutura e Deploy
- Vercel (Hospedagem de Front-end e Funções Serverless)

## Configuração de Desenvolvimento Local

Para rodar o projeto localmente, é necessário ter Node.js e Python instalados em sua máquina.

1. Instale as dependências da raiz:
   npm install

2. Instale as dependências do frontend:
   npm run install-all

3. Inicie todos os serviços simultaneamente (Vite + Python):
   npm run dev

O frontend estará disponível em http://localhost:5173 e as APIs em http://127.0.0.1:5005 e 8000.

## Estrutura de Produção (Vercel)

A plataforma utiliza o modelo de Funções Serverless do Vercel. As rotas de API são mapeadas da seguinte forma:

- /api/chat -> Processa mensagens do chatbot e lógica de intenção.
- /api/freight -> Realiza os cálculos de logística e prazo.

Desenvolvido por Lavinia Ogawa
