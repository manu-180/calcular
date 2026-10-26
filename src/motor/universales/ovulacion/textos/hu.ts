import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosHu: TextosUi<UiOvulacion> = {
  slug: "ovulacios-kalkulator",
  ui: () => ({
    fum: "Az utolsó menstruáció első napja",
    fumAyuda: "A vérzés első napja, nem az utolsó.",
    ciclo: "Ciklushossz (nap)",
    cicloAyuda: "Az egyik menstruáció első napjától a következő előtti napig. Ha változik, átlagot adj meg.",
    ovulacion: "Várható peteérés",
    fertilDesde: "Termékeny napok kezdete",
    fertilHasta: "Termékeny napok vége",
    proxima: "Következő menstruáció",
    tabla: "A következő ciklusok",
    colRegla: "Menstruáció",
    colDesde: "Termékeny napok kezdete",
    colHasta: "Termékeny napok vége",
    colOvulacion: "Peteérés",
    errorCiclo: "A ciklushossznak 21 és 45 nap között kell lennie.",
    aviso: "Ez rendszeres ciklusra szóló becslés. Nem fogamzásgátló módszer, és nem helyettesíti az orvossal való konzultációt.",
  }),
};
