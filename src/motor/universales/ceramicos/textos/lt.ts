import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosLt: TextosUi<UiCeramicos> = {
  slug: "plyteliu-skaiciuokle",
  ui: () => ({
    superficie: (u) => `Klojamas plotas (${u})`,
    largo: (u) => `Plytelės ilgis (${u})`,
    ancho: (u) => `Plytelės plotis (${u})`,
    desperdicio: "Atsarga pjovimui (%)",
    desperdicioAyuda: "Pjovimui ir sudužusioms plytelėms. Klojant tiesiai skaičiuokite 10 %, klojant įstrižai 15 %.",
    porCaja: "Plytelių skaičius dėžėje",
    porCajaAyuda: "Neprivaloma. Užpildykite, jei norite matyti, kiek dėžių pirkti.",
    piezas: "Reikalingas plytelių skaičius (vnt.)",
    cajas: "Kiek dėžių pirkti",
    conDesperdicio: (u) => `Plotas su atsarga (${u})`,
    cubre: (u) => `Plotas, kurį padengia dėžės (${u})`,
    errorSuperficie: "Plotas turi būti didesnis už nulį.",
    errorPieza: "Plytelės matmenys turi būti didesni už nulį.",
  }),
};
