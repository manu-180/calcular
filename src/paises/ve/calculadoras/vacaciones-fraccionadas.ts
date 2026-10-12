import { definirCalculadora } from "@/motor/calculo";
import { CAMPO_MONEDA, diasDeVacaciones, enMoneda, textoTiempo, tiempoTrabajado, validarFechas } from "../reglas";

export default definirCalculadora({
  id: "ve.vacaciones-fraccionadas",
  mercado: "ve",
  concepto: "propio",
  slug: "vacaciones-fraccionadas",
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
      etiqueta: "Salario normal mensual al terminar",
      ayuda: "Sin cestaticket ni bonos que no son salario.",
      min: 0,
    },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fechaSalida", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    validarFechas(entrada.fechaIngreso, entrada.fechaSalida);
    const t = tiempoTrabajado(entrada.fechaIngreso, entrada.fechaSalida);
    // Art. 196: lo que se habría ganado en el año en curso, por meses completos de ese año.
    const enCurso = diasDeVacaciones(t.anios + 1, {
      base: valores["ve.vacaciones-dias-base"],
      topeAdicionales: valores["ve.vacaciones-dias-adicionales-tope"],
      bonoBase: valores["ve.bono-vacacional-dias-base"],
      bonoTope: valores["ve.bono-vacacional-dias-tope"],
    });
    const diario = entrada.salario / valores["ve.dias-mes-salario"];
    const vac = redondear((enCurso.vacaciones * t.meses * diario) / 12);
    const bono = redondear((enCurso.bono * t.meses * diario) / 12);
    const m = entrada.moneda;
    const [v, b, tot] = [vac, bono, redondear(vac + bono)].map((x) => enMoneda(x, m));
    const observaciones = ["Solo cuentan los meses completos desde tu último aniversario. Los días sueltos no suman."];
    if (t.anios > 0) observaciones.push("Si te deben vacaciones de años anteriores que no disfrutaste, se pagan aparte. Usa la calculadora de liquidación.");
    return {
      tiempo: textoTiempo(t),
      mesesFraccion: t.meses,
      diasVacaciones: redondear((enCurso.vacaciones * t.meses) / 12),
      diasBono: redondear((enCurso.bono * t.meses) / 12),
      vacacionesBs: v.bs,
      vacacionesUsd: v.usd,
      bonoBs: b.bs,
      bonoUsd: b.usd,
      totalBs: tot.bs,
      totalUsd: tot.usd,
      observaciones,
    };
  },
  resultado: [
    { clave: "tiempo", etiqueta: "Tiempo de servicio", formato: "texto" },
    { clave: "mesesFraccion", etiqueta: "Meses completos del año en curso", formato: "meses" },
    { clave: "diasVacaciones", etiqueta: "Días de vacaciones fraccionadas", formato: "dias", decimales: 2 },
    { clave: "diasBono", etiqueta: "Días de bono vacacional fraccionado", formato: "dias", decimales: 2 },
    { clave: "vacacionesBs", etiqueta: "Vacaciones fraccionadas", formato: "moneda", moneda: "VES" },
    { clave: "vacacionesUsd", etiqueta: "Vacaciones fraccionadas", formato: "moneda", moneda: "USD" },
    { clave: "bonoBs", etiqueta: "Bono vacacional fraccionado", formato: "moneda", moneda: "VES" },
    { clave: "bonoUsd", etiqueta: "Bono vacacional fraccionado", formato: "moneda", moneda: "USD" },
    { clave: "totalBs", etiqueta: "Total fraccionado a cobrar", formato: "moneda", moneda: "VES", destacada: true },
    { clave: "totalUsd", etiqueta: "Total fraccionado a cobrar", formato: "moneda", moneda: "USD", destacada: true },
  ],
});
