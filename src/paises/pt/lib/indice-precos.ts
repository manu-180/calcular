import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";

const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

export function nomeMes(fecha: string): string {
  return `${MESES[Number(fecha.slice(5, 7)) - 1]} de ${fecha.slice(0, 4)}`;
}

function primeiroDoMes(fecha: string): FechaISO {
  return `${fecha.slice(0, 7)}-01` as FechaISO;
}

function mesesAtras(fecha: FechaISO, meses: number): FechaISO {
  const total = Number(fecha.slice(0, 4)) * 12 + Number(fecha.slice(5, 7)) - 1 - meses;
  return `${Math.floor(total / 12)}-${String((total % 12) + 1).padStart(2, "0")}-01` as FechaISO;
}

export interface VariacaoIndice {
  mesInicial: FechaISO;
  mesFinal: FechaISO;
  indiceInicial: number;
  indiceFinal: number;
  fator: number;
  acumulada: number;
  mensal: number | null;
  homologa: number | null;
  observaciones: string[];
}

// O motor só entrega o último ponto de uma série: esse ponto marca até que mês se pode usar a
// história, que se lê do mesmo series.json importado pela calculadora. Assim um caso com data fixa
// não vê meses publicados depois dessa data.
export function variacaoEntreMeses(
  puntos: readonly PuntoSerieTupla[],
  ultimo: PuntoSerie,
  desde: FechaISO,
  hasta: FechaISO,
  campos: { desde: string; hasta: string },
): VariacaoIndice {
  const disponiveis = puntos.filter(([f]) => f <= ultimo.fecha);
  const indice = new Map<string, number>(disponiveis);
  const primeiro = disponiveis[0]?.[0];
  if (!primeiro) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const observaciones: string[] = [];
  const mesInicial = primeiroDoMes(desde);
  let mesFinal = primeiroDoMes(hasta);
  if (mesInicial < primeiro) throw new ErrorEntrada(`O índice disponível começa em ${nomeMes(primeiro)}.`, campos.desde);
  if (mesInicial > ultimo.fecha) {
    throw new ErrorEntrada(`O índice de ${nomeMes(mesInicial)} ainda não foi publicado. O último é o de ${nomeMes(ultimo.fecha)}.`, campos.desde);
  }
  if (mesFinal > ultimo.fecha) {
    observaciones.push(`O último índice publicado é o de ${nomeMes(ultimo.fecha)}, por isso o cálculo vai até esse mês.`);
    mesFinal = ultimo.fecha;
  }
  if (mesInicial > mesFinal) throw new ErrorEntrada("A data inicial tem de ser anterior à data final.", campos.desde);
  const indiceInicial = indice.get(mesInicial);
  const indiceFinal = indice.get(mesFinal);
  if (indiceInicial === undefined || indiceFinal === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const anterior = indice.get(mesesAtras(mesFinal, 1));
  const haUmAno = indice.get(mesesAtras(mesFinal, 12));
  const fator = indiceFinal / indiceInicial;
  return {
    mesInicial,
    mesFinal,
    indiceInicial,
    indiceFinal,
    fator,
    acumulada: (fator - 1) * 100,
    mensal: anterior === undefined ? null : (indiceFinal / anterior - 1) * 100,
    homologa: haUmAno === undefined ? null : (indiceFinal / haUmAno - 1) * 100,
    observaciones,
  };
}
