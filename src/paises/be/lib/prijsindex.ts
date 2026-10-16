import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";
import { maandTekst } from "./datum";

function eersteVanDeMaand(datum: string): FechaISO {
  return `${datum.slice(0, 7)}-01` as FechaISO;
}

function maandenTerug(datum: FechaISO, maanden: number): FechaISO {
  const totaal = Number(datum.slice(0, 4)) * 12 + Number(datum.slice(5, 7)) - 1 - maanden;
  return `${Math.floor(totaal / 12)}-${String((totaal % 12) + 1).padStart(2, "0")}-01` as FechaISO;
}

export interface Prijsverandering {
  beginmaand: FechaISO;
  eindmaand: FechaISO;
  indexBegin: number;
  indexEind: number;
  factor: number;
  totaal: number;
  jaar: number | null;
  observaciones: string[];
}

// Het motor geeft alleen het laatste punt van de reeks (requisito "serie"). Dat punt bepaalt tot welke
// maand de geschiedenis uit series.json mag worden gebruikt, zodat een testgeval met een vaste datum
// geen maanden ziet die later gepubliceerd zijn.
export function prijsverandering(punten: readonly PuntoSerieTupla[], laatste: PuntoSerie, van: FechaISO, tot: FechaISO): Prijsverandering {
  const beschikbaar = punten.filter(([f]) => f <= laatste.fecha);
  const index = new Map<string, number>(beschikbaar);
  const eerste = beschikbaar[0]?.[0];
  if (!eerste) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const observaciones: string[] = [];
  const beginmaand = eersteVanDeMaand(van);
  let eindmaand = eersteVanDeMaand(tot);
  if (beginmaand < eerste) throw new ErrorEntrada(`De reeks begint in ${maandTekst(eerste)}.`, "van");
  if (beginmaand > laatste.fecha) throw new ErrorEntrada(`Statbel heeft ${maandTekst(beginmaand)} nog niet gepubliceerd. De laatste maand is ${maandTekst(laatste.fecha)}.`, "van");
  if (eindmaand > laatste.fecha) {
    observaciones.push(`Het laatste cijfer van Statbel is van ${maandTekst(laatste.fecha)}, dus de berekening loopt tot die maand.`);
    eindmaand = laatste.fecha;
  }
  if (beginmaand > eindmaand) throw new ErrorEntrada("De begindatum moet vóór de einddatum liggen.", "van");
  const indexBegin = index.get(beginmaand);
  const indexEind = index.get(eindmaand);
  if (indexBegin === undefined || indexEind === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const jaarTerug = index.get(maandenTerug(eindmaand, 12));
  const factor = indexEind / indexBegin;
  return {
    beginmaand,
    eindmaand,
    indexBegin,
    indexEind,
    factor,
    totaal: (factor - 1) * 100,
    jaar: jaarTerug === undefined ? null : (indexEind / jaarTerug - 1) * 100,
    observaciones,
  };
}

export function indexVan(punten: readonly PuntoSerieTupla[], laatste: PuntoSerie, maand: string): number | null {
  const sleutel = eersteVanDeMaand(maand);
  if (sleutel > laatste.fecha) return null;
  return punten.find(([f]) => f === sleutel)?.[1] ?? null;
}

export function vorigeMaand(datum: string): FechaISO {
  return maandenTerug(eersteVanDeMaand(datum), 1);
}
