import { esFechaISO } from "@/motor/vigencia";
import type { Detector, PuntoSerie } from "@/motor/tipos";

const BNA = "https://www.bna.ao/service/rest/taxas/get/evolucao/taxa";

// O serviço do BNA devolve { genericResponse: [{ taxa, data, codigoMoeda, tipoCambio }] }, um ponto
// por dia útil. Se a lista não vier ou um ponto não tiver data e taxa numérica, o formato mudou.
function pontosBna(json: unknown, moeda: string): PuntoSerie[] | null {
  if (typeof json !== "object" || json === null) return null;
  const lista = (json as { genericResponse?: unknown }).genericResponse;
  if (!Array.isArray(lista) || lista.length === 0) return null;
  const puntos: PuntoSerie[] = [];
  for (const p of lista) {
    const { taxa, data, codigoMoeda } = (p ?? {}) as { taxa?: unknown; data?: unknown; codigoMoeda?: unknown };
    if (typeof taxa !== "number" || typeof data !== "string" || !esFechaISO(data)) return null;
    if (typeof codigoMoeda === "string" && codigoMoeda.toUpperCase() !== moeda.toUpperCase()) return null;
    puntos.push({ fecha: data, valor: taxa });
  }
  return puntos;
}

function detectorBna(moeda: "usd" | "eur", min: number, max: number): Detector {
  return {
    id: `ao.${moeda}-bna`,
    carril: "serie",
    serie: `ao.${moeda}`,
    metodo: "api-json",
    url: `${BNA}?moeda=${moeda}&numeromeses=1&tipocambio=b`,
    // O kwanza já teve desvalorizações bruscas de um dia para o outro; a banda deixa passar
    // um salto diário de até 10 % e o resto fica para revisão manual.
    banda: { min, max, saltoRelativoMax: 0.1 },
    async traer(http) {
      return pontosBna(await http.json(this.url), moeda);
    },
  };
}

export const detectores: readonly Detector[] = [detectorBna("usd", 500, 2500), detectorBna("eur", 500, 3000)];
