import { formatearNumero, segunTrato, type ContenidoUniversal } from "../../tipos";
import { area, FT2_POR_M2 } from "../definicion";

export const contenidoEs: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const enL = area("rectangulo", 5, 4) + area("rectangulo", 3, 2);
  return {
    h1: "Calculadora de metros cuadrados",
    title: `Calcular metros cuadrados en ${ctx.nombrePais}`,
    description: t(
      "Calcula los metros cuadrados de un terreno, un piso o un ambiente: rectángulos, triángulos y círculos, y suma hasta cinco superficies.",
      "Calcule los metros cuadrados de un terreno, un piso o un ambiente: rectángulos, triángulos y círculos, y sume hasta cinco superficies.",
      "Calculá los metros cuadrados de un terreno, un piso o un ambiente: rectángulos, triángulos y círculos, y sumá hasta cinco superficies.",
    ),
    intro: [
      t(
        "Elige la forma y escribe sus medidas. Si el lugar no es un rectángulo simple, divídelo en partes y la calculadora las suma.",
        "Elija la forma y escriba sus medidas. Si el lugar no es un rectángulo simple, divídalo en partes y la calculadora las suma.",
        "Elegí la forma y escribí sus medidas. Si el lugar no es un rectángulo simple, dividilo en partes y la calculadora las suma.",
      ),
      "También muestra el resultado en pies cuadrados, por si un producto o un plano viene en esa unidad.",
    ],
    comoSeCalcula: [
      "Rectángulo: largo × ancho.",
      "Triángulo: base × altura ÷ 2.",
      `Círculo: π × radio × radio, donde el radio es la mitad del diámetro. 1 m² equivale a ${n(FT2_POR_M2)} ft².`,
    ],
    ejemplo: [
      `Una sala en forma de L se puede partir en un rectángulo de 5 × 4 m y otro de 3 × 2 m. En total son ${n(enL, 0)} m².`,
      `Una mesa redonda de 2 m de diámetro ocupa ${n(area("circulo", 2, 0))} m².`,
    ],
    faq: [
      {
        pregunta: "¿Cómo se calculan los metros cuadrados de una habitación?",
        respuesta: t(
          "Mide el largo y el ancho en metros y multiplícalos. Una habitación de 4 × 3 m tiene 12 m².",
          "Mida el largo y el ancho en metros y multiplíquelos. Una habitación de 4 × 3 m tiene 12 m².",
          "Medí el largo y el ancho en metros y multiplicalos. Una habitación de 4 × 3 m tiene 12 m².",
        ),
      },
      {
        pregunta: "¿Y si la medida está en centímetros?",
        respuesta: `Hay que pasarla a metros dividiendo por 100. 350 cm son ${n(3.5, 1)} m.`,
      },
      {
        pregunta: "¿Cómo paso de metros cuadrados a pies cuadrados?",
        respuesta: `Se multiplica por ${n(FT2_POR_M2)}. 20 m² son ${n(20 * FT2_POR_M2)} ft².`,
      },
    ],
    glosario: [
      { termino: "Metro cuadrado (m²)", definicion: "La superficie de un cuadrado de 1 metro de lado." },
      { termino: "Pie cuadrado (ft²)", definicion: "La superficie de un cuadrado de 1 pie de lado. Se usa en Estados Unidos." },
    ],
  };
};
