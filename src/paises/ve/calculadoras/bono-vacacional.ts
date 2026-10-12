import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_MONEDA, diasDeVacaciones, enMoneda } from "../reglas";

export default definirCalculadora({
  id: "ve.bono-vacacional",
  mercado: "ve",
  concepto: "propio",
  slug: "bono-vacacional",
  estado: "publicado",
  requiere: {
    "ve.dias-mes-salario": "numero",
    "ve.vacaciones-dias-base": "numero",
    "ve.vacaciones-dias-adicionales-tope": "numero",
    "ve.bono-vacacional-dias-base": "numero",
    "ve.bono-vacacional-dias-tope": "numero",
  },
  campos: [
    CAMPO_MONEDA,
    {
      id: "salario",
      tipo: "numero",
      etiqueta: "Salario normal mensual",
      ayuda: "Sin cestaticket ni bonos que no son salario.",
      min: 0,
    },
    {
      id: "anios",
      tipo: "entero",
      etiqueta: "Años de servicio que cumples con este bono",
      ayuda: "Si cumples tu primer año, pon 1.",
      min: 1,
      max: 60,
      porDefecto: 1,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.anios < 1) {
      throw new ErrorEntrada("El bono vacacional se gana al cumplir el primer año. Si te vas antes, usa la calculadora de vacaciones fraccionadas.", "anios");
    }
    const { bono } = diasDeVacaciones(entrada.anios, {
      base: valores["ve.vacaciones-dias-base"],
      topeAdicionales: valores["ve.vacaciones-dias-adicionales-tope"],
      bonoBase: valores["ve.bono-vacacional-dias-base"],
      bonoTope: valores["ve.bono-vacacional-dias-tope"],
    });
    const diario = entrada.salario / valores["ve.dias-mes-salario"];
    const d = enMoneda(redondear(diario), entrada.moneda);
    const monto = enMoneda(redondear(bono * diario), entrada.moneda);
    const observaciones = bono === valores["ve.bono-vacacional-dias-tope"] ? ["Llegaste al tope de días de bono vacacional que fija la ley."] : [];
    return { diasBono: bono, diarioBs: d.bs, diarioUsd: d.usd, bonoBs: monto.bs, bonoUsd: monto.usd, observaciones };
  },
  resultado: [
    { clave: "diasBono", etiqueta: "Días de bono vacacional", formato: "dias" },
    { clave: "diarioBs", etiqueta: "Salario normal diario", formato: "moneda", moneda: "VES" },
    { clave: "diarioUsd", etiqueta: "Salario normal diario", formato: "moneda", moneda: "USD" },
    { clave: "bonoBs", etiqueta: "Bono vacacional a cobrar", formato: "moneda", moneda: "VES", destacada: true },
    { clave: "bonoUsd", etiqueta: "Bono vacacional a cobrar", formato: "moneda", moneda: "USD", destacada: true },
  ],
});
