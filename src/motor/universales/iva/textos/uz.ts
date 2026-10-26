import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosUz: TextosUi<UiIva> = {
  slug: "qqs-kalkulyatori",
  ui: () => ({
    operacion: "Nima qilmoqchisiz?",
    agregar: "QQSsiz narxga QQS qoʻshish",
    quitar: "QQS bilan narxdan QQSni ajratish",
    monto: "Narx",
    montoAyuda: "QQS qoʻshayotgan boʻlsangiz, QQSsiz narx; ajratayotgan boʻlsangiz, QQS bilan narx.",
    otraTasa: "Boshqa QQS stavkasi (%)",
    otraTasaAyuda: "Ixtiyoriy. Mahsulot yoki xizmatga pasaytirilgan stavka qoʻllansa, shu yerga yozing. Aks holda umumiy stavka olinadi.",
    neto: "QQSsiz narx",
    impuesto: "QQS summasi",
    total: "QQS bilan narx",
    tasaUsada: "Qoʻllangan stavka",
    errorTasa: "QQS stavkasi notoʻgʻri.",
  }),
};
