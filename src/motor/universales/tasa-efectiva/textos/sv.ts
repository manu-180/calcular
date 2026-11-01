import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

export const textosSv: TextosUi<UiTasaEfectiva> = {
  slug: "effektiv-ranta",
  ui: () => ({
    direccion: "Vilken ränta har du?",
    nominalAEfectiva: "Nominell ränta (räkna om till effektiv)",
    efectivaANominal: "Effektiv ränta (räkna om till nominell)",
    tasa: "Årsränta (%)",
    tasaAyuda: "Fyll i den precis som den står i erbjudandet eller avtalet.",
    capitalizacion: "Ränteberäkning",
    capitalizacionAyuda: "Hur ofta räntan läggs till skulden eller saldot. Lån och kreditkort räknar oftast ränta varje månad.",
    mensual: "Varje månad (12 gånger per år)",
    trimestral: "Varje kvartal (4 gånger per år)",
    semestral: "Varje halvår (2 gånger per år)",
    diaria: "Varje dag (365 gånger per år)",
    efectiva: "Effektiv årsränta",
    nominal: "Nominell årsränta",
    periodica: "Ränta per period",
    errorNegativa: "Räntan kan inte vara negativ. Fyll i ett tal från 0 och uppåt.",
    observacionDiferencia: (puntos) => `Den effektiva räntan är ${puntos} procentenheter högre än den nominella eftersom räntan också ger ränta.`,
  }),
};
