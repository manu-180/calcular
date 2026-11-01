import type { TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

export const textosMn: TextosUi<UiPuntoDeEquilibrio> = {
  slug: "aldagdalgui-ajillakh-tsegiin-tootsooluur",
  ui: () => ({
    fijos: "Сарын тогтмол зардал",
    fijosAyuda: "Юу ч зараагүй байсан ч төлөх зардал: түрээс, тогтмол цалин, ашиглалтын төлбөр, программ хангамж.",
    precio: "Нэгжийн борлуулах үнэ",
    variable: "Нэгжийн хувьсах зардал",
    variableAyuda: "Зарсан нэгж бүрт гарах зардал: материал, бараа, шимтгэл, хүргэлт.",
    objetivo: "Сард олохыг хүссэн ашиг (заавал биш)",
    objetivoAyuda: "Зардлаа нөхөхөөс гадна хэр их зарах ёстойг харахад тусална.",
    unidades: "Алдагдалгүй ажиллах нэгжийн тоо",
    facturacion: "Алдагдалгүй ажиллах борлуулалтын орлого",
    contribucion: "Нэгжийн хувь нэмэр",
    contribucionAyuda: "Борлуулалт бүрээс тогтмол зардлыг нөхөхөд үлдэх дүн: үнээс хувьсах зардлыг хассан дүн.",
    contribucionPct: "Хувь нэмэр (%)",
    unidadesObjetivo: "Хүссэн ашигт хүрэх нэгжийн тоо",
    facturacionObjetivo: "Хүссэн ашигт хүрэх борлуулалтын орлого",
    errorPrecio: "Нэг нэгжийн борлуулах үнийг оруулна уу.",
    errorMargen: "Хувьсах зардал үнэтэй тэнцүү эсвэл түүнээс өндөр байна. Борлуулалт бүр алдагдалтай тул алдагдалгүй ажиллах цэг байхгүй. Үнэ эсвэл зардлаа шалгана уу.",
    observacionRedondeo: "Нэгжийн хэсгийг зарах боломжгүй тул нэгжийн тоог дээш бүхэлчилсэн.",
  }),
};
