/**
 * Interface para a resposta do cálculo de frete
 */
export interface FreightResponse {
  valor: number;
  prazo_dias: number;
  detalhes: {
    origem: string;
    destino: string;
    peso_informado: number;
    distancia_estimada_km: number;
  };
}

/**
 * Interface para erro da API
 */
export interface FreightError {
  error: string;
  message?: string;
}

const API_URL = "http://localhost:8000/calculate";
const DEFAULT_ORIGIN = "01001000";

export interface Address {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  error?: boolean;
}

/**
 * Busca o endereço completo a partir do CEP usando a API ViaCEP.
 */
export async function getAddressByCep(cep: string): Promise<Address> {
  const cleanCep = cep.replace(/\D/g, "");
  if (cleanCep.length !== 8) throw new Error("CEP inválido");

  const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
  const data = await response.json();

  if (data.erro) {
    throw new Error("CEP não encontrado");
  }

  return {
    logradouro: data.logradouro,
    bairro: data.bairro,
    localidade: data.localidade,
    uf: data.uf
  };
}

/**
 * Realiza o cálculo de frete chamando o backend.
 */
export async function calculateFreight(
  cepDestino: string,
  peso: number = 1, // Peso padrão, agora ignorado pelo backend
  cepOrigem: string = DEFAULT_ORIGIN
): Promise<FreightResponse> {
  // Limpar CEP (remover hifen, espaços, etc)
  const cleanDestino = cepDestino.replace(/\D/g, "");
  const cleanOrigem = cepOrigem.replace(/\D/g, "");

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cep_origem: cleanOrigem,
      cep_destino: cleanDestino,
      peso: peso,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erro ao calcular frete");
  }

  return data as FreightResponse;
}
