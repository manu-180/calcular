import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kg.penya-po-nalogam",
  mercado: "kg",
  concepto: "propio",
  slug: "penya-po-nalogam",
  estado: "publicado",
  requiere: { "kg.penya-nalog": "numero", "kg.penya-nalog-maks": "numero" },
  campos: [
    { id: "nedoimka", tipo: "moneda", etiqueta: "Сумма недоимки", min: 0, porDefecto: 100000 },
    { id: "dney", tipo: "entero", etiqueta: "Календарных дней просрочки", min: 1, max: 10000, porDefecto: 30, ayuda: "Считаются со дня, следующего за последним днем уплаты." },
  ],
  calcular(e, v, { redondear }) {
    if (e.nedoimka <= 0) throw new ErrorEntrada("Введите сумму недоимки больше нуля.", "nedoimka");
    if (e.dney <= 0) throw new ErrorEntrada("Укажите хотя бы один день просрочки.", "dney");
    const poDnyam = redondear((e.nedoimka * v["kg.penya-nalog"] * e.dney) / 100);
    const predel = redondear((e.nedoimka * v["kg.penya-nalog-maks"]) / 100);
    const penya = Math.min(poDnyam, predel);
    const observaciones = poDnyam > predel ? ["Пени не могут превышать сумму недоимки, поэтому показан предел."] : [];
    return { penya, zaDen: redondear((e.nedoimka * v["kg.penya-nalog"]) / 100), vsego: redondear(e.nedoimka + penya), observaciones };
  },
  resultado: [
    { clave: "penya", etiqueta: "Пени", formato: "moneda", destacada: true },
    { clave: "zaDen", etiqueta: "Пени за один день", formato: "moneda" },
    { clave: "vsego", etiqueta: "Недоимка вместе с пенями", formato: "moneda" },
  ],
});
