import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_MONEDA, enMoneda } from "../reglas";

export default definirCalculadora({
  id: "ve.utilidades",
  mercado: "ve",
  concepto: "reparto-utilidades",
  slug: "utilidades",
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
    {
      id: "meses",
      tipo: "entero",
      etiqueta: "Meses completos trabajados en el año",
      min: 0,
      max: 12,
      porDefecto: 12,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const min = valores["ve.utilidades-dias-minimo"];
    const max = valores["ve.utilidades-dias-maximo"];
    if (entrada.dias < min || entrada.dias > max) throw new ErrorEntrada(`Las utilidades van de ${min} a ${max} días por año.`, "dias");
    if (entrada.meses > 12) throw new ErrorEntrada("Un año tiene 12 meses como máximo.", "meses");
    const diario = entrada.salario / valores["ve.dias-mes-salario"];
    const diasQueTocan = redondear((entrada.dias * entrada.meses) / 12);
    const monto = enMoneda(redondear((entrada.dias * entrada.meses * diario) / 12), entrada.moneda);
    const d = enMoneda(redondear(diario), entrada.moneda);
    const observaciones = entrada.meses < 12 ? ["Como no trabajaste el año completo, cobras la parte de los meses completos (utilidades fraccionadas)."] : [];
    return {
      diarioBs: d.bs,
      diarioUsd: d.usd,
      diasQueTocan,
      utilidadesBs: monto.bs,
      utilidadesUsd: monto.usd,
      observaciones,
    };
  },
  resultado: [
    { clave: "diarioBs", etiqueta: "Salario diario", formato: "moneda", moneda: "VES" },
    { clave: "diarioUsd", etiqueta: "Salario diario", formato: "moneda", moneda: "USD" },
    { clave: "diasQueTocan", etiqueta: "Días de utilidades que te tocan", formato: "dias" },
    { clave: "utilidadesBs", etiqueta: "Utilidades a cobrar", formato: "moneda", moneda: "VES", destacada: true },
    { clave: "utilidadesUsd", etiqueta: "Utilidades a cobrar", formato: "moneda", moneda: "USD", destacada: true },
  ],
});
