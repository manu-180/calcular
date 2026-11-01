import { conteoMn } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

export const textosMn: TextosUi<UiTarjetaDeCredito> = {
  slug: "kredit-kartyn-tolboriin-tootsooluur",
  ui: () => ({
    saldo: "Картын өр",
    tasa: "Жилийн хүү (%)",
    tasaAyuda: "Худалдан авалтад тооцох хүү. Картын хуулгаас олж болно.",
    modo: "Хэрхэн төлөх вэ?",
    modoFijo: "Сар бүр тогтмол дүн",
    modoMinimo: "Хамгийн бага төлбөр",
    pagoFijo: "Сарын тогтмол төлбөр",
    minimoPorcentaje: "Хамгийн бага төлбөр (өрийн хувиар)",
    minimoPorcentajeAyuda: "Карт гаргагчийн сар бүр шаарддаг дүн. Эргэлзэж байвал 5 хувь түгээмэл байдаг.",
    minimoPiso: "Хамгийн бага төлбөр үүнээс бага байхгүй",
    meses: "Төлж дуусах сарын тоо",
    intereses: "Төлсөн хүү",
    total: "Нийт төлсөн дүн",
    primerPago: "Эхний хамгийн бага төлбөр",
    tabla: "Сарын төлөвлөгөө",
    colMes: "Сар",
    colPago: "Төлбөр",
    colInteres: "Хүү",
    colCapital: "Үндсэн төлбөр",
    colSaldo: "Үлдэгдэл",
    errorSaldo: "Картын өрийн дүнгээ оруулна уу.",
    errorFaltaPago: "Сар бүр хэдийг төлөхөө оруулна уу.",
    errorNoCubre: (interes) => `Энэ төлбөрөөр өр хэзээ ч буурахгүй. Зөвхөн эхний сарын хүү ${interes} байна. Төлбөрөө нэмнэ үү.`,
    errorMuyLargo: "Энэ төлбөрөөр төлж дуусахад 50 гаруй жил шаардагдана. Төлбөрөө нэмнэ үү.",
    observacionAnios: (anios, meses) => {
      const a = conteoMn(anios, "жил");
      const m = meses === "0" ? "" : ` ${conteoMn(meses, "сар")}`;
      return `Энэ нь ${a}${m} болно.`;
    },
    observacionFijo: (pago, meses, ahorro) =>
      `Хэрэв та эхний хамгийн бага төлбөртэй тэнцэх ${pago} дүнг байнга төлвөл картаа ${conteoMn(meses, "сард")} төлж дуусгаж, хүүгийн ${ahorro} дүнг хэмнэнэ.`,
    observacionNoGastar: "Тооцоонд картаа төлж байх хугацаанд шинэ худалдан авалт хийхгүй гэж үзсэн.",
  }),
};
