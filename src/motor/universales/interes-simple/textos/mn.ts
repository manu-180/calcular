import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosMn: TextosUi<UiInteresSimple> = {
  slug: "engiin-khuugiin-tootsooluur",
  ui: () => ({
    capital: "Үндсэн дүн",
    tasa: "Жилийн хүү (%)",
    tiempo: "Хугацаа",
    unidad: "Хугацааны нэгж",
    dias: "Өдөр",
    meses: "Сар",
    anios: "Жил",
    base: "Жилийн өдрийн тоо (хугацааг өдрөөр тооцох үед)",
    baseAyuda: "Зарим банк жилийг 360 өдрөөр тооцдог. Эргэлзэж байвал 365 хэвээр нь үлдээнэ үү.",
    base365: "365 өдөр",
    base360: "360 өдөр (банкны жил)",
    interes: "Хүү",
    montoFinal: "Үндсэн дүн ба хүүгийн нийлбэр",
    tasaPeriodo: "Тухайн хугацааны хүү",
    errorCapital: "Тэгээс их үндсэн дүн оруулна уу.",
  }),
};
