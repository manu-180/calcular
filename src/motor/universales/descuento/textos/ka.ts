import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosKa: TextosUi<UiDescuento> = {
  slug: "pasdaklebis-kalkulatori",
  ui: () => ({
    precio: "საწყისი ფასი",
    descuento: "ფასდაკლება (%)",
    segundoDescuento: "დამატებითი ფასდაკლება (%)",
    segundoDescuentoAyuda: "თუ აქციის გარდა კიდევ ერთი ფასდაკლება მოქმედებს, შეიყვანეთ აქ.",
    ahorro: "დაზოგილი თანხა",
    final: "ფასი ფასდაკლებით",
    descuentoTotal: "ჯამური ფასდაკლება",
    errorMayorA100: "ფასდაკლება არ შეიძლება აღემატებოდეს 100 პროცენტს.",
    observacionDoble: (efectivo) => `ორი ზედიზედ ფასდაკლება უბრალოდ არ იკრიბება. ჯამური ფასდაკლება: ${efectivo}%.`,
  }),
};
