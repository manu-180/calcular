import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosEt: TextosUi<UiSumarDias> = {
  slug: "paevade-lisamine",
  ui: () => ({
    fecha: "Alguskuupäev",
    operacion: "Mida tahad teha?",
    sumar: "Lisa päevi",
    restar: "Lahuta päevi",
    dias: "Päevade arv",
    tipo: "Päevade liik",
    corridos: "Kalendripäevad",
    habiles: "Tööpäevad (esmaspäevast reedeni)",
    resultado: "Kuupäev",
    diaSemana: "Nädalapäev",
    diasCorridos: "Kalendripäevi kokku",
    nombresDias: ["pühapäev", "esmaspäev", "teisipäev", "kolmapäev", "neljapäev", "reede", "laupäev"],
    errorDias: "Päevade arv peab olema täisarv ega tohi ületada 100 aastat.",
    notaHabiles: "Tööpäevade puhul jäetakse vahele laupäevad ja pühapäevad, aga mitte riigipühad. Kui perioodi jääb riigipüha, lisa see eraldi.",
  }),
};
