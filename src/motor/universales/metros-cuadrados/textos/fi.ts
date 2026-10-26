import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosFi: TextosUi<UiMetrosCuadrados> = {
  slug: "neliolaskuri",
  ui: () => ({
    forma: (n) => `Alue ${n}: muoto`,
    formaAyuda: "Jos huone on L-muotoinen tai epäsäännöllinen, jaa se osiin, niin laskuri laskee ne yhteen.",
    ninguna: "Ei käytössä",
    rectangulo: "Suorakulmio tai neliö",
    triangulo: "Kolmio",
    circulo: "Ympyrä",
    medidaA: (n, u) => `Alue ${n}: pituus, kanta tai halkaisija (${u})`,
    medidaAAyuda: "Suorakulmio: pituus ja leveys. Kolmio: kanta ja korkeus. Ympyrä: pelkkä halkaisija.",
    medidaB: (n, u) => `Alue ${n}: leveys tai korkeus (${u})`,
    total: (u) => `Kokonaispinta-ala (${u})`,
    equivale: (u) => `Vastaa yksikössä ${u}`,
    parcial: (n, u) => `Alue ${n} (${u})`,
    errorMedida: "Tämä mitta puuttuu tai on 0.",
  }),
};
