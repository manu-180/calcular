import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { CAMPO_MONEDA, enMoneda } from "../reglas";

export default definirCalculadora({
  id: "ve.horas-extra",
  mercado: "ve",
  concepto: "horas-extra",
  slug: "horas-extra",
  estado: "publicado",
  requiere: {
    "ve.dias-mes-salario": "numero",
    "ve.recargo-horas-extra": "numero",
    "ve.recargo-nocturno": "numero",
  },
  campos: [
    CAMPO_MONEDA,
    { id: "salario", tipo: "numero", etiqueta: "Salario normal mensual", min: 0 },
    {
      id: "jornada",
      tipo: "opcion",
      etiqueta: "Tipo de jornada",
      opciones: [
        { valor: "diurna", etiqueta: "Diurna (8 horas diarias, entre 5:00 a. m. y 7:00 p. m.)" },
        { valor: "mixta", etiqueta: "Mixta (7 horas y media diarias)" },
        { valor: "nocturna", etiqueta: "Nocturna (7 horas diarias, entre 7:00 p. m. y 5:00 a. m.)" },
      ],
      porDefecto: "diurna",
    },
    { id: "horas", tipo: "numero", etiqueta: "Horas extra trabajadas", min: 0, porDefecto: 1 },
  ],
  calcular(entrada, valores, { redondear }) {
    // Art. 173: límites diarios de cada jornada. El valor de la hora sale del salario diario entre esas horas.
    const horasJornada = entrada.jornada === "diurna" ? 8 : entrada.jornada === "mixta" ? 7.5 : 7;
    const diario = entrada.salario / valores["ve.dias-mes-salario"];
    const hora = diario / horasJornada;
    // Arts. 117 y 118: en jornada nocturna la base de la hora extra ya trae el bono nocturno.
    const base = entrada.jornada === "nocturna" ? hora + porcentaje(hora, valores["ve.recargo-nocturno"]) : hora;
    const horaExtra = base + porcentaje(base, valores["ve.recargo-horas-extra"]);
    const m = entrada.moneda;
    const h = enMoneda(redondear(hora), m);
    const he = enMoneda(redondear(horaExtra), m);
    const total = enMoneda(redondear(horaExtra * entrada.horas), m);
    return {
      horaBs: h.bs,
      horaUsd: h.usd,
      horaExtraBs: he.bs,
      horaExtraUsd: he.usd,
      totalBs: total.bs,
      totalUsd: total.usd,
      observaciones: ["La ley permite hasta 10 horas extra por semana y 100 por año. El recargo es un mínimo: tu contrato puede pagar más."],
    };
  },
  resultado: [
    { clave: "horaBs", etiqueta: "Valor de la hora normal", formato: "moneda", moneda: "VES" },
    { clave: "horaUsd", etiqueta: "Valor de la hora normal", formato: "moneda", moneda: "USD" },
    { clave: "horaExtraBs", etiqueta: "Valor de cada hora extra", formato: "moneda", moneda: "VES" },
    { clave: "horaExtraUsd", etiqueta: "Valor de cada hora extra", formato: "moneda", moneda: "USD" },
    { clave: "totalBs", etiqueta: "Total por horas extra", formato: "moneda", moneda: "VES", destacada: true },
    { clave: "totalUsd", etiqueta: "Total por horas extra", formato: "moneda", moneda: "USD", destacada: true },
  ],
});
