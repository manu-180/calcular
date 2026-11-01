import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

const unidad = (u: string) => ({ kg: "кг", lb: "фунт", cm: "см" })[u] ?? u;

export const textosMn: TextosUi<UiImc> = {
  slug: "biyeiin-jingiin-indeks",
  ui: () => ({
    peso: (u) => `Жин (${unidad(u)})`,
    altura: (u) => `Өндөр (${unidad(u)})`,
    pies: "Өндөр: фут",
    pulgadas: "Өндөр: инч",
    imc: "Биеийн жингийн индекс (БЖИ)",
    categoria: "Ангилал (ДЭМБ)",
    pesoMin: (u) => `Эрүүл жингийн доод хэмжээ (${unidad(u)})`,
    pesoMax: (u) => `Эрүүл жингийн дээд хэмжээ (${unidad(u)})`,
    rangoAyuda: "Энэ өндөрт БЖИ эрүүл хязгаарт байх жингийн хэмжээ.",
    bajo: "Жин дутуу",
    normal: "Хэвийн жин",
    sobrepeso: "Илүүдэл жин",
    obesidad1: "I зэргийн таргалалт",
    obesidad2: "II зэргийн таргалалт",
    obesidad3: "III зэргийн таргалалт",
    errorPeso: "Жин 0 тооноос их байх ёстой.",
    errorAltura: "Өндөр 0 тооноос их байх ёстой.",
    aviso:
      "БЖИ бол насанд хүрэгчдэд зориулсан ерөнхий чиглүүлэг: булчин, өөхийг ялгадаггүй бөгөөд жирэмсэн үед болон хүүхдэд адилхан тайлбарладаггүй. Энэ нь эмнэлгийн мэргэжилтний зөвлөгөөг орлохгүй.",
  }),
};
