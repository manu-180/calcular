import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ua.kalkuliator-fop",
  mercado: "ua",
  concepto: "regimen-simplificado",
  slug: "kalkuliator-fop",
  estado: "publicado",
  requiere: {
    "ua.yedynyi-podatok": "mapa",
    "ua.limity-yedynyi-podatok": "mapa",
    "ua.vz-fop": "mapa",
    "ua.yesv": "numero",
    "ua.minimalna-zarplata": "numero",
    "ua.prozhytkovyi-minimum": "mapa",
  },
  campos: [
    {
      id: "hrupa",
      tipo: "opcion",
      etiqueta: "Група єдиного податку",
      opciones: [
        { valor: "h1", etiqueta: "1 група" },
        { valor: "h2", etiqueta: "2 група" },
        { valor: "h3", etiqueta: "3 група" },
      ],
      porDefecto: "h3",
    },
    { id: "stavka1", tipo: "porcentaje", etiqueta: "Ставка вашої громади, % прожиткового мінімуму", min: 0, max: 10, porDefecto: 10, visibleSi: { hrupa: ["h1"] } },
    { id: "stavka2", tipo: "porcentaje", etiqueta: "Ставка вашої громади, % мінімальної зарплати", min: 0, max: 20, porDefecto: 20, visibleSi: { hrupa: ["h2"] } },
    { id: "pdv", tipo: "si-no", etiqueta: "Ви платник ПДВ", porDefecto: false, visibleSi: { hrupa: ["h3"] } },
    { id: "dokhid", tipo: "moneda", etiqueta: "Дохід за рік", min: 0, porDefecto: 1000000 },
    { id: "misiatsi", tipo: "entero", etiqueta: "Місяців роботи у році", min: 1, max: 12, porDefecto: 12 },
  ],
  calcular(e, v, { redondear }) {
    if (e.dokhid < 0) throw new ErrorEntrada("Дохід не може бути відʼємним.", "dokhid");
    if (e.misiatsi < 1 || e.misiatsi > 12) throw new ErrorEntrada("Кількість місяців має бути від 1 до 12.", "misiatsi");
    const st = v["ua.yedynyi-podatok"];
    const mzp = v["ua.minimalna-zarplata"];
    const pm = enMapa(v["ua.prozhytkovyi-minimum"], "pratsezdatni");
    const m = e.misiatsi;
    let ep: number;
    let vz: number;
    if (e.hrupa === "h1") {
      const s = e.stavka1 ?? enMapa(st, "hrupa-1");
      if (s < 0 || s > enMapa(st, "hrupa-1")) throw new ErrorEntrada("Для 1 групи ставка не може перевищувати 10 % прожиткового мінімуму.", "stavka1");
      ep = redondear(redondear(porcentaje(pm, s)) * m);
      vz = redondear(redondear(porcentaje(mzp, enMapa(v["ua.vz-fop"], "hrupy-1-2"))) * m);
    } else if (e.hrupa === "h2") {
      const s = e.stavka2 ?? enMapa(st, "hrupa-2");
      if (s < 0 || s > enMapa(st, "hrupa-2")) throw new ErrorEntrada("Для 2 групи ставка не може перевищувати 20 % мінімальної зарплати.", "stavka2");
      ep = redondear(redondear(porcentaje(mzp, s)) * m);
      vz = redondear(redondear(porcentaje(mzp, enMapa(v["ua.vz-fop"], "hrupy-1-2"))) * m);
    } else {
      ep = redondear(porcentaje(e.dokhid, enMapa(st, e.pdv ? "hrupa-3-pdv" : "hrupa-3")));
      vz = redondear(porcentaje(e.dokhid, enMapa(v["ua.vz-fop"], "hrupa-3")));
    }
    const yesvMis = redondear(porcentaje(mzp, v["ua.yesv"]));
    const yesv = redondear(yesvMis * m);
    const razom = redondear(ep + vz + yesv);
    const limit = redondear(mzp * enMapa(v["ua.limity-yedynyi-podatok"], e.hrupa === "h1" ? "hrupa-1" : e.hrupa === "h2" ? "hrupa-2" : "hrupa-3"));
    const observaciones: string[] = [];
    let perevyshchennia: number | null = null;
    if (e.dokhid > limit) {
      perevyshchennia = redondear(porcentaje(e.dokhid - limit, enMapa(st, "perevyshchennia")));
      observaciones.push("Дохід перевищує ліміт групи. Із суми перевищення єдиний податок сплачують за підвищеною ставкою. Перевірте, чи можете ви залишатися в цій групі.");
    }
    return {
      razom,
      naMisiats: redondear(razom / m),
      ep,
      vz,
      yesv,
      yesvMis,
      perevyshchennia,
      limit,
      chastka: e.dokhid > 0 ? (razom / e.dokhid) * 100 : null,
      observaciones,
    };
  },
  resultado: [
    { clave: "razom", etiqueta: "Усього податків і ЄСВ за період", formato: "moneda", destacada: true },
    { clave: "naMisiats", etiqueta: "У середньому за місяць", formato: "moneda" },
    { clave: "ep", etiqueta: "Єдиний податок", formato: "moneda" },
    { clave: "vz", etiqueta: "Військовий збір", formato: "moneda" },
    { clave: "yesv", etiqueta: "ЄСВ за себе", formato: "moneda" },
    { clave: "yesvMis", etiqueta: "Мінімальний ЄСВ за місяць", formato: "moneda" },
    { clave: "perevyshchennia", etiqueta: "Податок із суми перевищення ліміту", formato: "moneda" },
    { clave: "limit", etiqueta: "Ліміт доходу групи на рік", formato: "moneda" },
    { clave: "chastka", etiqueta: "Податки у відсотках від доходу", formato: "porcentaje", decimales: 2 },
  ],
});
