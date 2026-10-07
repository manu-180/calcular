import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "py.horas-extra",
  mercado: "py",
  concepto: "horas-extra",
  slug: "horas-extra",
  estado: "publicado",
  requiere: {
    "py.divisor-salario-diario": "numero",
    "py.horas-jornada-diurna": "numero",
    "py.horas-jornada-nocturna": "numero",
    "py.recargo-hora-extra": "numero",
    "py.recargo-nocturno": "numero",
    "py.recargo-extra-nocturna": "numero",
    "py.recargo-feriado": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    {
      id: "jornada",
      tipo: "opcion",
      etiqueta: "Tu jornada habitual",
      opciones: [
        { valor: "diurna", etiqueta: "Diurna (entre las 6 y las 20)" },
        { valor: "nocturna", etiqueta: "Nocturna (entre las 20 y las 6)" },
      ],
      porDefecto: "diurna",
    },
    { id: "extraDiurnas", tipo: "numero", etiqueta: "Horas extra de día", ayuda: "Las que hiciste entre las 6 y las 20.", min: 0, max: 400, porDefecto: 0 },
    { id: "extraNocturnas", tipo: "numero", etiqueta: "Horas extra de noche", ayuda: "Las que hiciste entre las 20 y las 6.", min: 0, max: 400, porDefecto: 0 },
    { id: "feriado", tipo: "numero", etiqueta: "Horas trabajadas en feriado", min: 0, max: 400, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const diurna = entrada.jornada === "diurna";
    // Resolución MTESS 670/2026: el salario diario del mensualero es el mensual dividido 30, y la hora,
    // el diario dividido 8 (diurna) o 7 (nocturna).
    const diario = entrada.salario / valores["py.divisor-salario-diario"];
    const hora = diario / (diurna ? valores["py.horas-jornada-diurna"] : valores["py.horas-jornada-nocturna"]);
    // Código del Trabajo, art. 234: la hora extra nocturna lleva 100 % sobre la hora ordinaria nocturna,
    // que para quien trabaja de día es su hora más el 30 % de nocturnidad.
    const horaNocturna = diurna ? hora * (1 + valores["py.recargo-nocturno"] / 100) : hora;
    const valorExtraDiurna = hora * (1 + valores["py.recargo-hora-extra"] / 100);
    const valorExtraNocturna = horaNocturna * (1 + valores["py.recargo-extra-nocturna"] / 100);
    const valorFeriado = hora * (1 + valores["py.recargo-feriado"] / 100);

    const pagoDiurnas = redondear(valorExtraDiurna * entrada.extraDiurnas);
    const pagoNocturnas = redondear(valorExtraNocturna * entrada.extraNocturnas);
    const pagoFeriado = redondear(valorFeriado * entrada.feriado);
    return {
      hora: redondear(hora),
      valorExtraDiurna: redondear(valorExtraDiurna),
      valorExtraNocturna: redondear(valorExtraNocturna),
      valorFeriado: redondear(valorFeriado),
      pagoDiurnas,
      pagoNocturnas,
      pagoFeriado,
      total: redondear(pagoDiurnas + pagoNocturnas + pagoFeriado),
      observaciones: ["Son montos brutos. Las horas extra suman al aguinaldo y pagan aporte al IPS."],
    };
  },
  resultado: [
    { clave: "hora", etiqueta: "Tu hora ordinaria", formato: "moneda" },
    { clave: "valorExtraDiurna", etiqueta: "Hora extra de día", formato: "moneda" },
    { clave: "valorExtraNocturna", etiqueta: "Hora extra de noche", formato: "moneda" },
    { clave: "valorFeriado", etiqueta: "Hora en feriado", formato: "moneda" },
    { clave: "pagoDiurnas", etiqueta: "Por tus horas extra de día", formato: "moneda", ocultarSiCero: true },
    { clave: "pagoNocturnas", etiqueta: "Por tus horas extra de noche", formato: "moneda", ocultarSiCero: true },
    { clave: "pagoFeriado", etiqueta: "Por tus horas en feriado", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total a cobrar", formato: "moneda", destacada: true },
  ],
});
