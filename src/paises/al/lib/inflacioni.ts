import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";

const MUAJT = ["janar", "shkurt", "mars", "prill", "maj", "qershor", "korrik", "gusht", "shtator", "tetor", "nëntor", "dhjetor"];

export function muajViti(fecha: string): string {
  return `${MUAJT[Number(fecha.slice(5, 7)) - 1]} ${fecha.slice(0, 4)}`;
}

function filliMuaji(fecha: string): FechaISO {
  return `${fecha.slice(0, 7)}-01` as FechaISO;
}

export interface Ndryshimi {
  nga: FechaISO;
  deri: FechaISO;
  faktori: number;
  totali: number;
  shenime: string[];
}

// El motor solo pasa el último punto: la historia se corta en ese punto para que un caso con fecha fija
// no vea meses publicados después.
export function ndryshimi(pikat: readonly PuntoSerieTupla[], fundit: PuntoSerie, nga: FechaISO, deri: FechaISO): Ndryshimi {
  const disponibel = pikat.filter(([f]) => f <= fundit.fecha);
  const indeksi = new Map<string, number>(disponibel);
  const pare = disponibel[0]?.[0];
  if (!pare) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const shenime: string[] = [];
  const m1 = filliMuaji(nga);
  let m2 = filliMuaji(deri);
  if (m1 < pare) throw new ErrorEntrada(`Të dhënat fillojnë nga ${muajViti(pare)}.`, "nga");
  if (m1 > fundit.fecha) throw new ErrorEntrada(`Për këtë muaj nuk ka ende të dhëna. Muaji i fundit është ${muajViti(fundit.fecha)}.`, "nga");
  if (m2 > fundit.fecha) {
    shenime.push(`Muaji i fundit i INSTAT është ${muajViti(fundit.fecha)}. Llogaritja ndalet aty.`);
    m2 = fundit.fecha;
  }
  if (m1 > m2) throw new ErrorEntrada("Muaji i fillimit nuk mund të jetë pas muajit të fundit.", "nga");
  const i1 = indeksi.get(m1);
  const i2 = indeksi.get(m2);
  if (i1 === undefined || i2 === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const faktori = i2 / i1;
  return { nga: m1, deri: m2, faktori, totali: (faktori - 1) * 100, shenime };
}
