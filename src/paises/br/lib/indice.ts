import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";
import { nomeMes } from "./datas";

function primeiroDoMes(f: string): FechaISO {
  return `${f.slice(0, 7)}-01` as FechaISO;
}

function mesesAntes(f: FechaISO, meses: number): FechaISO {
  const total = Number(f.slice(0, 4)) * 12 + Number(f.slice(5, 7)) - 1 - meses;
  return `${Math.floor(total / 12)}-${String((total % 12) + 1).padStart(2, "0")}-01` as FechaISO;
}

export interface Variacao {
  mesInicial: FechaISO;
  mesFinal: FechaISO;
  indiceInicial: number;
  indiceFinal: number;
  fator: number;
  acumulada: number;
  mensal: number | null;
  dozeMeses: number | null;
  observaciones: string[];
}

// O motor entrega só o último ponto da série (requisito "serie"): ele marca até que mês a história
// importada do series.json pode ser usada, para que um caso com data fixa não veja meses publicados
// depois dessa data.
export function variacaoEntreMeses(pontos: readonly PuntoSerieTupla[], ultimo: PuntoSerie, de: FechaISO, ate: FechaISO): Variacao {
  const disponiveis = pontos.filter(([f]) => f <= ultimo.fecha);
  const indice = new Map<string, number>(disponiveis);
  const primeiro = disponiveis[0]?.[0];
  if (!primeiro) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const observaciones: string[] = [];
  const mesInicial = primeiroDoMes(de);
  let mesFinal = primeiroDoMes(ate);
  // Como na Calculadora do Cidadão do Banco Central, a inflação do mês inicial entra na conta: a
  // base é o número-índice do mês anterior.
  const base = mesesAntes(mesInicial, 1);
  if (base < primeiro) throw new ErrorEntrada(`A correção pode começar em ${nomeMes(mesesAntes(primeiro as FechaISO, -1))}.`, "de");
  if (mesInicial > ultimo.fecha) throw new ErrorEntrada(`O IPCA de ${nomeMes(mesInicial)} ainda não foi divulgado. O último é o de ${nomeMes(ultimo.fecha)}.`, "de");
  if (mesFinal > ultimo.fecha) {
    observaciones.push(`O último IPCA divulgado é o de ${nomeMes(ultimo.fecha)}, então a correção vai até esse mês.`);
    mesFinal = ultimo.fecha;
  }
  if (mesInicial > mesFinal) throw new ErrorEntrada("A data inicial tem que ser anterior à final.", "de");
  const indiceInicial = indice.get(base);
  const indiceFinal = indice.get(mesFinal);
  if (indiceInicial === undefined || indiceFinal === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const anterior = indice.get(mesesAntes(mesFinal, 1));
  const anoAntes = indice.get(mesesAntes(mesFinal, 12));
  const fator = indiceFinal / indiceInicial;
  return {
    mesInicial,
    mesFinal,
    indiceInicial,
    indiceFinal,
    fator,
    acumulada: (fator - 1) * 100,
    mensal: anterior === undefined ? null : (indiceFinal / anterior - 1) * 100,
    dozeMeses: anoAntes === undefined ? null : (indiceFinal / anoAntes - 1) * 100,
    observaciones,
  };
}
