import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosSl: TextosUi<UiPorcentaje> = {
  slug: "izracun-odstotkov",
  ui: () => ({
    modo: "Kaj želite izračunati?",
    modoParte: "Koliko je X % od Y?",
    modoProporcion: "Koliko odstotkov od Y je X?",
    modoAumento: "Y, povečano za X %",
    modoRebaja: "Y, zmanjšano za X %",
    x: "Število X",
    xAyuda: "Odstotek. Če izberete „Koliko odstotkov od Y je X?“, je to del celote.",
    y: "Število Y",
    resultado: "Rezultat",
    porcentaje: "Odstotek",
    diferencia: "Znesek, ki se prišteje ali odšteje",
    errorYCero: "Y ne more biti 0: od nič ni mogoče izračunati odstotka.",
    fraseParte: (x, y, r) => `${x} % od ${y} je ${r}.`,
    fraseProporcion: (x, y, p) => `${x} je ${p} % od ${y}.`,
    fraseAumento: (x, y, r, d) => `${y}, povečano za ${x} %, je ${r}: prišteje se ${d}.`,
    fraseRebaja: (x, y, r, d) => `${y}, zmanjšano za ${x} %, je ${r}: odšteje se ${d}.`,
  }),
};
