import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { horaDeMensual } from "../reglas";

export default definirCalculadora({
  id: "pa.feriado-trabajado",
  mercado: "pa",
  concepto: "propio",
  slug: "feriado-trabajado",
  estado: "publicado",
  requiere: {
    "pa.recargo-feriado": "numero",
    "pa.recargo-descanso": "mapa",
    "pa.jornada-semanal": "mapa",
    "pa.jornada-diaria": "mapa",
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
      id: "horas",
      tipo: "numero",
      etiqueta: "Horas que trabajaste el feriado",
      ayuda: "Déjalo vacío si fue una jornada completa.",
      min: 0,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const horasDia = enMapa(valores["pa.jornada-diaria"], entrada.jornada);
    const horas = entrada.horas ?? horasDia;
    if (horas > horasDia) {
      throw new ErrorEntrada(`Tu jornada es de ${horasDia} horas. Las horas de más se calculan como horas extra.`, "horas");
    }
    const tasa = valores["pa.recargo-feriado"];
    const hora = horaDeMensual(entrada.salario, enMapa(valores["pa.jornada-semanal"], entrada.jornada));
    const base = hora * horas;
    const compensatorio = enMapa(valores["pa.recargo-descanso"], "compensatorio");
    return {
      hora: redondear(hora),
      base: redondear(base),
      recargo: redondear((base * tasa) / 100),
      total: redondear(base * (1 + tasa / 100)),
      diaCompensatorio: redondear((hora * horasDia * compensatorio) / 100),
      observaciones: [
        `La ley dice que el recargo del ${tasa}% ya incluye el pago del día de descanso. Si cobras por mes, revisa en tu talonario que te sumen el recargo.`,
        "Además te deben otro día libre en la semana. Si lo trabajas, ese día lleva un recargo menor, que te mostramos aparte.",
      ],
    };
  },
  resultado: [
    { clave: "hora", etiqueta: "Valor de tu hora ordinaria", formato: "moneda" },
    { clave: "base", etiqueta: "Pago normal de las horas trabajadas", formato: "moneda" },
    { clave: "recargo", etiqueta: "Recargo por feriado", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "Valor total del día trabajado", formato: "moneda" },
    { clave: "diaCompensatorio", etiqueta: "Recargo si también trabajas el día libre que te deben", formato: "moneda" },
  ],
});
