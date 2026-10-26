import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { godRabotnika, kopeyki, type ParametryRabotnika } from "../lib/zarplata";

function nettoYanvarya(brutto: number, p: ParametryRabotnika): number {
  return godRabotnika(brutto, p)[0].netto;
}

export default definirCalculadora({
  id: "kz.zarplata-na-ruki",
  mercado: "kz",
  concepto: "propio",
  slug: "zarplata-na-ruki",
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
    { id: "naRuki", tipo: "moneda", etiqueta: "Сколько вы хотите получать на руки в месяц", min: 0, porDefecto: 400000 },
    { id: "vychet", tipo: "si-no", etiqueta: "Применять базовый налоговый вычет", porDefecto: true },
  ],
  calcular(e, v) {
    if (e.naRuki <= 0) throw new ErrorEntrada("Введите сумму на руки больше нуля.", "naRuki");
    const p: ParametryRabotnika = {
      mzp: v["kz.mzp"],
      mrp: v["kz.mrp"],
      opv: v["kz.opv"],
      opvMaksMzp: v["kz.opv-maks-mzp"],
      vosms: v["kz.vosms"],
      vosmsMaksMzp: v["kz.vosms-maks-mzp"],
      vychetMrp: v["kz.bazovyy-vychet-mrp"],
      shkalaIpn: v["kz.ipn-shkala"],
      primenyatVychet: e.vychet,
    };
    // На руки растет вместе с начисленной зарплатой, поэтому начисленную сумму ищем делением пополам
    // и округляем вверх до целого тенге, чтобы на руки было не меньше заданного.
    let niz = e.naRuki;
    let verkh = e.naRuki * 2 + 1;
    for (let i = 0; i < 80 && verkh - niz > 0.001; i++) {
      const s = (niz + verkh) / 2;
      if (nettoYanvarya(s, p) >= e.naRuki) verkh = s;
      else niz = s;
    }
    let brutto = Math.ceil(verkh - 1e-6);
    while (brutto > 1 && nettoYanvarya(brutto - 1, p) >= e.naRuki) brutto -= 1;
    const mesyats = godRabotnika(brutto, p)[0];
    return {
      brutto,
      opv: mesyats.opv,
      vosms: mesyats.vosms,
      ipn: mesyats.ipn,
      netto: mesyats.netto,
      uderzhano: kopeyki(mesyats.opv + mesyats.vosms + mesyats.ipn),
      observaciones: ["Расчет сделан для январской зарплаты. Если годовой облагаемый доход превысит порог прогрессивной шкалы, в конце года ИПН будет выше."],
    };
  },
  resultado: [
    { clave: "brutto", etiqueta: "Начисленная зарплата (до вычета налогов)", formato: "moneda", destacada: true },
    { clave: "opv", etiqueta: "ОПВ", formato: "moneda" },
    { clave: "vosms", etiqueta: "ВОСМС", formato: "moneda" },
    { clave: "ipn", etiqueta: "ИПН", formato: "moneda" },
    { clave: "uderzhano", etiqueta: "Всего удержано", formato: "moneda" },
    { clave: "netto", etiqueta: "На руки", formato: "moneda" },
  ],
});
