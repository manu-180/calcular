import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosRo: TextosUi<UiCeramicos> = {
  slug: "calculator-gresie-faianta",
  ui: () => ({
    superficie: (u) => `Suprafața de placat (${u})`,
    largo: (u) => `Lungimea plăcii (${u})`,
    ancho: (u) => `Lățimea plăcii (${u})`,
    desperdicio: "Pierderi (%)",
    desperdicioAyuda: "Pentru tăieturi și plăci sparte. Folosiți 10% la montaj drept și 15% la montaj în diagonală.",
    porCaja: "Plăci într-o cutie",
    porCajaAyuda: "Opțional. Completați ca să vedeți câte cutii trebuie cumpărate.",
    piezas: "Plăci necesare",
    cajas: "Cutii de cumpărat",
    conDesperdicio: (u) => `Suprafața cu pierderi (${u})`,
    cubre: (u) => `Suprafața acoperită de cutii (${u})`,
    errorSuperficie: "Suprafața trebuie să fie mai mare decât 0.",
    errorPieza: "Dimensiunile plăcii trebuie să fie mai mari decât 0.",
  }),
};
