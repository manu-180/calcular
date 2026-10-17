import { percento } from "../../comun/italiano";
import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

const maiuscola = (s: string) => s[0].toUpperCase() + s.slice(1);

export const textosIt: TextosUi<UiPorcentaje> = {
  slug: "calcolo-percentuale",
  ui: () => ({
    modo: "Cosa vuoi calcolare?",
    modoParte: "Quanto fa X% di Y?",
    modoProporcion: "Che percentuale di Y è X?",
    modoAumento: "Y più X%",
    modoRebaja: "Y meno X%",
    x: "Numero X",
    xAyuda: "È la percentuale. Se scegli «Che percentuale di Y è X?», è la parte.",
    y: "Numero Y",
    resultado: "Risultato",
    porcentaje: "Percentuale",
    diferencia: "Quantità aggiunta o tolta",
    errorYCero: "Y non può essere 0: non esiste una percentuale di zero.",
    fraseParte: (x, y, r) => `${maiuscola(percento(x))} di ${y} fa ${r}.`,
    fraseProporcion: (x, y, p) => `${x} è ${percento(p)} di ${y}.`,
    fraseAumento: (x, y, r, d) => `${y} più ${percento(x)} fa ${r}: si aggiungono ${d}.`,
    fraseRebaja: (x, y, r, d) => `${y} meno ${percento(x)} fa ${r}: si tolgono ${d}.`,
  }),
};
