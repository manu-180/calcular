import { conVariantes } from "../../comun/locales";
import { segunTrato, type TextosUi } from "../../tipos";
import type { UiFondoDeEmergencia } from "../definicion";

const base: TextosUi<UiFondoDeEmergencia> = {
  slug: "fondo-de-emergencia",
  ui: (trato) => ({
    gastos: "Gastos esenciales por mes",
    gastosAyuda: segunTrato(trato, {
      tu: "Lo que no puedes dejar de pagar: vivienda, comida, servicios, transporte, salud y deudas.",
      usted: "Lo que no puede dejar de pagar: vivienda, comida, servicios, transporte, salud y deudas.",
      vos: "Lo que no podés dejar de pagar: vivienda, comida, servicios, transporte, salud y deudas.",
    }),
    meses: "Meses de gastos a cubrir",
    mesesAyuda: "Entre 3 y 6 meses si el ingreso es estable. Más si es variable o hay una sola fuente de ingresos en la casa.",
    actual: segunTrato(trato, { tu: "Lo que ya tienes guardado (opcional)", usted: "Lo que ya tiene guardado (opcional)", vos: "Lo que ya tenés guardado (opcional)" }),
    aporte: segunTrato(trato, { tu: "Lo que puedes guardar por mes (opcional)", usted: "Lo que puede guardar por mes (opcional)", vos: "Lo que podés guardar por mes (opcional)" }),
    meta: "Fondo de emergencia recomendado",
    falta: "Lo que falta juntar",
    mesesParaLlegar: "Meses para completarlo",
    cobertura: "Meses que cubre lo ahorrado hoy",
    errorGastos: segunTrato(trato, {
      tu: "Escribe tus gastos esenciales de un mes.",
      usted: "Escriba sus gastos esenciales de un mes.",
      vos: "Escribí tus gastos esenciales de un mes.",
    }),
    yaCubierto: segunTrato(trato, {
      tu: "Ya tienes el fondo completo. Lo que ahorres de ahora en adelante puede ir a otras metas.",
      usted: "Ya tiene el fondo completo. Lo que ahorre de ahora en adelante puede ir a otras metas.",
      vos: "Ya tenés el fondo completo. Lo que ahorres de ahora en más puede ir a otras metas.",
    }),
    sinAporte: segunTrato(trato, {
      tu: "Escribe cuánto puedes guardar por mes y te decimos en cuánto tiempo lo completas.",
      usted: "Escriba cuánto puede guardar por mes y le decimos en cuánto tiempo lo completa.",
      vos: "Escribí cuánto podés guardar por mes y te decimos en cuánto tiempo lo completás.",
    }),
    observacionDonde:
      "Conviene tenerlo en una cuenta aparte, que se pueda retirar en el día y que no pierda valor: una caja de ahorro o un fondo de liquidez inmediata.",
  }),
};

const espana = (): Partial<UiFondoDeEmergencia> => ({
  gastos: "Gastos esenciales al mes",
  gastosAyuda: "Lo que no puedes dejar de pagar: vivienda, comida, suministros, transporte, salud y deudas.",
  aporte: "Lo que puedes ahorrar al mes (opcional)",
  falta: "Lo que falta por ahorrar",
  sinAporte: "Escribe cuánto puedes ahorrar al mes y te decimos en cuánto tiempo lo completas.",
  observacionDonde:
    "Conviene tenerlo en una cuenta aparte, de la que puedas sacar el dinero al momento y que no pierda valor: una cuenta remunerada o un depósito sin penalización por retirarlo.",
});

export const textosEs = conVariantes(base, { "es-ES": espana });
