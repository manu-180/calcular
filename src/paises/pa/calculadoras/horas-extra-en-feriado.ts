import { definirCalculadora, enMapa } from "@/motor/calculo";
import { horaDeMensual } from "../reglas";

export default definirCalculadora({
  id: "pa.horas-extra-en-feriado",
  mercado: "pa",
  concepto: "propio",
  slug: "horas-extra-en-feriado",
  estado: "publicado",
  requiere: {
    "pa.recargo-feriado": "numero",
    "pa.recargo-descanso": "mapa",
    "pa.recargo-horas-extra": "mapa",
    "pa.jornada-semanal": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    {
      id: "jornada",
      tipo: "opcion",
      etiqueta: "Tu jornada",
      opciones: [
        { valor: "diurna", etiqueta: "Diurna" },
        { valor: "nocturna", etiqueta: "Nocturna" },
        { valor: "mixta", etiqueta: "Mixta" },
      ],
      porDefecto: "diurna",
    },
    {
      id: "dia",
      tipo: "opcion",
      etiqueta: "Qué día fue",
      opciones: [
        { valor: "feriado", etiqueta: "Día de fiesta o duelo nacional" },
        { valor: "domingo", etiqueta: "Domingo o día de descanso semanal" },
      ],
      porDefecto: "feriado",
    },
    { id: "horas", tipo: "numero", etiqueta: "Horas extra de ese día", min: 0, porDefecto: 1 },
    {
      id: "periodo",
      tipo: "opcion-dato",
      etiqueta: "Cuándo fueron las horas extra",
      dato: "pa.recargo-horas-extra",
      porDefecto: "diurna",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const hora = horaDeMensual(entrada.salario, enMapa(valores["pa.jornada-semanal"], entrada.jornada));
    const recargoDia = entrada.dia === "feriado" ? valores["pa.recargo-feriado"] : enMapa(valores["pa.recargo-descanso"], "domingo");
    const recargoExtra = enMapa(valores["pa.recargo-horas-extra"], entrada.periodo);
    // Art. 50: primero se aplica el recargo del día y, sobre ese resultado, el de la hora extra.
    const horaDelDia = hora * (1 + recargoDia / 100);
    const horaExtra = horaDelDia * (1 + recargoExtra / 100);
    return {
      hora: redondear(hora),
      horaDelDia: redondear(horaDelDia),
      horaExtra: redondear(horaExtra),
      total: redondear(horaExtra * entrada.horas),
      observaciones: [
        "Esto es solo lo de las horas extra. La jornada normal de ese día se paga aparte, con su recargo de domingo o feriado.",
      ],
    };
  },
  resultado: [
    { clave: "hora", etiqueta: "Valor de tu hora ordinaria", formato: "moneda" },
    { clave: "horaDelDia", etiqueta: "Hora con el recargo del día", formato: "moneda" },
    { clave: "horaExtra", etiqueta: "Valor de cada hora extra", formato: "moneda" },
    { clave: "total", etiqueta: "Total de las horas extra", formato: "moneda", destacada: true },
  ],
});
