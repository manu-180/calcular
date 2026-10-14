import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosNl: TextosUi<UiAumentoDeSueldo> = {
  slug: "salarisverhoging-berekenen",
  ui: () => ({
    sueldo: "Huidig salaris per maand",
    sueldoAyuda: "Bruto of netto, wat je wilt. De uitkomst gebruikt dezelfde basis.",
    aumentoPorcentaje: "Verhoging (%)",
    aumentoMonto: "Verhoging als bedrag (niet verplicht)",
    aumentoMontoAyuda: "Krijg je er een vast bedrag bij, vul het dan hier in. Het telt in plaats van het percentage.",
    inflacion: "Inflatie in die periode (%, niet verplicht)",
    inflacionAyuda: "De inflatie sinds je vorige verhoging, om te zien of je meer of minder kunt kopen dan eerst.",
    sueldosAnio: "Aantal salarissen per jaar",
    sueldosAnioAyuda: "12 bij een maandsalaris. 13 als je ook een dertiende maand krijgt.",
    nuevo: "Nieuw salaris per maand",
    diferenciaMensual: "Verschil per maand",
    diferenciaAnual: "Verschil per jaar",
    porcentaje: "Verhoging in procenten",
    real: "Reële verhoging (na inflatie)",
    realAyuda: "Hoeveel meer je met je nieuwe salaris kunt kopen dan met je oude.",
    errorSueldo: "Vul je huidige salaris in.",
    errorSinAumento: "Vul de verhoging in als percentage of als bedrag.",
    observacionGana: (puntos) => `Je verhoging is hoger dan de inflatie: je kunt ${puntos}% meer kopen dan eerst.`,
    observacionPierde: (puntos) => `Je verhoging blijft achter bij de inflatie: je kunt ${puntos}% minder kopen dan eerst.`,
    observacionIgual: "Je verhoging is gelijk aan de inflatie: je kunt net zoveel kopen als eerst.",
  }),
};
