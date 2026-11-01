import { cifrasBn } from "../../../i18n/bengali";
import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosBn: TextosUi<UiDescuento> = {
  slug: "discount",
  ui: () => ({
    precio: "আসল দাম",
    descuento: "ছাড় (%)",
    segundoDescuento: "অতিরিক্ত ছাড় (%)",
    segundoDescuentoAyuda: "এক ছাড়ের ওপর আরেকটি ছাড় থাকলে এখানে লিখুন।",
    ahorro: "আপনার সাশ্রয়",
    final: "ছাড়ের পর দাম",
    descuentoTotal: "মোট ছাড়",
    errorMayorA100: "ছাড় ১০০%-এর বেশি হতে পারে না।",
    observacionDoble: (efectivo) => `পরপর দুটি ছাড় সরাসরি যোগ হয় না। আপনার মোট ছাড় ${cifrasBn(efectivo)}%।`,
  }),
};
