import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

export const textosEs: TextosUi<UiImc> = {
  slug: "imc",
  ui: () => ({
    peso: (u) => `Peso (${u})`,
    altura: (u) => `Altura (${u})`,
    pies: "Altura: pies (ft)",
    pulgadas: "Altura: pulgadas (in)",
    imc: "Índice de masa corporal",
    categoria: "Categoría (OMS)",
    pesoMin: (u) => `Peso saludable desde (${u})`,
    pesoMax: (u) => `Peso saludable hasta (${u})`,
    rangoAyuda: "El rango de peso que da un IMC normal para esta altura.",
    bajo: "Bajo peso",
    normal: "Peso normal",
    sobrepeso: "Sobrepeso",
    obesidad1: "Obesidad grado 1",
    obesidad2: "Obesidad grado 2",
    obesidad3: "Obesidad grado 3",
    errorPeso: "El peso tiene que ser mayor que 0.",
    errorAltura: "La altura tiene que ser mayor que 0.",
    aviso:
      "El IMC es una referencia general para adultos: no distingue músculo de grasa y no sirve igual en el embarazo ni en menores de edad. No reemplaza la consulta con un profesional de la salud.",
  }),
};
