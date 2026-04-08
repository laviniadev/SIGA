import urllib.request
import json
import socket

def send_request(data=None, is_json=True):
    url = "http://localhost:8000/calculate"
    try:
        body = json.dumps(data).encode('utf-8') if is_json else data
        req = urllib.request.Request(url, data=body, method='POST')
        if is_json:
            req.add_header('Content-Type', 'application/json')
        
        with urllib.request.urlopen(req) as response:
            return response.getcode(), json.loads(response.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        try:
            return e.code, json.loads(e.read().decode('utf-8'))
        except:
            return e.code, e.read().decode('utf-8')
    except Exception as e:
        return 0, str(e)

def run_tests():
    print("🚀 Iniciando Suíte de Testes de Robustez...\n")
    
    tests = [
        {
            "name": "Caminho Feliz (Válido)",
            "payload": {"cep_origem": "01001-000", "cep_destino": "20040-002", "peso": 2.5},
            "expected_status": 200
        },
        {
            "name": "Campo Ausente (sem cep_origem)",
            "payload": {"cep_destino": "20040-002", "peso": 2.5},
            "expected_status": 400
        },
        {
            "name": "Peso como String Inválida",
            "payload": {"cep_origem": "01001000", "cep_destino": "20040002", "peso": "muito pesado"},
            "expected_status": 400
        },
        {
            "name": "Peso Negativo",
            "payload": {"cep_origem": "01001000", "cep_destino": "20040002", "peso": -10},
            "expected_status": 400
        },
        {
            "name": "CEPs como Inteiros",
            "payload": {"cep_origem": 1001000, "cep_destino": 20040002, "peso": 1.0},
            "expected_status": 200
        },
        {
            "name": "CEPs com Letras (deve extrair apenas números)",
            "payload": {"cep_origem": "CEP 01001-000", "cep_destino": "RJ-20040-002", "peso": 5},
            "expected_status": 200
        },
        {
            "name": "CEPs muito curtos",
            "payload": {"cep_origem": "0", "cep_destino": "1", "peso": 1},
            "expected_status": 400
        },
        {
            "name": "Payload não é JSON",
            "payload": b"isto nao e um json",
            "is_json": False,
            "expected_status": 400
        }
    ]

    passed = 0
    for i, test in enumerate(tests):
        print(f"Teste {i+1}: {test['name']}")
        status, response = send_request(test['payload'], test.get('is_json', True))
        
        status_ok = (status == test['expected_status'])
        
        if status_ok:
            print(f"  ✅ Passou (Status: {status})")
            passed += 1
        else:
            print(f"  ❌ Falhou! Esperado: {test['expected_status']}, Obtido: {status}")
            print(f"  Resposta: {response}")
    
    print(f"\n📊 Resultado Final: {passed}/{len(tests)} testes passaram.")

if __name__ == "__main__":
    # Tenta verificar se o servidor está online primeiro
    try:
        urllib.request.urlopen("http://localhost:8000/", timeout=1)
        run_tests()
    except Exception:
        print("❌ Erro: O servidor (frete_service.py) não parece estar rodando.")
        print("Inicie-o com 'python backend/frete_service.py' antes de rodar os testes.")
