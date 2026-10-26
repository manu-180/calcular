import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosFi: TextosUi<UiSumarDias> = {
  slug: "lisaa-paivia-paivamaaraan",
  ui: () => ({
    fecha: "Alkupäivä",
    operacion: "Mitä haluat tehdä?",
    sumar: "Lisää päiviä",
    restar: "Vähennä päiviä",
    dias: "Päivien määrä",
    tipo: "Päivien tyyppi",
    corridos: "Kalenteripäivät",
    habiles: "Arkipäivät (maanantaista perjantaihin)",
    resultado: "Päivämäärä",
    diaSemana: "Viikonpäivä",
    diasCorridos: "Kalenteripäiviä yhteensä",
    nombresDias: ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"],
    errorDias: "Päivien määrän pitää olla kokonaisluku ja enintään 100 vuotta.",
    notaHabiles: "Arkipäivissä ohitetaan lauantait ja sunnuntait mutta ei juhlapyhiä. Jos jaksolle osuu juhlapyhä, lisää se erikseen.",
  }),
};
