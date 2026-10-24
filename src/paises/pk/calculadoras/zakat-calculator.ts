import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pk.zakat-calculator",
  mercado: "pk",
  concepto: "propio",
  slug: "zakat-calculator",
  estado: "publicado",
  requiere: {
    "pk.zakat-rate": "numero",
    "pk.nisab": "numero",
  },
  campos: [
    { id: "efectivo", tipo: "moneda", etiqueta: "Cash and bank balances", min: 0, porDefecto: 600000 },
    { id: "oro", tipo: "moneda", etiqueta: "Market value of gold and silver", min: 0, porDefecto: 0 },
    { id: "inversiones", tipo: "moneda", etiqueta: "Savings certificates, shares and units", min: 0, porDefecto: 0 },
    { id: "deudas", tipo: "moneda", etiqueta: "Debts you owe now", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    const neto = entrada.efectivo + entrada.oro + entrada.inversiones - entrada.deudas;
    if (neto < 0) throw new ErrorEntrada("Your debts are more than your assets, so no zakat is due.", "deudas");
    const debe = neto >= v["pk.nisab"];
    return {
      zakat: debe ? redondear(porcentaje(neto, v["pk.zakat-rate"])) : 0,
      neto: redondear(neto),
      estado: debe ? "At or above the nisab" : "Below the nisab",
    };
  },
  resultado: [
    { clave: "zakat", etiqueta: "Zakat payable", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Zakatable wealth", formato: "moneda" },
    { clave: "estado", etiqueta: "Compared with the nisab", formato: "texto" },
  ],
});
