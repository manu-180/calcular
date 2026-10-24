import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { costosDubai } from "../lib/inmuebles";

export default definirCalculadora({
  id: "ae.dubai-transfer-fee",
  mercado: "ae",
  concepto: "propio",
  slug: "dubai-transfer-fee",
  estado: "publicado",
  requiere: {
    "ae.dld-transfer-fee": "numero",
    "ae.dld-registrar-fee": "mapa",
    "ae.dld-mortgage-fee": "numero",
    "ae.dld-title-deed": "numero",
  },
  campos: [
    { id: "precio", tipo: "moneda", etiqueta: "Sale price", min: 0, porDefecto: 2000000 },
    { id: "prestamo", tipo: "moneda", etiqueta: "Mortgage amount (0 if you pay cash)", min: 0, porDefecto: 1500000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.precio <= 0) throw new ErrorEntrada("Enter the sale price.", "precio");
    const c = costosDubai(entrada.precio, entrada.prestamo, {
      tasa: v["ae.dld-transfer-fee"],
      registros: v["ae.dld-registrar-fee"],
      tasaHipoteca: v["ae.dld-mortgage-fee"],
      titulo: v["ae.dld-title-deed"],
    });
    return {
      total: redondear(c.total),
      transferencia: redondear(c.transferencia),
      registro: redondear(c.registro),
      hipoteca: redondear(c.hipoteca),
      titulo: redondear(c.titulo),
      sobrePrecio: (c.total / entrada.precio) * 100,
      observaciones: ["Knowledge and innovation fees, map fees and broker charges aren't included."],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Dubai Land Department costs", formato: "moneda", destacada: true },
    { clave: "transferencia", etiqueta: "Transfer fee on the sale value", formato: "moneda" },
    { clave: "registro", etiqueta: "Registration trustee fee", formato: "moneda" },
    { clave: "hipoteca", etiqueta: "Mortgage registration fee", formato: "moneda", ocultarSiCero: true },
    { clave: "titulo", etiqueta: "Title deed fee", formato: "moneda" },
    { clave: "sobrePrecio", etiqueta: "Share of the price", formato: "porcentaje", decimales: 2 },
  ],
});
