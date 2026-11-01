import type { TextosUi } from "../../tipos";
import type { UiDiasEntreFechas } from "../definicion";

// Suomessa 1 vaatii yksikön nominatiivin («1 päivä») ja muut luvut partitiivin («3 päivää»).
const maara = (n: number, yksi: string, monta: string) => `${n} ${n === 1 ? yksi : monta}`;

function luettelo(osat: readonly string[]): string {
  return osat.length > 1 ? `${osat.slice(0, -1).join(", ")} ja ${osat[osat.length - 1]}` : osat[0];
}

export function duracionFi(anios: number, meses: number, dias: number): string {
  const osat: string[] = [];
  if (anios) osat.push(maara(anios, "vuosi", "vuotta"));
  if (meses) osat.push(maara(meses, "kuukausi", "kuukautta"));
  if (dias || !osat.length) osat.push(maara(dias, "päivä", "päivää"));
  return luettelo(osat);
}

export const textosFi: TextosUi<UiDiasEntreFechas> = {
  slug: "paivalaskuri",
  ui: () => ({
    desde: "Alkupäivä",
    hasta: "Loppupäivä",
    incluir: "Laske myös loppupäivä mukaan",
    incluirAyuda: "Valitse tämä, jos myös viimeinen päivä lasketaan, esimerkiksi matkan tai loman pituudessa.",
    dias: "Kalenteripäivät",
    semanas: "Viikkoina",
    duracionFila: "Vuosina, kuukausina ja päivinä",
    habiles: "Arkipäivät",
    habilesAyuda: "Maanantaista perjantaihin. Juhlapyhiä ei vähennetä.",
    duracion: duracionFi,
    semanasYDias: (semanas, n, dias) => {
      const viikot = `${semanas} ${n === 1 ? "viikko" : "viikkoa"}`;
      return dias ? `${viikot} ja ${maara(dias, "päivä", "päivää")}` : viikot;
    },
    notaHabiles: "Arkipäiviksi lasketaan maanantaista perjantaihin. Juhlapyhiä ei vähennetä, koska ne vaihtelevat maittain ja alueittain.",
    notaInvertidas: "Loppupäivä oli ennen alkupäivää, joten päivämäärät vaihdettiin keskenään.",
  }),
};
