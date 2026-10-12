import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { CAMPO_MONEDA, enMoneda } from "../reglas";

export default definirCalculadora({
  id: "ve.anticipo-prestaciones",
  mercado: "ve",
  concepto: "propio",
  slug: "anticipo-de-prestaciones",
  estado: "publicado",
  requiere: {
    "ve.anticipo-prestaciones-tope": "numero",
  },
  campos: [
    { ...CAMPO_MONEDA, etiqueta: "En qué moneda está tu garantía" },
    {
      id: "garantia",
      tipo: "numero",
      etiqueta: "Garantía de prestaciones depositada",
      ayuda: "El capital que figura en tu fideicomiso o en el informe trimestral de la empresa, sin intereses.",
      min: 0,
    },
    {
      id: "anticipos",
      tipo: "numero",
      etiqueta: "Anticipos que ya recibiste",
      ayuda: "Si nunca pediste uno, déjalo en cero.",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.anticipos > entrada.garantia) {
      throw new ErrorEntrada("Los anticipos no pueden ser mayores que la garantía depositada.", "anticipos");
    }
    // Art. 144: el tope se mide sobre lo depositado; lo ya adelantado se descuenta de ese tope.
    const tope = redondear(porcentaje(entrada.garantia, valores["ve.anticipo-prestaciones-tope"]));
    const disponible = Math.max(0, redondear(tope - entrada.anticipos));
    const m = entrada.moneda;
    const [t, d, q] = [tope, disponible, redondear(entrada.garantia - entrada.anticipos - disponible)].map((x) => enMoneda(x, m));
    return {
      porcentaje: valores["ve.anticipo-prestaciones-tope"],
      topeBs: t.bs,
      topeUsd: t.usd,
      disponibleBs: d.bs,
      disponibleUsd: d.usd,
      quedaBs: q.bs,
      quedaUsd: q.usd,
      observaciones: [
        "Solo se puede pedir para comprar, construir, mejorar o reparar tu vivienda, liberar una hipoteca, pagar educación o gastos médicos tuyos o de tu familia.",
        "Lo que adelantes se descuenta de tus prestaciones al terminar la relación de trabajo.",
      ],
    };
  },
  resultado: [
    { clave: "porcentaje", etiqueta: "Máximo que permite la ley", formato: "porcentaje" },
    { clave: "topeBs", etiqueta: "Tope de anticipos sobre tu garantía", formato: "moneda", moneda: "VES" },
    { clave: "topeUsd", etiqueta: "Tope de anticipos sobre tu garantía", formato: "moneda", moneda: "USD" },
    { clave: "disponibleBs", etiqueta: "Anticipo que puedes pedir hoy", formato: "moneda", moneda: "VES", destacada: true },
    { clave: "disponibleUsd", etiqueta: "Anticipo que puedes pedir hoy", formato: "moneda", moneda: "USD", destacada: true },
    { clave: "quedaBs", etiqueta: "Lo que queda depositado", formato: "moneda", moneda: "VES" },
    { clave: "quedaUsd", etiqueta: "Lo que queda depositado", formato: "moneda", moneda: "USD" },
  ],
});
