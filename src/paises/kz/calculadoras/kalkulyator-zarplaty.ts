import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { TablaResultado } from "@/motor/tipos";
import { chislo, godRabotnika, MESYATSY, summa } from "../lib/zarplata";

export default definirCalculadora({
  id: "kz.kalkulyator-zarplaty",
  mercado: "kz",
  concepto: "sueldo-neto",
  slug: "kalkulyator-zarplaty",
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
  },
  campos: [
    { id: "oklad", tipo: "moneda", etiqueta: "Начисленная зарплата в месяц (до вычета налогов)", min: 0, porDefecto: 500000 },
    { id: "vychet", tipo: "si-no", etiqueta: "Применять базовый налоговый вычет (заявление подано этому работодателю)", porDefecto: true },
  ],
  tablas: [{ clave: "mesyatsy", titulo: "Зарплата по месяцам", filasVisibles: 12 }],
  calcular(e, v, { redondear }) {
    if (e.oklad <= 0) throw new ErrorEntrada("Введите зарплату больше нуля.", "oklad");
    const god = godRabotnika(e.oklad, {
      mzp: v["kz.mzp"],
      mrp: v["kz.mrp"],
      opv: v["kz.opv"],
      opvMaksMzp: v["kz.opv-maks-mzp"],
      vosms: v["kz.vosms"],
      vosmsMaksMzp: v["kz.vosms-maks-mzp"],
      vychetMrp: v["kz.bazovyy-vychet-mrp"],
      shkalaIpn: v["kz.ipn-shkala"],
      primenyatVychet: e.vychet,
    });
    const yanvar = god[0];
    const dekabr = god[11];
    const nettoZaGod = summa(god, "netto");
    const mesyatsy: TablaResultado = {
      tipo: "tabla",
      columnas: [
        { clave: "mesyats", etiqueta: "Месяц", formato: "texto" },
        { clave: "opv", etiqueta: "ОПВ", formato: "moneda" },
        { clave: "vosms", etiqueta: "ВОСМС", formato: "moneda" },
        { clave: "ipn", etiqueta: "ИПН", formato: "moneda" },
        { clave: "netto", etiqueta: "На руки", formato: "moneda" },
      ],
      filas: god.map((m) => [MESYATSY[m.mesyats - 1], m.opv, m.vosms, m.ipn, m.netto]),
    };
    const observaciones: string[] = [];
    if (dekabr.ipn !== yanvar.ipn) {
      observaciones.push(`Сумма на руки меняется в течение года: когда облагаемый доход с начала года превышает ${chislo(v["kz.ipn-shkala"][0].hasta ?? 0)} МРП, с превышения удерживается ИПН по ставке ${chislo(v["kz.ipn-shkala"][1]?.tasa ?? 0)} %.`);
    }
    if (!e.vychet) observaciones.push("Без базового вычета ИПН считается со всей зарплаты после ОПВ и ВОСМС. Вычет можно применить только у одного работодателя.");
    return {
      nettoSredne: redondear(nettoZaGod / 12),
      nettoYanvar: yanvar.netto,
      nettoDekabr: dekabr.netto,
      opv: yanvar.opv,
      vosms: yanvar.vosms,
      vychet: yanvar.vychet,
      oblagaemyy: yanvar.oblagaemyy,
      ipn: yanvar.ipn,
      uderzhanoVsego: redondear(yanvar.opv + yanvar.vosms + yanvar.ipn),
      bruttoZaGod: redondear(e.oklad * 12),
      ipnZaGod: summa(god, "ipn"),
      nettoZaGod,
      mesyatsy,
      observaciones,
    };
  },
  resultado: [
    { clave: "nettoSredne", etiqueta: "На руки в месяц (в среднем за год)", formato: "moneda", destacada: true },
    { clave: "nettoYanvar", etiqueta: "На руки в январе", formato: "moneda" },
    { clave: "nettoDekabr", etiqueta: "На руки в декабре", formato: "moneda" },
    { clave: "opv", etiqueta: "ОПВ (пенсионные взносы)", formato: "moneda" },
    { clave: "vosms", etiqueta: "ВОСМС (медицинское страхование)", formato: "moneda" },
    { clave: "vychet", etiqueta: "Базовый вычет", formato: "moneda", ocultarSiCero: true },
    { clave: "oblagaemyy", etiqueta: "Облагаемый доход за месяц", formato: "moneda" },
    { clave: "ipn", etiqueta: "ИПН (январь)", formato: "moneda" },
    { clave: "uderzhanoVsego", etiqueta: "Всего удержано за месяц", formato: "moneda" },
    { clave: "bruttoZaGod", etiqueta: "Начислено за год", formato: "moneda" },
    { clave: "ipnZaGod", etiqueta: "ИПН за год", formato: "moneda" },
    { clave: "nettoZaGod", etiqueta: "На руки за год", formato: "moneda" },
  ],
  mundo: { bruto: "oklad", periodoBruto: "mes", neto: "nettoSredne", periodoNeto: "mes", entrada: { vychet: true } },
});
