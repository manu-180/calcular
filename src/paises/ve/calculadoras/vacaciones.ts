import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_MONEDA, diasDeVacaciones, enMoneda } from "../reglas";

export default definirCalculadora({
  id: "ve.vacaciones",
  mercado: "ve",
  concepto: "vacaciones",
  slug: "vacaciones",
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
      ayuda: "Lo que cobras todos los meses como salario. Sin cestaticket ni bonos no salariales.",
      min: 0,
    },
    {
      id: "anios",
      tipo: "entero",
      etiqueta: "Años de servicio que cumples con estas vacaciones",
      ayuda: "Si es tu primer año completo, pon 1.",
      min: 1,
      max: 60,
      porDefecto: 1,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.anios < 1) throw new ErrorEntrada("Las vacaciones se ganan al cumplir el primer año. Si te vas antes, usa la calculadora de liquidación.", "anios");
    const d = diasDeVacaciones(entrada.anios, {
      base: valores["ve.vacaciones-dias-base"],
      topeAdicionales: valores["ve.vacaciones-dias-adicionales-tope"],
      bonoBase: valores["ve.bono-vacacional-dias-base"],
      bonoTope: valores["ve.bono-vacacional-dias-tope"],
    });
    const diario = entrada.salario / valores["ve.dias-mes-salario"];
    const m = entrada.moneda;
    const pago = enMoneda(redondear(d.vacaciones * diario), m);
    const bono = enMoneda(redondear(d.bono * diario), m);
    const total = enMoneda(redondear(d.vacaciones * diario) + redondear(d.bono * diario), m);
    return {
      diasVacaciones: d.vacaciones,
      diasBono: d.bono,
      pagoBs: pago.bs,
      pagoUsd: pago.usd,
      bonoBs: bono.bs,
      bonoUsd: bono.usd,
      totalBs: total.bs === null ? null : redondear(total.bs),
      totalUsd: total.usd === null ? null : redondear(total.usd),
      observaciones: ["Los días de vacaciones son hábiles. Si tu salario es mensual, los sábados, domingos y feriados del período ya están pagos con él."],
    };
  },
  resultado: [
    { clave: "diasVacaciones", etiqueta: "Días hábiles de vacaciones", formato: "dias" },
    { clave: "diasBono", etiqueta: "Días de bono vacacional", formato: "dias" },
    { clave: "pagoBs", etiqueta: "Pago de los días de vacaciones", formato: "moneda", moneda: "VES" },
    { clave: "pagoUsd", etiqueta: "Pago de los días de vacaciones", formato: "moneda", moneda: "USD" },
    { clave: "bonoBs", etiqueta: "Bono vacacional", formato: "moneda", moneda: "VES" },
    { clave: "bonoUsd", etiqueta: "Bono vacacional", formato: "moneda", moneda: "USD" },
    { clave: "totalBs", etiqueta: "Total a cobrar al salir de vacaciones", formato: "moneda", moneda: "VES", destacada: true },
    { clave: "totalUsd", etiqueta: "Total a cobrar al salir de vacaciones", formato: "moneda", moneda: "USD", destacada: true },
  ],
});
