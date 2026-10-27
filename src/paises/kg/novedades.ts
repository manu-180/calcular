import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "kg.predelnaya-baza-2026",
    fecha: "2026-10-27",
    titulo: "С 2026 года у страховых взносов есть верхний предел",
    texto: "С 1 января 2026 года страховые взносы работника и работодателя считаются не больше чем с 20 среднемесячных зарплат по стране за прошлый год. В 2026 году это 720 940 сомов в месяц.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["kg.kalkulyator-zarplaty", "kg.zarplata-na-ruki", "kg.strakhovye-vznosy", "kg.nalogi-rabotodatelya"],
    fuente: {
      organismo: "Государственная налоговая служба при Министерстве финансов КР",
      titulo: "С 1 января 2026 года введен верхний предел для исчисления страховых взносов",
      url: "https://sti.gov.kg/news?id=cb3108d0-4bfe-41bc-ae18-2c878edfade1",
      tipo: "primaria",
      verificadoEl: "2026-10-27",
    },
  },
  {
    id: "kg.mzp-2026",
    fecha: "2026-10-27",
    titulo: "Минимальная зарплата в 2026 году 3280 сомов",
    texto: "Закон о республиканском бюджете установил минимальную заработную плату: 3280 сомов в 2026 году, 3608 сомов в 2027 году и 3968,8 сома в 2028 году.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["kg.minimalnaya-zarplata"],
    fuente: {
      organismo: "Министерство юстиции КР (Централизованный банк данных правовой информации)",
      titulo: "Закон КР «О республиканском бюджете Кыргызской Республики на 2026 год и плановый период 2027-2028 годов» от 27 января 2026 года № 9, статья 14",
      url: "https://cbd.minjust.gov.kg/4-5709/edition/48719/ru",
      tipo: "primaria",
      verificadoEl: "2026-10-27",
    },
  },
];
