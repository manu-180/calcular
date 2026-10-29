import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

// Черновик: ставка 14 % (2026) и 13 % (с 2027) названы только во вторичных источниках.
export default definirCalculadora({
  id: "tj.kalkulyator-nds",
  mercado: "tj",
  concepto: "iva",
  slug: "kalkulyator-nds",
  estado: "borrador",
  requiere: { "tj.nds": "numero" },
  campos: [
    { id: "summa", tipo: "moneda", etiqueta: "Сумма", min: 0, porDefecto: 1000 },
    {
      id: "rezhim",
      tipo: "opcion",
      etiqueta: "Что нужно сделать",
      opciones: [
        { valor: "dobavit", etiqueta: "Добавить НДС к сумме без налога" },
        { valor: "vydelit", etiqueta: "Выделить НДС из суммы с налогом" },
      ],
      porDefecto: "dobavit",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.summa <= 0) throw new ErrorEntrada("Введите сумму больше нуля.", "summa");
    const stavka = v["tj.nds"];
    if (e.rezhim === "dobavit") {
      const nds = redondear(porcentaje(e.summa, stavka));
      return { nds, bezNds: e.summa, sNds: redondear(e.summa + nds), stavka };
    }
    const bezNds = redondear((e.summa * 100) / (100 + stavka));
    return { nds: redondear(e.summa - bezNds), bezNds, sNds: e.summa, stavka };
  },
  resultado: [
    { clave: "nds", etiqueta: "НДС", formato: "moneda", destacada: true },
    { clave: "bezNds", etiqueta: "Сумма без НДС", formato: "moneda" },
    { clave: "sNds", etiqueta: "Сумма с НДС", formato: "moneda" },
    { clave: "stavka", etiqueta: "Ставка", formato: "porcentaje" },
  ],
});
