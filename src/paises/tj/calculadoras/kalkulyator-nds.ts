import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

// Налоговый кодекс: ст. 264 (пониженные ставки) и ч. 4 ст. 397 (14 % до конца 2026 года, 13 % с 2027 года).
export default definirCalculadora({
  id: "tj.kalkulyator-nds",
  mercado: "tj",
  concepto: "iva",
  slug: "kalkulyator-nds",
  estado: "publicado",
  requiere: { "tj.nds": "numero", "tj.nds-ponizhennaya": "mapa" },
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
    {
      id: "vid",
      tipo: "opcion",
      etiqueta: "Ставка",
      opciones: [
        { valor: "obshchaya", etiqueta: "Стандартная" },
        { valor: "stroitelstvo", etiqueta: "Пониженная: строительные работы, гостиницы, общественное питание" },
        { valor: "selkhoz", etiqueta: "Пониженная: местная сельхозпродукция, обучение, санатории" },
      ],
      porDefecto: "obshchaya",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.summa <= 0) throw new ErrorEntrada("Введите сумму больше нуля.", "summa");
    const stavka = e.vid === "obshchaya" ? v["tj.nds"] : enMapa(v["tj.nds-ponizhennaya"], e.vid);
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
