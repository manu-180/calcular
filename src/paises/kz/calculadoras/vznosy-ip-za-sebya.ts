import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { kopeyki } from "../lib/zarplata";

export default definirCalculadora({
  id: "kz.vznosy-ip-za-sebya",
  mercado: "kz",
  concepto: "aportes-seguridad-social",
  slug: "vznosy-ip-za-sebya",
  estado: "publicado",
  requiere: {
    "kz.mrp": "numero",
    "kz.mzp": "numero",
    "kz.opv": "numero",
    "kz.opv-maks-mzp": "numero",
    "kz.so": "numero",
    "kz.so-predely": "mapa",
    "kz.vosms-ip": "mapa",
    "kz.sotsialnyy-nalog-ip": "mapa",
  },
  campos: [
    { id: "dokhod", tipo: "moneda", etiqueta: "Доход за месяц, с которого вы платите взносы", min: 0, porDefecto: 85000 },
    {
      id: "rezhim",
      tipo: "opcion",
      etiqueta: "Налоговый режим",
      opciones: [
        { valor: "uproshchenka", etiqueta: "Упрощенная декларация" },
        { valor: "obshchiy", etiqueta: "Общеустановленный порядок" },
      ],
      porDefecto: "uproshchenka",
    },
  ],
  calcular(e, v) {
    if (e.dokhod <= 0) throw new ErrorEntrada("Введите доход больше нуля.", "dokhod");
    const mzp = v["kz.mzp"];
    const bazaOpv = Math.min(Math.max(e.dokhod, mzp), v["kz.opv-maks-mzp"] * mzp);
    const opv = kopeyki((bazaOpv * v["kz.opv"]) / 100);
    const bazaSo = Math.min(Math.max(e.dokhod, enMapa(v["kz.so-predely"], "min") * mzp), enMapa(v["kz.so-predely"], "maks") * mzp);
    const so = kopeyki((bazaSo * v["kz.so"]) / 100);
    const vosms = kopeyki((enMapa(v["kz.vosms-ip"], "baza-mzp") * mzp * enMapa(v["kz.vosms-ip"], "stavka")) / 100);
    const sn = e.rezhim === "obshchiy" ? kopeyki(enMapa(v["kz.sotsialnyy-nalog-ip"], "za-sebya") * v["kz.mrp"]) : 0;
    const vsego = kopeyki(opv + so + vosms + sn);
    const observaciones: string[] = [];
    if (e.dokhod < mzp) observaciones.push("Доход меньше МЗП: ОПВ и СО посчитаны с минимальной зарплаты.");
    return { vsego, opv, so, vosms, sn, zaGod: kopeyki(vsego * 12), observaciones };
  },
  resultado: [
    { clave: "vsego", etiqueta: "Всего за месяц", formato: "moneda", destacada: true },
    { clave: "opv", etiqueta: "ОПВ за себя", formato: "moneda" },
    { clave: "so", etiqueta: "Социальные отчисления за себя", formato: "moneda" },
    { clave: "vosms", etiqueta: "Взносы на ОСМС за себя", formato: "moneda" },
    { clave: "sn", etiqueta: "Социальный налог за себя", formato: "moneda", ocultarSiCero: true },
    { clave: "zaGod", etiqueta: "Всего за год", formato: "moneda" },
  ],
});
