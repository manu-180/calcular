import type { FechaISO } from "@/motor/tipos";

const KUUKAUDET = ["tammikuu", "helmikuu", "maaliskuu", "huhtikuu", "toukokuu", "kesäkuu", "heinäkuu", "elokuu", "syyskuu", "lokakuu", "marraskuu", "joulukuu"];

export function kuukausiVuosi(fecha: string): string {
  return `${KUUKAUDET[Number(fecha.slice(5, 7)) - 1]} ${fecha.slice(0, 4)}`;
}

function viimeinenPaiva(vuosi: number, kuukausi: number): number {
  return new Date(Date.UTC(vuosi, kuukausi, 0)).getUTCDate();
}

// Laki säädettyjen määräaikain laskemisesta (150/1930) 3 §: kuukausina määrätty aika päättyy samana
// päivänä numeroltaan, tai kuun viimeisenä päivänä, jos sellaista päivää ei ole.
export function lisaaKuukausia(fecha: FechaISO, n: number): FechaISO {
  const v = Number(fecha.slice(0, 4));
  const k = Number(fecha.slice(5, 7)) - 1 + n;
  const vuosi = v + Math.floor(k / 12);
  const kuukausi = (((k % 12) + 12) % 12) + 1;
  const paiva = Math.min(Number(fecha.slice(8, 10)), viimeinenPaiva(vuosi, kuukausi));
  return `${vuosi}-${String(kuukausi).padStart(2, "0")}-${String(paiva).padStart(2, "0")}` as FechaISO;
}

export function lisaaVuosia(fecha: FechaISO, n: number): FechaISO {
  return lisaaKuukausia(fecha, 12 * n);
}
