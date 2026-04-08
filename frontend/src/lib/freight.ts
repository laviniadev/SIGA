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

/**
 * Realiza o cálculo de frete chamando o backend.
 * 
 * @param cepDestino CEP de destino do cliente
 * @param peso Peso total da carga em kg
 * @param cepOrigem CEP de origem (opcional, usa o padrão da loja)
 * @returns Promessa com o resultado do frete
 */
export async function calculateFreight(
  cepDestino: string,
  peso: number,
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
