import type { Novedad } from "@/motor/tipos";

const ZB = "https://www.noi.bg/wp-content/uploads/zbdoo-2026.pdf";

export const novedades: readonly Novedad[] = [
  {
    id: "bg.mod-avgust-2026",
    fecha: "2026-10-31",
    titulo: "От 1 август максималният осигурителен доход е 2300 евро",
    texto: "Бюджетът на ДОО за 2026 г. вдигна тавана от 2111,64 на 2300 евро месечно и минималния доход на самоосигуряващите се от 550,66 на 620,20 евро. Калкулаторите смятат с размера, който важи на избраната дата.",
    vigenteDesde: "2026-08-01",
    calculadoras: ["bg.kalkulator-zaplata-bruto-neto", "bg.kalkulator-neto-bruto", "bg.osiguritelni-vnoski", "bg.samoosiguryavashti-se-litsa"],
    fuente: { organismo: "НОИ", titulo: "Закон за бюджета на ДОО за 2026 г., чл. 9", url: ZB, tipo: "primaria", verificadoEl: "2026-10-31" },
  },
  {
    id: "bg.tzpb-avgust-2026",
    fecha: "2026-10-31",
    titulo: "Нови вноски за трудова злополука от 1 август",
    texto: "Приложение № 2А към бюджета на ДОО променя вноската за фонд „Трудова злополука и професионална болест“ при част от дейностите. Обхватът остава от 0,4 до 1,1 %.",
    vigenteDesde: "2026-08-01",
    calculadoras: ["bg.razhodi-na-rabotodatelya"],
    fuente: { organismo: "НОИ", titulo: "Закон за бюджета на ДОО за 2026 г., приложение № 2А", url: ZB, tipo: "primaria", verificadoEl: "2026-10-31" },
  },
  {
    id: "bg.obezshteteniya-2026",
    fecha: "2026-10-31",
    titulo: "Новите размери на обезщетенията през 2026 г.",
    texto: "За 2026 г. обезщетението за отглеждане на дете до 2 години е 398,81 евро, а дневното за безработица е между 9,21 и 54,78 евро.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["bg.obezshtenie-za-otglezhdane-na-dete", "bg.obezshtenie-za-bezrabotitsa"],
    fuente: { organismo: "НОИ", titulo: "Закон за бюджета на ДОО за 2026 г., чл. 11 и 12", url: ZB, tipo: "primaria", verificadoEl: "2026-10-31" },
  },
];
