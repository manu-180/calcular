import type { TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

export const textosLv: TextosUi<UiRendimientoInversion> = {
  slug: "ieguldijumu-ienesiguma-kalkulators",
  ui: () => ({
    inicial: "Ieguldītā summa",
    final: "Galīgā vērtība",
    finalAyuda: "Ieguldījuma vērtība šodien vai summa, kas saņemta, to pārdodot.",
    cobrado: "Perioda laikā izmaksātie ienākumi (nav obligāti)",
    cobradoAyuda: "Dividendes, procenti vai īres ienākumi, ko saņēmāt un atkārtoti neieguldījāt.",
    anios: "Ieguldījuma ilgums gados",
    aniosAyuda: "Varat ievadīt arī decimālskaitli, piemēram, 1,5, ja ilgums ir pusotrs gads.",
    ganancia: "Peļņa",
    roi: "Kopējais ienesīgums (ROI)",
    cagr: "Gada ienesīgums (CAGR)",
    cagrAyuda: "Gada ienesīgums, kas, rēķinot saliktos procentus, katru gadu dotu to pašu rezultātu.",
    errorInicial: "Ievadiet, cik sākumā ieguldījāt.",
    observacionCorto: "Ja periods ir īsāks par gadu, gada ienesīgums izstiepj īsu rezultātu, it kā tas atkārtotos visu gadu. Vērtējiet to piesardzīgi.",
    observacionInflacion: "Vai pieaugusi jūsu pirktspēja, uzzināsiet, salīdzinot gada ienesīgumu ar tā paša perioda inflāciju.",
  }),
};
