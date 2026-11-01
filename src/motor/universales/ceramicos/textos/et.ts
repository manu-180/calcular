import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosEt: TextosUi<UiCeramicos> = {
  slug: "plaadikalkulaator",
  ui: () => ({
    superficie: (u) => `Plaaditav pindala (${u})`,
    largo: (u) => `Plaadi pikkus (${u})`,
    ancho: (u) => `Plaadi laius (${u})`,
    desperdicio: "Materjalikadu (%)",
    desperdicioAyuda: "Lõikamiste ja purunevate plaatide jaoks. Arvesta otse paigaldamisel 10% ja diagonaalis paigaldamisel 15%.",
    porCaja: "Plaate pakis",
    porCajaAyuda: "Valikuline. Täida, kui tahad näha, mitu pakki pead ostma.",
    piezas: "Plaatide arv",
    cajas: "Ostetavad pakid",
    conDesperdicio: (u) => `Pindala koos materjalikaoga (${u})`,
    cubre: (u) => `Pakkidega kaetav pindala (${u})`,
    errorSuperficie: "Pindala peab olema suurem kui 0.",
    errorPieza: "Plaadi mõõdud peavad olema suuremad kui 0.",
  }),
};
