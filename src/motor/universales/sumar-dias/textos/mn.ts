import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosMn: TextosUi<UiSumarDias> = {
  slug: "ognoond-odor-nemekh-tootsooluur",
  ui: () => ({
    fecha: "Эхлэх огноо",
    operacion: "Үйлдэл",
    sumar: "Өдөр нэмэх",
    restar: "Өдөр хасах",
    dias: "Өдрийн тоо",
    tipo: "Өдрийн төрөл",
    corridos: "Хуанлийн өдөр",
    habiles: "Ажлын өдөр (даваагаас баасан хүртэл)",
    resultado: "Гарсан огноо",
    diaSemana: "Гараг",
    diasCorridos: "Нийт хуанлийн өдөр",
    nombresDias: ["ням гараг", "даваа гараг", "мягмар гараг", "лхагва гараг", "пүрэв гараг", "баасан гараг", "бямба гараг"],
    errorDias: "Өдрийн тоо нь 100 жил хүртэлх бүхэл тоо байх ёстой.",
    notaHabiles: "Ажлын өдрийн тооцоонд бямба, ням гарагийг алгасах боловч албан ёсны амралтын өдрийг алгасахгүй. Дунд нь баяр ёслолын өдөр таарвал түүнийг тусад нь нэмнэ үү.",
  }),
};
