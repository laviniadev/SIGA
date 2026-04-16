import urllib.request
import json

def test_frete_max():
    url = "http://localhost:8000/calculate"
    # CEPs distantes para cair na regra de Nacional 2/3 (valor_total = 49.90)
    data = {
        "cep_origem": "01001-000", # SP
        "cep_destino": "90000-000", # RS (Região 9)
        "peso": 1.0
    }
    
    body = json.dumps(data).encode('utf-8')
    req = urllib.request.Request(url, data=body, headers={'Content-Type': 'application/json'})
    
    print(f"Enviando requisição de teste para {url} (Destino distante: 90000-000)...")
    try:
        with urllib.request.urlopen(req) as response:
            res_body = response.read().decode('utf-8')
            res_data = json.loads(res_body)
            print("\n[RESPOSTA] Valor do Frete:", res_data.get('valor'))
            
            if res_data.get('valor') == 40.0:
                print("\n[SUCESSO] O frete foi limitado a 40.00!")
            else:
                print(f"\n[FALHA] O frete retornou {res_data.get('valor')}, esperado 40.00.")
                
    except Exception as e:
        print(f"\n[ERRO]: {e}")

if __name__ == "__main__":
    test_frete_max()
