import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosMn: TextosUi<UiAumentoDeSueldo> = {
  slug: "tsalingiin-nemegdel-tootsooluur",
  ui: () => ({
    sueldo: "Одоогийн сарын цалин",
    sueldoAyuda: "Нийт цалин эсвэл гарт авах цалин, аль тохиромжтойг нь оруулна уу. Үр дүн ижил суурь дээр гарна.",
    aumentoPorcentaje: "Цалингийн нэмэгдэл (%)",
    aumentoMonto: "Нэмэгдлийн дүн (заавал биш)",
    aumentoMontoAyuda: "Нэмэгдэл тогтмол дүнтэй бол энд оруулна уу. Хувийн оронд энэ дүнг ашиглана.",
    inflacion: "Тухайн хугацааны инфляц (%, заавал биш)",
    inflacionAyuda: "Цалин өмнө нь нэмэгдсэнээс хойшхи инфляцыг оруулбал цалин тань өмнөхөөс илүү эсвэл бага зүйл худалдаж авахыг харна.",
    sueldosAnio: "Жилд авах цалингийн тоо",
    sueldosAnioAyuda: "Сарын цалинтай бол 12. Жил бүр нэмэлт цалин авдаг бол 13 эсвэл 14.",
    nuevo: "Шинэ сарын цалин",
    diferenciaMensual: "Сарын зөрүү",
    diferenciaAnual: "Жилийн зөрүү",
    porcentaje: "Нэмэгдлийн хувь",
    real: "Бодит нэмэгдэл (инфляцыг хассан)",
    realAyuda: "Шинэ цалин хуучин цалингаас хэр илүү зүйл худалдаж авахыг заана.",
    errorSueldo: "Одоогийн цалингаа оруулна уу.",
    errorSinAumento: "Нэмэгдлийг хувиар эсвэл дүнгээр оруулна уу.",
    observacionGana: (puntos) => `Та инфляцаас түрүүлж байна: цалин тань өмнөхөөс ${puntos} хувиар илүү зүйл худалдаж авна.`,
    observacionPierde: (puntos) => `Нэмэгдэл инфляцаас хоцорч байна: цалин тань өмнөхөөс ${puntos} хувиар бага зүйл худалдаж авна.`,
    observacionIgual: "Нэмэгдэл инфляцтай тэнцүү байна: цалин тань өмнөхтэй адил зүйл худалдаж авна.",
  }),
};
