import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ua.minimalna-zarplata",
  mercado: "ua",
  concepto: "salario-minimo",
  slug: "minimalna-zarplata",
  estado: "publicado",
  requiere: {
    "ua.minimalna-zarplata": "numero",
    "ua.minimalna-zarplata-hodynna": "numero",
    "ua.pdfo": "numero",
    "ua.viiskovyi-zbir": "numero",
    "ua.yesv": "numero",
  },
  campos: [
    {
      id: "rezhym",
      tipo: "opcion",
      etiqueta: "Як вам платять",
      opciones: [
        { valor: "misiats", etiqueta: "Місячний оклад" },
        { valor: "hodyny", etiqueta: "Погодинна оплата" },
      ],
      porDefecto: "misiats",
    },
    { id: "stavka", tipo: "porcentaje", etiqueta: "Частка ставки", min: 1, max: 100, porDefecto: 100, visibleSi: { rezhym: ["misiats"] }, ayuda: "100 % означає повний робочий час. Пів ставки: 50 %." },
    { id: "hodyny", tipo: "numero", etiqueta: "Відпрацьовано годин за місяць", min: 0, max: 744, porDefecto: 80, visibleSi: { rezhym: ["hodyny"] } },
  ],
  calcular(e, v, { redondear }) {
    const mzp = v["ua.minimalna-zarplata"];
    const hod = v["ua.minimalna-zarplata-hodynna"];
    let brutto: number;
    if (e.rezhym === "hodyny") {
      const h = e.hodyny ?? 0;
      if (h <= 0) throw new ErrorEntrada("Введіть кількість відпрацьованих годин.", "hodyny");
      brutto = redondear(h * hod);
    } else {
      const s = e.stavka ?? 100;
      if (s <= 0 || s > 100) throw new ErrorEntrada("Частка ставки має бути від 1 до 100 %.", "stavka");
      brutto = redondear(porcentaje(mzp, s));
    }
    const pdfo = redondear(porcentaje(brutto, v["ua.pdfo"]));
    const vz = redondear(porcentaje(brutto, v["ua.viiskovyi-zbir"]));
    return {
      minimum: brutto,
      naRuky: redondear(brutto - pdfo - vz),
      pdfo,
      vz,
      mzp,
      hod,
      yesvMin: redondear(porcentaje(mzp, v["ua.yesv"])),
    };
  },
  resultado: [
    { clave: "minimum", etiqueta: "Мінімум, який вам мають нарахувати", formato: "moneda", destacada: true },
    { clave: "naRuky", etiqueta: "На руки після ПДФО і військового збору", formato: "moneda" },
    { clave: "pdfo", etiqueta: "ПДФО", formato: "moneda" },
    { clave: "vz", etiqueta: "Військовий збір", formato: "moneda" },
    { clave: "mzp", etiqueta: "Мінімальна зарплата за місяць", formato: "moneda" },
    { clave: "hod", etiqueta: "Мінімальна зарплата за годину", formato: "moneda" },
    { clave: "yesvMin", etiqueta: "Мінімальний ЄСВ за місяць", formato: "moneda" },
  ],
});
