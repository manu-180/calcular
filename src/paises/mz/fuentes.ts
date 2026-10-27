import { esFechaISO } from "@/motor/vigencia";
import type { Detector, PuntoSerie } from "@/motor/tipos";

const BM = "https://www.bancomoc.mz/bmapi";

// O serviço do Banco de Moçambique devolve só o dia corrente:
// { lastUpdate: "AAAAMMDD HH:MM:SS", rates: [{ currency, buy, sell }] }. A data do ponto é a da
// última fixação (lastUpdate); o campo date já aponta para o dia útil seguinte.
function pontoCambio(json: unknown, moeda: string, lado: "buy" | "sell"): PuntoSerie[] | null {
  if (typeof json !== "object" || json === null) return null;
  const { lastUpdate, rates } = json as { lastUpdate?: unknown; rates?: unknown };
  if (typeof lastUpdate !== "string" || !/^\d{8}\b/.test(lastUpdate) || !Array.isArray(rates)) return null;
  const linha = rates.find((r) => (r as { currency?: unknown } | null)?.currency === moeda) as Record<string, unknown> | undefined;
  const valor = linha?.[lado];
  const fecha = `${lastUpdate.slice(0, 4)}-${lastUpdate.slice(4, 6)}-${lastUpdate.slice(6, 8)}`;
  if (typeof valor !== "number" || !(valor > 0) || !esFechaISO(fecha)) return null;
  return [{ fecha, valor }];
}

function detectorCambio(moeda: "USD" | "EUR" | "ZAR", lado: "compra" | "venda", min: number, max: number): Detector {
  return {
    id: `mz.${moeda.toLowerCase()}-${lado}-bm`,
    carril: "serie",
    serie: `mz.${moeda.toLowerCase()}-${lado}`,
    metodo: "api-json",
    url: `${BM}/exchangerates`,
    banda: { min, max, saltoRelativoMax: 0.05 },
    async traer(http) {
      return pontoCambio(await http.json(this.url), moeda, lado === "compra" ? "buy" : "sell");
    },
  };
}

// { rates: [{ year: "2026", month: "8", rate: "-0.28" }] }, do mês mais recente para o mais antigo.
// O serviço já trouxe o mesmo mês repetido (Julho de 2025, duas linhas iguais): a cópia idêntica
// descarta-se; dois valores diferentes para o mesmo mês são formato inesperado.
function pontosInflacao(json: unknown): PuntoSerie[] | null {
  const rates = (json as { rates?: unknown } | null)?.rates;
  if (!Array.isArray(rates) || rates.length === 0) return null;
  const porMes = new Map<string, PuntoSerie>();
  for (const r of rates) {
    const { year, month, rate } = (r ?? {}) as { year?: unknown; month?: unknown; rate?: unknown };
    const ano = Number(year);
    const mes = Number(month);
    const valor = Number(rate);
    if (!Number.isInteger(ano) || !Number.isInteger(mes) || mes < 1 || mes > 12 || typeof rate !== "string" || !Number.isFinite(valor)) return null;
    const fecha = `${ano}-${String(mes).padStart(2, "0")}-01`;
    if (!esFechaISO(fecha)) return null;
    const repetido = porMes.get(fecha);
    if (repetido && repetido.valor !== valor) return null;
    porMes.set(fecha, { fecha, valor });
  }
  return [...porMes.values()].sort((a, b) => a.fecha.localeCompare(b.fecha));
}

export const detectores: readonly Detector[] = [
  detectorCambio("USD", "compra", 50, 100),
  detectorCambio("USD", "venda", 50, 100),
  detectorCambio("EUR", "compra", 50, 120),
  detectorCambio("EUR", "venda", 50, 120),
  detectorCambio("ZAR", "compra", 2.5, 6),
  detectorCambio("ZAR", "venda", 2.5, 6),
  {
    id: "mz.inflacao-mensal-bm",
    carril: "serie",
    serie: "mz.inflacao-mensal",
    metodo: "api-json",
    url: `${BM}/inflation-rates/monthly`,
    // A série é uma variação em %, que passa de -0,28 a 2,32 de um mês para o outro: o salto
    // relativo não serve de travão. O que segura valores absurdos é a faixa de -5 % a 10 % ao mês.
    banda: { min: -5, max: 10, saltoRelativoMax: 50 },
    async traer(http) {
      return pontosInflacao(await http.json(this.url));
    },
  },
];
