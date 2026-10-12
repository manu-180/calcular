import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bo.retenciones",
  mercado: "bo",
  concepto: "retencion-honorarios",
  slug: "retenciones",
  estado: "publicado",
  requiere: {
    "bo.rc-iva-alicuota": "numero",
    "bo.it": "numero",
    "bo.iue": "numero",
    "bo.iue-utilidad-presunta": "mapa",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Qué paga sin factura",
      opciones: [
        { valor: "servicio", etiqueta: "Un servicio de una persona (honorarios, consultoría, oficio)" },
        { valor: "alquiler", etiqueta: "Un alquiler a una persona" },
        { valor: "bienes", etiqueta: "La compra de bienes a una persona" },
      ],
      porDefecto: "servicio",
    },
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "El monto que escribe es",
      opciones: [
        { valor: "bruto", etiqueta: "El total, y las retenciones salen de ahí" },
        { valor: "liquido", etiqueta: "Lo que la persona tiene que recibir limpio" },
      ],
      porDefecto: "bruto",
    },
    { id: "monto", tipo: "moneda", etiqueta: "Monto", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasaRc = entrada.tipo === "bienes" ? 0 : valores["bo.rc-iva-alicuota"];
    // Compra de bienes sin factura: IUE del 25 % sobre una utilidad presunta del 20 % (D.S. 24051, art. 3).
    const tasaIue = entrada.tipo === "bienes" ? porcentaje(valores["bo.iue"], enMapa(valores["bo.iue-utilidad-presunta"], "bienes")) : 0;
    const tasaIt = valores["bo.it"];
    const tasaTotal = tasaRc + tasaIue + tasaIt;
    // Si quien paga asume los impuestos ("grossing up"), el bruto es el líquido dividido por lo que queda.
    const bruto = entrada.modo === "bruto" ? entrada.monto : redondear(entrada.monto / (1 - tasaTotal / 100));
    const rcIva = redondear(porcentaje(bruto, tasaRc));
    const iue = redondear(porcentaje(bruto, tasaIue));
    const it = redondear(porcentaje(bruto, tasaIt));
    const total = redondear(rcIva + iue + it);
    return {
      bruto,
      rcIva,
      iue,
      it,
      tasaTotal,
      total,
      liquido: redondear(bruto - total),
      observaciones: [
        "Retiene la empresa, la institución pública o la empresa unipersonal que paga, cuando la persona no entrega factura.",
        "Si la persona está en el Régimen Tributario Simplificado o en el Agropecuario Unificado, no se le retiene el IT.",
      ],
    };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Monto total (bruto)", formato: "moneda" },
    { clave: "rcIva", etiqueta: "Retención de RC-IVA", formato: "moneda", ocultarSiCero: true },
    { clave: "iue", etiqueta: "Retención de IUE", formato: "moneda", ocultarSiCero: true },
    { clave: "it", etiqueta: "Retención de IT", formato: "moneda" },
    { clave: "tasaTotal", etiqueta: "Retención total", formato: "porcentaje", decimales: 0 },
    { clave: "total", etiqueta: "Total a retener y pagar al SIN", formato: "moneda" },
    { clave: "liquido", etiqueta: "La persona recibe", formato: "moneda", destacada: true },
  ],
});
