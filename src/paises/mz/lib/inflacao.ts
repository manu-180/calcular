import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";

const MESES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

export function nomeMes(fecha: string): string {
  return `${MESES[Number(fecha.slice(5, 7)) - 1]} de ${fecha.slice(0, 4)}`;
}

function primeiroDoMes(fecha: string): FechaISO {
  return `${fecha.slice(0, 7)}-01` as FechaISO;
}

function mesSeguinte(fecha: FechaISO, n = 1): FechaISO {
  const total = Number(fecha.slice(0, 4)) * 12 + Number(fecha.slice(5, 7)) - 1 + n;
  return `${Math.floor(total / 12)}-${String((total % 12) + 1).padStart(2, "0")}-01` as FechaISO;
}

export interface Actualizacao {
  mesInicial: FechaISO;
  mesFinal: FechaISO;
  fator: number;
  acumulada: number;
  meses: number;
  observaciones: string[];
}

// A série é a variação mensal do índice de preços. Passar do nível de preços de um mês ao de outro
// é multiplicar (1 + variação) de cada mês seguinte ao inicial até ao final. O motor entrega só o
// último ponto, que marca até onde se pode usar a história lida do series.json.
export function actualizar(
  puntos: readonly PuntoSerieTupla[],
  ultimo: PuntoSerie,
  desde: string,
  hasta: string,
  campos: { desde: string; hasta: string },
): Actualizacao {
  const disponiveis = puntos.filter(([f]) => f <= ultimo.fecha);
  const variacao = new Map<string, number>(disponiveis);
  const primeiro = disponiveis[0]?.[0];
  if (!primeiro) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const base = mesSeguinte(primeiro as FechaISO, -1);
  const observaciones: string[] = [];
  const mesInicial = primeiroDoMes(desde);
  let mesFinal = primeiroDoMes(hasta);
  if (mesInicial < base) throw new ErrorEntrada(`Os dados disponíveis permitem começar em ${nomeMes(base)}.`, campos.desde);
  if (mesFinal > ultimo.fecha) {
    observaciones.push(`A última inflação mensal publicada é a de ${nomeMes(ultimo.fecha)}, por isso o cálculo vai até esse mês.`);
    mesFinal = ultimo.fecha;
  }
  if (mesInicial > mesFinal) throw new ErrorEntrada("O mês inicial tem de ser anterior ao mês final.", campos.desde);
  let fator = 1;
  let meses = 0;
  for (let m = mesSeguinte(mesInicial); m <= mesFinal; m = mesSeguinte(m)) {
    const v = variacao.get(m);
    // O Banco de Moçambique não publica Novembro de 2023; um período que o atravesse não tem conta.
    if (v === undefined) throw new ErrorEntrada(`Falta a inflação de ${nomeMes(m)} nos dados do Banco de Moçambique. Escolha um período que não passe por esse mês.`, campos.desde);
    fator *= 1 + v / 100;
    meses += 1;
  }
  return { mesInicial, mesFinal, fator, acumulada: (fator - 1) * 100, meses, observaciones };
}
