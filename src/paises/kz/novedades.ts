import type { Novedad } from "@/motor/tipos";

const NK = {
  organismo: "ИПС «Адилет» (Министерство юстиции РК)",
  titulo: "Налоговый кодекс РК от 18 июля 2025 г. № 214-VIII",
  url: "https://adilet.zan.kz/rus/docs/K2500000214",
  tipo: "primaria",
  verificadoEl: "2026-10-24",
} as const;

export const novedades: readonly Novedad[] = [
  {
    id: "kz.nalogovyy-kodeks-2026-ipn",
    fecha: "2026-10-24",
    titulo: "Новый Налоговый кодекс: ИПН 10 % и 15 %, базовый вычет 30 МРП",
    texto: "С 1 января 2026 года ИПН с зарплаты считается по прогрессивной шкале: 10 % с годового облагаемого дохода до 8500 МРП и 15 % с превышения. Базовый вычет составляет 30 МРП в месяц. Социальный налог работодателя равен 6 %.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["kz.kalkulyator-zarplaty", "kz.zarplata-na-ruki", "kz.kalkulyator-ipn", "kz.nalogi-rabotodatelya"],
    fuente: NK,
  },
  {
    id: "kz.nds-16-2026",
    fecha: "2026-10-24",
    titulo: "НДС 16 % с 1 января 2026 года",
    texto: "Основная ставка НДС по новому Налоговому кодексу составляет 16 %. Для лекарств, медицинских изделий и медицинских услуг в 2026 году действует ставка 5 %, для отечественной периодической печати 10 %.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["kz.kalkulyator-nds"],
    fuente: NK,
  },
  {
    id: "kz.mrp-2026",
    fecha: "2026-10-24",
    titulo: "МРП 2026 года 4325 тенге, МЗП 85 000 тенге",
    texto: "Закон о республиканском бюджете установил с 1 января 2026 года МРП 4325 тенге и минимальную зарплату 85 000 тенге. От МРП зависят вычеты, пособия, штрафы и налоги на имущество и транспорт.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["kz.mrp-v-tenge", "kz.minimalnaya-zarplata", "kz.kalkulyator-zarplaty"],
    fuente: {
      organismo: "Комитет государственных доходов (gov.kz)",
      titulo: "Закон РК «О республиканском бюджете на 2026-2028 годы» от 8 декабря 2025 г. № 239-VIII, статья 7",
      url: "https://www.gov.kz/memleket/entities/kgd-ulytau/documents/details/939202?lang=ru",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
  {
    id: "kz.osms-predely-2026",
    fecha: "2026-10-24",
    titulo: "ОСМС: взносы считаются с дохода до 20 МЗП, отчисления до 40 МЗП",
    texto: "С 2026 года наибольший доход для взносов работника на ОСМС вырос с 10 до 20 МЗП, а для отчислений работодателя с 10 до 40 МЗП. Ставки остались прежними: 2 % и 3 %.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["kz.kalkulyator-zarplaty", "kz.nalogi-rabotodatelya"],
    fuente: {
      organismo: "ИПС «Адилет» (Министерство юстиции РК)",
      titulo: "Закон РК «Об обязательном социальном медицинском страховании», статьи 27 и 28",
      url: "https://adilet.zan.kz/rus/docs/Z1500000405",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
];
