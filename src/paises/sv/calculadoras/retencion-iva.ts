import { definirCalculadora, porcentaje } from "@/motor/calculo";

// CT arts. 162 y 163: el 1 % va sobre el precio sin IVA y solo desde $100 por operación ("igual o superior").
export default definirCalculadora({
  id: "sv.retencion-iva",
  mercado: "sv",
  concepto: "propio",
  slug: "retencion-iva",
  estado: "publicado",
  requiere: {
    "sv.retencion-iva": "numero",
    "sv.retencion-iva-minimo": "numero",
    "sv.iva": "numero",
  },
  campos: [
    { id: "precio", tipo: "moneda", etiqueta: "Precio sin IVA", min: 0 },
    {
      id: "operacion",
      tipo: "opcion",
      etiqueta: "Qué hace el gran contribuyente",
      opciones: [
        { valor: "retencion", etiqueta: "Le compra a usted (retención)" },
        { valor: "percepcion", etiqueta: "Le vende a usted (percepción)" },
      ],
      porDefecto: "retencion",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const iva = redondear(porcentaje(entrada.precio, valores["sv.iva"]));
    const aplica = entrada.precio >= valores["sv.retencion-iva-minimo"];
    const anticipo = aplica ? redondear(porcentaje(entrada.precio, valores["sv.retencion-iva"])) : 0;
    const esRetencion = entrada.operacion === "retencion";
    return {
      iva,
      anticipo,
      total: redondear(entrada.precio + iva + (esRetencion ? -anticipo : anticipo)),
      observaciones: [
        aplica
          ? "Ese 1 % es un anticipo de IVA: lo resta del impuesto que declara ese mes."
          : "En operaciones de menos de $100 no se hace retención ni percepción.",
      ],
    };
  },
  resultado: [
    { clave: "iva", etiqueta: "IVA", formato: "moneda" },
    { clave: "anticipo", etiqueta: "Retención o percepción", formato: "moneda" },
    { clave: "total", etiqueta: "Total de la factura", formato: "moneda", destacada: true },
  ],
});
