import { aplicarEscalaMarginal } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

type Mapa = Readonly<Record<string, number>>;

export const REQ_BOX1 = {
  "nl.box1-schijven": "escala",
  "nl.ahk": "mapa",
  "nl.ahk-afbouw": "numero",
  "nl.arbeidskorting-grenzen": "mapa",
  "nl.arbeidskorting-tarieven": "mapa",
} as const;

export interface WaardenBox1 {
  readonly "nl.box1-schijven": readonly FilaEscala[];
  readonly "nl.ahk": Mapa;
  readonly "nl.ahk-afbouw": number;
  readonly "nl.arbeidskorting-grenzen": Mapa;
  readonly "nl.arbeidskorting-tarieven": Mapa;
}

const EUR = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" });
export function euro(n: number): string {
  return EUR.format(n);
}

const PROCENT = new Intl.NumberFormat("nl-NL", { maximumFractionDigits: 3 });
export function procent(n: number): string {
  return `${PROCENT.format(n)}%`;
}

export function box1Belasting(inkomen: number, schijven: readonly FilaEscala[]): number {
  return inkomen > 0 ? aplicarEscalaMarginal(schijven, inkomen) : 0;
}

export function toptarief(schijven: readonly FilaEscala[]): FilaEscala {
  return schijven[schijven.length - 1];
}

export function marginaalTarief(inkomen: number, schijven: readonly FilaEscala[]): number {
  let tarief = schijven[0].tasa;
  for (const s of schijven) if (inkomen > s.desde) tarief = s.tasa;
  return tarief;
}

export function algemeneHeffingskorting(verzamelinkomen: number, ahk: Mapa, afbouw: number): number {
  const minder = Math.max(0, verzamelinkomen - ahk.afbouwgrens) * (afbouw / 100);
  return Math.max(0, ahk.max - minder);
}

// Artikel 8.11 Wet IB 2001: drie opbouwstappen, elk met een eigen plafond, en daarna afbouw tot nul.
export function arbeidskorting(arbeidsinkomen: number, g: Mapa, t: Mapa): number {
  if (arbeidsinkomen <= 0) return 0;
  let k = Math.min((arbeidsinkomen * t.opbouw1) / 100, g.max1);
  k = Math.min(k + (Math.max(0, arbeidsinkomen - g.grens1) * t.opbouw2) / 100, g.max2);
  k = Math.min(k + (Math.max(0, arbeidsinkomen - g.grens2) * t.opbouw3) / 100, g.max3);
  return Math.max(0, k - (Math.max(0, arbeidsinkomen - g.grens3) * t.afbouw) / 100);
}

export function combinatiekorting(arbeidsinkomen: number, iack: Mapa, tarief: number): number {
  if (arbeidsinkomen <= iack.drempel) return 0;
  return Math.min(((arbeidsinkomen - iack.drempel) * tarief) / 100, iack.max);
}

// Over het deel van de aftrekposten dat in de hoogste schijf valt, krijg je maar het maximale
// aftrektarief terug: het verschil met het toptarief komt er als tariefsaanpassing weer bij.
export function tariefsaanpassing(inkomenVoorAftrek: number, aftrek: number, schijven: readonly FilaEscala[], maximumTarief: number): number {
  const top = toptarief(schijven);
  const inTop = Math.min(Math.max(0, aftrek), Math.max(0, inkomenVoorAftrek - top.desde));
  return (inTop * (top.tasa - maximumTarief)) / 100;
}

// Artikel 3.112 Wet IB 2001: een percentage van de hele WOZ-waarde, behalve in de hoogste rij,
// waar een vast bedrag plus een percentage over het meerdere geldt (cuotaFija in datos.json).
export function eigenwoningforfait(woz: number, tabel: readonly FilaEscala[]): number {
  if (woz <= 0) return 0;
  let i = 0;
  tabel.forEach((r, j) => {
    if (woz >= r.desde) i = j;
  });
  const rij = tabel[i];
  if (rij.cuotaFija === undefined) return (woz * rij.tasa) / 100;
  const ondergrens = i > 0 ? (tabel[i - 1].hasta ?? 0) : 0;
  return rij.cuotaFija + ((woz - ondergrens) * rij.tasa) / 100;
}

export interface UitkomstBox1 {
  belasting: number;
  ahk: number;
  arbeidskorting: number;
  combinatiekorting: number;
  kortingen: number;
  tariefsaanpassing: number;
  teBetalen: number;
}

// De heffingskortingen kunnen de box 1-belasting niet onder nul brengen; wat overblijft van de
// kortingen wordt niet uitbetaald (behalve bij een minstverdienende partner, die hier buiten valt).
export function berekenBox1(
  v: WaardenBox1,
  opties: { inkomen: number; arbeidsinkomen: number; aftrekVoorBeperking?: number; combinatiekorting?: number },
): UitkomstBox1 {
  const inkomen = Math.max(0, opties.inkomen);
  const belasting = box1Belasting(inkomen, v["nl.box1-schijven"]);
  const ahk = algemeneHeffingskorting(inkomen, v["nl.ahk"], v["nl.ahk-afbouw"]);
  const ak = arbeidskorting(opties.arbeidsinkomen, v["nl.arbeidskorting-grenzen"], v["nl.arbeidskorting-tarieven"]);
  const iack = opties.combinatiekorting ?? 0;
  const aanpassing = opties.aftrekVoorBeperking ?? 0;
  const brutoBelasting = belasting + aanpassing;
  const kortingen = Math.min(ahk + ak + iack, brutoBelasting);
  return {
    belasting,
    ahk,
    arbeidskorting: ak,
    combinatiekorting: iack,
    kortingen,
    tariefsaanpassing: aanpassing,
    teBetalen: brutoBelasting - kortingen,
  };
}
