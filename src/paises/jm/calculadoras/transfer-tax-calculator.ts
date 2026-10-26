import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "jm.transfer-tax-calculator",
  mercado: "jm",
  concepto: "propio",
  slug: "transfer-tax-calculator",
  estado: "publicado",
  requiere: {
    "jm.transfer-tax-rate": "numero",
    "jm.stamp-duty-high": "numero",
    "jm.stamp-duty-low": "numero",
    "jm.stamp-duty-band": "numero",
    "jm.stamp-duty-mortgage-surcharge": "numero",
  },
  campos: [
    { id: "valor", tipo: "moneda", etiqueta: "Sale price or market value of the property", min: 0, porDefecto: 25000000 },
    { id: "hipoteca", tipo: "si-no", etiqueta: "The buyer is taking a mortgage", porDefecto: true },
    { id: "prestamo", tipo: "moneda", etiqueta: "Mortgage amount", min: 0, porDefecto: 20000000, visibleSi: { hipoteca: [true] } },
  ],
  calcular(e, v, { redondear }) {
    if (e.valor <= 0) throw new ErrorEntrada("Enter the sale price or market value.", "valor");
    const sello = (monto: number) => (monto >= v["jm.stamp-duty-band"] ? v["jm.stamp-duty-high"] : v["jm.stamp-duty-low"]);
    const transferTax = redondear(porcentaje(e.valor, v["jm.transfer-tax-rate"]));
    const selloVenta = sello(e.valor);
    const prestamo = e.hipoteca ? (e.prestamo ?? 0) : 0;
    const selloHipoteca = prestamo > 0 ? redondear(sello(prestamo) * (1 + v["jm.stamp-duty-mortgage-surcharge"] / 100)) : 0;
    return {
      total: redondear(transferTax + selloVenta + selloHipoteca),
      transferTax,
      selloVenta,
      selloHipoteca,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Transfer tax and stamp duty", formato: "moneda", destacada: true },
    { clave: "transferTax", etiqueta: "Transfer tax", formato: "moneda" },
    { clave: "selloVenta", etiqueta: "Stamp duty on the agreement for sale and transfer", formato: "moneda" },
    { clave: "selloHipoteca", etiqueta: "Stamp duty on the mortgage, with the surcharge", formato: "moneda", ocultarSiCero: true },
  ],
});
