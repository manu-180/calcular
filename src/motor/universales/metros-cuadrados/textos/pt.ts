import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosPt: TextosUi<UiMetrosCuadrados> = {
  slug: "metros-quadrados",
  ui: () => ({
    forma: (n) => `Área ${n}: formato`,
    formaAyuda: "Se o espaço tem formato de L ou é irregular, divida em partes e some.",
    ninguna: "Não usar",
    rectangulo: "Retângulo ou quadrado",
    triangulo: "Triângulo",
    circulo: "Círculo",
    medidaA: (n, u) => `Área ${n}: comprimento, base ou diâmetro (${u})`,
    medidaAAyuda: "Retângulo: comprimento e largura. Triângulo: base e altura. Círculo: só o diâmetro.",
    medidaB: (n, u) => `Área ${n}: largura ou altura (${u})`,
    total: (u) => `Área total (${u})`,
    equivale: (u) => `Equivale em ${u}`,
    parcial: (n, u) => `Área ${n} (${u})`,
    errorMedida: "Falta esta medida ou ela está em 0.",
  }),
};
