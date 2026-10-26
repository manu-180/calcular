import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";
import { kuukausiVuosi } from "./paivat";

function kuunAlku(fecha: string): FechaISO {
  return `${fecha.slice(0, 7)}-01` as FechaISO;
}

export interface Muutos {
  alku: FechaISO;
  loppu: FechaISO;
  kerroin: number;
  yhteensa: number;
  huomiot: string[];
}

// Moottori antaa sarjasta vain viimeisen pisteen. Historia luetaan series.jsonista ja rajataan siihen,
// jotta kiinteän päivän tapaus ei näe myöhemmin julkaistuja kuukausia.
export function hintamuutos(pisteet: readonly PuntoSerieTupla[], viimeinen: PuntoSerie, alku: FechaISO, loppu: FechaISO, kentat: { alku: string; loppu: string }): Muutos {
  const kaytossa = pisteet.filter(([f]) => f <= viimeinen.fecha);
  const indeksi = new Map<string, number>(kaytossa);
  const ensimmainen = kaytossa[0]?.[0];
  if (!ensimmainen) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const huomiot: string[] = [];
  const k1 = kuunAlku(alku);
  let k2 = kuunAlku(loppu);
  if (k1 < ensimmainen) throw new ErrorEntrada(`Indeksi alkaa kuukaudesta ${kuukausiVuosi(ensimmainen)}.`, kentat.alku);
  if (k1 > viimeinen.fecha) throw new ErrorEntrada(`Tilastokeskus ei ole vielä julkaissut tätä kuukautta. Viimeisin on ${kuukausiVuosi(viimeinen.fecha)}.`, kentat.alku);
  if (k2 > viimeinen.fecha) {
    huomiot.push(`Viimeisin julkaistu indeksi on kuukaudelta ${kuukausiVuosi(viimeinen.fecha)}. Laskuri laskee siihen asti.`);
    k2 = viimeinen.fecha;
  }
  if (k1 > k2) throw new ErrorEntrada("Alkukuukauden pitää olla ennen loppukuukautta.", kentat.alku);
  const i1 = indeksi.get(k1);
  const i2 = indeksi.get(k2);
  if (i1 === undefined || i2 === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const kerroin = i2 / i1;
  return { alku: k1, loppu: k2, kerroin, yhteensa: (kerroin - 1) * 100, huomiot };
}
