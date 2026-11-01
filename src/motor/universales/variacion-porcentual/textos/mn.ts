import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosMn: TextosUi<UiVariacion> = {
  slug: "khuviin-oorchloltiin-tootsooluur",
  ui: () => ({
    inicial: "Эхний утга",
    final: "Эцсийн утга",
    variacion: "Хувийн өөрчлөлт",
    diferencia: "Зөрүү",
    vuelta: "Эхний утгад буцах",
    vueltaAyuda: "Эхний утгад буцахын тулд эцсийн утга хэр их өөрчлөгдөх ёстой вэ.",
    errorInicialCero: "Эхний утга 0 байж болохгүй, учир нь тэгээс хувийн өөрчлөлт тооцох боломжгүй.",
    subio: (p) => `${p} хувиар өссөн.`,
    bajo: (p) => `${p} хувиар буурсан.`,
    igual: "Өөрчлөлт алга: хоёр утга ижил байна.",
  }),
};
