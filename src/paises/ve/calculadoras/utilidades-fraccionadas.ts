import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";
import { CAMPO_MONEDA, enMoneda, mesesCompletos, validarFechas } from "../reglas";

export default definirCalculadora({
  id: "ve.utilidades-fraccionadas",
  mercado: "ve",
  concepto: "propio",
  slug: "utilidades-fraccionadas",
  estado: "publicado",
  requiere: {
    "ve.dias-mes-salario": "numero",
    "ve.utilidades-dias-minimo": "numero",
    "ve.utilidades-dias-maximo": "numero",
  },
  campos: [
    CAMPO_MONEDA,
    {
      id: "salario",
      tipo: "numero",
      etiqueta: "Salario mensual",
      ayuda: "Solo la parte salarial. El cestaticket y el bono de guerra económica no cuentan.",
      min: 0,
    },
    {
      id: "dias",
      tipo: "entero",
      etiqueta: "Días de utilidades que paga tu empresa al año",
      ayuda: "Si no lo sabes, deja el mínimo de ley.",
      min: 30,
      max: 120,
      porDefecto: 30,
    },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fechaSalida", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    validarFechas(entrada.fechaIngreso, entrada.fechaSalida);
    const min = valores["ve.utilidades-dias-minimo"];
    const max = valores["ve.utilidades-dias-maximo"];
    if (entrada.dias < min || entrada.dias > max) throw new ErrorEntrada(`Las utilidades van de ${min} a ${max} días por año.`, "dias");
    // Art. 131: meses completos dentro del ejercicio; se toma el año calendario, el cierre más común.
    const inicio = `${entrada.fechaSalida.slice(0, 4)}-01-01` as FechaISO;
    const desde = entrada.fechaIngreso > inicio ? entrada.fechaIngreso : inicio;
    const meses = Math.min(12, mesesCompletos(desde, entrada.fechaSalida));
    const diario = entrada.salario / valores["ve.dias-mes-salario"];
    const monto = enMoneda(redondear((entrada.dias * meses * diario) / 12), entrada.moneda);
    return {
      meses,
      diasQueTocan: redondear((entrada.dias * meses) / 12),
      utilidadesBs: monto.bs,
      utilidadesUsd: monto.usd,
      observaciones: [
        "Tomamos el año calendario. Si tu empresa cierra su ejercicio en otra fecha, cuenta los meses desde ese cierre.",
        "Si en diciembre ya te adelantaron utilidades de este ejercicio, se descuentan de este monto.",
      ],
    };
  },
  resultado: [
    { clave: "meses", etiqueta: "Meses completos del ejercicio", formato: "meses" },
    { clave: "diasQueTocan", etiqueta: "Días de utilidades que te tocan", formato: "dias", decimales: 2 },
    { clave: "utilidadesBs", etiqueta: "Utilidades fraccionadas", formato: "moneda", moneda: "VES", destacada: true },
    { clave: "utilidadesUsd", etiqueta: "Utilidades fraccionadas", formato: "moneda", moneda: "USD", destacada: true },
  ],
});
