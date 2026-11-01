import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";

const MESECI = ["januar", "februar", "marec", "april", "maj", "junij", "julij", "avgust", "september", "oktober", "november", "december"];

export function mesecLeto(fecha: string): string {
  return `${MESECI[Number(fecha.slice(5, 7)) - 1]} ${fecha.slice(0, 4)}`;
}

function zacetek(fecha: string): FechaISO {
  return `${fecha.slice(0, 7)}-01` as FechaISO;
}

// El motor solo pasa el último punto: la historia de series.json se corta en él para que un caso con
// fecha fija no vea meses publicados después.
export function sprememba(pts: readonly PuntoSerieTupla[], zadnji: PuntoSerie, od: FechaISO, doM: FechaISO) {
  const dostopni = pts.filter(([f]) => f <= zadnji.fecha);
  const indeks = new Map<string, number>(dostopni);
  const prvi = dostopni[0]?.[0];
  if (!prvi) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const opombe: string[] = [];
  const m1 = zacetek(od);
  let m2 = zacetek(doM);
  if (m1 < prvi) throw new ErrorEntrada(`Podatki so na voljo za ta prvi mesec: ${mesecLeto(prvi)}.`, "od");
  if (m1 > zadnji.fecha) throw new ErrorEntrada(`Za ta mesec podatka SURS še ni. Zadnji objavljeni mesec: ${mesecLeto(zadnji.fecha)}.`, "od");
  if (m2 > zadnji.fecha) {
    opombe.push(`Zadnji objavljeni mesec SURS: ${mesecLeto(zadnji.fecha)}. Računamo do tega meseca.`);
    m2 = zadnji.fecha;
  }
  if (m1 > m2) throw new ErrorEntrada("Začetni mesec ne more biti poznejši od končnega.", "od");
  const i1 = indeks.get(m1);
  const i2 = indeks.get(m2);
  if (i1 === undefined || i2 === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  return { od: m1, do: m2, faktor: i2 / i1, opombe };
}
