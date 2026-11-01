import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ua.yesv-dlia-fop",
  mercado: "ua",
  concepto: "aportes-seguridad-social",
  slug: "yesv-dlia-fop",
  estado: "publicado",
  requiere: {
    "ua.yesv": "numero",
    "ua.minimalna-zarplata": "numero",
    "ua.maks-baza-yesv": "numero",
  },
  campos: [
    { id: "baza", tipo: "moneda", etiqueta: "База ЄСВ за місяць (сума, яку ви самі визначаєте)", min: 0, porDefecto: 8647, ayuda: "Не менше мінімальної зарплати. Якщо ввести менше, калькулятор візьме мінімальну." },
    { id: "misiatsi", tipo: "entero", etiqueta: "За скільки місяців рахувати", min: 1, max: 12, porDefecto: 3, ayuda: "Квартал: 3 місяці. Рік: 12." },
  ],
  calcular(e, v, { redondear }) {
    if (e.baza < 0) throw new ErrorEntrada("База не може бути відʼємною.", "baza");
    if (e.misiatsi < 1 || e.misiatsi > 12) throw new ErrorEntrada("Кількість місяців має бути від 1 до 12.", "misiatsi");
    const mzp = v["ua.minimalna-zarplata"];
    const maks = redondear(mzp * v["ua.maks-baza-yesv"]);
    const baza = Math.min(Math.max(e.baza, mzp), maks);
    const naMisiats = redondear(porcentaje(baza, v["ua.yesv"]));
    const observaciones: string[] = [];
    if (e.baza < mzp) observaciones.push("Введена база менша за мінімальну зарплату, тому ЄСВ пораховано з мінімальної.");
    if (e.baza > maks) observaciones.push("Введена база більша за максимальну, тому ЄСВ пораховано з максимальної.");
    return {
      razom: redondear(naMisiats * e.misiatsi),
      naMisiats,
      baza,
      minimum: redondear(porcentaje(mzp, v["ua.yesv"])),
      maksimum: redondear(porcentaje(maks, v["ua.yesv"])),
      zaRik: redondear(naMisiats * 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "razom", etiqueta: "ЄСВ до сплати за період", formato: "moneda", destacada: true },
    { clave: "naMisiats", etiqueta: "ЄСВ за місяць", formato: "moneda" },
    { clave: "baza", etiqueta: "База, з якої пораховано", formato: "moneda" },
    { clave: "minimum", etiqueta: "Мінімальний внесок за місяць", formato: "moneda" },
    { clave: "maksimum", etiqueta: "Максимальний внесок за місяць", formato: "moneda" },
    { clave: "zaRik", etiqueta: "За рік з такою базою", formato: "moneda" },
  ],
});
