import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ua.kalkuliator-alimentiv",
  mercado: "ua",
  concepto: "pension-alimentos",
  slug: "kalkuliator-alimentiv",
  estado: "publicado",
  requiere: {
    "ua.alimenty-minimum": "numero",
    "ua.alimenty-chastky": "mapa",
    "ua.prozhytkovyi-minimum": "mapa",
  },
  campos: [
    { id: "dokhid", tipo: "moneda", etiqueta: "Дохід платника аліментів за місяць", min: 0, porDefecto: 20000 },
    { id: "dityDo6", tipo: "entero", etiqueta: "Дітей віком до 6 років", min: 0, max: 10, porDefecto: 1 },
    { id: "dity6do18", tipo: "entero", etiqueta: "Дітей віком від 6 до 18 років", min: 0, max: 10, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.dokhid < 0) throw new ErrorEntrada("Дохід не може бути відʼємним.", "dokhid");
    const dity = e.dityDo6 + e.dity6do18;
    if (dity < 1) throw new ErrorEntrada("Вкажіть щонайменше одну дитину.", "dityDo6");
    const pm = v["ua.prozhytkovyi-minimum"];
    const minDo6 = redondear(porcentaje(enMapa(pm, "dity-do-6"), v["ua.alimenty-minimum"]));
    const min6do18 = redondear(porcentaje(enMapa(pm, "dity-6-18"), v["ua.alimenty-minimum"]));
    const kliuch = dity === 1 ? "odna" : dity === 2 ? "dvi" : "try";
    const znamennyk = enMapa(v["ua.alimenty-chastky"], kliuch);
    const chastka = redondear(e.dokhid / znamennyk);
    const naDytynuChastka = chastka / dity;
    const naDo6 = redondear(Math.max(naDytynuChastka, minDo6));
    const na6do18 = redondear(Math.max(naDytynuChastka, min6do18));
    const razom = redondear(naDo6 * e.dityDo6 + na6do18 * e.dity6do18);
    const minimum = redondear(minDo6 * e.dityDo6 + min6do18 * e.dity6do18);
    const observaciones: string[] = [];
    if (razom > chastka) observaciones.push("Частка доходу менша за гарантований мінімум, тому сума аліментів дорівнює мінімуму на кожну дитину.");
    return {
      razom,
      chastka,
      chastkaTekst: `1/${znamennyk} доходу`,
      minimum,
      naDo6: e.dityDo6 > 0 ? naDo6 : null,
      na6do18: e.dity6do18 > 0 ? na6do18 : null,
      observaciones,
    };
  },
  resultado: [
    { clave: "razom", etiqueta: "Аліменти за місяць", formato: "moneda", destacada: true },
    { clave: "chastka", etiqueta: "Частка доходу", formato: "moneda" },
    { clave: "chastkaTekst", etiqueta: "Звичайна частка, яку присуджує суд", formato: "texto" },
    { clave: "minimum", etiqueta: "Гарантований мінімум на всіх дітей", formato: "moneda" },
    { clave: "naDo6", etiqueta: "На одну дитину до 6 років", formato: "moneda" },
    { clave: "na6do18", etiqueta: "На одну дитину від 6 до 18 років", formato: "moneda" },
  ],
});
