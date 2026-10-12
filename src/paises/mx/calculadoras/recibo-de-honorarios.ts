import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mx.recibo-de-honorarios",
  mercado: "mx",
  concepto: "retencion-honorarios",
  slug: "recibo-de-honorarios",
  estado: "publicado",
  requiere: {
    "mx.iva-general": "numero",
    "mx.retencion-isr-honorarios": "numero",
    "mx.retencion-isr-resico": "numero",
    "mx.retencion-iva-fraccion": "numero",
  },
  campos: [
    { id: "honorarios", tipo: "moneda", etiqueta: "Honorarios antes de IVA", min: 0 },
    {
      id: "regimen",
      tipo: "opcion",
      etiqueta: "Tu régimen fiscal",
      opciones: [
        { valor: "general", etiqueta: "Actividades profesionales (honorarios)" },
        { valor: "resico", etiqueta: "RESICO" },
      ],
      porDefecto: "general",
    },
    {
      id: "cliente",
      tipo: "opcion",
      etiqueta: "A quién le facturas",
      opciones: [
        { valor: "moral", etiqueta: "A una empresa (persona moral)" },
        { valor: "fisica", etiqueta: "A una persona física" },
      ],
      porDefecto: "moral",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const iva = redondear(porcentaje(entrada.honorarios, valores["mx.iva-general"]));
    const retiene = entrada.cliente === "moral";
    const tasaIsr = entrada.regimen === "resico" ? valores["mx.retencion-isr-resico"] : valores["mx.retencion-isr-honorarios"];
    const retencionIsr = retiene ? redondear(porcentaje(entrada.honorarios, tasaIsr)) : 0;
    const retencionIva = retiene ? redondear(iva * valores["mx.retencion-iva-fraccion"]) : 0;
    const observaciones: string[] = [];
    if (!retiene) observaciones.push("Una persona física no te retiene impuestos: cobras el total con IVA y tú pagas el ISR y el IVA en tu declaración mensual.");
    else observaciones.push("Lo retenido lo entera la empresa al SAT y tú lo acreditas en tu declaración mensual.");
    return {
      honorarios: entrada.honorarios,
      iva,
      subtotal: redondear(entrada.honorarios + iva),
      retencionIsr,
      retencionIva,
      total: redondear(entrada.honorarios + iva - retencionIsr - retencionIva),
      observaciones,
    };
  },
  resultado: [
    { clave: "honorarios", etiqueta: "Honorarios", formato: "moneda" },
    { clave: "iva", etiqueta: "IVA", formato: "moneda" },
    { clave: "subtotal", etiqueta: "Total con IVA", formato: "moneda" },
    { clave: "retencionIsr", etiqueta: "Retención de ISR", formato: "moneda", ocultarSiCero: true },
    { clave: "retencionIva", etiqueta: "Retención de IVA", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Lo que recibes", formato: "moneda", destacada: true },
  ],
});
