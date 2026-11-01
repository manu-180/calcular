import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";

function menesaSakums(datums: string): FechaISO {
  return `${datums.slice(0, 7)}-01` as FechaISO;
}

export interface CenuIzmaina {
  no: FechaISO;
  lidz: FechaISO;
  reizinatajs: number;
  piezimes: string[];
}

// El motor solo da el último punto: la historia de series.json se recorta a él, para que un caso con
// fecha fija no vea meses publicados después.
export function cenuIzmaina(punkti: readonly PuntoSerieTupla[], pedejais: PuntoSerie, noDatums: FechaISO, lidzDatums: FechaISO): CenuIzmaina {
  const pieejami = punkti.filter(([d]) => d <= pedejais.fecha);
  const indeksi = new Map<string, number>(pieejami);
  const pirmais = pieejami[0]?.[0];
  if (!pirmais) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const piezimes: string[] = [];
  const no = menesaSakums(noDatums);
  let lidz = menesaSakums(lidzDatums);
  if (no < pirmais) throw new ErrorEntrada(`Dati pieejami, sākot ar šo mēnesi: ${pirmais.slice(0, 7)}.`, "no");
  if (no > pedejais.fecha) throw new ErrorEntrada(`Šī mēneša datu vēl nav. Jaunākie: ${pedejais.fecha.slice(0, 7)}.`, "no");
  if (lidz > pedejais.fecha) {
    piezimes.push(`Jaunākie publicētie dati: ${pedejais.fecha.slice(0, 7)}. Aprēķins beidzas ar šo mēnesi.`);
    lidz = pedejais.fecha;
  }
  if (no > lidz) throw new ErrorEntrada("Sākuma mēnesim jābūt agrākam par beigu mēnesi.", "no");
  const a = indeksi.get(no);
  const b = indeksi.get(lidz);
  if (a === undefined || b === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  return { no, lidz, reizinatajs: b / a, piezimes };
}
