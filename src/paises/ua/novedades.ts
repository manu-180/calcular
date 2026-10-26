import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "ua.oblikova-stavka-veresen-2026",
    fecha: "2026-10-24",
    titulo: "Облікова ставка НБУ зросла до 16 %",
    texto: "З 18 вересня 2026 року облікова ставка Національного банку становить 16 %. Від неї залежить граничний розмір пені за прострочення платежу.",
    vigenteDesde: "2026-09-18",
    calculadoras: ["ua.kalkuliator-peni"],
    fuente: {
      organismo: "Національний банк України",
      titulo: "Облікова ставка Національного банку України (статистичний ряд)",
      url: "https://bank.gov.ua/NBUStatService/v1/statdirectory/key?json",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
  {
    id: "ua.viiskovyi-zbir-4835",
    fecha: "2026-10-24",
    titulo: "Військовий збір продовжено після воєнного стану",
    texto: "Закон № 4835-IX від 7 квітня 2026 року змінив строк дії військового збору: його справлятимуть до 31 грудня третього календарного року після року, у якому припинять або скасують воєнний стан. Ставка для зарплати не змінилася.",
    calculadoras: ["ua.kalkuliator-zarplaty", "ua.zarplata-na-ruky", "ua.kalkuliator-fop"],
    fuente: {
      organismo: "Державна податкова служба України",
      titulo: "Закон України від 07.04.2026 № 4835-IX",
      url: "https://tax.gov.ua/zakonodavstvo/podatkove-zakonodavstvo/zakoni-ukraini/80076.html",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
  {
    id: "ua.minimalna-zarplata-2026",
    fecha: "2026-10-24",
    titulo: "Мінімальна зарплата у 2026 році: 8647 грн",
    texto: "З 1 січня 2026 року мінімальна зарплата становить 8647 грн на місяць і 52 грн на годину. Від неї рахують мінімальний ЄСВ, військовий збір і єдиний податок для ФОП та максимальну базу ЄСВ.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["ua.minimalna-zarplata", "ua.kalkuliator-zarplaty", "ua.kalkuliator-fop", "ua.yesv-dlia-fop"],
    fuente: {
      organismo: "Державна податкова служба України",
      titulo: "ЗІР ДПС: розмір мінімальної заробітної плати на 2026 рік",
      url: "https://zir.tax.gov.ua/docs/stavki/size_of_the_minimum_wage.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
];
