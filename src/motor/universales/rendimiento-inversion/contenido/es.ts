import { formatearMonto, formatearNumero, montoEjemplo, segunTrato, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cagr, roi } from "../definicion";

export const contenidoEs: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const inicial = montoEjemplo(ctx, 10000);
  const final = montoEjemplo(ctx, 15000);
  return {
    h1: "Calculadora de rendimiento de una inversión",
    title: tituloQueEntre(`Rendimiento de una inversión (ROI) en ${ctx.nombrePais}`, `Rendimiento de inversión en ${ctx.nombrePais}`, "Calculadora de rendimiento de una inversión"),
    description: t(
      "Calcula el rendimiento total (ROI) y el rendimiento anual (CAGR) de una inversión a partir de lo que pusiste, lo que vale hoy y los años.",
      "Calcule el rendimiento total (ROI) y el rendimiento anual (CAGR) de una inversión a partir de lo que puso, lo que vale hoy y los años.",
      "Calculá el rendimiento total (ROI) y el rendimiento anual (CAGR) de una inversión a partir de lo que pusiste, lo que vale hoy y los años.",
    ),
    intro: [
      "Ganar un 50 % suena muy bien, pero no es lo mismo en 2 años que en 10. Para comparar inversiones hace falta el rendimiento por año.",
      t(
        "Escribe cuánto invertiste, cuánto vale hoy y cuántos años pasaron. Te mostramos el rendimiento total y el anual compuesto.",
        "Escriba cuánto invirtió, cuánto vale hoy y cuántos años pasaron. Le mostramos el rendimiento total y el anual compuesto.",
        "Escribí cuánto invertiste, cuánto vale hoy y cuántos años pasaron. Te mostramos el rendimiento total y el anual compuesto.",
      ),
    ],
    comoSeCalcula: [
      "ROI = (valor final + lo cobrado − inversión inicial) ÷ inversión inicial × 100.",
      "CAGR = ((valor final + lo cobrado) ÷ inversión inicial) elevado a (1 ÷ años), menos 1.",
      "El CAGR es la tasa anual compuesta: la que da el mismo resultado si se repite cada año.",
    ],
    ejemplo: [
      `Invertir ${m(inicial)} y terminar con ${m(final)} es una ganancia de ${m(final - inicial)}: un ROI de ${p(roi(inicial, final))}.`,
      `Si tardó 5 años, el rendimiento anual es de ${p(cagr(inicial, final, 5))}. Si tardó 2 años, de ${p(cagr(inicial, final, 2))}.`,
    ],
    faq: [
      {
        pregunta: "¿Qué diferencia hay entre ROI y CAGR?",
        respuesta:
          "El ROI es la ganancia total sobre lo invertido, sin importar el tiempo. El CAGR la reparte por año, así que sirve para comparar inversiones de distinta duración.",
      },
      {
        pregunta: "¿Por qué el rendimiento anual no es el total dividido por los años?",
        respuesta:
          `Porque las ganancias de cada año se suman al capital y también rinden. Un 50 % en 5 años es un ${p(cagr(1, 1.5, 5))} compuesto por año, no un 10 %.`,
      },
      {
        pregunta: "¿Cómo cuento los dividendos o intereses que cobré?",
        respuesta: t(
          "Súmalos en ganancias cobradas si los sacaste de la inversión. Si los reinvertiste, ya están dentro del valor final.",
          "Súmelos en ganancias cobradas si los sacó de la inversión. Si los reinvirtió, ya están dentro del valor final.",
          "Sumalos en ganancias cobradas si los sacaste de la inversión. Si los reinvertiste, ya están dentro del valor final.",
        ),
      },
    ],
    glosario: [
      { termino: "ROI", definicion: "Retorno sobre la inversión: la ganancia total como porcentaje de lo invertido." },
      { termino: "CAGR", definicion: "Tasa de crecimiento anual compuesta: el rendimiento promedio por año, con interés compuesto." },
    ],
  };
};
