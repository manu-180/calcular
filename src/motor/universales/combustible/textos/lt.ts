import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

export const textosLt: TextosUi<UiCombustible> = {
  slug: "kuro-sanaudu-skaiciuokle",
  ui: () => ({
    distancia: (u) => `Kelionės atstumas (${u})`,
    idaYVuelta: "Pirmyn ir atgal",
    tipoConsumo: "Kaip nurodytos sąnaudos",
    l100: "Litrai 100 km",
    kml: "Kilometrai vienam litrui",
    consumo: "Kuro sąnaudos",
    consumoAyuda: "Jas rasite transporto priemonės dokumentuose, automobilio instrukcijoje arba borto kompiuteryje. Greitkelyje sąnaudos paprastai mažesnės nei mieste.",
    consumoMpg: "Kuro sąnaudos (mylios galonui)",
    precio: (u) => (u === "L" ? "Litro kaina" : "Galono kaina"),
    personas: "Kiek žmonių dalijasi išlaidas",
    costo: "Kuro išlaidos",
    porPersona: "Vienam žmogui",
    combustible: (u) => (u === "L" ? "Reikalingas kuras (litrais)" : "Reikalingas kuras (galonais)"),
    distanciaTotal: (u) => `Bendras atstumas (${u})`,
    costoPorDistancia: (u) => (u === "mi" ? "Išlaidos vienai mylei" : "Išlaidos vienam kilometrui"),
    errorConsumo: "Sąnaudos turi būti didesnės už nulį.",
    errorPersonas: "Turi būti bent vienas žmogus.",
  }),
};
