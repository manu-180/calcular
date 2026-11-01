import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosSl: TextosUi<UiCeramicos> = {
  slug: "izracun-keramicnih-plosc",
  ui: () => ({
    superficie: (u) => `Površina za polaganje ploščic (${u})`,
    largo: (u) => `Dolžina ploščice (${u})`,
    ancho: (u) => `Širina ploščice (${u})`,
    desperdicio: "Rezerva za razrez (%)",
    desperdicioAyuda: "Za razrez in polomljene kose. Pri ravnem polaganju računajte 10 %, pri diagonalnem 15 %.",
    porCaja: "Število ploščic v škatli",
    porCajaAyuda: "Neobvezno. Izpolnite, če želite videti, koliko škatel morate kupiti.",
    piezas: "Potrebno število ploščic (kosov)",
    cajas: "Koliko škatel kupiti",
    conDesperdicio: (u) => `Površina z rezervo (${u})`,
    cubre: (u) => `Površina, ki jo pokrijejo škatle (${u})`,
    errorSuperficie: "Površina mora biti večja od nič.",
    errorPieza: "Mere ploščice morajo biti večje od nič.",
  }),
};
