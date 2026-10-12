import { definirCalculadora, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "cr.salario-por-hora",
  mercado: "cr",
  concepto: "propio",
  slug: "salario-por-hora",
  estado: "publicado",
  requiere: {
    "cr.dias-mes-planilla": "numero",
    "cr.jornada-diaria": "mapa",
    "cr.recargo-horas-extra": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual bruto", min: 0 },
    { id: "jornada", tipo: "opcion-dato", etiqueta: "Jornada", dato: "cr.jornada-diaria", porDefecto: "diurna" },
  ],
  calcular(entrada, valores, { redondear }) {
    const horas = enMapa(valores["cr.jornada-diaria"], entrada.jornada);
    const diario = entrada.salario / valores["cr.dias-mes-planilla"];
    const hora = diario / horas;
    return {
      horasJornada: horas,
      diario: redondear(diario),
      hora: redondear(hora),
      horaExtra: redondear(hora * (1 + valores["cr.recargo-horas-extra"] / 100)),
      semanal: redondear(diario * 7),
      observaciones: [
        "El salario mensual paga 30 días, incluidos los de descanso. Por eso el diario es el mensual entre 30.",
        "Con jornada mixta o nocturna la hora vale más porque el mismo salario se reparte en menos horas.",
      ],
    };
  },
  resultado: [
    { clave: "horasJornada", etiqueta: "Horas de la jornada ordinaria diaria", formato: "horas" },
    { clave: "diario", etiqueta: "Salario por día", formato: "moneda" },
    { clave: "hora", etiqueta: "Salario por hora", formato: "moneda", destacada: true },
    { clave: "horaExtra", etiqueta: "Valor de una hora extra", formato: "moneda" },
    { clave: "semanal", etiqueta: "Salario por semana (7 días)", formato: "moneda" },
  ],
});
