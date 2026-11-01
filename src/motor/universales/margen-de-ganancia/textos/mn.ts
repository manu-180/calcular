import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosMn: TextosUi<UiMargenDeGanancia> = {
  slug: "ashgiin-khuviin-tootsooluur",
  ui: () => ({
    modo: "Та юу тооцоолох вэ?",
    modoPrecio: "Өртөг, үнээр ашгийн хувь тооцоолох",
    modoMargen: "Хүссэн ашгийн хувьд тохирох үнэ",
    modoMarkup: "Хүссэн үнийн нэмэгдэлд тохирох үнэ",
    costo: "Нэгжийн өртөг",
    costoAyuda: "Нэг нэгжийг худалдан авах эсвэл үйлдвэрлэхэд гарах зардал. Үйлчлүүлэгчид шилждэг НӨАТ-ыг оруулахгүй.",
    precio: "Борлуулах үнэ",
    precioAyuda: "Зөвхөн ашгийн хувь тооцоолох үед. НӨАТ-гүй үнэ.",
    objetivo: "Хүссэн ашгийн хувь эсвэл үнийн нэмэгдэл (%)",
    objetivoAyuda: "Зөвхөн үнэ тооцоолох үед.",
    precioResultado: "Борлуулах үнэ",
    margen: "Ашгийн хувь",
    margenAyuda: "Ашгийг борлуулах үнийн хувиар илэрхийлсэн нь.",
    markup: "Үнийн нэмэгдэл",
    markupAyuda: "Ашгийг өртгийн хувиар илэрхийлсэн нь.",
    ganancia: "Нэгжийн ашиг",
    errorCosto: "Нэг нэгжийн өртгийг оруулна уу.",
    errorFaltaPrecio: "Ашгийн хувь тооцоолохын тулд борлуулах үнийг оруулна уу.",
    errorFaltaObjetivo: "Хүрэхийг хүссэн ашгийн хувь эсвэл үнийн нэмэгдлээ оруулна уу.",
    errorMargen100: "Ашгийн хувь 100 хувиас бага байх ёстой: 100 хувь бол бүх үнэ өртөггүй цэвэр ашиг болно.",
    observacionPerdida: "Энэ үнээр та өртгөөс доогуур зарж, борлуулалт бүрээс алдагдал хүлээнэ.",
  }),
};
