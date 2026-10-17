import { segunTrato, type TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosEs: TextosUi<UiMetrosCuadrados> = {
  slug: "metros-cuadrados",
  ui: (trato) => ({
    forma: (n) => `Superficie ${n}: forma`,
    formaAyuda: segunTrato(trato, {
      tu: "Si el espacio tiene forma de L o es irregular, divídelo en partes y súmalas.",
      usted: "Si el espacio tiene forma de L o es irregular, divídalo en partes y súmelas.",
      vos: "Si el espacio tiene forma de L o es irregular, dividilo en partes y sumalas.",
    }),
    ninguna: "No usar",
    rectangulo: "Rectángulo o cuadrado",
    triangulo: "Triángulo",
    circulo: "Círculo",
    medidaA: (n, u) => `Superficie ${n}: largo, base o diámetro (${u})`,
    medidaAAyuda: "Rectángulo: largo y ancho. Triángulo: base y altura. Círculo: solo el diámetro.",
    medidaB: (n, u) => `Superficie ${n}: ancho o altura (${u})`,
    total: (u) => `Superficie total (${u})`,
    equivale: (u) => `Equivale a (${u})`,
    parcial: (n, u) => `Superficie ${n} (${u})`,
    errorMedida: "Falta esta medida o es 0.",
  }),
};
