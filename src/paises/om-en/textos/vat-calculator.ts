import { definirTextos } from "@/motor/edicion";
import calculadora from "../../om/calculadoras/vat-calculator";

export default definirTextos(calculadora, {
  calculadora: "om-en.vat-calculator",
  slug: "vat-calculator",
  campos: {
    operacion: { etiqueta: "What do you want to work out?", opciones: { add: "Add VAT to a price before tax", extract: "Take VAT out of a price that includes it" } },
    monto: { etiqueta: "Amount" },
  },
  filas: {
    impuesto: { etiqueta: "VAT amount" },
    neto: { etiqueta: "Price before VAT" },
    total: { etiqueta: "Price with VAT" },
    tasa: { etiqueta: "Rate applied" },
  },
  mensajes: {
    "أدخل المبلغ.": "Enter the amount.",
  },
});
