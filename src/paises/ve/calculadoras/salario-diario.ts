import { definirCalculadora } from "@/motor/calculo";
import { CAMPO_MONEDA, enMoneda } from "../reglas";

export default definirCalculadora({
  id: "ve.salario-diario",
  mercado: "ve",
  concepto: "propio",
  slug: "salario-diario",
  estado: "publicado",
  requiere: {
    "ve.dias-mes-salario": "numero",
    "ve.jornada-diurna-horas": "numero",
    "ve.jornada-mixta-horas": "numero",
    "ve.jornada-nocturna-horas": "numero",
  },
  campos: [
    CAMPO_MONEDA,
    { id: "salario", tipo: "numero", etiqueta: "Salario mensual", min: 0 },
    {
      id: "jornada",
      tipo: "opcion",
      etiqueta: "Tipo de jornada",
      opciones: [
        { valor: "diurna", etiqueta: "Diurna (entre 5:00 a. m. y 7:00 p. m.)" },
        { valor: "mixta", etiqueta: "Mixta (horas de día y de noche)" },
        { valor: "nocturna", etiqueta: "Nocturna (entre 7:00 p. m. y 5:00 a. m.)" },
      ],
      porDefecto: "diurna",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const horas =
      entrada.jornada === "diurna"
        ? valores["ve.jornada-diurna-horas"]
        : entrada.jornada === "mixta"
          ? valores["ve.jornada-mixta-horas"]
          : valores["ve.jornada-nocturna-horas"];
    const diario = entrada.salario / valores["ve.dias-mes-salario"];
    const m = entrada.moneda;
    const [d, h, s, q] = [diario, diario / horas, diario * 7, entrada.salario / 2].map((x) => enMoneda(redondear(x), m));
    return {
      horasJornada: horas,
      diarioBs: d.bs,
      diarioUsd: d.usd,
      horaBs: h.bs,
      horaUsd: h.usd,
      semanalBs: s.bs,
      semanalUsd: s.usd,
      quincenaBs: q.bs,
      quincenaUsd: q.usd,
    };
  },
  resultado: [
    { clave: "horasJornada", etiqueta: "Horas máximas de tu jornada diaria", formato: "horas", decimales: 1 },
    { clave: "diarioBs", etiqueta: "Salario diario", formato: "moneda", moneda: "VES", destacada: true },
    { clave: "diarioUsd", etiqueta: "Salario diario", formato: "moneda", moneda: "USD", destacada: true },
    { clave: "horaBs", etiqueta: "Valor de la hora", formato: "moneda", moneda: "VES" },
    { clave: "horaUsd", etiqueta: "Valor de la hora", formato: "moneda", moneda: "USD" },
    { clave: "semanalBs", etiqueta: "Salario semanal (7 días)", formato: "moneda", moneda: "VES" },
    { clave: "semanalUsd", etiqueta: "Salario semanal (7 días)", formato: "moneda", moneda: "USD" },
    { clave: "quincenaBs", etiqueta: "Quincena", formato: "moneda", moneda: "VES" },
    { clave: "quincenaUsd", etiqueta: "Quincena", formato: "moneda", moneda: "USD" },
  ],
});
