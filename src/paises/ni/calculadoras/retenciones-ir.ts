import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

// Numeral 3 del artículo 44 del Reglamento: el mínimo por factura vale solo para tarjetas (2.1) y
// bienes y servicios en general (2.2); el resto se retiene con cualquier monto.
const CON_MINIMO = new Set(["tarjetas", "bienes-servicios"]);

export default definirCalculadora({
  id: "ni.retenciones-ir",
  mercado: "ni",
  concepto: "propio",
  slug: "retenciones-ir",
  estado: "publicado",
  requiere: {
    "ni.retenciones-ir": "mapa",
    "ni.retencion-minimo-factura": "numero",
  },
  campos: [
    { id: "tipo", tipo: "opcion-dato", dato: "ni.retenciones-ir", etiqueta: "Tipo de operación", porDefecto: "bienes-servicios" },
    { id: "monto", tipo: "moneda", etiqueta: "Monto de la factura sin IVA", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = enMapa(valores["ni.retenciones-ir"], entrada.tipo);
    const minimo = valores["ni.retencion-minimo-factura"];
    const bajoMinimo = CON_MINIMO.has(entrada.tipo) && entrada.monto < minimo;
    const retencion = bajoMinimo ? 0 : redondear(porcentaje(entrada.monto, tasa));
    const observaciones = bajoMinimo
      ? ["La factura es menor que el mínimo para retener en este tipo de operación: no se retiene."]
      : ["La retención es a cuenta del IR del proveedor. Quien retiene la entera a la DGI hasta el quinto día del mes siguiente."];
    return { tasa, retencion, neto: redondear(entrada.monto - retencion), observaciones };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Alícuota de retención", formato: "porcentaje", decimales: 1 },
    { clave: "retencion", etiqueta: "Retención del IR", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Pago al proveedor (sin IVA)", formato: "moneda" },
  ],
});
