import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosIt: TextosUi<UiCeramicos> = {
  slug: "calcolo-piastrelle",
  ui: () => ({
    superficie: (u) => `Superficie da piastrellare (${u})`,
    largo: (u) => `Lunghezza della piastrella (${u})`,
    ancho: (u) => `Larghezza della piastrella (${u})`,
    desperdicio: "Sfrido (%)",
    desperdicioAyuda: "Per tagli e rotture. Usa il 10% per la posa dritta e il 15% per quella in diagonale.",
    porCaja: "Piastrelle per scatola",
    porCajaAyuda: "Facoltativo. Inseriscilo per sapere quante scatole comprare.",
    piezas: "Piastrelle necessarie",
    cajas: "Scatole da comprare",
    conDesperdicio: (u) => `Superficie con sfrido (${u})`,
    cubre: (u) => `Superficie coperta dalle scatole (${u})`,
    errorSuperficie: "La superficie deve essere maggiore di 0.",
    errorPieza: "Le misure della piastrella devono essere maggiori di 0.",
  }),
};
