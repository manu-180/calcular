import { segunTrato, type TextosUi } from "../../tipos";
import type { UiAlquilarOComprar } from "../definicion";

export const textosEs: TextosUi<UiAlquilarOComprar> = {
  slug: "alquilar-o-comprar",
  ui: (trato) => ({
    precio: "Precio de la vivienda",
    entrada: "Entrada (% del precio)",
    gastosCompra: "Gastos de compra (% del precio)",
    gastosCompraAyuda: "Escritura, impuestos de la compraventa, comisión de la inmobiliaria y tasación.",
    tasa: "Tasa de la hipoteca (% anual)",
    aniosHipoteca: "Plazo de la hipoteca en años",
    alquiler: "Alquiler mensual de una vivienda parecida",
    aumentoAlquiler: "Aumento del alquiler por año (%)",
    gastosPropietario: "Gastos del dueño por año (% del valor)",
    gastosPropietarioAyuda: "Mantenimiento, impuestos sobre la propiedad y seguro. Entre 1 % y 2 % es habitual.",
    revalorizacion: "Revalorización de la vivienda por año (%)",
    rendimiento: "Rendimiento de una inversión alternativa (% anual)",
    rendimientoAyuda: segunTrato(trato, {
      tu: "Lo que ganarías si invirtieras la entrada en lugar de comprar.",
      usted: "Lo que ganaría si invirtiera la entrada en lugar de comprar.",
      vos: "Lo que ganarías si invirtieras la entrada en lugar de comprar.",
    }),
    horizonte: "Años a comparar",
    veredicto: "Resultado",
    patrimonioComprar: "Patrimonio al final comprando",
    patrimonioAlquilar: "Patrimonio al final alquilando",
    diferencia: "Diferencia a favor",
    anioDesde: "Año desde el que conviene comprar",
    pagadoAlquilando: "Total pagado de alquiler",
    pagadoComprando: "Total pagado en cuotas y gastos del dueño",
    tabla: "Comparación año por año",
    colAnio: "Año",
    colComprar: "Comprando",
    colAlquilar: "Alquilando",
    colDiferencia: "Diferencia",
    errorPrecio: segunTrato(trato, {
      tu: "Escribe el precio de la vivienda.",
      usted: "Escriba el precio de la vivienda.",
      vos: "Escribí el precio de la vivienda.",
    }),
    errorAlquiler: segunTrato(trato, {
      tu: "Escribe cuánto costaría alquilar una vivienda parecida.",
      usted: "Escriba cuánto costaría alquilar una vivienda parecida.",
      vos: "Escribí cuánto costaría alquilar una vivienda parecida.",
    }),
    convieneComprar: (anios, diferencia) =>
      segunTrato(trato, {
        tu: `Conviene comprar: en ${anios} años tendrías ${diferencia} más.`,
        usted: `Conviene comprar: en ${anios} años tendría ${diferencia} más.`,
        vos: `Conviene comprar: en ${anios} años tendrías ${diferencia} más.`,
      }),
    convieneAlquilar: (anios, diferencia) =>
      segunTrato(trato, {
        tu: `Conviene alquilar: en ${anios} años tendrías ${diferencia} más.`,
        usted: `Conviene alquilar: en ${anios} años tendría ${diferencia} más.`,
        vos: `Conviene alquilar: en ${anios} años tendrías ${diferencia} más.`,
      }),
    empate: (anios) => `En ${anios} años las dos opciones terminan igual.`,
    observacionDesde: (anio) => `Comprar empieza a ganarle a alquilar en el año ${anio} y ya no vuelve a quedar atrás.`,
    observacionMetodo: segunTrato(trato, {
      tu: "Se compara lo que tendrías en cada caso. Si alquilas, la entrada y lo que te ahorras cada mes quedan invertidos. No se descuentan los gastos de una venta futura.",
      usted: "Se compara lo que tendría en cada caso. Si alquila, la entrada y lo que se ahorra cada mes quedan invertidos. No se descuentan los gastos de una venta futura.",
      vos: "Se compara lo que tendrías en cada caso. Si alquilás, la entrada y lo que te ahorrás cada mes quedan invertidos. No se descuentan los gastos de una venta futura.",
    }),
  }),
};
