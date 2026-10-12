import { definirCalculadora, porcentaje } from "@/motor/calculo";

// Borrador: la alícuota del IGTF no se pudo leer en fuente primaria https (ver datos.json).
export default definirCalculadora({
  id: "ve.igtf",
  mercado: "ve",
  concepto: "propio",
  slug: "igtf",
  estado: "borrador",
  requiere: {
    "ve.igtf-divisas": "numero",
  },
  campos: [{ id: "monto", tipo: "numero", etiqueta: "Monto pagado en divisas", min: 0, porDefecto: 100 }],
  calcular(entrada, valores, { redondear }) {
    const igtf = redondear(porcentaje(entrada.monto, valores["ve.igtf-divisas"]));
    return { tasa: valores["ve.igtf-divisas"], igtf, total: redondear(entrada.monto + igtf) };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Alícuota del IGTF", formato: "porcentaje" },
    { clave: "igtf", etiqueta: "IGTF", formato: "numero", decimales: 2 },
    { clave: "total", etiqueta: "Total a pagar", formato: "numero", decimales: 2, destacada: true },
  ],
});
