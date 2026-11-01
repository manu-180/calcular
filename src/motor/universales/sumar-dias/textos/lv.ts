import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosLv: TextosUi<UiSumarDias> = {
  slug: "dienu-pieskaitisana",
  ui: () => ({
    fecha: "Sākuma datums",
    operacion: "Darbība",
    sumar: "Pieskaitīt dienas",
    restar: "Atņemt dienas",
    dias: "Dienu skaits",
    tipo: "Dienu veids",
    corridos: "Kalendārās dienas",
    habiles: "Darba dienas (no pirmdienas līdz piektdienai)",
    resultado: "Galīgais datums",
    diaSemana: "Nedēļas diena",
    diasCorridos: "Kalendāro dienu kopā",
    nombresDias: ["svētdiena", "pirmdiena", "otrdiena", "trešdiena", "ceturtdiena", "piektdiena", "sestdiena"],
    errorDias: "Dienu skaitam jābūt veselam un jāaptver ne vairāk kā 100 gadi.",
    notaHabiles: "Darba dienās nav iekļautas sestdienas un svētdienas, bet valsts svētku dienas netiek atņemtas. Ja periodā ir svētku diena, pieskaitiet to atsevišķi.",
  }),
};
