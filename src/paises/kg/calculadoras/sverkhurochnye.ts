import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kg.sverkhurochnye",
  mercado: "kg",
  concepto: "horas-extra",
  slug: "sverkhurochnye",
  estado: "publicado",
  requiere: { "kg.sverkhurochnye": "mapa", "kg.sverkhurochnye-polutornye-chasy": "numero" },
  campos: [
    { id: "oklad", tipo: "moneda", etiqueta: "Оклад за месяц", min: 0, porDefecto: 50400 },
    { id: "norma", tipo: "numero", etiqueta: "Норма рабочих часов в этом месяце", min: 1, max: 300, porDefecto: 168 },
    { id: "dney", tipo: "entero", etiqueta: "Дней со сверхурочной работой", min: 0, max: 31, porDefecto: 4 },
    { id: "chasovVDen", tipo: "numero", etiqueta: "Сверхурочных часов в каждый из этих дней", min: 0, max: 12, porDefecto: 3 },
    { id: "vykhodnye", tipo: "numero", etiqueta: "Часов работы в выходные и праздничные дни", min: 0, max: 300, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.oklad <= 0) throw new ErrorEntrada("Введите оклад больше нуля.", "oklad");
    const k = v["kg.sverkhurochnye"];
    const porog = v["kg.sverkhurochnye-polutornye-chasy"];
    const stavkaChasa = e.oklad / e.norma;
    const polutornye = e.dney * Math.min(e.chasovVDen, porog);
    const dvoynye = e.dney * Math.max(0, e.chasovVDen - porog);
    const zaSverkhurochnye = redondear(stavkaChasa * (polutornye * enMapa(k, "pervye-chasy") + dvoynye * enMapa(k, "dalee")));
    const zaVykhodnye = redondear(stavkaChasa * e.vykhodnye * enMapa(k, "vykhodnoy"));
    return {
      doplata: redondear(zaSverkhurochnye + zaVykhodnye),
      zaSverkhurochnye,
      zaVykhodnye,
      stavkaChasa: redondear(stavkaChasa),
      chasov: polutornye + dvoynye,
      observaciones: ["Это минимум по Трудовому кодексу. Коллективный или трудовой договор может установить оплату выше."],
    };
  },
  resultado: [
    { clave: "doplata", etiqueta: "Оплата сверхурочных и работы в выходные", formato: "moneda", destacada: true },
    { clave: "zaSverkhurochnye", etiqueta: "За сверхурочную работу", formato: "moneda" },
    { clave: "zaVykhodnye", etiqueta: "За работу в выходные и праздники", formato: "moneda", ocultarSiCero: true },
    { clave: "stavkaChasa", etiqueta: "Часовая ставка", formato: "moneda" },
    { clave: "chasov", etiqueta: "Сверхурочных часов всего", formato: "horas" },
  ],
});
