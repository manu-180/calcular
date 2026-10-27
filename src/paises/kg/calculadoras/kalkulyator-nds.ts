import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kg.kalkulyator-nds",
  mercado: "kg",
  concepto: "iva",
  slug: "kalkulyator-nds",
  estado: "publicado",
  requiere: { "kg.nds": "numero" },
  campos: [
    { id: "summa", tipo: "moneda", etiqueta: "Сумма", min: 0, porDefecto: 100000 },
    {
      id: "napravlenie",
      tipo: "opcion",
      etiqueta: "Что нужно сделать",
      opciones: [
        { valor: "nachislit", etiqueta: "Начислить НДС (сумма без НДС)" },
        { valor: "vydelit", etiqueta: "Выделить НДС (сумма с НДС)" },
      ],
      porDefecto: "nachislit",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.summa <= 0) throw new ErrorEntrada("Введите сумму больше нуля.", "summa");
    const stavka = v["kg.nds"];
    const bezNds = e.napravlenie === "nachislit" ? e.summa : redondear(e.summa / (1 + stavka / 100));
    const nds = e.napravlenie === "nachislit" ? redondear((bezNds * stavka) / 100) : redondear(e.summa - bezNds);
    return { nds, bezNds, sNds: redondear(bezNds + nds), stavka };
  },
  resultado: [
    { clave: "nds", etiqueta: "Сумма НДС", formato: "moneda", destacada: true },
    { clave: "bezNds", etiqueta: "Сумма без НДС", formato: "moneda" },
    { clave: "sNds", etiqueta: "Сумма с НДС", formato: "moneda" },
    { clave: "stavka", etiqueta: "Ставка НДС", formato: "porcentaje" },
  ],
});
