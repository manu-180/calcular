import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosMn: TextosUi<UiInteresCompuesto> = {
  slug: "niilmel-khuugiin-tootsooluur",
  ui: () => ({
    capital: "Анхны дүн",
    aporte: "Сарын нэмэлт дүн (заавал биш)",
    aporteAyuda: "Сар бүр нэмэх дүн. Сар бүрийн сүүлд нэмэгдэнэ.",
    tasa: "Жилийн хүү (%)",
    anios: "Жил",
    capitalizacion: "Хүү нэмэгдэх давтамж",
    anual: "Жил бүр",
    semestral: "Хагас жил тутам",
    trimestral: "Улирал бүр",
    mensual: "Сар бүр",
    diaria: "Өдөр бүр",
    saldo: "Эцсийн дүн",
    aportado: "Нийт оруулсан дүн",
    intereses: "Олсон хүү",
    tabla: "Жил жилийн өсөлт",
    colAnio: "Жил",
    colAportado: "Оруулсан дүн",
    colIntereses: "Хүү",
    colSaldo: "Оны эцсийн дүн",
    errorSinDinero: "Анхны дүн эсвэл сарын нэмэлт дүнгээ оруулна уу.",
    observacionIntereses: (porcentaje) => `Эцсийн дүнгийн ${porcentaje} хувь нь хүү юм.`,
  }),
};
