import { aplicarEscala, definirCalculadora } from "@/motor/calculo";
import { filaDe } from "../reglas";
import { uvtDelAnio } from "../lib/uvt-anual";

export default definirCalculadora({
  id: "co.impuesto-de-renta",
  mercado: "co",
  concepto: "propio",
  slug: "impuesto-de-renta",
  estado: "publicado",
  requiere: {
    "co.uvt": "numero",
    "co.renta-tabla": "escala",
  },
  campos: [
    {
      id: "anio",
      tipo: "opcion",
      etiqueta: "Año gravable",
      ayuda: "En 2026 se declara el año gravable 2025.",
      opciones: [
        { valor: "2025", etiqueta: "2025 (se declara en 2026)" },
        { valor: "2026", etiqueta: "2026 (se declara en 2027)" },
      ],
      porDefecto: "2025",
    },
    {
      id: "base",
      tipo: "moneda",
      etiqueta: "Renta líquida gravable del año",
      ayuda: "Tus ingresos menos lo no gravado, deducciones y rentas exentas. Es el renglón de la renta gravable de la cédula general.",
      min: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const uvt = uvtDelAnio(Number(entrada.anio), "anio");
    const tabla = valores["co.renta-tabla"];
    const baseUvt = entrada.base / uvt;
    const impuestoUvt = aplicarEscala(tabla, baseUvt);
    const impuesto = redondear(impuestoUvt * uvt);
    return {
      uvt,
      baseUvt,
      tarifaMarginal: filaDe(tabla, baseUvt).tasa,
      impuesto,
      tasaEfectiva: entrada.base > 0 ? (impuesto / entrada.base) * 100 : 0,
    };
  },
  resultado: [
    { clave: "uvt", etiqueta: "UVT del año gravable", formato: "moneda", decimales: 0 },
    { clave: "baseUvt", etiqueta: "Renta gravable en UVT", formato: "numero", decimales: 2 },
    { clave: "tarifaMarginal", etiqueta: "Tarifa marginal", formato: "porcentaje" },
    { clave: "tasaEfectiva", etiqueta: "Tasa efectiva sobre la renta gravable", formato: "porcentaje", decimales: 2 },
    { clave: "impuesto", etiqueta: "Impuesto de renta", formato: "moneda", decimales: 0, destacada: true },
  ],
});
