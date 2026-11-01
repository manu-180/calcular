import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "mk.pridonesi-juli-2026",
    fecha: "2026-11-01",
    titulo: "Нови стапки на придонесите од јули 2026 година",
    texto: "Со исплатата на платата за јули 2026 година пензискиот придонес е 19,9 %, а придонесот за невработеност 0,1 %. Вкупниот товар останува 28 %, па нето-платата не се менува.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["mk.kalkulator-za-pridonesi", "mk.kalkulator-za-plata", "mk.trosok-na-rabotodavach"],
    fuente: {
      organismo: "Управа за јавни приходи",
      titulo: "Закон за придонеси од задолжително социјално осигурување, пречистен текст 07/2026, член 25",
      url: "https://www.ujp.gov.mk/files/attachment/0000/1616/Precisten_tekst_na_ZPZSO_07_2026______________.pdf",
      tipo: "primaria",
      verificadoEl: "2026-11-01",
    },
  },
  {
    id: "mk.licno-osloboduvanje-2026",
    fecha: "2026-11-01",
    titulo: "Лично ослободување за 2026 година",
    texto: "За 2026 година личното ослободување е 131.184 денари годишно, односно 10.932 денари месечно. Го користат сите пресметки на плата.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["mk.kalkulator-za-plata", "mk.kalkulator-neto-vo-bruto", "mk.kalkulator-za-personalen-danok"],
    fuente: {
      organismo: "Управа за јавни приходи",
      titulo: "Преглед на лично ослободување",
      url: "https://www.ujp.gov.mk/mk/plakjanje/licno_osloboduvanje",
      tipo: "primaria",
      verificadoEl: "2026-11-01",
    },
  },
  {
    id: "mk.prosechna-plata-2026",
    fecha: "2026-11-01",
    titulo: "Нова просечна плата за основицата на придонесите",
    texto: "За 2026 година просечната плата по работник е 69.141 денар. Најниската основица е половина од неа, а највисоката 16 просечни плати.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["mk.kalkulator-za-pridonesi", "mk.kalkulator-za-plata"],
    fuente: {
      organismo: "Управа за јавни приходи",
      titulo: "Стапки по видови социјални придонеси и просечна плата по работник",
      url: "https://www.ujp.gov.mk/mk/vodic/category/641",
      tipo: "primaria",
      verificadoEl: "2026-11-01",
    },
  },
];
