import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ve.iva",
  mercado: "ve",
  concepto: "iva",
  slug: "iva",
  estado: "publicado",
  requiere: {
    "ve.iva-general": "numero",
    "ve.iva-reducida": "numero",
  },
  campos: [
    {
      id: "operacion",
      tipo: "opcion",
      etiqueta: "Qué quieres calcular",
      opciones: [
        { valor: "sumar", etiqueta: "Sumar el IVA a un precio sin IVA" },
        { valor: "quitar", etiqueta: "Quitar el IVA de un precio con IVA" },
      ],
      porDefecto: "sumar",
    },
    {
      id: "alicuota",
      tipo: "opcion",
      etiqueta: "Alícuota",
      opciones: [
        { valor: "general", etiqueta: "General" },
        { valor: "reducida", etiqueta: "Reducida (algunos alimentos y productos de la ley)" },
      ],
      porDefecto: "general",
    },
    { id: "monto", tipo: "numero", etiqueta: "Monto (en bolívares o en dólares)", min: 0, porDefecto: 100 },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = entrada.alicuota === "general" ? valores["ve.iva-general"] : valores["ve.iva-reducida"];
    if (entrada.operacion === "sumar") {
      const iva = redondear(porcentaje(entrada.monto, tasa));
      return { tasa, base: redondear(entrada.monto), iva, total: redondear(entrada.monto + iva) };
    }
    const base = redondear(entrada.monto / (1 + tasa / 100));
    return { tasa, base, iva: redondear(entrada.monto - base), total: redondear(entrada.monto) };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Alícuota aplicada", formato: "porcentaje" },
    { clave: "base", etiqueta: "Precio sin IVA", formato: "numero", decimales: 2 },
    { clave: "iva", etiqueta: "IVA", formato: "numero", decimales: 2 },
    { clave: "total", etiqueta: "Precio con IVA", formato: "numero", decimales: 2, destacada: true },
  ],
});
