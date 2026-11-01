import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosMn: TextosUi<UiMetaDeAhorro> = {
  slug: "khurimtlaliin-zorilgiin-tootsooluur",
  ui: () => ({
    meta: "Та хэр их мөнгө хуримтлуулахыг хүсэж байна вэ?",
    actual: "Одоо хэр их хуримтлалтай вэ (заавал биш)",
    meses: "Хэдэн сарын дотор",
    rendimiento: "Хуримтлалын жилийн өгөөж (%, заавал биш)",
    rendimientoAyuda: "Мөнгө хүү өгдөг данс эсвэл хөрөнгө оруулалтад байгаа бол. Өгөөжгүй бол хоосон үлдээнэ үү.",
    aporteMensual: "Сард хуримтлуулах дүн",
    aporteSemanal: "Долоо хоногт ногдох дүн",
    totalAportado: "Таны нийт төлсөн дүн",
    intereses: "Олсон хүү",
    errorMeta: "Хэр их мөнгө хуримтлуулахаа оруулна уу.",
    yaLlegas: "Таны одоо байгаа мөнгө шинэ хуримтлалгүйгээр энэ хугацаанд зорилгод хүрнэ.",
  }),
};
