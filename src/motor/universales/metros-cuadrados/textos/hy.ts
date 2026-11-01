import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

const unidad = (u: string) => ({ m: "մ", ft: "ֆուտ", "m²": "մ²", "ft²": "քառակուսի ֆուտ" })[u] ?? u;

export const textosHy: TextosUi<UiMetrosCuadrados> = {
  slug: "makeresi-hashvich",
  ui: () => ({
    forma: (n) => `Մակերես ${n}, ձևը`,
    formaAyuda: "Եթե սենյակը Լ-աձև է կամ անկանոն ձև ունի, բաժանեք այն մասերի և գումարեք։",
    ninguna: "Չի օգտագործվում",
    rectangulo: "Ուղղանկյուն կամ քառակուսի",
    triangulo: "Եռանկյուն",
    circulo: "Շրջան",
    medidaA: (n, u) => `Մակերես ${n}, երկարություն, հիմք կամ տրամագիծ (${unidad(u)})`,
    medidaAAyuda: "Ուղղանկյուն՝ երկարություն և լայնություն։ Եռանկյուն՝ հիմք և բարձրություն։ Շրջան՝ միայն տրամագիծ։",
    medidaB: (n, u) => `Մակերես ${n}, լայնություն կամ բարձրություն (${unidad(u)})`,
    total: (u) => `Ընդհանուր մակերես (${unidad(u)})`,
    equivale: (u) => `Համարժեք (${unidad(u)})`,
    parcial: (n, u) => `Մակերես ${n} (${unidad(u)})`,
    errorMedida: "Այս չափը բացակայում է կամ 0 է։",
  }),
};
