import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosEt: TextosUi<UiMetaDeAhorro> = {
  slug: "saastukalkulaator",
  ui: () => ({
    meta: "Kui palju soovid säästa?",
    actual: "Juba säästetud summa (valikuline)",
    meses: "Kuude arv eesmärgini",
    rendimiento: "Tootlus või hoiuse intress aastas (%, valikuline)",
    rendimientoAyuda: "Kui raha on hoiusel või investeeringus, mis teenib intressi. Jäta tühjaks, kui see midagi ei teeni.",
    aporteMensual: "Säästa kuus",
    aporteSemanal: "See on nädalas",
    totalAportado: "Sissemaksed kokku",
    intereses: "Intressid ja tootlus",
    errorMeta: "Sisesta, kui palju soovid säästa.",
    yaLlegas: "Juba säästetud summast piisab selle ajaga eesmärgi saavutamiseks, isegi kui rohkem sisse ei maksa.",
  }),
};
