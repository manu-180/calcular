import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pk.property-transfer-tax-calculator",
  mercado: "pk",
  concepto: "propio",
  slug: "property-transfer-tax-calculator",
  estado: "publicado",
  requiere: {
    "pk.wht-236c": "numero",
    "pk.wht-236k": "numero",
  },
  campos: [
    { id: "precio", tipo: "moneda", etiqueta: "Sale price (gross consideration)", min: 0, porDefecto: 20000000 },
    { id: "valor", tipo: "moneda", etiqueta: "Fair market value (FBR valuation)", requerido: false, min: 0, ayuda: "Leave empty to use the sale price." },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.precio <= 0) throw new ErrorEntrada("Enter the sale price.", "precio");
    const valor = entrada.valor ?? entrada.precio;
    const vendedor = redondear(porcentaje(entrada.precio, v["pk.wht-236c"]));
    const comprador = redondear(porcentaje(valor, v["pk.wht-236k"]));
    return { vendedor, comprador, total: redondear(vendedor + comprador) };
  },
  resultado: [
    { clave: "total", etiqueta: "Advance tax on the transfer (both sides)", formato: "moneda", destacada: true },
    { clave: "vendedor", etiqueta: "Seller pays (section 236C)", formato: "moneda" },
    { clave: "comprador", etiqueta: "Buyer pays (section 236K)", formato: "moneda" },
  ],
});
