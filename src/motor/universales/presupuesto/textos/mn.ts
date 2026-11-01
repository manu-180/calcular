import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosMn: TextosUi<UiPresupuesto> = {
  slug: "tosov-50-30-20",
  ui: () => ({
    ingreso: "Сарын цэвэр орлого",
    ingresoAyuda: "Татвар, нийгмийн даатгалын шимтгэлийн дараа дансанд тань сар бүр ордог дүн.",
    pctNecesidades: "Хэрэгцээ (%)",
    pctNecesidadesAyuda: "Орон сууц, хоол хүнс, цахилгаан, усны төлбөр, тээвэр, эрүүл мэнд, зээлийн доод төлбөр.",
    pctGustos: "Хүсэл (%)",
    pctGustosAyuda: "Гадуур хооллолт, заавал биш худалдан авалт, захиалгат үйлчилгээ, аялал.",
    pctAhorro: "Хуримтлал (%)",
    pctAhorroAyuda: "Санхүүгийн нөөц, зорилго, тэтгэвэр, өрийн нэмэлт төлбөр.",
    necesidades: "Хэрэгцээнд",
    gustos: "Хүсэлд",
    ahorro: "Хуримтлалд",
    ahorroAnual: "Жилийн хуримтлал",
    errorIngreso: "Сарын орлогоо оруулна уу.",
    errorSuma: (suma) => `Гурван хувийн нийлбэр ${suma}% байна. Нийлбэр нь 100% байх ёстой.`,
    observacionAhorroBajo: "10 хувиас бага хуримтлуулбал гэнэтийн зардалд бага зай үлдэнэ. Боломжтой бол хүслийн зарим хэсгийг бууруулна уу.",
  }),
};
