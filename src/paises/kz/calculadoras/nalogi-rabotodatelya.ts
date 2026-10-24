import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { godRabotnika, kopeyki, platezhiRabotodatelya } from "../lib/zarplata";

export default definirCalculadora({
  id: "kz.nalogi-rabotodatelya",
  mercado: "kz",
  concepto: "costo-empleador",
  slug: "nalogi-rabotodatelya",
  estado: "publicado",
  requiere: {
    "kz.mrp": "numero",
    "kz.mzp": "numero",
    "kz.ipn-shkala": "escala",
    "kz.bazovyy-vychet-mrp": "numero",
    "kz.opv": "numero",
    "kz.opv-maks-mzp": "numero",
    "kz.vosms": "numero",
    "kz.vosms-maks-mzp": "numero",
    "kz.opvr": "numero",
    "kz.opvr-predely": "mapa",
    "kz.so": "numero",
    "kz.so-predely": "mapa",
    "kz.oosms": "numero",
    "kz.oosms-maks-mzp": "numero",
    "kz.sotsialnyy-nalog": "numero",
    "kz.sotsialnyy-nalog-min-mrp": "numero",
  },
  campos: [
    { id: "oklad", tipo: "moneda", etiqueta: "Начисленная зарплата работника в месяц", min: 0, porDefecto: 500000 },
    { id: "opvr", tipo: "si-no", etiqueta: "Работник родился в 1975 году или позже (за него платятся ОПВР)", porDefecto: true },
  ],
  calcular(e, v) {
    if (e.oklad <= 0) throw new ErrorEntrada("Введите зарплату больше нуля.", "oklad");
    const mesyats = godRabotnika(e.oklad, {
      mzp: v["kz.mzp"],
      mrp: v["kz.mrp"],
      opv: v["kz.opv"],
      opvMaksMzp: v["kz.opv-maks-mzp"],
      vosms: v["kz.vosms"],
      vosmsMaksMzp: v["kz.vosms-maks-mzp"],
      vychetMrp: v["kz.bazovyy-vychet-mrp"],
      shkalaIpn: v["kz.ipn-shkala"],
      primenyatVychet: true,
    })[0];
    const p = platezhiRabotodatelya(e.oklad, mesyats.opv, mesyats.vosms, {
      mzp: v["kz.mzp"],
      mrp: v["kz.mrp"],
      opvr: v["kz.opvr"],
      opvrMin: enMapa(v["kz.opvr-predely"], "min"),
      opvrMaks: enMapa(v["kz.opvr-predely"], "maks"),
      so: v["kz.so"],
      soMin: enMapa(v["kz.so-predely"], "min"),
      soMaks: enMapa(v["kz.so-predely"], "maks"),
      oosms: v["kz.oosms"],
      oosmsMaksMzp: v["kz.oosms-maks-mzp"],
      sn: v["kz.sotsialnyy-nalog"],
      snMinMrp: v["kz.sotsialnyy-nalog-min-mrp"],
      platitOpvr: e.opvr,
    });
    return {
      stoimost: kopeyki(e.oklad + p.vsego),
      opvr: p.opvr,
      so: p.so,
      oosms: p.oosms,
      sn: p.sn,
      vsego: p.vsego,
      dolya: (p.vsego / e.oklad) * 100,
      naRuki: mesyats.netto,
      stoimostZaGod: kopeyki((e.oklad + p.vsego) * 12),
    };
  },
  resultado: [
    { clave: "stoimost", etiqueta: "Стоимость работника для компании в месяц", formato: "moneda", destacada: true },
    { clave: "opvr", etiqueta: "ОПВР (пенсионные взносы работодателя)", formato: "moneda", ocultarSiCero: true },
    { clave: "so", etiqueta: "Социальные отчисления (СО)", formato: "moneda" },
    { clave: "oosms", etiqueta: "Отчисления на ОСМС (ООСМС)", formato: "moneda" },
    { clave: "sn", etiqueta: "Социальный налог", formato: "moneda" },
    { clave: "vsego", etiqueta: "Всего платежей работодателя", formato: "moneda" },
    { clave: "dolya", etiqueta: "Платежи сверх зарплаты", formato: "porcentaje", decimales: 1 },
    { clave: "naRuki", etiqueta: "Работник получит на руки (с базовым вычетом)", formato: "moneda" },
    { clave: "stoimostZaGod", etiqueta: "Стоимость работника за год", formato: "moneda" },
  ],
});
