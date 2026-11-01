import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "liter" : "gallon");

export const textosDa: TextosUi<UiPintura> = {
  slug: "hvor-meget-maling",
  ui: () => ({
    modo: "Hvilke mål har du?",
    modoMedidas: "Væggenes længde og højde",
    modoSuperficie: "Det samlede areal",
    largo: (u) => `Væggenes samlede længde (${u})`,
    largoAyuda: "Alle de vægge, du skal male, lagt sammen. For et rum er det omkredsen.",
    alto: (u) => `Loftshøjde (${u})`,
    superficie: (u) => `Areal, der skal males (${u})`,
    aberturas: (u) => `Døre og vinduer, der skal trækkes fra (${u})`,
    aberturasAyuda: "En dør er cirka 2 m² (21 ft²) og et almindeligt vindue 1 til 2 m².",
    manos: "Antal lag",
    rendimiento: (u) => `Malingens rækkeevne (${u})`,
    rendimientoAyuda: "Det står på spanden: hvor stort et areal en liter dækker pr. lag. Ved du det ikke, så behold den foreslåede værdi.",
    recomendado: (u) => `Maling, du skal købe (${volumen(u)})`,
    recomendadoAyuda: "Med 10 % ekstra til pletmaling og det, der bliver i rullen.",
    necesario: (u) => `Præcis mængde (${volumen(u)})`,
    neta: (u) => `Areal, der skal males (${u})`,
    errorMedidas: "Skriv væggenes længde og højde.",
    errorSuperficie: "Skriv det areal, der skal males.",
    errorAberturas: "Døre og vinduer kan ikke fylde hele væggen.",
    errorRendimiento: "Rækkeevnen skal være større end 0.",
  }),
};
