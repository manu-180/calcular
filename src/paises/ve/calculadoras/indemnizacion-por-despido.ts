import { definirCalculadora } from "@/motor/calculo";
import { CAMPO_MONEDA, enMoneda } from "../reglas";
import prestaciones from "./prestaciones-sociales";

export default definirCalculadora({
  id: "ve.indemnizacion-por-despido",
  mercado: "ve",
  concepto: "indemnizacion-despido",
  slug: "indemnizacion-por-despido",
  estado: "publicado",
  requiere: prestaciones.requiere,
  campos: [
    CAMPO_MONEDA,
    {
      id: "salario",
      tipo: "numero",
      etiqueta: "Último salario mensual",
      ayuda: "Solo la parte salarial. El cestaticket y el bono de guerra económica no cuentan.",
      min: 0,
    },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fechaSalida", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
    {
      id: "diasUtilidades",
      tipo: "entero",
      etiqueta: "Días de utilidades que paga tu empresa al año",
      ayuda: "Si no lo sabes, deja el mínimo de ley.",
      min: 30,
      max: 120,
      porDefecto: 30,
    },
    {
      id: "garantia",
      tipo: "numero",
      etiqueta: "Garantía depositada hasta hoy, sin intereses (opcional)",
      ayuda: "Sale de tu fideicomiso o del informe trimestral de la empresa. Si lo dejas vacío, la estimamos con tu último salario.",
      min: 0,
      requerido: false,
    },
  ],
  calcular(entrada, valores, contexto) {
    // Art. 92: la indemnización es igual a las prestaciones sociales, así que se calcula con la misma regla.
    const p = prestaciones.calcular(entrada, valores, contexto);
    const monto = (p.totalBs ?? p.totalUsd ?? 0) as number;
    const m = entrada.moneda;
    const [pr, ind, tot] = [monto, monto, contexto.redondear(monto * 2)].map((x) => enMoneda(x, m));
    return {
      tiempo: p.tiempo,
      prestacionesBs: pr.bs,
      prestacionesUsd: pr.usd,
      indemnizacionBs: ind.bs,
      indemnizacionUsd: ind.usd,
      totalBs: tot.bs,
      totalUsd: tot.usd,
      observaciones: [
        "Aplica si te despiden sin causa justificada y decides no pedir el reenganche, o si la relación termina por causas ajenas a tu voluntad.",
        "Si te retiras por una causa justificada del artículo 80 de la LOTTT, también te corresponde.",
        "No incluye vacaciones, bono vacacional ni utilidades pendientes. Para todo junto usa la calculadora de liquidación.",
      ],
    };
  },
  resultado: [
    { clave: "tiempo", etiqueta: "Tiempo de servicio", formato: "texto" },
    { clave: "prestacionesBs", etiqueta: "Prestaciones sociales", formato: "moneda", moneda: "VES" },
    { clave: "prestacionesUsd", etiqueta: "Prestaciones sociales", formato: "moneda", moneda: "USD" },
    { clave: "indemnizacionBs", etiqueta: "Indemnización por despido (art. 92)", formato: "moneda", moneda: "VES" },
    { clave: "indemnizacionUsd", etiqueta: "Indemnización por despido (art. 92)", formato: "moneda", moneda: "USD" },
    { clave: "totalBs", etiqueta: "Prestaciones más indemnización", formato: "moneda", moneda: "VES", destacada: true },
    { clave: "totalUsd", etiqueta: "Prestaciones más indemnización", formato: "moneda", moneda: "USD", destacada: true },
  ],
});
