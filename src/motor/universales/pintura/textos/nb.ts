import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "liter" : "gallon");

export const textosNb: TextosUi<UiPintura> = {
  slug: "hvor-mye-maling",
  ui: () => ({
    modo: "Hvilke mål har du?",
    modoMedidas: "Lengde og høyde på veggene",
    modoSuperficie: "Det samlede arealet",
    largo: (u) => `Samlet lengde på veggene (${u})`,
    largoAyuda: "Alle veggene du skal male, lagt sammen. For et rom er det omkretsen.",
    alto: (u) => `Takhøyde (${u})`,
    superficie: (u) => `Areal som skal males (${u})`,
    aberturas: (u) => `Dører og vinduer som skal trekkes fra (${u})`,
    aberturasAyuda: "En dør er omtrent 2 m² (21 ft²) og et vanlig vindu 1 til 2 m².",
    manos: "Antall strøk",
    rendimiento: (u) => `Malingens rekkeevne (${u})`,
    rendimientoAyuda: "Det står på spannet: hvor stort areal én liter dekker per strøk. Vet du ikke, behold verdien som er foreslått.",
    recomendado: (u) => `Maling du bør kjøpe (${volumen(u)})`,
    recomendadoAyuda: "Med 10 % ekstra til flekking og det som blir igjen i rullen.",
    necesario: (u) => `Nøyaktig mengde (${volumen(u)})`,
    neta: (u) => `Areal som skal males (${u})`,
    errorMedidas: "Fyll inn lengden og høyden på veggene.",
    errorSuperficie: "Fyll inn arealet som skal males.",
    errorAberturas: "Dører og vinduer kan ikke dekke hele veggen.",
    errorRendimiento: "Rekkeevnen må være større enn 0.",
  }),
};
