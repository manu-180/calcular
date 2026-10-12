import { definirCalculadora } from "@/motor/calculo";

// Art. 142 del Código: el salario por día es lo pactado por el período dividido por sus días, y el
// salario por hora es el diario dividido por las horas de la jornada ordinaria.
const DIAS = { mensual: 30, quincenal: 15, semanal: 7, diario: 1 } as const;

export default definirCalculadora({
  id: "sv.salario-por-hora",
  mercado: "sv",
  concepto: "propio",
  slug: "salario-por-hora",
  estado: "publicado",
  requiere: {
    "sv.jornada-diurna": "numero",
    "sv.jornada-nocturna": "numero",
    "sv.semana-diurna": "numero",
    "sv.semana-nocturna": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Salario", min: 0 },
    {
      id: "periodo",
      tipo: "opcion",
      etiqueta: "Ese salario es",
      opciones: [
        { valor: "mensual", etiqueta: "Por mes" },
        { valor: "quincenal", etiqueta: "Por quincena" },
        { valor: "semanal", etiqueta: "Por semana" },
        { valor: "diario", etiqueta: "Por día" },
      ],
      porDefecto: "mensual",
    },
    {
      id: "jornada",
      tipo: "opcion",
      etiqueta: "Su jornada",
      opciones: [
        { valor: "diurna", etiqueta: "Diurna" },
        { valor: "nocturna", etiqueta: "Nocturna" },
      ],
      porDefecto: "diurna",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const diario = entrada.monto / DIAS[entrada.periodo];
    const horas = entrada.jornada === "diurna" ? valores["sv.jornada-diurna"] : valores["sv.jornada-nocturna"];
    return {
      diario: redondear(diario),
      hora: redondear(diario / horas),
      semanal: redondear(diario * DIAS.semanal),
      mensual: redondear(diario * DIAS.mensual),
      anual: redondear(diario * DIAS.mensual * 12),
    };
  },
  resultado: [
    { clave: "hora", etiqueta: "Salario por hora", formato: "moneda", destacada: true },
    { clave: "diario", etiqueta: "Salario por día", formato: "moneda" },
    { clave: "semanal", etiqueta: "Salario por semana", formato: "moneda" },
    { clave: "mensual", etiqueta: "Salario por mes", formato: "moneda" },
    { clave: "anual", etiqueta: "Salario por año (sin aguinaldo)", formato: "moneda" },
  ],
});
