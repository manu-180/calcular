import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kg.nalog-na-pribyl",
  mercado: "kg",
  concepto: "propio",
  slug: "nalog-na-pribyl",
  estado: "publicado",
  requiere: { "kg.nalog-na-pribyl": "numero" },
  campos: [
    { id: "dokhod", tipo: "moneda", etiqueta: "Совокупный годовой доход", min: 0, porDefecto: 10000000 },
    { id: "raskhody", tipo: "moneda", etiqueta: "Расходы, которые вычитаются из дохода", min: 0, porDefecto: 7000000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.dokhod <= 0) throw new ErrorEntrada("Введите доход больше нуля.", "dokhod");
    const pribyl = redondear(e.dokhod - e.raskhody);
    const nalog = pribyl > 0 ? redondear((pribyl * v["kg.nalog-na-pribyl"]) / 100) : 0;
    const observaciones = pribyl <= 0 ? ["Облагаемой прибыли нет, налог на прибыль не платится."] : [];
    return { nalog, pribyl, chistaya: redondear(pribyl - nalog), stavka: v["kg.nalog-na-pribyl"], observaciones };
  },
  resultado: [
    { clave: "nalog", etiqueta: "Налог на прибыль", formato: "moneda", destacada: true },
    { clave: "pribyl", etiqueta: "Налогооблагаемая прибыль", formato: "moneda" },
    { clave: "chistaya", etiqueta: "Прибыль после налога", formato: "moneda" },
    { clave: "stavka", etiqueta: "Ставка", formato: "porcentaje" },
  ],
});
