import { definirCalculadora } from "@/motor/calculo";
import { nombreMes } from "../lib/inflacion";
import { CAMPO_MONEDA, enMoneda } from "../reglas";

export default definirCalculadora({
  id: "ve.intereses-prestaciones",
  mercado: "ve",
  concepto: "propio",
  slug: "intereses-de-prestaciones",
  estado: "publicado",
  requiere: {
    "ve.tasa-prestaciones": "serie",
    "ve.tasa-activa": "serie",
  },
  campos: [
    { ...CAMPO_MONEDA, etiqueta: "En qué moneda está tu garantía" },
    { id: "garantia", tipo: "numero", etiqueta: "Garantía de prestaciones acumulada", min: 0 },
    {
      id: "donde",
      tipo: "opcion",
      etiqueta: "Dónde está tu garantía",
      opciones: [
        { valor: "contabilidad", etiqueta: "En la contabilidad de la empresa" },
        { valor: "sin-deposito", etiqueta: "La empresa no la depositó" },
      ],
      porDefecto: "contabilidad",
    },
    { id: "meses", tipo: "entero", etiqueta: "Meses de intereses", min: 1, max: 12, porDefecto: 12 },
  ],
  calcular(entrada, valores, { redondear }) {
    // Art. 143: en la contabilidad de la empresa rige el promedio entre activa y pasiva; sin depósito, la activa.
    const { fecha, valor: tasa } = entrada.donde === "contabilidad" ? valores["ve.tasa-prestaciones"] : valores["ve.tasa-activa"];
    const mensual = (entrada.garantia * tasa) / 100 / 12;
    const m = entrada.moneda;
    const [im, it] = [mensual, mensual * entrada.meses].map((x) => enMoneda(redondear(x), m));
    return {
      tasa,
      mesTasa: nombreMes(fecha),
      mensualBs: im.bs,
      mensualUsd: im.usd,
      totalBs: it.bs,
      totalUsd: it.usd,
      observaciones: [
        "Usamos la última tasa publicada por el BCV para todos los meses. Como cambia poco de un mes a otro, la diferencia con el cálculo mes a mes es chica.",
        "Si tu garantía está en un fideicomiso o en el Fondo Nacional de Prestaciones Sociales, los intereses son los que paga ese fondo, no esta tasa.",
        "Los intereses de prestaciones no pagan impuesto sobre la renta.",
      ],
    };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Tasa anual del BCV", formato: "porcentaje" },
    { clave: "mesTasa", etiqueta: "Mes de la tasa", formato: "texto" },
    { clave: "mensualBs", etiqueta: "Intereses de un mes", formato: "moneda", moneda: "VES" },
    { clave: "mensualUsd", etiqueta: "Intereses de un mes", formato: "moneda", moneda: "USD" },
    { clave: "totalBs", etiqueta: "Intereses del período", formato: "moneda", moneda: "VES", destacada: true },
    { clave: "totalUsd", etiqueta: "Intereses del período", formato: "moneda", moneda: "USD", destacada: true },
  ],
});
