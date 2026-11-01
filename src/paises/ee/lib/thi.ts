import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";

const KUUD = ["jaanuar", "veebruar", "märts", "aprill", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember"];

export function kuuAasta(fecha: string): string {
  return `${KUUD[Number(fecha.slice(5, 7)) - 1]} ${fecha.slice(0, 4)}`;
}

function kuuAlgus(fecha: string): FechaISO {
  return `${fecha.slice(0, 7)}-01` as FechaISO;
}

// Mootor annab ainult seeria viimase punkti, seega ajalugu lõigatakse selle kuupäevani: kindla
// kuupäevaga test ei tohi näha hiljem avaldatud kuid.
export function thiMuutus(punktid: readonly PuntoSerieTupla[], viimane: PuntoSerie, algus: FechaISO, lopp: FechaISO) {
  const saadaval = punktid.filter(([f]) => f <= viimane.fecha);
  const indeks = new Map<string, number>(saadaval);
  const esimene = saadaval[0]?.[0];
  if (!esimene) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const markused: string[] = [];
  const k1 = kuuAlgus(algus);
  let k2 = kuuAlgus(lopp);
  if (k1 < esimene) throw new ErrorEntrada(`Andmed on olemas alates kuust: ${kuuAasta(esimene)}.`, "algus");
  if (k1 > viimane.fecha) throw new ErrorEntrada(`Selle kuu kohta pole Statistikaameti andmeid. Viimane kuu: ${kuuAasta(viimane.fecha)}.`, "algus");
  if (k2 > viimane.fecha) {
    markused.push(`Statistikaameti viimane kuu: ${kuuAasta(viimane.fecha)}. Arvutasime selle kuuni.`);
    k2 = viimane.fecha;
  }
  if (k1 > k2) throw new ErrorEntrada("Alguskuu ei saa olla hilisem kui lõppkuu.", "algus");
  const i1 = indeks.get(k1);
  const i2 = indeks.get(k2);
  if (i1 === undefined || i2 === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const kordaja = i2 / i1;
  return { algus: k1, lopp: k2, kordaja, muutus: (kordaja - 1) * 100, markused };
}
