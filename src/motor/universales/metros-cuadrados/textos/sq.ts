import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosSq: TextosUi<UiMetrosCuadrados> = {
  slug: "kalkulator-metra-katrore",
  ui: () => ({
    forma: (n) => `Sipërfaqja ${n}: forma`,
    formaAyuda: "Nëse dhoma ka formë L ose është e parregullt, ndajeni në pjesë dhe kalkulatori i mbledh.",
    ninguna: "Nuk përdoret",
    rectangulo: "Drejtkëndësh ose katror",
    triangulo: "Trekëndësh",
    circulo: "Rreth",
    medidaA: (n, u) => `Sipërfaqja ${n}: gjatësia, baza ose diametri (${u})`,
    medidaAAyuda: "Drejtkëndësh: gjatësia dhe gjerësia. Trekëndësh: baza dhe lartësia. Rreth: vetëm diametri.",
    medidaB: (n, u) => `Sipërfaqja ${n}: gjerësia ose lartësia (${u})`,
    total: (u) => `Sipërfaqja totale (${u})`,
    equivale: (u) => `Ekuivalenti në ${u}`,
    parcial: (n, u) => `Sipërfaqja ${n} (${u})`,
    errorMedida: "Kjo masë mungon ose është 0.",
  }),
};
