import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosMn: TextosUi<UiDividirGastos> = {
  slug: "zardal-khuvaakh-tootsooluur",
  ui: () => ({
    persona: (n) => `Хүн ${n}`,
    personaAyuda: "Хүн бүр хэдийг төлснийг оруулна уу. Хэн нэгэн юу ч төлөөгүй ч зардалд оролцож байвал 0 гэж оруулна уу. Бусад талбарыг хоосон үлдээнэ үү.",
    total: "Нийт зардал",
    personas: "Хүний тоо",
    cuota: "Нэг хүнд ногдох хэсэг",
    transferencias: "Тооцоо дуусгах шилжүүлэг",
    tabla: "Хэн хэнд төлөх вэ",
    colDe: "Төлөх хүн",
    colPara: "Авах хүн",
    colMonto: "Дүн",
    errorPocas: "Зардал хуваахад дор хаяж хоёр хүн хэрэгтэй.",
    aMano: "Тооцоо дууссан: бүгд ижил дүн төлсөн байна.",
  }),
};
