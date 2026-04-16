import urllib.request
import json

def test_frete():
    url = "http://localhost:8000/calculate"
    data = {
        "cep_origem": "01001-000",
        "cep_destino": "20040-002",
        "peso": 2.5
    }
    
    body = json.dumps(data).encode('utf-8')
    req = urllib.request.Request(url, data=body, headers={'Content-Type': 'application/json'})
    
    print(f"Enviando requisição de teste para {url}...")
    try:
        with urllib.request.urlopen(req) as response:
            res_body = response.read().decode('utf-8')
            print("\n[OK] Resposta do Servidor:")
            print(json.dumps(json.loads(res_body), indent=4))
    except urllib.error.URLError as e:
        print(f"\n[ERRO] Erro ao conectar: {e}")
        print("Certifique-se de que o 'frete_service.py' está rodando no terminal.")
    except Exception as e:
        print(f"\n[ERRO] Erro inesperado: {e}")

if __name__ == "__main__":
    test_frete()
