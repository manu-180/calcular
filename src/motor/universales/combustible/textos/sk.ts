import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

export const textosSk: TextosUi<UiCombustible> = {
  slug: "kalkulacka-spotreby-paliva",
  ui: () => ({
    distancia: (u) => `Dĺžka cesty (${u})`,
    idaYVuelta: "Tam aj späť",
    tipoConsumo: "Ako je uvedená spotreba",
    l100: "Litrov na 100 km",
    kml: "Kilometrov na liter",
    consumo: "Spotreba paliva",
    consumoAyuda: "Nájdete ju v technickom preukaze, v návode k autu alebo v palubnom počítači. Na diaľnici býva spotreba nižšia ako v meste.",
    consumoMpg: "Spotreba paliva (míľ na galón)",
    precio: (u) => (u === "L" ? "Cena za liter" : "Cena za galón"),
    personas: "Koľko ľudí sa delí o náklady",
    costo: "Náklady na palivo",
    porPersona: "Na osobu",
    combustible: (u) => (u === "L" ? "Potrebné palivo (litre)" : "Potrebné palivo (galóny)"),
    distanciaTotal: (u) => `Celková vzdialenosť (${u})`,
    costoPorDistancia: (u) => (u === "mi" ? "Náklady na jednu míľu" : "Náklady na jeden kilometer"),
    errorConsumo: "Spotreba musí byť väčšia ako nula.",
    errorPersonas: "Musí to byť aspoň jedna osoba.",
  }),
};
