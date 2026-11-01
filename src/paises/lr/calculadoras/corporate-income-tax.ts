import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lr.corporate-income-tax",
  mercado: "lr",
  concepto: "propio",
  slug: "corporate-income-tax",
  estado: "publicado",
  requiere: {
    "lr.corporate-rates": "mapa",
  },
  campos: [
    { id: "beneficio", tipo: "moneda", etiqueta: "Taxable profit for the year", min: 0, porDefecto: 5000000 },
    { id: "sector", tipo: "opcion-dato", etiqueta: "Activity", dato: "lr.corporate-rates", porDefecto: "regular" },
    { id: "anticipos", tipo: "moneda", etiqueta: "Quarterly advance tax already paid this year", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.beneficio < 0) throw new ErrorEntrada("Enter your taxable profit.", "beneficio");
    const tasa = enMapa(v["lr.corporate-rates"], entrada.sector);
    const impuesto = redondear(porcentaje(entrada.beneficio, tasa));
    const saldo = redondear(impuesto - entrada.anticipos);
    return { impuesto, tasa, saldo: Math.max(0, saldo), favor: Math.max(0, -saldo) };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Corporate income tax for the year", formato: "moneda", destacada: true },
    { clave: "tasa", etiqueta: "Tax rate", formato: "porcentaje", decimales: 0 },
    { clave: "saldo", etiqueta: "Balance to pay with the return", formato: "moneda" },
    { clave: "favor", etiqueta: "Advance payments above the tax", formato: "moneda", ocultarSiCero: true },
  ],
});
