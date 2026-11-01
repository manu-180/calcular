import type { TextosUi } from "../../tipos";
import { duracionMn } from "../../dias-entre-fechas/textos/mn";
import type { UiEdad } from "../definicion";

export const textosMn: TextosUi<UiEdad> = {
  slug: "nasny-tootsooluur",
  ui: () => ({
    nacimiento: "Төрсөн огноо",
    referencia: "Нас тооцох огноо",
    referenciaAyuda: "Анхдагчаар өнөөдрийн огноо байна. Өөр огноонд хэдэн настайг харахын тулд өөрчилнө үү.",
    edad: "Нас",
    anios: "Хүрсэн нас",
    totalMeses: "Сараар",
    totalSemanas: "Долоо хоногоор",
    totalDias: "Өдрөөр",
    proximo: "Дараагийн төрсөн өдөр",
    faltan: "Үлдсэн өдөр",
    cumplira: "Хүрэх нас",
    duracion: duracionMn,
    errorFutura: "Төрсөн огноо нь нас тооцох огнооноос хойш байж болохгүй.",
    cumpleHoy: (anios) => `Өнөөдөр төрсөн өдөр. Хүрсэн нас: ${anios}.`,
    nota29: "2-р сарын 29 өдөр төрсөн хүний төрсөн өдрийг энгийн жилд 2-р сарын 28 өдөр гэж тооцно.",
  }),
};
