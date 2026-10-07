import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ec.iva",
  mercado: "ec",
  concepto: "iva",
  slug: "iva",
  estado: "publicado",
  requiere: {
    "ec.iva": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto", min: 0 },
    {
      id: "operacion",
      tipo: "opcion",
      etiqueta: "¿Qué quieres hacer?",
      opciones: [
        { valor: "sumar", etiqueta: "Sumar el IVA a un precio sin IVA" },
        { valor: "quitar", etiqueta: "Quitar el IVA de un precio que ya lo incluye" },
      ],
      porDefecto: "sumar",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = valores["ec.iva"];
    const base = entrada.operacion === "sumar" ? entrada.monto : redondear(entrada.monto / (1 + tasa / 100));
    const iva = entrada.operacion === "sumar" ? redondear(porcentaje(base, tasa)) : redondear(entrada.monto - base);
    return { base, iva, total: redondear(base + iva) };
  },
  resultado: [
    { clave: "base", etiqueta: "Precio sin IVA", formato: "moneda" },
    { clave: "iva", etiqueta: "IVA", formato: "moneda" },
    { clave: "total", etiqueta: "Precio con IVA", formato: "moneda", destacada: true },
  ],
});
