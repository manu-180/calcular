import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosBs: TextosUi<UiCeramicos> = {
  slug: "kalkulator-plocica",
  ui: () => ({
    superficie: (u) => `Površina za polaganje pločica (${u})`,
    largo: (u) => `Dužina pločice (${u})`,
    ancho: (u) => `Širina pločice (${u})`,
    desperdicio: "Rezerva za rezanje (%)",
    desperdicioAyuda: "Za rezanje i polomljene komade. Za ravno polaganje računajte 10 %, za dijagonalno 15 %.",
    porCaja: "Broj pločica u jednoj kutiji",
    porCajaAyuda: "Nije obavezno. Popunite ako želite vidjeti koliko kutija trebate kupiti.",
    piezas: "Potreban broj pločica (kom.)",
    cajas: "Koliko kutija kupiti",
    conDesperdicio: (u) => `Površina s rezervom (${u})`,
    cubre: (u) => `Površina koju kutije pokrivaju (${u})`,
    errorSuperficie: "Površina mora biti veća od nule.",
    errorPieza: "Mjere pločice moraju biti veće od nule.",
  }),
};
