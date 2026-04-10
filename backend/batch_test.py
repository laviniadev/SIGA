import urllib.request
import json

def batch_test():
    url = "http://localhost:8000/calculate"
    ceps = [
        {"nome": "SP Capital (Mesma Região)", "cep": "01001000"},
        {"nome": "Rio de Janeiro (Região Próxima)", "cep": "20040002"},
        {"nome": "São Luís - MA (Região Distante)", "cep": "65020100"}
    ]
    
    for c in ceps:
        data = {"cep_origem": "01001000", "cep_destino": c['cep'], "peso": 1.0}
        body = json.dumps(data).encode('utf-8')
        req = urllib.request.Request(url, data=body, headers={'Content-Type': 'application/json'})
        
        try:
            with urllib.request.urlopen(req) as response:
                res = json.loads(response.read().decode('utf-8'))
                print(f"--- {c['nome']} ---")
                print(f"CEP: {c['cep']} | Valor: R$ {res['valor']} | Prazo: {res['prazo_dias']} dias")
        except Exception as e:
            print(f"Erro em {c['nome']}: {e}")

if __name__ == "__main__":
    batch_test()
