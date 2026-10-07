import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "py.iva",
  mercado: "py",
  concepto: "iva",
  slug: "iva",
  estado: "publicado",
  requiere: {
    "py.iva-general": "numero",
    "py.iva-reducida": "numero",
  },
  campos: [
    {
      id: "operacion",
      tipo: "opcion",
      etiqueta: "Qué querés calcular",
      opciones: [
        { valor: "discriminar", etiqueta: "Sacar el IVA de un precio que ya lo incluye" },
        { valor: "agregar", etiqueta: "Sumar el IVA a un precio sin IVA" },
      ],
      porDefecto: "discriminar",
    },
    {
      id: "tasa",
      tipo: "opcion",
      etiqueta: "Tasa",
      opciones: [
        { valor: "general", etiqueta: "General (la mayoría de los bienes y servicios)" },
        { valor: "reducida", etiqueta: "Reducida (canasta básica, alquiler de vivienda, medicamentos, inmuebles)" },
      ],
      porDefecto: "general",
    },
    { id: "monto", tipo: "moneda", etiqueta: "Monto", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = entrada.tasa === "general" ? valores["py.iva-general"] : valores["py.iva-reducida"];
    const conIva = entrada.operacion === "discriminar";
    // Con el IVA incluido, el impuesto es precio × tasa / (100 + tasa): 1/11 al 10 % y 1/21 al 5 %.
    const iva = redondear(conIva ? (entrada.monto * tasa) / (100 + tasa) : (entrada.monto * tasa) / 100);
    const sinIva = conIva ? redondear(entrada.monto - iva) : entrada.monto;
    return {
      tasa,
      sinIva,
      iva,
      total: redondear(sinIva + iva),
    };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Tasa aplicada", formato: "porcentaje", decimales: 0 },
    { clave: "sinIva", etiqueta: "Precio sin IVA (gravado)", formato: "moneda" },
    { clave: "iva", etiqueta: "IVA", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "Precio con IVA", formato: "moneda" },
  ],
});
