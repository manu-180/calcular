import { definirCalculadora, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "py.salario-minimo",
  mercado: "py",
  concepto: "salario-minimo",
  slug: "salario-minimo",
  estado: "publicado",
  requiere: {
    "py.minimos": "mapa",
  },
  campos: [
    {
      id: "jornada",
      tipo: "opcion",
      etiqueta: "Jornada",
      opciones: [
        { valor: "diurna", etiqueta: "Diurna" },
        { valor: "nocturna", etiqueta: "Nocturna" },
      ],
      porDefecto: "diurna",
    },
    {
      id: "horas",
      tipo: "numero",
      etiqueta: "Horas por mes, si trabajás a tiempo parcial",
      ayuda: "Opcional. Te mostramos el mínimo para esas horas.",
      min: 0,
      max: 300,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const m = valores["py.minimos"];
    const noche = entrada.jornada === "nocturna";
    const horaParcial = enMapa(m, noche ? "hora-parcial-nocturna" : "hora-parcial");
    return {
      mensual: enMapa(m, noche ? "mensual-nocturno" : "mensual"),
      jornal: enMapa(m, noche ? "jornal-nocturno" : "jornal"),
      diario: enMapa(m, noche ? "diario-nocturno" : "diario"),
      hora: enMapa(m, noche ? "hora-nocturna" : "hora"),
      horaParcial,
      paraTusHoras: entrada.horas === null ? null : redondear(horaParcial * entrada.horas),
      observaciones: ["Es el mínimo para actividades diversas no especificadas. Algunos oficios tienen un mínimo propio más alto."],
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Salario mínimo mensual", formato: "moneda", destacada: true },
    { clave: "jornal", etiqueta: "Jornal mínimo (por día, para quien cobra por jornal)", formato: "moneda" },
    { clave: "diario", etiqueta: "Salario diario del mensualero", formato: "moneda" },
    { clave: "hora", etiqueta: "Hora del mensualero", formato: "moneda" },
    { clave: "horaParcial", etiqueta: "Hora a tiempo parcial", formato: "moneda" },
    { clave: "paraTusHoras", etiqueta: "Mínimo para tus horas", formato: "moneda" },
  ],
});
