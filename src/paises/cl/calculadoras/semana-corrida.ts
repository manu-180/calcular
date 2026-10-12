import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "cl.semana-corrida",
  mercado: "cl",
  concepto: "propio",
  slug: "semana-corrida",
  estado: "publicado",
  requiere: {},
  campos: [
    {
      id: "variable",
      tipo: "moneda",
      etiqueta: "Remuneración variable del período",
      ayuda: "Comisiones, tratos o pago por día del período de pago. Sin sueldo base, gratificación, aguinaldos ni bonos ocasionales.",
      min: 0,
    },
    {
      id: "diasLaborables",
      tipo: "entero",
      etiqueta: "Días que debías trabajar en el período",
      ayuda: "Los días de trabajo según tu jornada, aunque hayas faltado alguno. Por ejemplo, 22 en un mes de lunes a viernes.",
      min: 1,
      max: 31,
    },
    { id: "domingosFestivos", tipo: "entero", etiqueta: "Domingos y festivos del período", min: 0, max: 15 },
  ],
  calcular(entrada, _valores, { redondear }) {
    if (entrada.diasLaborables + entrada.domingosFestivos > 31) throw new ErrorEntrada("Entre días de trabajo, domingos y festivos no pueden pasar de 31.", "domingosFestivos");
    const promedio = entrada.variable / entrada.diasLaborables;
    return {
      promedioDiario: redondear(promedio),
      semanaCorrida: redondear(promedio * entrada.domingosFestivos),
    };
  },
  resultado: [
    { clave: "semanaCorrida", etiqueta: "Semana corrida a pagar", formato: "moneda", destacada: true },
    { clave: "promedioDiario", etiqueta: "Promedio de lo variable por día", formato: "moneda" },
  ],
});
