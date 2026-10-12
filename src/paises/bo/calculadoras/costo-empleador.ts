import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

const MESES_DEL_ANIO = 12;

export default definirCalculadora({
  id: "bo.costo-empleador",
  mercado: "bo",
  concepto: "costo-empleador",
  slug: "costo-empleador",
  estado: "publicado",
  requiere: {
    "bo.aporte-salud-patronal": "numero",
    "bo.aportes-patronales": "mapa",
  },
  campos: [{ id: "totalGanado", tipo: "moneda", etiqueta: "Total ganado mensual del trabajador", min: 0 }],
  calcular(entrada, valores, { redondear }) {
    const tg = entrada.totalGanado;
    const patronales = valores["bo.aportes-patronales"];
    const salud = redondear(porcentaje(tg, valores["bo.aporte-salud-patronal"]));
    const gestora = redondear(redondear(porcentaje(tg, enMapa(patronales, "solidario"))) + redondear(porcentaje(tg, enMapa(patronales, "riesgo-profesional"))));
    // Aguinaldo e indemnización valen un sueldo por año cada uno: se provisiona un doceavo por mes.
    const provisionAguinaldo = redondear(tg / MESES_DEL_ANIO);
    const provisionIndemnizacion = redondear(tg / MESES_DEL_ANIO);
    const mensual = redondear(tg + salud + gestora + provisionAguinaldo + provisionIndemnizacion);
    return {
      salud,
      gestora,
      provisionAguinaldo,
      provisionIndemnizacion,
      mensual,
      anual: redondear(mensual * MESES_DEL_ANIO),
      observaciones: [
        "No sumamos la prima anual, que depende de las utilidades de la empresa.",
        "Si su empresa paga un aporte para vivienda u otro aporte sectorial, súmelo aparte.",
      ],
    };
  },
  resultado: [
    { clave: "salud", etiqueta: "Aporte a la caja de salud", formato: "moneda" },
    { clave: "gestora", etiqueta: "Aportes patronales a la Gestora", formato: "moneda" },
    { clave: "provisionAguinaldo", etiqueta: "Provisión de aguinaldo", formato: "moneda" },
    { clave: "provisionIndemnizacion", etiqueta: "Provisión de indemnización", formato: "moneda" },
    { clave: "mensual", etiqueta: "Costo mensual total", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Costo anual", formato: "moneda" },
  ],
});
