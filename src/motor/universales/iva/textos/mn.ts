import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosMn: TextosUi<UiIva> = {
  slug: "noat-tootsooluur",
  ui: () => ({
    operacion: "Та юу тооцоолох вэ?",
    agregar: "Татваргүй үнэ дээр НӨАТ нэмэх",
    quitar: "НӨАТ багтсан үнээс НӨАТ хасах",
    monto: "Үнэ",
    montoAyuda: "Татвар нэмэх бол НӨАТ-гүй үнэ, хасах бол НӨАТ-тай үнэ оруулна уу.",
    otraTasa: "НӨАТ-ын өөр хувь (%)",
    otraTasaAyuda: "Заавал биш. Бараа, үйлчилгээнд бууруулсан хувь үйлчилдэг бол энд оруулна уу. Бусад тохиолдолд үндсэн хувийг хэрэглэнэ.",
    neto: "НӨАТ-гүй үнэ",
    impuesto: "НӨАТ-ын дүн",
    total: "НӨАТ-тай үнэ",
    tasaUsada: "Хэрэглэсэн хувь",
    errorTasa: "НӨАТ-ын хувь буруу байна.",
  }),
};
