import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "py.salario-por-hora",
  mercado: "py",
  concepto: "propio",
  slug: "salario-por-hora",
  estado: "publicado",
  requiere: {
    "py.divisor-salario-diario": "numero",
    "py.divisor-jornal": "numero",
    "py.horas-jornada-diurna": "numero",
    "py.horas-jornada-nocturna": "numero",
    "py.minimos": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    {
      id: "jornada",
      tipo: "opcion",
      etiqueta: "Jornada",
      opciones: [
        { valor: "diurna", etiqueta: "Diurna (8 horas, entre las 6 y las 20)" },
        { valor: "nocturna", etiqueta: "Nocturna (7 horas, entre las 20 y las 6)" },
      ],
      porDefecto: "diurna",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const horas = entrada.jornada === "diurna" ? valores["py.horas-jornada-diurna"] : valores["py.horas-jornada-nocturna"];
    // Res. MTESS 670/2026, art. 1: el mensualero divide por 30 (incluye los días de descanso) y el
    // jornalero por 26 (solo días trabajados).
    const diario = entrada.salario / valores["py.divisor-salario-diario"];
    const jornal = entrada.salario / valores["py.divisor-jornal"];
    return {
      diario: redondear(diario),
      hora: redondear(diario / horas),
      jornal: redondear(jornal),
      horaJornal: redondear(jornal / horas),
      observaciones: ["Con el diario y la hora del mensualero se calculan las horas extra, las vacaciones y la indemnización."],
    };
  },
  resultado: [
    { clave: "diario", etiqueta: "Salario diario (mensualero)", formato: "moneda" },
    { clave: "hora", etiqueta: "Valor de tu hora (mensualero)", formato: "moneda", destacada: true },
    { clave: "jornal", etiqueta: "Jornal equivalente (si cobrás por día)", formato: "moneda" },
    { clave: "horaJornal", etiqueta: "Hora del jornalero", formato: "moneda" },
  ],
});
