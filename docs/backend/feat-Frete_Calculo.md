# Feature: Calculo de Frete

Este documento consolida a documentacao tecnica, o plano de implementacao e o guia de verificacao do servico de calculo de frete.

## 1. Descricao da Funcionalidade

O servico e uma API baseada em HTTP que calcula o valor e o prazo de entrega de mercadorias. O calculo utiliza os Codigos de Enderecamento Postal (CEP) de origem e destino, alem do peso da carga. A logica interna processa os prefixos dos CEPs para estimar distancias e aplicar taxas fixas e variaveis por quilograma.

### Caracteristicas Principais
* Processamento de CEPs em formato texto ou numerico.
* Limpeza automatica de caracteres nao numericos nos campos de CEP.
* Calculo de prazo de entrega proporcional a distancia estimada.
* Validacao de carga para impedir valores negativos ou tipos de dados invalidos.

## 2. Plano de Implementacao e Validacao

O objetivo do desenvolvimento foi garantir que o servico de frete suporte diversos tipos de entrada, prevenindo falhas no sistema.

### Requisitos de Validacao
* Verificacao de peso positivo.
* Retorno de erro 400 para CEPs invalidos.
* Tratamento de tipos de dados inesperados, como listas ou objetos.

### Alteracoes Realizadas
* **frete_service.py**: Adicao de codigo para garantir que o peso informado nao seja negativo e melhoria na captura de erros durante a conversao de tipos de dados.
* **full_test_suite.py**: Desenvolvimento de uma suite de testes para cobrir dados validos, pesos negativos, strings em campos numericos, formato JSON incorreto e CEPs contendo letras ou simbolos.

## 3. Guia de Verificacao e Robustez

O servico foi atualizado para processar com seguranca as entradas do usuario, prevenindo paralisacoes do servidor por meio de:
* **Validacao de Tipos**: Verificacao se os dados enviados no formato JSON correspondem aos tipos esperados.
* **Tratamento de Dados**: Protecao contra formatos JSON incorretos e verificacao da presenca de campos obrigatorios.

### Suite de Testes
O arquivo full_test_suite.py valida oito cenarios de uso:
1. Processamento de dados validos.
2. Tentativa de envio com campo de origem ausente.
3. Envio de texto no campo de peso.
4. Envio de peso com valor negativo.
5. Insercao de CEP em formato numerico inteiro.
6. Extracao de digitos em CEPs contendo formatacao ou textos extras.
7. Validacao de CEPs com comprimento insuficiente.
8. Envio de corpo de requisicao fora do padrão JSON.

## 4. Modo de Usar

### Execucao do Servidor
Para iniciar o servico localmente, execute no terminal:
python backend/frete_service.py

O servidor estara disponivel em http://localhost:8000.

### Requisicao de Calculo
Envie uma requisicao POST para o endpoint /calculate com o seguinte formato JSON:
{
  "cep_origem": "01001000",
  "cep_destino": "20040002",
  "peso": 2.5
}

### Execucao de Testes
Para validar a suite de testes, execute:
python backend/full_test_suite.py
