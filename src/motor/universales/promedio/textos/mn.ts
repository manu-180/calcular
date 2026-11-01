import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosMn: TextosUi<UiPromedio> = {
  slug: "jignesen-dundaj-tootsooluur",
  ui: () => ({
    nota: (n) => `Дүн ${n}`,
    notaAyuda: "Дүн эсвэл утга бүрийг жингийн хамт оруулна уу. Ашиглаагүй мөрийг хоосон орхино уу.",
    peso: (n) => `Жин ${n}`,
    pesoAyuda: "Хувь, кредит эсвэл хэдэн удаа тоологдохыг оруулж болно. Жин оруулахгүй бол бүх утга ижил тоологдоно.",
    ponderado: "Жигнэсэн дундаж",
    simple: "Энгийн дундаж",
    cantidad: "Утгын тоо",
    sumaPesos: "Жингийн нийлбэр",
    errorSinNotas: "Дор хаяж нэг утга оруулна уу.",
    errorFaltaPeso: "Энэ утгад жин байхгүй байна. Жин ашиглаж байгаа бол утга бүрт бөглөнө үү.",
    errorFaltaNota: "Энэ жинд утга байхгүй байна. Утгыг бөглөх эсвэл жинг устгана уу.",
    errorPesosCero: "Жингийн нийлбэр 0 байна. Дор хаяж нэг жин тэгээс их байх ёстой.",
    sinPesos: "Жин оруулаагүй үед жигнэсэн дундаж нь энгийн дундажтай тэнцүү байна.",
  }),
};
