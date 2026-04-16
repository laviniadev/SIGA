from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

# Configurações do Serviço (Espelhando backend/freight/service.py)
BASE_FIXA = 15.00
PESO_PRECO_KG = 2.50
MAX_FRETE = 40.00

@app.route('/', methods=['POST', 'OPTIONS'])
@app.route('/calculate', methods=['POST', 'OPTIONS'])
def calculate():
    if request.method == 'OPTIONS':
        return '', 200
        
    data = request.json
    if not data:
        return jsonify({"error": "Corpo da requisição vazio"}), 400

    # 1. Verificação de Campos Obrigatórios
    campos = ['cep_origem', 'cep_destino', 'peso']
    for campo in campos:
        if campo not in data:
            return jsonify({"error": f"Campo obrigatório ausente: {campo}"}), 400

    # 2. Validação de Tipos e Valores
    cep_origem = data.get('cep_origem')
    cep_destino = data.get('cep_destino')
    peso_raw = data.get('peso')

    try:
        peso = float(peso_raw)
    except (ValueError, TypeError):
        return jsonify({"error": "Peso deve ser um número válido"}), 400

    # 3. Limpeza e Validação de CEP
    cep_origem_clean = ''.join(filter(str.isdigit, str(cep_origem)))
    cep_destino_clean = ''.join(filter(str.isdigit, str(cep_destino)))

    if len(cep_origem_clean) != 8 or len(cep_destino_clean) != 8:
        return jsonify({"error": "CEP deve conter 8 dígitos"}), 400

    # Lógica de Cálculo (Espelhada do original)
    regiao_origem = int(cep_origem_clean[0])
    regiao_destino = int(cep_destino_clean[0])
    
    if regiao_origem == regiao_destino:
        distancia_km = 50 
        valor_total = 19.90
        prazo_estimado = 3
    elif abs(regiao_origem - regiao_destino) <= 2:
        distancia_km = 450
        valor_total = 34.50
        prazo_estimado = 6
    else:
        distancia_km = 1200
        valor_total = 49.90
        prazo_estimado = 10

    # Aplica o teto máximo de frete
    if valor_total > MAX_FRETE:
        valor_total = MAX_FRETE

    response = {
        "valor": round(valor_total, 2),
        "prazo_dias": int(prazo_estimado),
        "servico": "SIGA Flat Rate (Correios Style)",
        "detalhes": {
            "origem_regiao": regiao_origem,
            "destino_regiao": regiao_destino,
            "taxa_fixa": valor_total,
            "distancia_referencia_km": distancia_km
        }
    }
    
    return jsonify(response)

@app.route('/', methods=['GET'])
def health():
    return jsonify({"status": "online", "message": "Serviço de Frete SIGA (Vercel Optimized)"})
