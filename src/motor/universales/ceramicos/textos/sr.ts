import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosSr: TextosUi<UiCeramicos> = {
  slug: "kalkulator-plocica",
  ui: () => ({
    superficie: (u) => `Površina za popločavanje (${u})`,
    largo: (u) => `Dužina pločice (${u})`,
    ancho: (u) => `Širina pločice (${u})`,
    desperdicio: "Rezerva za sečenje (%)",
    desperdicioAyuda: "Za sečenje i polomljene komade. Za pravo postavljanje računajte 10 %, za dijagonalno 15 %.",
    porCaja: "Broj pločica u jednoj kutiji",
    porCajaAyuda: "Nije obavezno. Popunite ako želite da vidite koliko kutija da kupite.",
    piezas: "Potreban broj pločica (kom.)",
    cajas: "Koliko kutija kupiti",
    conDesperdicio: (u) => `Površina sa rezervom (${u})`,
    cubre: (u) => `Površina koju kutije pokrivaju (${u})`,
    errorSuperficie: "Površina mora biti veća od nule.",
    errorPieza: "Mere pločice moraju biti veće od nule.",
  }),
};
