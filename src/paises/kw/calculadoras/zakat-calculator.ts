import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "kw.zakat-calculator",
  mercado: "kw",
  concepto: "propio",
  slug: "zakat-calculator",
  estado: "publicado",
  requiere: {
    "kw.zakat-rate": "numero",
    "kw.zakat-nisab-grams": "numero",
    "kw.gold-24k": "serie",
  },
  campos: [
    { id: "efectivo", tipo: "moneda", etiqueta: "Cash and bank balances", min: 0, porDefecto: 5000 },
    { id: "inversiones", tipo: "moneda", etiqueta: "Shares, funds and trade goods at today's value", min: 0, porDefecto: 0 },
    { id: "deudas", tipo: "moneda", etiqueta: "Debts owed to you that you expect to collect", min: 0, porDefecto: 0 },
    { id: "pasivos", tipo: "moneda", etiqueta: "Debts you owe that are due now", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    const patrimonio = entrada.efectivo + entrada.inversiones + entrada.deudas - entrada.pasivos;
    if (patrimonio < 0) throw new ErrorEntrada("Your debts are larger than your assets, so there is no zakat to pay.", "pasivos");
    const oro = v["kw.gold-24k"];
    const nisab = redondear(v["kw.zakat-nisab-grams"] * oro.valor);
    const alcanza = patrimonio >= nisab;
    return {
      zakat: alcanza ? redondear(porcentaje(patrimonio, v["kw.zakat-rate"])) : 0,
      patrimonio: redondear(patrimonio),
      nisab,
      oro: oro.valor,
      fecha: oro.fecha,
      observaciones: alcanza ? ([] as string[]) : ["Your zakatable wealth is below the nisab, so no zakat is due."],
    };
  },
  resultado: [
    { clave: "zakat", etiqueta: "Zakat to pay", formato: "moneda", destacada: true },
    { clave: "patrimonio", etiqueta: "Zakatable wealth", formato: "moneda" },
    { clave: "nisab", etiqueta: "Nisab today", formato: "moneda" },
    { clave: "oro", etiqueta: "24 carat gold, one gram", formato: "moneda" },
    { clave: "fecha", etiqueta: "Gold price date", formato: "fecha" },
  ],
});
