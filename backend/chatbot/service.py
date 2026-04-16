from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Allow frontend to communicate with this backend

import re

# Base de conhecimento robusta e humanizada
QA_BASE = {
    # Saudações e Humanização
    "oi": ("Olá! Seja muito bem-vindo à SIGA. Como posso tornar seu dia mais estiloso hoje?", None),
    "olá": ("Olá! Tudo bem? Estou aqui para ajudar você a encontrar o look perfeito. O que procura?", None),
    "tudo bem": ("Comigo está tudo ótimo! Melhor agora conversando com você. Em que posso te ajudar?", None),
    "bom dia": ("Bom dia! Que prazer ter você por aqui. Já conferiu nossas novidades hoje?", "/trends"),
    "boa tarde": ("Boa tarde! Espero que seu dia esteja sendo incrível. Como posso ajudar?", None),
    "boa noite": ("Boa noite! Que tal aproveitar a tranquilidade para escolher seu próximo look?", "/offers"),
    "quem é você": ("Sou o assistente virtual da SIGA, especializado em moda e em te ajudar a ter a melhor experiência de compra!", None),
    
    # Redirecionamentos para Produtos e Filtros (Categorias Inteligentes)
    "roupas": ("Temos uma coleção completa de roupas premium! Confira aqui:", "/products?category=Roupas"),
    "blusa": ("Confira nossas blusas e peças de vestuário premium:", "/products?category=Roupas"),
    "camiseta": ("Veja nossas camisetas e opções de vestuário:", "/products?category=Roupas"),
    "calça": ("Procurando calças? Veja nossa coleção completa de vestuário:", "/products?category=Roupas"),
    "bermuda": ("Confira nossas bermudas e roupas de verão:", "/products?category=Roupas"),
    "casaco": ("Veja nossas opções de casacos e agasalhos:", "/products?category=Roupas"),
    "moletom": ("Confira nossos moletons e peças de frio:", "/products?category=Roupas"),
    "vestido": ("Veja nossa belíssima coleção de vestidos:", "/products?category=Roupas"),
    
    "calçados": ("Nossos calçados são sinônimo de conforto e estilo. Confira as opções:", "/products?category=Calçados"),
    "sapato": ("Procurando sapatos? Temos modelos incríveis esperando por você:", "/products?category=Calçados"),
    "tênis": ("Temos tênis que unem performance e design. Veja nossa coleção completa:", "/products?category=Calçados"),
    "tenis": ("Temos tênis que unem performance e design. Veja nossa coleção completa:", "/products?category=Calçados"),
    "bota": ("Confira nossa linha de botas e calçados:", "/products?category=Calçados"),
    "sandália": ("Veja nossas sandálias e opções leves:", "/products?category=Calçados"),
    "chinelo": ("Confira nossos chinelos e calçados casuais:", "/products?category=Calçados"),

    "acessórios": ("Complete seu look com nossos acessórios exclusivos:", "/products?category=Acessórios"),
    "acessorio": ("Complete seu look com nossos acessórios exclusivos:", "/products?category=Acessórios"),
    "relógio": ("Confira nossa curadoria de relógios premium:", "/products?category=Acessórios"),
    "relogio": ("Confira nossa curadoria de relógios premium:", "/products?category=Acessórios"),
    "óculos": ("Veja nossos modelos de óculos e acessórios:", "/products?category=Acessórios"),
    "oculos": ("Veja nossos modelos de óculos e acessórios:", "/products?category=Acessórios"),
    "boné": ("Confira nossos bonés e acessórios de estilo:", "/products?category=Acessórios"),
    "bolsa": ("Veja nossa linha de bolsas e acessórios:", "/products?category=Acessórios"),
    "mochila": ("Confira nossas mochilas e acessórios para o dia a dia:", "/products?category=Acessórios"),
    
    # Marketing e Promoções
    "ofertas": ("Adora uma promoção? Preparei uma seleção com descontos imperdíveis para você:", "/offers"),
    "promoção": ("Economizar com estilo é o melhor dos mundos! Veja nossas ofertas:", "/offers"),
    "desconto": ("Economizar com estilo é o melhor dos mundos! Veja nossas ofertas:", "/offers"),
    "tendências": ("Fique por dentro de tudo o que está em alta no mundo da moda agora:", "/trends"),
    "novidades": ("Nossa nova coleção acabou de chegar! Venha conferir as peças exclusivas:", "/trends"),

    # Filtros por Estilo (Tendências)
    "urbano": ("Confira nossa curadoria de estilo Urbano com as últimas tendências:", "/trends?filter=Urbano"),
    "urban": ("Confira nossa curadoria de estilo Urbano com as últimas tendências:", "/trends?filter=Urbano"),
    "minimalista": ("Veja nossa coleção Minimalista, focada no essencial e no estilo:", "/trends?filter=Minimalista"),
    "minimalismo": ("Veja nossa coleção Minimalista, focada no essencial e no estilo:", "/trends?filter=Minimalista"),
    "atemporal": ("Descubra peças Atemporais que nunca saem de moda:", "/trends?filter=Atemporal"),

    # Navegação e Funcionalidades
    "carrinho": ("Acesse seu carrinho de compras aqui:", "/cart"),
    "sacola": ("Acesse sua sacola de compras aqui:", "/cart"),
    "finalizar": ("Pronto para fechar seu pedido? Vamos ao checkout:", "/checkout"),
    "pagamento": ("Redirecionando para as opções de pagamento:", "/checkout"),
    "conta": ("Acesse sua área exclusiva de cliente:", "/customer"),
    "perfil": ("Acesse seu perfil e histórico de pedidos:", "/customer"),
    "favoritos": ("Veja os produtos que você salvou em sua lista de desejos:", "/favorites"),
    "wishlist": ("Veja os produtos que você salvou em sua lista de desejos:", "/favorites"),
    "lista de desejos": ("Veja os produtos que você salvou em sua lista de desejos:", "/favorites"),
    "desejos": ("Veja os produtos que você salvou em sua lista de desejos:", "/favorites"),
    "lista": ("Deseja ver sua lista de desejos ou seus pedidos?", "/favorites"),

    # Informações de Loja (FAQ)
    "frete": ("Entregamos em todo o Brasil! O frete é grátis para compras acima de R$ 250,00.", None),
    "prazo": ("O prazo de entrega varia de 5 a 12 dias úteis, dependendo da sua localização.", None),
    "entrega": ("O prazo de entrega varia de 5 a 12 dias úteis, dependendo da sua localização.", None),
    "troca": ("Você tem até 30 dias para realizar trocas ou devoluções gratuitas pelo nosso portal.", None),
    "pagamento": ("Aceitamos PIX (com 5% de desconto extra!), Boletos e Cartões de Crédito em até 12x.", None),
}

