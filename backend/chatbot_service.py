from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Allow frontend to communicate with this backend

# Base de conhecimento robusta e humanizada
QA_BASE = {
    # Saudações e Humanização
    "oi": ("Olá! Seja muito bem-vindo à SIGA. 👕 Como posso tornar seu dia mais estiloso hoje?", None),
    "olá": ("Olá! Tudo bem? Estou aqui para ajudar você a encontrar o look perfeito. O que procura?", None),
    "tudo bem": ("Comigo está tudo ótimo! Melhor agora conversando com você. Em que posso te ajudar?", None),
    "bom dia": ("Bom dia! Que prazer ter você por aqui. Já conferiu nossas novidades hoje?", "/trends"),
    "boa tarde": ("Boa tarde! Espero que seu dia esteja sendo incrível. Como posso ajudar?", None),
    "boa noite": ("Boa noite! Que tal aproveitar a tranquilidade para escolher seu próximo look?", "/offers"),
    "quem é você": ("Sou o assistente virtual da SIGA, especializado em moda e em te ajudar a ter a melhor experiência de compra!", None),
    
    # Redirecionamentos para Produtos e Filtros
    "roupas": ("Temos uma coleção completa de roupas premium! Você pode filtrar por categoria aqui:", "/products?category=Roupas"),
    "calçados": ("Nossos calçados são sinônimo de conforto e estilo. Confira as opções:", "/products?category=Calçados"),
    "sapato": ("Procurando sapatos? Temos modelos incríveis esperando por você:", "/products?category=Calçados"),
    "tênis": ("Temos tênis que unem performance e design. Veja o que separei:", "/products?search=tenis"),
    "ofertas": ("Adora uma promoção? Preparei uma seleção com descontos imperdíveis para você:", "/offers"),
    "promoção": ("Economizar com estilo é o melhor dos mundos! Veja nossas ofertas:", "/offers"),
    "desconto": ("Economizar com estilo é o melhor dos mundos! Veja nossas ofertas:", "/offers"),
    "tendências": ("Fique por dentro de tudo o que está em alta no mundo da moda agora:", "/trends"),
    "novidades": ("Nossa nova coleção acabou de chegar! Venha conferir as peças exclusivas:", "/trends"),

    # Informações de Loja (FAQ)
    "frete": ("Entregamos em todo o Brasil! O frete é grátis para compras acima de R$ 250,00.", None),
    "prazo": ("O prazo de entrega varia de 5 a 12 dias úteis, dependendo da sua localização.", None),
    "entrega": ("O prazo de entrega varia de 5 a 12 dias úteis, dependendo da sua localização.", None),
    "troca": ("Você tem até 30 dias para realizar trocas ou devoluções gratuitas pelo nosso portal.", None),
    "pagamento": ("Aceitamos PIX (com 5% de desconto extra!), Boletos e Cartões de Crédito em até 12x.", None),
}

def get_chat_response(message):
    msg = message.lower()
    
    # Busca por palavras-chave na mensagem do usuário
    for key in QA_BASE:
        if key in msg:
            response_text, link = QA_BASE[key]
            return response_text, False, link
            
    # Caso não entenda, sugere o atendente
    fallback = "Humm, não consegui encontrar uma informação exata sobre isso, mas não quero te deixar sem resposta!"
    return fallback, True, None

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
