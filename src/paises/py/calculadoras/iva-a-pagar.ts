import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "py.iva-a-pagar",
  mercado: "py",
  concepto: "propio",
  slug: "iva-a-pagar",
  estado: "publicado",
  requiere: {
    "py.iva-general": "numero",
    "py.iva-reducida": "numero",
  },
  campos: [
    { id: "ventas10", tipo: "moneda", etiqueta: "Ventas del mes con IVA 10 % (IVA incluido)", min: 0, porDefecto: 0 },
    { id: "ventas5", tipo: "moneda", etiqueta: "Ventas del mes con IVA 5 % (IVA incluido)", min: 0, porDefecto: 0 },
    { id: "compras10", tipo: "moneda", etiqueta: "Compras del mes con IVA 10 % (IVA incluido)", ayuda: "Solo las de tu actividad, con factura a tu RUC.", min: 0, porDefecto: 0 },
    { id: "compras5", tipo: "moneda", etiqueta: "Compras del mes con IVA 5 % (IVA incluido)", min: 0, porDefecto: 0 },
    { id: "saldoAnterior", tipo: "moneda", etiqueta: "Saldo a favor del mes anterior", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const g = valores["py.iva-general"];
    const r = valores["py.iva-reducida"];
    // Con el IVA incluido, el impuesto es monto × tasa / (100 + tasa): 1/11 al 10 % y 1/21 al 5 %.
    const incluido = (monto: number, tasa: number) => (monto * tasa) / (100 + tasa);
    const debito = redondear(incluido(entrada.ventas10, g) + incluido(entrada.ventas5, r));
    const credito = redondear(incluido(entrada.compras10, g) + incluido(entrada.compras5, r));
    const saldo = debito - credito - entrada.saldoAnterior;
    return {
      debito,
      credito,
      aPagar: Math.max(0, saldo),
      saldoAFavor: Math.max(0, -saldo),
      observaciones: ["Es una estimación del formulario 120. Las compras sin factura legal o ajenas a tu actividad no dan crédito fiscal."],
    };
  },
  resultado: [
    { clave: "debito", etiqueta: "IVA de tus ventas (débito fiscal)", formato: "moneda" },
    { clave: "credito", etiqueta: "IVA de tus compras (crédito fiscal)", formato: "moneda" },
    { clave: "aPagar", etiqueta: "IVA a pagar", formato: "moneda", destacada: true },
    { clave: "saldoAFavor", etiqueta: "Saldo a favor para el mes siguiente", formato: "moneda", ocultarSiCero: true },
  ],
});
