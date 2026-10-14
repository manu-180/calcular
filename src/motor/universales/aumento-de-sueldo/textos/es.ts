import { segunTrato, type TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosEs: TextosUi<UiAumentoDeSueldo> = {
  slug: "aumento-de-sueldo",
  ui: (trato) => ({
    sueldo: "Sueldo mensual actual",
    sueldoAyuda: segunTrato(trato, {
      tu: "Bruto o neto, como prefieras. El resultado sale en la misma base.",
      usted: "Bruto o neto, como prefiera. El resultado sale en la misma base.",
      vos: "Bruto o neto, como prefieras. El resultado sale en la misma base.",
    }),
    aumentoPorcentaje: "Aumento (%)",
    aumentoMonto: "Aumento en dinero (opcional)",
    aumentoMontoAyuda: segunTrato(trato, {
      tu: "Si te lo dieron como monto fijo, escríbelo aquí. Se usa en lugar del porcentaje.",
      usted: "Si se lo dieron como monto fijo, escríbalo aquí. Se usa en lugar del porcentaje.",
      vos: "Si te lo dieron como monto fijo, escribilo acá. Se usa en lugar del porcentaje.",
    }),
    inflacion: "Inflación del período (%, opcional)",
    inflacionAyuda: "La inflación desde el último aumento, para saber si el sueldo compra más o menos que antes.",
    sueldosAnio: "Sueldos por año",
    sueldosAnioAyuda: segunTrato(trato, {
      tu: "12 si cobras un sueldo por mes. 13 o 14 si además cobras aguinaldo o sueldos extra en el año.",
      usted: "12 si cobra un sueldo por mes. 13 o 14 si además cobra aguinaldo o sueldos extra en el año.",
      vos: "12 si cobrás un sueldo por mes. 13 o 14 si además cobrás aguinaldo o sueldos extra en el año.",
    }),
    nuevo: "Nuevo sueldo mensual",
    diferenciaMensual: "Diferencia por mes",
    diferenciaAnual: "Diferencia por año",
    porcentaje: "Aumento en porcentaje",
    real: "Aumento real (descontada la inflación)",
    realAyuda: "Cuánto más puede comprar el sueldo nuevo que el anterior.",
    errorSueldo: segunTrato(trato, {
      tu: "Escribe tu sueldo actual.",
      usted: "Escriba su sueldo actual.",
      vos: "Escribí tu sueldo actual.",
    }),
    errorSinAumento: segunTrato(trato, {
      tu: "Escribe el aumento en porcentaje o en dinero.",
      usted: "Escriba el aumento en porcentaje o en dinero.",
      vos: "Escribí el aumento en porcentaje o en dinero.",
    }),
    observacionGana: (puntos) =>
      segunTrato(trato, {
        tu: `Le ganas a la inflación: tu sueldo compra un ${puntos} % más que antes.`,
        usted: `Le gana a la inflación: su sueldo compra un ${puntos} % más que antes.`,
        vos: `Le ganás a la inflación: tu sueldo compra un ${puntos} % más que antes.`,
      }),
    observacionPierde: (puntos) =>
      segunTrato(trato, {
        tu: `El aumento no alcanza a la inflación: tu sueldo compra un ${puntos} % menos que antes.`,
        usted: `El aumento no alcanza a la inflación: su sueldo compra un ${puntos} % menos que antes.`,
        vos: `El aumento no alcanza a la inflación: tu sueldo compra un ${puntos} % menos que antes.`,
      }),
    observacionIgual: "El aumento empata con la inflación: el sueldo compra lo mismo que antes.",
  }),
};
