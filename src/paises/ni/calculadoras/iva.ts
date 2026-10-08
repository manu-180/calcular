import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "ni.iva",
  mercado: "ni",
  concepto: "iva",
  slug: "iva",
  estado: "publicado",
  requiere: {
    "ni.iva": "numero",
  },
  campos: [
    {
      id: "operacion",
      tipo: "opcion",
      etiqueta: "Qué querés calcular",
      opciones: [
        { valor: "agregar", etiqueta: "Sumar el IVA a un precio sin IVA" },
        { valor: "quitar", etiqueta: "Sacar el IVA de un precio que ya lo incluye" },
      ],
      porDefecto: "agregar",
    },
    { id: "monto", tipo: "moneda", etiqueta: "Monto", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = valores["ni.iva"];
    const conIva = entrada.operacion === "quitar";
    // Con el IVA incluido, el impuesto es precio × tasa / (100 + tasa).
    const iva = redondear(conIva ? (entrada.monto * tasa) / (100 + tasa) : (entrada.monto * tasa) / 100);
    const sinIva = conIva ? redondear(entrada.monto - iva) : entrada.monto;
    return { tasa, sinIva, iva, total: redondear(sinIva + iva) };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Alícuota", formato: "porcentaje", decimales: 0 },
    { clave: "sinIva", etiqueta: "Precio sin IVA", formato: "moneda" },
    { clave: "iva", etiqueta: "IVA", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "Precio con IVA", formato: "moneda" },
  ],
});
