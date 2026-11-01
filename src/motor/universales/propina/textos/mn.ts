import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosMn: TextosUi<UiPropina> = {
  slug: "tsainy-mongonii-tootsooluur",
  ui: () => ({
    cuenta: "Тооцооны дүн",
    porcentaje: "Цайны мөнгө (%)",
    porcentajeAyuda: "Заншил нь улс орон, газар бүрт өөр байдаг. Өөрт тохирох хувийг сонгоно уу.",
    personas: "Төлөх хүний тоо",
    redondear: "Хүн бүрийн төлөх дүнг дээш бүхэлчлэх",
    redondearAyuda: "Ингэснээр хүн бүр бүхэл дүн төлнө. Зөрүү нь цайны мөнгөнд нэмэгдэнэ.",
    propina: "Цайны мөнгө",
    total: "Цайны мөнгөтэй нийт дүн",
    porPersona: "Хүн бүрийн төлөх дүн",
    propinaEfectiva: "Бүхэлчилсний дараах цайны мөнгө",
    errorPersonas: "Дор хаяж нэг хүн төлөх ёстой.",
    observacionRedondeo: (efectiva) => `Дээш бүхэлчилсний дараа цайны мөнгө тооцооны ${efectiva} хувьтай тэнцэнэ.`,
  }),
};
