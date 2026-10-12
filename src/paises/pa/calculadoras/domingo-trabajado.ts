import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { horaDeMensual } from "../reglas";

export default definirCalculadora({
  id: "pa.domingo-trabajado",
  mercado: "pa",
  concepto: "propio",
  slug: "domingo-trabajado",
  estado: "publicado",
  requiere: {
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
      id: "dia",
      tipo: "opcion-dato",
      etiqueta: "Qué día trabajaste",
      dato: "pa.recargo-descanso",
      porDefecto: "domingo",
    },
    {
      id: "horas",
      tipo: "numero",
      etiqueta: "Horas que trabajaste ese día",
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
    const recargo = enMapa(valores["pa.recargo-descanso"], entrada.dia);
    const hora = horaDeMensual(entrada.salario, enMapa(valores["pa.jornada-semanal"], entrada.jornada));
    const base = hora * horas;
    const observaciones = ["Este pago se suma a tu salario del mes."];
    if (entrada.dia === "domingo") observaciones.push("Además te deben otro día de descanso en la semana. Si también lo trabajas, ese día lleva el mismo recargo.");
    return {
      hora: redondear(hora),
      tasa: recargo,
      base: redondear(base),
      recargo: redondear((base * recargo) / 100),
      total: redondear(base * (1 + recargo / 100)),
      observaciones,
    };
  },
  resultado: [
    { clave: "hora", etiqueta: "Valor de tu hora ordinaria", formato: "moneda" },
    { clave: "tasa", etiqueta: "Recargo que corresponde", formato: "porcentaje", decimales: 0 },
    { clave: "base", etiqueta: "Pago de las horas trabajadas", formato: "moneda" },
    { clave: "recargo", etiqueta: "Recargo", formato: "moneda" },
    { clave: "total", etiqueta: "Total por el día trabajado", formato: "moneda", destacada: true },
  ],
});
