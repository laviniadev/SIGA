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

                if len(cep_origem_clean) < 2 or len(cep_destino_clean) < 2:
                    self._set_headers(400)
                    self.wfile.write(json.dumps({"error": "CEP fornecido é inválido ou muito curto"}).encode())
                    return

                # Lógica de cálculo (Simulação)
                # Pega os 2 primeiros dígitos para simular "regiões"
                regiao_origem = int(cep_origem_clean[:2])
                regiao_destino = int(cep_destino_clean[:2])
                distancia_simulada = abs(regiao_origem - regiao_destino) * 10
                
                # Se for a mesma região, distância mínima de 10km
                if distancia_simulada == 0:
                    distancia_simulada = 10

                valor_total = BASE_FIXA + (distancia_simulada * 0.5) + (peso * PESO_PRECO_KG)
                prazo_estimado = 2 + (distancia_simulada // 50)

                response = {
                    "valor": round(valor_total, 2),
                    "prazo_dias": int(max(1, prazo_estimado)),
                    "detalhes": {
                        "origem": str(cep_origem),
                        "destino": str(cep_destino),
                        "peso_informado": peso,
                        "distancia_estimada_km": distancia_simulada
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
