import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

export const textosNl: TextosUi<UiImc> = {
  slug: "bmi-berekenen",
  ui: () => ({
    peso: (u) => `Gewicht (${u})`,
    altura: (u) => `Lengte (${u})`,
    pies: "Lengte: voet (ft)",
    pulgadas: "Lengte: inch (in)",
    imc: "Body mass index (BMI)",
    categoria: "Categorie (WHO)",
    pesoMin: (u) => `Gezond gewicht vanaf (${u})`,
    pesoMax: (u) => `Gezond gewicht tot (${u})`,
    rangoAyuda: "Het gewicht waarbij je BMI bij deze lengte gezond is.",
    bajo: "Ondergewicht",
    normal: "Gezond gewicht",
    sobrepeso: "Overgewicht",
    obesidad1: "Obesitas klasse 1",
    obesidad2: "Obesitas klasse 2",
    obesidad3: "Obesitas klasse 3",
    errorPeso: "Je gewicht moet hoger zijn dan 0.",
    errorAltura: "Je lengte moet hoger zijn dan 0.",
    aviso:
      "Het BMI is een algemene richtlijn voor volwassenen. Het ziet geen verschil tussen spieren en vet en werkt anders bij zwangerschap en bij kinderen. Het vervangt niet het advies van een arts.",
  }),
};
