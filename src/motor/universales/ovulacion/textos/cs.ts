import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosCs: TextosUi<UiOvulacion> = {
  slug: "kalkulacka-ovulace",
  ui: () => ({
    fum: "První den poslední menstruace",
    fumAyuda: "První den krvácení, ne poslední.",
    ciclo: "Délka cyklu (dny)",
    cicloAyuda: "Od prvního dne jedné menstruace do dne před další. Pokud se mění, zadejte průměr.",
    ovulacion: "Odhadovaná ovulace",
    fertilDesde: "Plodné dny od",
    fertilHasta: "Plodné dny do",
    proxima: "Další menstruace",
    tabla: "Další cykly",
    colRegla: "Menstruace",
    colDesde: "Plodné od",
    colHasta: "Plodné do",
    colOvulacion: "Ovulace",
    errorCiclo: "Délka cyklu musí být od 21 do 45 dní.",
    aviso: "Jde o odhad pro pravidelný cyklus. Nejde o antikoncepční metodu a nenahrazuje konzultaci s lékařem.",
  }),
};
