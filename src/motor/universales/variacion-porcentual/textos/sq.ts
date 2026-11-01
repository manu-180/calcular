import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosSq: TextosUi<UiVariacion> = {
  slug: "ndryshim-perqindjeje",
  ui: () => ({
    inicial: "Vlera fillestare",
    final: "Vlera përfundimtare",
    variacion: "Ndryshimi në përqindje",
    diferencia: "Diferenca",
    vuelta: "Për t'u kthyer te vlera fillestare",
    vueltaAyuda: "Sa duhet të ndryshojë vlera përfundimtare që të kthehet te vlera fillestare.",
    errorInicialCero: "Vlera fillestare nuk mund të jetë 0: nga zero nuk ka ndryshim në përqindje.",
    subio: (p) => `U rrit me ${p}%.`,
    bajo: (p) => `U ul me ${p}%.`,
    igual: "Asnjë ndryshim: dy vlerat janë të barabarta.",
  }),
};
