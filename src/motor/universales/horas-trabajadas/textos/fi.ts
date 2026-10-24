import type { TextosUi } from "../../tipos";
import type { UiHorasTrabajadas } from "../definicion";

// Viikonpäivät kirjoitetaan suomeksi pienellä. Kentissä ne aloittavat lauseen, joten iso alkukirjain.
const iso = (s: string) => s[0].toUpperCase() + s.slice(1);

// Virheviesteissä päivä on essiivissä («maanantaina»).
const ESSIIVI: Readonly<Record<string, string>> = {
  maanantai: "maanantaina",
  tiistai: "tiistaina",
  keskiviikko: "keskiviikkona",
  torstai: "torstaina",
  perjantai: "perjantaina",
  lauantai: "lauantaina",
  sunnuntai: "sunnuntaina",
};
const paivana = (dia: string) => ESSIIVI[dia] ?? dia;

export const textosFi: TextosUi<UiHorasTrabajadas> = {
  slug: "tyoaikalaskuri",
  ui: () => ({
    dias: ["maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai", "sunnuntai"],
    entrada: (dia) => `${iso(dia)}: alkoi`,
    salida: (dia) => `${iso(dia)}: päättyi`,
    horarioAyuda: "Jätä tyhjiksi päivät, joina et ollut töissä. Jos lopetat puolenyön jälkeen, se lasketaan samaksi vuoroksi.",
    pausa: "Palkaton tauko päivässä (minuuttia)",
    pausaAyuda: "Lounas tai tauko, josta ei makseta palkkaa. Se vähennetään jokaisesta työpäivästä.",
    pagoHora: "Tuntipalkka",
    umbral: "Säännöllinen työaika viikossa (valinnainen)",
    umbralAyuda: "Tämän tuntimäärän ylittävät tunnit maksetaan ylityönä. Jätä tyhjäksi, jos ylityötä ei ole.",
    recargo: "Ylityökorotus (%)",
    recargoAyuda: "Kuinka paljon enemmän jokaisesta ylityötunnista maksetaan. 50 % tarkoittaa puolitoistakertaista tuntipalkkaa.",
    horasTotales: "Tehdyt työtunnit",
    horasReloj: "Tunteina ja minuutteina",
    horasNormales: "Säännölliset tunnit",
    horasExtra: "Ylityötunnit",
    pagoNormal: "Palkka säännölliseltä työajalta",
    pagoExtra: "Ylityökorvaus",
    pagoTotal: "Viikon palkka",
    tabla: "Päivä päivältä",
    colDia: "Päivä",
    colEntrada: "Alkoi",
    colSalida: "Päättyi",
    colHoras: "Tunnit",
    errorFaltaSalida: (dia) => `Lopetusaika puuttuu ${paivana(dia)}.`,
    errorFaltaEntrada: (dia) => `Aloitusaika puuttuu ${paivana(dia)}.`,
    errorIguales: (dia) => `Aloitus ja lopetus ovat samaan aikaan ${paivana(dia)}.`,
    errorPausa: (dia) => `Tauko on yhtä pitkä tai pidempi kuin vuoro ${paivana(dia)}.`,
    errorSinDias: "Syötä aloitus ja lopetus vähintään yhdelle päivälle.",
    observacionNoche: "Osa vuoroista päättyy seuraavana päivänä. Ne lasketaan kokonaan sille päivälle, jona ne alkavat.",
    observacionGenerico:
      "Tämä on yleinen laskelma. Sallittu työaika, ylityösäännöt sekä ilta-, yö- ja viikonlopputyön lisät riippuvat laista, työehtosopimuksesta ja työsopimuksestasi.",
  }),
};
