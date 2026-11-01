import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosLv: TextosUi<UiPorcentaje> = {
  slug: "procentu-kalkulators",
  ui: () => ({
    modo: "Ko vēlaties aprēķināt?",
    modoParte: "Cik ir X% no Y?",
    modoProporcion: "Cik procentu no Y veido X?",
    modoAumento: "Y plus X%",
    modoRebaja: "Y mīnus X%",
    x: "Skaitlis X",
    xAyuda: "Procenti. Ja izvēlēsieties „Cik procentu no Y veido X?“, tā ir veseluma daļa.",
    y: "Skaitlis Y",
    resultado: "Rezultāts",
    porcentaje: "Procenti",
    diferencia: "Pieskaitītā vai atņemtā summa",
    errorYCero: "Y nevar būt 0: no nulles procentus aprēķināt nevar.",
    fraseParte: (x, y, r) => `${x}% no ${y} ir ${r}.`,
    fraseProporcion: (x, y, p) => `${x} ir ${p}% no ${y}.`,
    fraseAumento: (x, y, r, d) => `${y} plus ${x}% ir ${r}: tiek pieskaitīts ${d}.`,
    fraseRebaja: (x, y, r, d) => `${y} mīnus ${x}% ir ${r}: tiek atņemts ${d}.`,
  }),
};
