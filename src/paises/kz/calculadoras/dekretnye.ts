import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { chislo } from "../lib/zarplata";

export default definirCalculadora({
  id: "kz.dekretnye",
  mercado: "kz",
  concepto: "propio",
  slug: "dekretnye",
  estado: "publicado",
  requiere: {
    "kz.mzp": "numero",
    "kz.so-predely": "mapa",
    "kz.dekret-dni": "mapa",
    "kz.opv-s-sotsvyplat": "numero",
  },
  campos: [
    { id: "dokhod", tipo: "moneda", etiqueta: "Доход за 12 месяцев, с которого платились социальные отчисления", min: 0, porDefecto: 6000000, ayuda: "Двенадцать месяцев перед месяцем, в котором начинается отпуск по беременности и родам." },
    { id: "rody", tipo: "opcion-dato", dato: "kz.dekret-dni", etiqueta: "Продолжительность отпуска", porDefecto: "normalnye" },
  ],
  calcular(e, v, { redondear }) {
    if (e.dokhod <= 0) throw new ErrorEntrada("Введите доход больше нуля.", "dokhod");
    const predel = enMapa(v["kz.so-predely"], "maks") * v["kz.mzp"];
    const smd = Math.min(redondear(e.dokhod / 12), predel);
    const dni = enMapa(v["kz.dekret-dni"], e.rody);
    const vyplata = redondear((smd * dni) / 30);
    const opv = redondear((vyplata * v["kz.opv-s-sotsvyplat"]) / 100);
    const observaciones: string[] = [];
    if (e.dokhod / 12 > predel) observaciones.push(`Социальные отчисления платятся не больше чем с ${chislo(enMapa(v["kz.so-predely"], "maks"))} МЗП в месяц, поэтому среднемесячный доход для выплаты ограничен этой суммой.`);
    return { naRuki: redondear(vyplata - opv), vyplata, opv, smd, dni, observaciones };
  },
  resultado: [
    { clave: "naRuki", etiqueta: "Выплата из ГФСС на руки", formato: "moneda", destacada: true },
    { clave: "vyplata", etiqueta: "Начисленная выплата", formato: "moneda" },
    { clave: "opv", etiqueta: "Удержанные ОПВ", formato: "moneda" },
    { clave: "smd", etiqueta: "Среднемесячный доход для расчета", formato: "moneda" },
    { clave: "dni", etiqueta: "Дней отпуска", formato: "dias" },
  ],
});
