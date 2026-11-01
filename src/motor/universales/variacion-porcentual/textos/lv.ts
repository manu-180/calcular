import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosLv: TextosUi<UiVariacion> = {
  slug: "procentualo-izmainu-kalkulators",
  ui: () => ({
    inicial: "Sākuma vērtība",
    final: "Jaunā vērtība",
    variacion: "Procentuālās izmaiņas",
    diferencia: "Starpība",
    vuelta: "Atgriešanās pie sākuma vērtības",
    vueltaAyuda: "Cik būtu jāmainās jaunajai vērtībai, lai tā atgrieztos pie sākuma vērtības.",
    errorInicialCero: "Sākuma vērtība nevar būt 0: no nulles procentuālās izmaiņas aprēķināt nav iespējams.",
    subio: (p) => `Vērtība pieauga par ${p}%.`,
    bajo: (p) => `Vērtība samazinājās par ${p}%.`,
    igual: "Izmaiņu nav: abas vērtības ir vienādas.",
  }),
};
