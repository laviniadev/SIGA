import http.server
import json
import socketserver
import urllib.request
from urllib.error import URLError

# Configurações do Serviço
PORT = 8000
BASE_FIXA = 15.00  # Valor base de frete
PESO_PRECO_KG = 2.50  # Preço por kg

class FreightHandler(http.server.BaseHTTPRequestHandler):
    """
    Serviço de Cálculo de Frete usando apenas a biblioteca padrão do Python.
    """

    def _set_headers(self, status=200):
        self.send_response(status)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers()

    def do_GET(self):
        """Endpoint para testar se o serviço está online"""
        if self.path == '/':
            self._set_headers()
            self.wfile.write(json.dumps({"status": "online", "message": "Serviço de Frete SIGA"}).encode())
        else:
            self._set_headers(404)

    def do_POST(self):
        """Endpoint para calcular o frete"""
        if self.path == '/calculate':
            try:
                content_length = int(self.headers.get('Content-Length', 0))
                if content_length == 0:
                    self._set_headers(400)
                    self.wfile.write(json.dumps({"error": "Corpo da requisição vazio"}).encode())
                    return

                post_data = self.rfile.read(content_length)
                try:
                    data = json.loads(post_data.decode('utf-8'))
                except json.JSONDecodeError:
                    self._set_headers(400)
                    self.wfile.write(json.dumps({"error": "JSON malformado"}).encode())
                    return

                # 1. Verificação de Campos Obrigatórios
                campos = ['cep_origem', 'cep_destino', 'peso']
                for campo in campos:
                    if campo not in data:
                        self._set_headers(400)
                        self.wfile.write(json.dumps({"error": f"Campo obrigatório ausente: {campo}"}).encode())
                        return

                # 2. Validação de Tipos e Valores
                cep_origem = data.get('cep_origem')
                cep_destino = data.get('cep_destino')
                peso_raw = data.get('peso')

                if not isinstance(cep_origem, (str, int)) or not isinstance(cep_destino, (str, int)):
                    self._set_headers(400)
                    self.wfile.write(json.dumps({"error": "CEPs devem ser texto ou números"}).encode())
                    return

                try:
                    peso = float(peso_raw)
                except (ValueError, TypeError):
                    self._set_headers(400)
                    self.wfile.write(json.dumps({"error": "Peso deve ser um número válido"}).encode())
                    return

                if peso < 0:
                    self._set_headers(400)
                    self.wfile.write(json.dumps({"error": "Peso não pode ser negativo"}).encode())
                    return

                # 3. Limpeza e Validação de CEP
                cep_origem_clean = ''.join(filter(str.isdigit, str(cep_origem)))
                cep_destino_clean = ''.join(filter(str.isdigit, str(cep_destino)))

                if len(cep_origem_clean) != 8 or len(cep_destino_clean) != 8:
                    self._set_headers(400)
                    self.wfile.write(json.dumps({"error": "CEP deve conter 8 dígitos"}).encode())
                    return

                # Cálculo Estilo Correios (Fixo por Região, desconsiderando peso)
                # O primeiro dígito do CEP define a região fiscal do Brasil
                regiao_origem = int(cep_origem_clean[0])
                regiao_destino = int(cep_destino_clean[0])
                
                # Definição de Zona e Preço Fixo
                if regiao_origem == regiao_destino:
                    # Mesma Região (Local/Estadual)
                    distancia_km = 50 
                    valor_total = 19.90
                    prazo_estimado = 3
                elif abs(regiao_origem - regiao_destino) <= 2:
                    # Regiões Limítrofes (Nacional 1)
                    distancia_km = 450
                    valor_total = 34.50
                    prazo_estimado = 6
                else:
                    # Regiões Distantes (Nacional 2/3)
                    distancia_km = 1200
                    valor_total = 49.90
                    prazo_estimado = 10

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

                self._set_headers(200)
                self.wfile.write(json.dumps(response).encode())

            except Exception as e:
                self._set_headers(500)
                self.wfile.write(json.dumps({"error": "Erro interno inesperado", "message": str(e)}).encode())
        else:
            self._set_headers(404)

def run(server_class=http.server.HTTPServer, handler_class=FreightHandler, port=PORT):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"Serviço de Frete rodando em http://localhost:{port}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
    print("Servidor parado.")

if __name__ == '__main__':
    run()
