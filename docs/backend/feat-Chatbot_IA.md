# Funcionalidades: Chatbot Inteligente SIGA

Este documento descreve as capacidades e a lógica de processamento do assistente virtual integrado à plataforma SIGAstore. O sistema foi projetado para atuar como um mediador entre a intenção do usuário e o catálogo de produtos.

## Resumo das Funcionalidades

### 1. Base de Conhecimento (NLU Simples)
O chatbot utiliza um sistema de mapeamento de palavras-chave para fornecer respostas rápidas a dúvidas frequentes (FAQ) e informações de suporte, como prazos de entrega, políticas de troca e formas de pagamento.

### 2. Redirecionamento Inteligente de Categorias
Diferente de uma busca comum, o chatbot identifica termos genéricos e direciona o usuário para as coleções oficiais:
- Vestuário: blusas, calças, vestidos, etc.
- Calçados: tênis, sapatos, botas.
- Acessórios: relógios, óculos, bonés.

### 3. Filtros de Estilo e Tendências
Integração direta com a página de Tendências através de filtros de estilo:
- Urbano.
- Minimalista.
- Atemporal.

### 4. Navegação Assistida
O assistente atua como um atalho para páginas funcionais do sistema:
- Carrinho e Sacola.
- Checkout e Finalização de compra.
- Área do Cliente e Perfil.

### 5. Proteção de Privacidade
O sistema verifica o estado de autenticação do usuário antes de exibir links para áreas privadas (Favoritos e Pedidos). Caso o usuário não esteja logado, ele é convidado a realizar o login.

### 6. Detecção de "Não-Palavras" (Gibberish)
Implementação de heurísticas para identificar digitações aleatórias ou "keyboard smashing". Os critérios incluem:
- Aglomerados de consoantes.
- Repetição excessiva de caracteres.
- Proximidade de teclas no padrão QWERTY.
- Proporção de vogais.

### 7. Experiência do Usuário (UX)
- Animação de digitação sincronizada entre backend e frontend.
- Atraso artificial para simular interação humana.
- Limpeza de "Stop Words" (termos de preenchimento) para buscas mais precisas no catálogo.

Desenvolvido por Lavinia Ogawa
