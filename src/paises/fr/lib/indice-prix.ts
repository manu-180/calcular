import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";

const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

export function nomMois(fecha: string): string {
  return `${MOIS[Number(fecha.slice(5, 7)) - 1]} ${fecha.slice(0, 4)}`;
}

function premierDuMois(fecha: string): FechaISO {
  return `${fecha.slice(0, 7)}-01` as FechaISO;
}

function moisAvant(fecha: FechaISO, mois: number): FechaISO {
  const total = Number(fecha.slice(0, 4)) * 12 + Number(fecha.slice(5, 7)) - 1 - mois;
  return `${Math.floor(total / 12)}-${String((total % 12) + 1).padStart(2, "0")}-01` as FechaISO;
}

export interface VariationIndice {
  moisInitial: FechaISO;
  moisFinal: FechaISO;
  indiceInitial: number;
  indiceFinal: number;
  coefficient: number;
  cumulee: number;
  mensuelle: number | null;
  annuelle: number | null;
  observaciones: string[];
}

// El motor solo entrega el último punto de la serie: ese punto fija hasta qué mes se puede usar la
// historia, que se lee del mismo series.json. Así un caso con fecha fija no ve meses posteriores.
export function variationEntreMois(
  puntos: readonly PuntoSerieTupla[],
  dernier: PuntoSerie,
  desde: FechaISO,
  hasta: FechaISO,
  campos: { desde: string; hasta: string },
): VariationIndice {
  const disponibles = puntos.filter(([f]) => f <= dernier.fecha);
  const indice = new Map<string, number>(disponibles);
  const premier = disponibles[0]?.[0];
  if (!premier) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const observaciones: string[] = [];
  const moisInitial = premierDuMois(desde);
  let moisFinal = premierDuMois(hasta);
  if (moisInitial < premier) throw new ErrorEntrada(`L'indice disponible commence en ${nomMois(premier)}.`, campos.desde);
  if (moisInitial > dernier.fecha) {
    throw new ErrorEntrada(`L'indice de ${nomMois(moisInitial)} n'est pas encore publié. Le dernier connu est celui de ${nomMois(dernier.fecha)}.`, campos.desde);
  }
  if (moisFinal > dernier.fecha) {
    observaciones.push(`Le dernier indice publié est celui de ${nomMois(dernier.fecha)} : le calcul s'arrête à ce mois.`);
    moisFinal = dernier.fecha;
  }
  if (moisInitial > moisFinal) throw new ErrorEntrada("La date de départ doit être antérieure à la date d'arrivée.", campos.desde);
  const indiceInitial = indice.get(moisInitial);
  const indiceFinal = indice.get(moisFinal);
  if (indiceInitial === undefined || indiceFinal === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const precedent = indice.get(moisAvant(moisFinal, 1));
  const unAn = indice.get(moisAvant(moisFinal, 12));
  const coefficient = indiceFinal / indiceInitial;
  return {
    moisInitial,
    moisFinal,
    indiceInitial,
    indiceFinal,
    coefficient,
    cumulee: (coefficient - 1) * 100,
    mensuelle: precedent === undefined ? null : (indiceFinal / precedent - 1) * 100,
    annuelle: unAn === undefined ? null : (indiceFinal / unAn - 1) * 100,
    observaciones,
  };
}
