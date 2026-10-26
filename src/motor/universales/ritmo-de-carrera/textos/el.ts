import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

// La unidad llega como «km» o «mi»; en la frase larga va la palabra entera.
const palabra = (u: string) => (u === "mi" ? "μίλι" : "χιλιόμετρο");

export const textosEl: TextosUi<UiRitmo> = {
  slug: "rythmos-treximatos",
  ui: () => ({
    calcular: "Τι θέλετε να υπολογίσετε;",
    calcRitmo: "Ρυθμό (από απόσταση και χρόνο)",
    calcTiempo: "Χρόνο (από απόσταση και ρυθμό)",
    calcDistancia: "Απόσταση (από χρόνο και ρυθμό)",
    distancia: "Απόσταση",
    distanciaAyuda: "Επιλέξτε αγώνα ή «Άλλη απόσταση» για να εισαγάγετε τη δική σας.",
    otra: "Άλλη απόσταση",
    cincoK: "5 χλμ.",
    diezK: "10 χλμ.",
    media: "Ημιμαραθώνιος",
    maraton: "Μαραθώνιος",
    distanciaOtra: (u) => `Άλλη απόσταση (${u})`,
    horas: "Χρόνος: ώρες",
    minutos: "Χρόνος: λεπτά",
    segundos: "Χρόνος: δευτερόλεπτα",
    ritmoMin: (u) => `Ρυθμός: λεπτά ανά ${palabra(u)}`,
    ritmoSeg: "Ρυθμός: δευτερόλεπτα",
    ritmo: (u) => `Ρυθμός (λεπτά/${u})`,
    tiempo: "Τελικός χρόνος",
    distanciaRes: (u) => `Απόσταση (${u})`,
    velocidad: (u) => `Μέση ταχύτητα (${u})`,
    errorDistancia: "Εισάγετε απόσταση μεγαλύτερη από 0.",
    errorTiempo: "Εισάγετε τον χρόνο: ώρες, λεπτά ή δευτερόλεπτα.",
    errorRitmo: "Εισάγετε τον ρυθμό: λεπτά και δευτερόλεπτα ανά μονάδα απόστασης.",
  }),
};
