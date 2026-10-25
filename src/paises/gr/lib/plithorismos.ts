import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";

const MINES = ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"];

export function minasEtos(fecha: string): string {
  return `${MINES[Number(fecha.slice(5, 7)) - 1]} ${fecha.slice(0, 4)}`;
}

const archiMina = (fecha: string) => `${fecha.slice(0, 7)}-01` as FechaISO;

export interface Metavoli {
  apo: FechaISO;
  eos: FechaISO;
  syntelestis: number;
  synoliki: number;
  paratiriseis: string[];
}

// El motor da solo el último punto vigente de la serie; la historia del series.json se corta en ese
// punto para que un caso con fecha fija no vea meses publicados después.
export function metavoliTimon(punta: readonly PuntoSerieTupla[], teleftaio: PuntoSerie, apo: FechaISO, eos: FechaISO): Metavoli {
  const diathesima = punta.filter(([f]) => f <= teleftaio.fecha);
  const deiktis = new Map<string, number>(diathesima);
  const proto = diathesima[0]?.[0];
  if (!proto) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const paratiriseis: string[] = [];
  const m1 = archiMina(apo);
  let m2 = archiMina(eos);
  if (m1 < proto) throw new ErrorEntrada(`Τα στοιχεία ξεκινούν από: ${minasEtos(proto)}.`, "apo");
  if (m1 > teleftaio.fecha) throw new ErrorEntrada(`Η ΕΛΣΤΑΤ δεν έχει δημοσιεύσει ακόμη αυτόν τον μήνα. Ο τελευταίος είναι: ${minasEtos(teleftaio.fecha)}.`, "apo");
  if (m2 > teleftaio.fecha) {
    paratiriseis.push(`Ο τελευταίος μήνας που έχει δημοσιεύσει η ΕΛΣΤΑΤ είναι: ${minasEtos(teleftaio.fecha)}. Ο υπολογισμός φτάνει μέχρι εκεί.`);
    m2 = teleftaio.fecha;
  }
  if (m1 > m2) throw new ErrorEntrada("Ο αρχικός μήνας πρέπει να είναι πριν από τον τελικό.", "apo");
  const d1 = deiktis.get(m1);
  const d2 = deiktis.get(m2);
  if (d1 === undefined || d2 === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const syntelestis = d2 / d1;
  return { apo: m1, eos: m2, syntelestis, synoliki: (syntelestis - 1) * 100, paratiriseis };
}
