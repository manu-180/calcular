import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosEt: TextosUi<UiPorcentaje> = {
  slug: "protsendikalkulaator",
  ui: () => ({
    modo: "Mida tahad arvutada?",
    modoParte: "Kui palju on X% arvust Y?",
    modoProporcion: "Mitu protsenti on X arvust Y?",
    modoAumento: "Y pluss X%",
    modoRebaja: "Y miinus X%",
    x: "Arv X",
    xAyuda: "Protsendimäär. Kui valid „Mitu protsenti on X arvust Y?“, on X osa tervikust.",
    y: "Arv Y",
    resultado: "Tulemus",
    porcentaje: "Protsent",
    diferencia: "Lisatud või lahutatud osa",
    errorYCero: "Y ei saa olla 0. Nullist ei saa protsenti arvutada.",
    fraseParte: (x, y, r) => `${x}% arvust ${y} on ${r}.`,
    fraseProporcion: (x, y, p) => `${x} on ${p}% arvust ${y}.`,
    fraseAumento: (x, y, r, d) => `${y} pluss ${x}% on ${r}. Juurdekasv: ${d}.`,
    fraseRebaja: (x, y, r, d) => `${y} miinus ${x}% on ${r}. Vähenemine: ${d}.`,
  }),
};
