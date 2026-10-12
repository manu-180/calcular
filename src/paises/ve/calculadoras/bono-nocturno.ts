import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { CAMPO_MONEDA, enMoneda } from "../reglas";

export default definirCalculadora({
  id: "ve.bono-nocturno",
  mercado: "ve",
  concepto: "propio",
  slug: "bono-nocturno",
  estado: "publicado",
  requiere: {
    "ve.dias-mes-salario": "numero",
    "ve.jornada-diurna-horas": "numero",
    "ve.jornada-nocturna-horas": "numero",
    "ve.recargo-nocturno": "numero",
  },
  campos: [
    CAMPO_MONEDA,
    { id: "salario", tipo: "numero", etiqueta: "Salario normal mensual", min: 0 },
    {
      id: "unidad",
      tipo: "opcion",
      etiqueta: "Qué trabajaste de noche",
      opciones: [
        { valor: "jornadas", etiqueta: "Jornadas nocturnas completas" },
        { valor: "horas", etiqueta: "Horas sueltas entre las 7:00 p. m. y las 5:00 a. m." },
      ],
      porDefecto: "jornadas",
    },
    { id: "cantidad", tipo: "numero", etiqueta: "Cantidad de jornadas u horas en el período", min: 0, porDefecto: 1 },
  ],
  calcular(entrada, valores, { redondear }) {
    const diario = entrada.salario / valores["ve.dias-mes-salario"];
    const hora = diario / valores["ve.jornada-diurna-horas"];
    // Art. 117: el recargo se calcula sobre el salario convenido para la jornada diurna.
    const base = entrada.unidad === "jornadas" ? diario : hora;
    const recargo = porcentaje(base, valores["ve.recargo-nocturno"]);
    const m = entrada.moneda;
    const [b, r, t, tot] = [base, recargo, base + recargo, recargo * entrada.cantidad].map((x) => enMoneda(redondear(x), m));
    return {
      baseBs: b.bs,
      baseUsd: b.usd,
      recargoBs: r.bs,
      recargoUsd: r.usd,
      conRecargoBs: t.bs,
      conRecargoUsd: t.usd,
      bonoBs: tot.bs,
      bonoUsd: tot.usd,
      observaciones: [
        "El 30 % es un mínimo: tu contrato puede pagar más.",
        "Si haces horas extra de noche, el recargo de horas extra se calcula sobre la hora que ya lleva el bono nocturno.",
      ],
    };
  },
  resultado: [
    { clave: "baseBs", etiqueta: "Valor de la jornada u hora diurna", formato: "moneda", moneda: "VES" },
    { clave: "baseUsd", etiqueta: "Valor de la jornada u hora diurna", formato: "moneda", moneda: "USD" },
    { clave: "recargoBs", etiqueta: "Bono nocturno por cada una", formato: "moneda", moneda: "VES" },
    { clave: "recargoUsd", etiqueta: "Bono nocturno por cada una", formato: "moneda", moneda: "USD" },
    { clave: "conRecargoBs", etiqueta: "Valor de cada una con el bono", formato: "moneda", moneda: "VES" },
    { clave: "conRecargoUsd", etiqueta: "Valor de cada una con el bono", formato: "moneda", moneda: "USD" },
    { clave: "bonoBs", etiqueta: "Bono nocturno del período", formato: "moneda", moneda: "VES", destacada: true },
    { clave: "bonoUsd", etiqueta: "Bono nocturno del período", formato: "moneda", moneda: "USD", destacada: true },
  ],
});
