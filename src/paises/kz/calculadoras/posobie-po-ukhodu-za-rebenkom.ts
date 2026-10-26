import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kz.posobie-po-ukhodu-za-rebenkom",
  mercado: "kz",
  concepto: "propio",
  slug: "posobie-po-ukhodu-za-rebenkom",
  estado: "publicado",
  requiere: {
    "kz.mrp": "numero",
    "kz.mzp": "numero",
    "kz.ukhod-koeffitsient": "numero",
    "kz.ukhod-maks-mzp": "numero",
    "kz.posobie-po-ukhodu-mrp": "mapa",
    "kz.opv-s-sotsvyplat": "numero",
  },
  campos: [
    { id: "dokhod", tipo: "moneda", etiqueta: "Доход за 24 месяца, с которого платились социальные отчисления", min: 0, porDefecto: 12000000, ayuda: "Двадцать четыре месяца перед месяцем рождения ребенка." },
    { id: "ocherednost", tipo: "opcion-dato", dato: "kz.posobie-po-ukhodu-mrp", etiqueta: "Какой по счету ребенок", porDefecto: "1" },
  ],
  calcular(e, v, { redondear }) {
    if (e.dokhod <= 0) throw new ErrorEntrada("Введите доход больше нуля.", "dokhod");
    const smd = redondear(e.dokhod / 24);
    const k = v["kz.ukhod-koeffitsient"];
    const maks = redondear(k * v["kz.ukhod-maks-mzp"] * v["kz.mzp"]);
    const minimumNaRuki = redondear(enMapa(v["kz.posobie-po-ukhodu-mrp"], e.ocherednost) * v["kz.mrp"]);
    const opvStavka = v["kz.opv-s-sotsvyplat"];
    let vyplata = Math.min(redondear(smd * k), maks);
    const observaciones: string[] = [];
    if (vyplata * (1 - opvStavka / 100) < minimumNaRuki) {
      vyplata = redondear(minimumNaRuki / (1 - opvStavka / 100));
      observaciones.push("Расчетная выплата меньше пособия по уходу из бюджета, поэтому она поднята до его размера с учетом ОПВ. Точную сумму назначит ГФСС.");
    }
    const opv = redondear((vyplata * opvStavka) / 100);
    return { naRuki: redondear(vyplata - opv), vyplata, opv, smd, maks, minimumNaRuki, zaVesSrok: redondear((vyplata - opv) * 18), observaciones };
  },
  resultado: [
    { clave: "naRuki", etiqueta: "Ежемесячная выплата на руки", formato: "moneda", destacada: true },
    { clave: "vyplata", etiqueta: "Начисленная выплата в месяц", formato: "moneda" },
    { clave: "opv", etiqueta: "Удержанные ОПВ", formato: "moneda" },
    { clave: "smd", etiqueta: "Среднемесячный доход за 24 месяца", formato: "moneda" },
    { clave: "maks", etiqueta: "Наибольшая начисленная выплата", formato: "moneda" },
    { clave: "minimumNaRuki", etiqueta: "Пособие по уходу из бюджета (наименьшая сумма)", formato: "moneda" },
    { clave: "zaVesSrok", etiqueta: "На руки за 18 месяцев", formato: "moneda" },
  ],
});
