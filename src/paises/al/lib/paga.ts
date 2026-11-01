import { aplicarEscalaMarginal, enMapa, ErrorEntrada } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export const REQUIERE_PAGA = {
  "al.paga-minimale": "numero",
  "al.kontribute": "mapa",
  "al.zbritje-personale": "mapa",
  "al.tatim-punesim": "escala",
} as const;

export interface ValoresPaga {
  "al.paga-minimale": number;
  "al.kontribute": Readonly<Record<string, number>>;
  "al.zbritje-personale": Readonly<Record<string, number>>;
  "al.tatim-punesim": readonly FilaEscala[];
}

export interface Paga {
  bruto: number;
  bazaShoqerore: number;
  bazaShendetesore: number;
  shoqerore: number;
  shendetesore: number;
  zbritja: number;
  bazaTatimore: number;
  tatimi: number;
  neto: number;
  shoqerorePunedhenes: number;
  shendetesorePunedhenes: number;
  kosto: number;
}

// El tope de la cotización social no está verificado (INFORME, riesgo 1): lo escribe la persona y, sin él,
// la cotización se calcula sobre todo el sueldo.
export const AVISO_TAVANI = "Kontributi shoqëror ka një tavan për paga të larta, pagën maksimale që njofton Administrata Tatimore. Këtu nuk është zbatuar. Nëse paga juaj e kalon, vendoseni në fushën e pagës maksimale.";

export function bazaKontributi(bruto: number, min: number, tavani: number | null): number {
  if (tavani !== null && tavani < min) throw new ErrorEntrada("Paga maksimale nuk mund të jetë nën pagën minimale.", "tavani");
  const baza = Math.max(bruto, min);
  return tavani === null ? baza : Math.min(baza, tavani);
}

export function zbritjaPersonale(bruto: number, m: Readonly<Record<string, number>>): number {
  if (bruto <= enMapa(m, "kufi-1")) return enMapa(m, "zbritje-1");
  if (bruto <= enMapa(m, "kufi-2")) return enMapa(m, "zbritje-2");
  return enMapa(m, "zbritje-3");
}

// La escala del artículo 24 es anual y el agente de la listëpagesa descuenta 1/12 de la zbritja: el
// tramo mensual sale de pasar la base a año y volver. Las cotizaciones no restan de la base del
// impuesto, porque los artículos 21 y 22 no las nombran entre las zbritje.
export function llogaritPagen(bruto: number, v: ValoresPaga, redondear: (n: number) => number, tavani: number | null = null): Paga {
  const min = v["al.paga-minimale"];
  const bazaShoqerore = bazaKontributi(bruto, min, tavani);
  const bazaShendetesore = Math.max(bruto, min);
  const k = v["al.kontribute"];
  const shoqerore = redondear((bazaShoqerore * enMapa(k, "shoqerore-punonjes")) / 100);
  const shendetesore = redondear((bazaShendetesore * enMapa(k, "shendetesore-punonjes")) / 100);
  const zbritja = zbritjaPersonale(bruto, v["al.zbritje-personale"]);
  const bazaTatimore = Math.max(0, bruto - zbritja);
  const tatimi = redondear(aplicarEscalaMarginal(v["al.tatim-punesim"], bazaTatimore * 12) / 12);
  const shoqerorePunedhenes = redondear((bazaShoqerore * enMapa(k, "shoqerore-punedhenes")) / 100);
  const shendetesorePunedhenes = redondear((bazaShendetesore * enMapa(k, "shendetesore-punedhenes")) / 100);
  return {
    bruto,
    bazaShoqerore,
    bazaShendetesore,
    shoqerore,
    shendetesore,
    zbritja,
    bazaTatimore,
    tatimi,
    neto: redondear(bruto - shoqerore - shendetesore - tatimi),
    shoqerorePunedhenes,
    shendetesorePunedhenes,
    kosto: redondear(bruto + shoqerorePunedhenes + shendetesorePunedhenes),
  };
}

// El neto no es monótono: al pasar 50 000 y 60 000 lekë la zbritja baja de golpe sobre todo el sueldo,
// y hay brutos más altos con menos neto. Dentro de cada tramo sí sube, así que se busca tramo por tramo
// y se devuelve el bruto más bajo que alcanza el neto pedido.
export function brutoNgaNeto(neto: number, v: ValoresPaga, redondear: (n: number) => number, tavani: number | null = null): Paga | null {
  const m = v["al.zbritje-personale"];
  const kufij = [enMapa(m, "kufi-1"), enMapa(m, "kufi-2")];
  const tramos: readonly [number, number][] = [
    [v["al.paga-minimale"], kufij[0]],
    [kufij[0] + 1, kufij[1]],
    [kufij[1] + 1, 100000000],
  ];
  for (const [desde, hasta] of tramos) {
    if (desde > hasta) continue;
    if (llogaritPagen(hasta, v, redondear, tavani).neto < neto) continue;
    if (llogaritPagen(desde, v, redondear, tavani).neto >= neto) return llogaritPagen(desde, v, redondear, tavani);
    let a = desde;
    let b = hasta;
    while (b - a > 1) {
      const c = Math.floor((a + b) / 2);
      if (llogaritPagen(c, v, redondear, tavani).neto >= neto) b = c;
      else a = c;
    }
    return llogaritPagen(b, v, redondear, tavani);
  }
  return null;
}
