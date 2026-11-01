import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosKa: TextosUi<UiPropina> = {
  slug: "chais-pulis-kalkulatori",
  ui: () => ({
    cuenta: "ანგარიშის თანხა",
    porcentaje: "ჩაის ფული (%)",
    porcentajeAyuda: "ჩვევა ქვეყნისა და ადგილის მიხედვით განსხვავდება. აირჩიეთ ის, რაც თქვენთვის მისაღებია.",
    personas: "რამდენი ადამიანი იხდის",
    redondear: "თითოეულის წილის ზემოთ დამრგვალება",
    redondearAyuda: "რომ ყველამ მრგვალი თანხა გადაიხადოს. სხვაობა ჩაის ფულს ემატება.",
    propina: "ჩაის ფული",
    total: "სულ ჩაის ფულით",
    porPersona: "თითო ადამიანზე",
    propinaEfectiva: "ჩაის ფული დამრგვალების შემდეგ",
    errorPersonas: "გადამხდელი უნდა იყოს მინიმუმ ერთი ადამიანი.",
    observacionRedondeo: (efectiva) => `დამრგვალების შემდეგ ჩაის ფულის წილი ანგარიშში (პროცენტი): ${efectiva}.`,
  }),
};
