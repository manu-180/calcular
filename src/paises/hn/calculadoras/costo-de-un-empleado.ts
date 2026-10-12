import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

const MESES = 12;

// Borrador por lo mismo que el salario neto: falta el techo del IHSS de 2026 y las tasas de
// Enfermedad y Maternidad en fuente primaria. El INFOP tampoco está verificado y no se suma.
export default definirCalculadora({
  id: "hn.costo-de-un-empleado",
  mercado: "hn",
  concepto: "costo-empleador",
  slug: "costo-de-un-empleado",
  estado: "borrador",
  requiere: {
    "hn.ihss-ivm": "mapa",
    "hn.ihss-em": "mapa",
    "hn.ihss-techo": "numero",
    "hn.rap-aporte": "mapa",
    "hn.reserva-laboral-tasa": "numero",
    "hn.decimo-tercero": "numero",
    "hn.decimo-cuarto": "numero",
  },
  campos: [{ id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 }],
  calcular(entrada, valores, { redondear }) {
    const techo = valores["hn.ihss-techo"];
    const baseIhss = Math.min(entrada.salario, techo);
    const ihss = redondear(porcentaje(baseIhss, enMapa(valores["hn.ihss-ivm"], "patrono") + enMapa(valores["hn.ihss-em"], "patrono")));
    const rap = redondear(porcentaje(Math.max(0, entrada.salario - techo), enMapa(valores["hn.rap-aporte"], "patrono")));
    const reserva = redondear(porcentaje(entrada.salario, valores["hn.reserva-laboral-tasa"]));
    const decimos = redondear(porcentaje(entrada.salario, valores["hn.decimo-tercero"] + valores["hn.decimo-cuarto"]) / MESES);
    const mensual = redondear(entrada.salario + ihss + rap + reserva + decimos);
    return { ihss, rap, reserva, decimos, mensual, anual: redondear(mensual * MESES) };
  },
  resultado: [
    { clave: "ihss", etiqueta: "IHSS del patrono", formato: "moneda" },
    { clave: "rap", etiqueta: "RAP del patrono", formato: "moneda", ocultarSiCero: true },
    { clave: "reserva", etiqueta: "Reserva Laboral", formato: "moneda" },
    { clave: "decimos", etiqueta: "Décimos tercer y cuarto mes (por mes)", formato: "moneda" },
    { clave: "mensual", etiqueta: "Costo mensual", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Costo anual", formato: "moneda" },
  ],
});
