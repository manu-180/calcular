import type { TextosUi } from "../../tipos";
import type { UiFondoDeEmergencia } from "../definicion";

export const textosNl: TextosUi<UiFondoDeEmergencia> = {
  slug: "financiele-buffer-berekenen",
  ui: () => ({
    gastos: "Noodzakelijke uitgaven per maand",
    gastosAyuda: "Wat je hoe dan ook moet betalen: wonen, eten, energie, vervoer, zorg en aflossingen.",
    meses: "Aantal maanden dat je buffer moet dekken",
    mesesAyuda: "3 tot 6 maanden als je inkomen vast is. Meer als het wisselt of als er in je huishouden maar één inkomen is.",
    actual: "Wat je al opzij hebt gezet (niet verplicht)",
    aporte: "Wat je per maand kunt sparen (niet verplicht)",
    meta: "Aanbevolen buffer",
    falta: "Nog te sparen",
    mesesParaLlegar: "Maanden tot je buffer compleet is",
    cobertura: "Maanden die je spaargeld nu dekt",
    errorGastos: "Vul je noodzakelijke uitgaven voor één maand in.",
    yaCubierto: "Je buffer is compleet. Wat je vanaf nu spaart, kan naar andere doelen.",
    sinAporte: "Vul in hoeveel je per maand kunt sparen, dan zie je hoe lang het duurt.",
    observacionDonde: "Zet je buffer op een aparte spaarrekening waar je meteen bij kunt en die niet in waarde schommelt.",
  }),
};
