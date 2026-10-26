import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

export const textosFi: TextosUi<UiCombustible> = {
  slug: "polttoainelaskuri",
  ui: () => ({
    distancia: (u) => `Matkan pituus (${u})`,
    idaYVuelta: "Meno ja paluu",
    tipoConsumo: "Miten kulutus ilmoitetaan",
    l100: "Litraa sadalla kilometrillä",
    kml: "Kilometriä litralla",
    consumo: "Polttoaineen kulutus",
    consumoMpg: "Polttoaineen kulutus (mailia gallonalla)",
    consumoAyuda: "Katso arvo auton käyttöohjeesta tai ajotietokoneesta. Maantiellä auto kuluttaa yleensä vähemmän kuin kaupungissa.",
    precio: (u) => (u === "L" ? "Litrahinta" : "Gallonan hinta"),
    personas: "Kustannusten jakajien määrä",
    costo: "Polttoainekustannus",
    porPersona: "Henkeä kohden",
    combustible: (u) => (u === "L" ? "Polttoainetta kuluu (litraa)" : "Polttoainetta kuluu (gallonaa)"),
    distanciaTotal: (u) => `Koko matka (${u})`,
    costoPorDistancia: (u) => `Kustannus per ${u}`,
    errorConsumo: "Kulutuksen on oltava suurempi kuin 0.",
    errorPersonas: "Henkilöitä on oltava vähintään yksi.",
  }),
};
