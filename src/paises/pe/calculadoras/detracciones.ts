import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pe.detracciones",
  mercado: "pe",
  concepto: "propio",
  slug: "detracciones",
  estado: "publicado",
  requiere: {
    "pe.detraccion-servicios": "mapa",
    "pe.monto-minimo-detraccion": "numero",
  },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Importe total de la factura (con IGV)", min: 0 },
    { id: "servicio", tipo: "opcion-dato", etiqueta: "Tipo de servicio", dato: "pe.detraccion-servicios", porDefecto: "demas-servicios" },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = enMapa(valores["pe.detraccion-servicios"], entrada.servicio);
    const minimo = valores["pe.monto-minimo-detraccion"];
    const aplica = entrada.importe > minimo;
    const detraccion = aplica ? redondear(porcentaje(entrada.importe, tasa)) : 0;
    const observaciones: string[] = [];
    if (!aplica) observaciones.push(`La detracción de servicios no se aplica si el importe es de S/ ${minimo} o menos.`);
    else observaciones.push("Quien paga la factura deposita la detracción en la cuenta del Banco de la Nación del proveedor y le paga el resto.");
    return { tasa, detraccion, saldo: redondear(entrada.importe - detraccion), observaciones };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Porcentaje de detracción", formato: "porcentaje" },
    { clave: "detraccion", etiqueta: "Monto a depositar en el Banco de la Nación", formato: "moneda", destacada: true },
    { clave: "saldo", etiqueta: "Monto a pagar al proveedor", formato: "moneda" },
  ],
});
