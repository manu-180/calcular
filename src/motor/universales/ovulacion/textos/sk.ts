import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosSk: TextosUi<UiOvulacion> = {
  slug: "kalkulacka-ovulacie",
  ui: () => ({
    fum: "Prvý deň poslednej menštruácie",
    fumAyuda: "Prvý deň krvácania, nie posledný.",
    ciclo: "Dĺžka cyklu (dni)",
    cicloAyuda: "Od prvého dňa jednej menštruácie do dňa pred ďalšou. Ak sa mení, zadajte priemer.",
    ovulacion: "Odhadovaná ovulácia",
    fertilDesde: "Plodné dni od",
    fertilHasta: "Plodné dni do",
    proxima: "Ďalšia menštruácia",
    tabla: "Ďalšie cykly",
    colRegla: "Menštruácia",
    colDesde: "Plodné od",
    colHasta: "Plodné do",
    colOvulacion: "Ovulácia",
    errorCiclo: "Dĺžka cyklu musí byť od 21 do 45 dní.",
    aviso: "Ide o odhad pre pravidelný cyklus. Nie je to antikoncepčná metóda a nenahrádza konzultáciu s lekárom.",
  }),
};
