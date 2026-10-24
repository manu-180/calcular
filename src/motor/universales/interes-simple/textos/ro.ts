import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosRo: TextosUi<UiInteresSimple> = {
  slug: "calculator-dobanda-simpla",
  ui: () => ({
    capital: "Suma inițială (capital)",
    tasa: "Rata anuală a dobânzii (%)",
    tiempo: "Perioada",
    unidad: "Perioada este în",
    dias: "Zile",
    meses: "Luni",
    anios: "Ani",
    base: "Numărul de zile dintr-un an (pentru perioade în zile)",
    baseAyuda: "Unele bănci socotesc anul ca având 360 de zile. Dacă nu sunteți sigur, lăsați 365.",
    base365: "365 de zile",
    base360: "360 de zile (an bancar)",
    interes: "Dobânda",
    montoFinal: "Capital plus dobândă",
    tasaPeriodo: "Rata pentru perioada aleasă",
    errorCapital: "Introduceți o sumă mai mare decât zero.",
  }),
};
