import { definirTextos } from "@/motor/edicion";
import salesTax from "../../us/calculadoras/sales-tax";
import { COMUN } from "../lib/comun";

export default definirTextos(salesTax, {
  calculadora: "us-es.sales-tax",
  slug: "calculadora-impuesto-sobre-las-ventas",
  campos: {
    modo: { etiqueta: "¿Qué quieres hacer?", opciones: { "sumar": "Sumar el impuesto a un precio", "quitar": "Quitar el impuesto de un total" } },
    monto: { etiqueta: "Monto" },
    tasa: { etiqueta: "Tasa combinada del impuesto sobre las ventas", ayuda: "Tasa del estado más las del condado, la ciudad y el distrito donde compras. Aparece en tu recibo." },
  },
  filas: {
    antes: { etiqueta: "Precio antes del impuesto" },
    impuesto: { etiqueta: "Impuesto sobre las ventas" },
    total: { etiqueta: "Total con impuesto" },
  },
  ...COMUN,
});
