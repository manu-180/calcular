import { segunTrato, type TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

export const textosEs: TextosUi<UiHipoteca> = {
  slug: "hipoteca",
  ui: (trato) => ({
    precio: "Precio de la vivienda",
    entradaPorcentaje: "Entrada o pie (% del precio)",
    entradaMonto: "Entrada en dinero (opcional)",
    entradaMontoAyuda: segunTrato(trato, {
      tu: "Si la escribes, se usa esta en lugar del porcentaje.",
      usted: "Si la escribe, se usa esta en lugar del porcentaje.",
      vos: "Si la escribís, se usa esta en lugar del porcentaje.",
    }),
    tasa: "Tasa de interés anual (%)",
    anios: "Plazo en años",
    gastos: "Gastos mensuales de la vivienda (opcional)",
    gastosAyuda: "Seguros, impuestos sobre la propiedad o gastos comunes que se pagan junto con la cuota.",
    cuota: "Cuota mensual de la hipoteca",
    cuotaTotal: "Pago mensual con gastos",
    entrada: "Entrada",
    prestado: "Monto del préstamo",
    intereses: "Total de intereses",
    total: "Total pagado en cuotas",
    tabla: "Evolución año por año",
    colAnio: "Año",
    colIntereses: "Intereses pagados",
    colCapital: "Capital devuelto",
    colSaldo: "Deuda al cierre",
    errorPrecio: segunTrato(trato, {
      tu: "Escribe el precio de la vivienda.",
      usted: "Escriba el precio de la vivienda.",
      vos: "Escribí el precio de la vivienda.",
    }),
    errorEntrada: segunTrato(trato, {
      tu: "La entrada cubre todo el precio, así que no necesitas hipoteca. Baja la entrada para calcular la cuota.",
      usted: "La entrada cubre todo el precio, así que no necesita hipoteca. Baje la entrada para calcular la cuota.",
      vos: "La entrada cubre todo el precio, así que no necesitás hipoteca. Bajá la entrada para calcular la cuota.",
    }),
    observacionPrestado: (porcentaje) =>
      segunTrato(trato, {
        tu: `Te prestan el ${porcentaje} % del valor de la vivienda. Cuanto más alto es ese porcentaje, más requisitos suele pedir el banco.`,
        usted: `Le prestan el ${porcentaje} % del valor de la vivienda. Cuanto más alto es ese porcentaje, más requisitos suele pedir el banco.`,
        vos: `Te prestan el ${porcentaje} % del valor de la vivienda. Cuanto más alto es ese porcentaje, más requisitos suele pedir el banco.`,
      }),
    observacionCostos: segunTrato(trato, {
      tu: "No incluye los gastos de compra (escritura, impuestos, tasación). Tenlos en cuenta además de la entrada.",
      usted: "No incluye los gastos de compra (escritura, impuestos, tasación). Téngalos en cuenta además de la entrada.",
      vos: "No incluye los gastos de compra (escritura, impuestos, tasación). Tenelos en cuenta además de la entrada.",
    }),
  }),
};