def is_gibberish(text):
    """Identifica se uma string parece ser texto aleatório (gibberish)."""
    text = text.lower().strip()
    if not text or len(text) < 3: return False
    
    # 1. Aglomerados de consoantes (4 ou mais seguidas)
    if re.search(r'[^aeiouáéíóúâêôãõç\s\d]{4,}', text):
        return True
        
    # 2. Caracteres repetidos excessivamente (3 ou mais iguais seguidos)
    if re.search(r'(.)\1\1', text):
        return True
        
    # 3. Padrões de "keyboard smash" comuns e risadas
    smash_patterns = ['asdf', 'dfgh', 'jkl', 'qwerty', 'qwer', 'zxcv', 'asdfgh', 'kkkk', 'hahah', 'rsrsrs', 'uhauh', 'shuashua', 'ksksks', 'jaij', 'isji', 'iajs', 'isaj', 'jasa']
    if any(p in text for p in smash_patterns):
        return True
        
    # 4. Heurística para sequências sem sentido (ex: 'iajsijisajassa')
    if len(text) > 5 and ' ' not in text:
        vowels = len(re.findall(r'[aeiouáéíóúâêôãõ]', text))
        
        # Sequências de teclas muito próximas/repetitivas
        if len(re.findall(r'[asdfjkluiop]', text)) > len(text) * 0.75 or (len(text) > 15 and ' ' not in text):
            # Checagem de diversidade de caracteres
            if len(set(text)) / len(text) < 0.45: 
                return True
            # Checagem de repetição de bigramas
            bigrams = [text[i:i+2] for i in range(len(text)-1)]
            if len(set(bigrams)) / len(bigrams) < 0.6:
                return True

        # Se a proporção de vogais for muito baixa ou alta demais em palavra única
        if vowels < len(text) * 0.25 or vowels > len(text) * 0.75:
            return True

    return False

def get_chat_response(message):
    msg = message.lower().strip()
    
    # Remove prefixo "chatbot" se presente no início da mensagem
    if msg.startswith("chatbot "):
        msg = msg[8:].strip()
        message = message[8:].strip()
    elif msg.startswith("chatbot"):
        msg = msg[7:].strip()
        message = message[7:].strip()

    # Identifica se é gibberish/não são palavras
    if is_gibberish(msg):
        fallback = "Humm, não consegui entender essa mensagem. Poderia tentar descrever o produto ou dúvida de outra forma?"
        return fallback, True, None

    # Busca por palavras-chave na base de conhecimento
    for key in QA_BASE:
        if key in msg:
            response_text, link = QA_BASE[key]
            return response_text, False, link
            
    # Caso não encontre palavra-chave, trata como busca de produto
    # Limpeza de termos comuns para busca mais assertiva
    search_query = message.strip()
    stop_words = ["tamanho", "de", "com", "para", "em", "pelo", "pela", "um", "uma", "o", "a"]
    words = search_query.split()
    cleaned_words = [w for w in words if w.lower() not in stop_words]
    final_query = " ".join(cleaned_words) if cleaned_words else search_query

    response_text = f"Veja os resultados para \"{final_query}\" em nossa loja."
    search_link = f"/products?search={final_query}"
    
    return response_text, False, search_link

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    
    if not user_message:
        return jsonify({"response": "Oi! Como posso te ajudar hoje?", "needs_human": False}), 400
        
    response, needs_human, internal_link = get_chat_response(user_message)
    
    return jsonify({
        "response": response,
        "needs_human": needs_human,
        "internal_link": internal_link,
        "whatsapp_url": "https://api.whatsapp.com/send?phone=5521995027179" if needs_human else None
    })

if __name__ == '__main__':
    print("Chatbot SIGA rodando na porta 5005...")
    app.run(debug=True, port=5005)
