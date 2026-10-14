import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "es.factura-autonomo",
  mercado: "es",
  concepto: "retencion-honorarios",
  slug: "factura-autonomo",
  estado: "publicado",
  requiere: {
    "es.iva-tipos": "mapa",
    "es.irpf-retencion-profesionales": "mapa",
  },
  campos: [
    { id: "base", tipo: "moneda", etiqueta: "Importe de tus servicios sin IVA", min: 0, porDefecto: 1000 },
    { id: "tipoIva", tipo: "opcion-dato", etiqueta: "Tipo de IVA", dato: "es.iva-tipos", porDefecto: "general" },
    {
      id: "retencion",
      tipo: "opcion",
      etiqueta: "Retención de IRPF",
      opciones: [
        { valor: "general", etiqueta: "General" },
        { valor: "inicio", etiqueta: "Inicio de actividad (el año de alta y los dos siguientes)" },
        { valor: "ninguna", etiqueta: "Sin retención (cliente particular o actividad empresarial)" },
      ],
      porDefecto: "general",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const tipoIva = enMapa(valores["es.iva-tipos"], entrada.tipoIva);
    const tipoRetencion = entrada.retencion === "ninguna" ? 0 : enMapa(valores["es.irpf-retencion-profesionales"], entrada.retencion);
    const iva = redondear(porcentaje(entrada.base, tipoIva));
    const retencion = redondear(porcentaje(entrada.base, tipoRetencion));
    const total = redondear(entrada.base + iva - retencion);
    return {
      iva,
      retencion,
      total,
      tipoIva,
      tipoRetencion,
      tuyo: redondear(entrada.base - retencion),
      observaciones: ["El IVA no es tuyo: lo ingresas a Hacienda cada trimestre. La retención es un adelanto de tu IRPF que ingresa tu cliente."],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total de la factura (lo que te paga el cliente)", formato: "moneda", destacada: true },
    { clave: "iva", etiqueta: "IVA", formato: "moneda" },
    { clave: "retencion", etiqueta: "Retención de IRPF", formato: "moneda", ocultarSiCero: true },
    { clave: "tuyo", etiqueta: "Lo que cobras sin contar el IVA", formato: "moneda" },
    { clave: "tipoIva", etiqueta: "Tipo de IVA", formato: "porcentaje" },
    { clave: "tipoRetencion", etiqueta: "Tipo de retención", formato: "porcentaje" },
  ],
});
