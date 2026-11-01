import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosMn: TextosUi<UiPrestamo> = {
  slug: "zeeliin-tootsooluur",
  ui: () => ({
    monto: "Зээлийн хэмжээ",
    tasa: "Жилийн хүү (%)",
    tasaAyuda: "Зээлийн саналд заасан жилийн нэрлэсэн хүү. Шимтгэл үүнд ороогүй.",
    meses: "Хугацаа (сараар)",
    extra: "Сар бүрийн нэмэлт төлбөр (заавал биш)",
    extraAyuda: "Зээлээ эрт төлөхийн тулд сар бүр нэмж төлөх дүн. Бүхэлдээ үндсэн төлбөрт орно.",
    cuota: "Сарын төлбөр",
    intereses: "Нийт хүү",
    total: "Нийт төлөх дүн",
    mesesReales: "Нэмэлт төлбөртэйгөөр төлж дуусах сар",
    ahorro: "Хэмнэсэн хүү",
    tabla: "Зээлийн эргэн төлөлтийн хуваарь",
    colMes: "Сар",
    colPago: "Төлбөр",
    colInteres: "Хүү",
    colCapital: "Үндсэн төлбөр",
    colSaldo: "Үлдэгдэл",
    errorMonto: "Тэгээс их дүн оруулна уу.",
    observacionCostos: "Сарын төлбөрт зээлдүүлэгчийн нэмж болох даатгал, шимтгэл, татвар ороогүй. Гэрээ байгуулахаас өмнө зээлийн нийт өртгийг асууна уу.",
    observacionExtra: (meses, ahorro) => `Нэмэлт төлбөрөөр та зээлээ ${meses} сард төлж дуусгаж, хүүгийн зардлаас ${ahorro} хэмнэнэ.`,
  }),
};
