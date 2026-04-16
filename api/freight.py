from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

# Regras de Negócio (Mantendo a lógica original)
MAX_FRETE = 40.00

@app.route('/', methods=['POST', 'OPTIONS'])
@app.route('/api/freight', methods=['POST', 'OPTIONS'])
def calculate():
    if request.method == 'OPTIONS':
        return '', 200
        
    try:
        data = request.json
        if not data:
            return jsonify({"error": "Corpo da requisição vazio"}), 400

        cep_destino = ''.join(filter(str.isdigit, str(data.get('cep_destino', ''))))
        cep_origem = ''.join(filter(str.isdigit, str(data.get('cep_origem', ''))))

        if len(cep_destino) != 8:
            return jsonify({"error": "CEP deve conter 8 dígitos"}), 400

        # Lógica de Regiões
        regiao_origem = int(cep_origem[0]) if cep_origem else 0
        regiao_destino = int(cep_destino[0])
        
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

        # Aplica o teto máximo de R$ 40,00
        if valor_total > MAX_FRETE:
            valor_total = MAX_FRETE

        return jsonify({
            "valor": round(valor_total, 2),
            "prazo_dias": int(prazo_estimado),
            "servico": "SIGA Flat Rate (Vercel Node)",
            "detalhes": {
                "taxa_fixa": valor_total,
                "distancia_referencia_km": distancia_km
            }
        })

    except Exception as e:
        return jsonify({"error": "Internal Error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8000)
