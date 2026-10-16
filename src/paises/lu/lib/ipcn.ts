import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";
import series from "../series.json";
import { nomDuMois } from "./dates";

export const IPCN = (series.series.find((s) => s.id === "lu.ipcn")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

function debutDuMois(fecha: string): FechaISO {
  return `${fecha.slice(0, 7)}-01` as FechaISO;
}

function moisAvant(fecha: FechaISO, n: number): FechaISO {
  const total = Number(fecha.slice(0, 4)) * 12 + Number(fecha.slice(5, 7)) - 1 - n;
  return `${Math.floor(total / 12)}-${String((total % 12) + 1).padStart(2, "0")}-01` as FechaISO;
}

export interface Variation {
  moisDepart: FechaISO;
  moisFin: FechaISO;
  indiceDepart: number;
  indiceFin: number;
  facteur: number;
  total: number;
  annuelle: number | null;
  notes: string[];
}

// Le moteur ne livre que le dernier point de la série ; il borne l'historique importé de series.json
// pour qu'un cas à date fixe ne voie pas les mois publiés plus tard.
export function variationEntre(dernier: PuntoSerie, de: string, a: string, champ: string): Variation {
  const disponibles = IPCN.filter(([f]) => f <= dernier.fecha);
  const indice = new Map<string, number>(disponibles);
  const premier = disponibles[0]?.[0];
  if (!premier) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const notes: string[] = [];
  const moisDepart = debutDuMois(de);
  let moisFin = debutDuMois(a);
  if (moisDepart < premier) throw new ErrorEntrada(`La série commence en ${nomDuMois(premier)}.`, champ);
  if (moisDepart > dernier.fecha) throw new ErrorEntrada(`L'indice de ${nomDuMois(moisDepart)} n'est pas encore publié. Le dernier date de ${nomDuMois(dernier.fecha)}.`, champ);
  if (moisFin > dernier.fecha) {
    notes.push(`Le dernier indice publié date de ${nomDuMois(dernier.fecha)}. Le calcul s'arrête à ce mois.`);
    moisFin = dernier.fecha;
  }
  if (moisDepart > moisFin) throw new ErrorEntrada("Le mois de départ doit précéder le mois de fin.", champ);
  const indiceDepart = indice.get(moisDepart);
  const indiceFin = indice.get(moisFin);
  if (indiceDepart === undefined || indiceFin === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const anAvant = indice.get(moisAvant(moisFin, 12));
  const facteur = indiceFin / indiceDepart;
  return {
    moisDepart,
    moisFin,
    indiceDepart,
    indiceFin,
    facteur,
    total: (facteur - 1) * 100,
    annuelle: anAvant === undefined ? null : (indiceFin / anAvant - 1) * 100,
    notes,
  };
}
