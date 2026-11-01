import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";

const MJESECI = ["januar", "februar", "mart", "april", "maj", "jun", "jul", "avgust", "septembar", "oktobar", "novembar", "decembar"];

export function nazivMjeseca(fecha: string): string {
  return `${MJESECI[Number(fecha.slice(5, 7)) - 1]} ${fecha.slice(0, 4)}.`;
}

function prviUMjesecu(fecha: string): FechaISO {
  return `${fecha.slice(0, 7)}-01` as FechaISO;
}

// Istorija dolazi iz series.json i seče se na poslednju tačku koju motor preda, da slučaj sa fiksnim
// datumom ne vidi mjesece objavljene kasnije.
export function promjenaCijena(tacke: readonly PuntoSerieTupla[], poslednja: PuntoSerie, od: FechaISO, doDatuma: FechaISO) {
  const dostupne = tacke.filter(([f]) => f <= poslednja.fecha);
  const indeks = new Map<string, number>(dostupne);
  const prva = dostupne[0]?.[0];
  if (!prva) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const napomene: string[] = [];
  const pocetak = prviUMjesecu(od);
  let kraj = prviUMjesecu(doDatuma);
  if (pocetak < prva) throw new ErrorEntrada(`MONSTAT ima podatke od ovog mjeseca: ${nazivMjeseca(prva)}`, "od");
  if (pocetak > poslednja.fecha) throw new ErrorEntrada(`Za taj mjesec još nema podatka. Poslednji je: ${nazivMjeseca(poslednja.fecha)}`, "od");
  if (kraj > poslednja.fecha) {
    napomene.push(`Poslednji podatak MONSTAT-a je za ${nazivMjeseca(poslednja.fecha)} Obračun ide do tog mjeseca.`);
    kraj = poslednja.fecha;
  }
  if (pocetak > kraj) throw new ErrorEntrada("Početni mjesec ne može biti poslije krajnjeg.", "od");
  const i1 = indeks.get(pocetak);
  const i2 = indeks.get(kraj);
  if (i1 === undefined || i2 === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const faktor = i2 / i1;
  return { od: pocetak, do: kraj, faktor, ukupno: (faktor - 1) * 100, napomene };
}

// Prosjek serije za šest mjeseci prethodnog polugodišta u odnosu na datum obračuna. Ako neki mjesec
// još nije objavljen, uzima se poslednjih šest objavljenih i to se kaže u napomeni.
export function prosjekPolugodista(tacke: readonly PuntoSerieTupla[], poslednja: PuntoSerie, datum: FechaISO): { prosjek: number; napomena: string | null } {
  const dostupne = tacke.filter(([f]) => f <= poslednja.fecha);
  const godina = Number(datum.slice(0, 4));
  const uDrugom = Number(datum.slice(5, 7)) > 6;
  const g = uDrugom ? godina : godina - 1;
  const mjeseci = (uDrugom ? [1, 2, 3, 4, 5, 6] : [7, 8, 9, 10, 11, 12]).map((m) => `${g}-${String(m).padStart(2, "0")}-01`);
  const mapa = new Map<string, number>(dostupne);
  const vrijednosti = mjeseci.map((m) => mapa.get(m));
  if (vrijednosti.every((x) => x !== undefined)) {
    const niz = vrijednosti as number[];
    return { prosjek: niz.reduce((a, b) => a + b, 0) / 6, napomena: null };
  }
  const zadnjih = dostupne.slice(-6).map(([, x]) => x);
  if (!zadnjih.length) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  return { prosjek: zadnjih.reduce((a, b) => a + b, 0) / zadnjih.length, napomena: "Za prethodno polugodište još nema svih podataka, pa je uzet prosjek poslednjih objavljenih mjeseci." };
}
