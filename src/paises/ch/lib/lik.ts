import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";
import series from "../series.json";
import { monatsname } from "./datum";

export const LIK = (series.series.find((s) => s.id === "ch.lik")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

function monatsanfang(fecha: string): FechaISO {
  return `${fecha.slice(0, 7)}-01` as FechaISO;
}

function monateZurueck(fecha: FechaISO, monate: number): FechaISO {
  const gesamt = Number(fecha.slice(0, 4)) * 12 + Number(fecha.slice(5, 7)) - 1 - monate;
  return `${Math.floor(gesamt / 12)}-${String((gesamt % 12) + 1).padStart(2, "0")}-01` as FechaISO;
}

export interface Veraenderung {
  monatAnfang: FechaISO;
  monatEnde: FechaISO;
  indexAnfang: number;
  indexEnde: number;
  faktor: number;
  gesamt: number;
  vorjahr: number | null;
  hinweise: string[];
}

// Der Motor liefert nur den letzten Punkt der Reihe (Anforderung "serie"). Er begrenzt, bis zu welchem
// Monat die Historie aus der importierten series.json gilt; so sieht ein Fall mit festem Datum keine
// später veröffentlichten Monate.
export function veraenderungZwischen(letzter: PuntoSerie, von: string, bis: string, felder: { von: string; bis: string }): Veraenderung {
  const verfuegbar = LIK.filter(([f]) => f <= letzter.fecha);
  const index = new Map<string, number>(verfuegbar);
  const erster = verfuegbar[0]?.[0];
  if (!erster) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const hinweise: string[] = [];
  const monatAnfang = monatsanfang(von);
  let monatEnde = monatsanfang(bis);
  if (monatAnfang < erster) throw new ErrorEntrada(`Die Indexreihe beginnt im ${monatsname(erster)}.`, felder.von);
  if (monatAnfang > letzter.fecha) throw new ErrorEntrada(`Für ${monatsname(monatAnfang)} gibt es noch keinen Indexwert. Der letzte ist von ${monatsname(letzter.fecha)}.`, felder.von);
  if (monatEnde > letzter.fecha) {
    hinweise.push(`Der letzte veröffentlichte Indexstand ist von ${monatsname(letzter.fecha)}. Bis dahin wird gerechnet.`);
    monatEnde = letzter.fecha;
  }
  if (monatAnfang > monatEnde) throw new ErrorEntrada("Der Anfangsmonat muss vor dem Endmonat liegen.", felder.von);
  const indexAnfang = index.get(monatAnfang);
  const indexEnde = index.get(monatEnde);
  if (indexAnfang === undefined || indexEnde === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const vor12 = index.get(monateZurueck(monatEnde, 12));
  const faktor = indexEnde / indexAnfang;
  return {
    monatAnfang,
    monatEnde,
    indexAnfang,
    indexEnde,
    faktor,
    gesamt: (faktor - 1) * 100,
    vorjahr: vor12 === undefined ? null : (indexEnde / vor12 - 1) * 100,
    hinweise,
  };
}
