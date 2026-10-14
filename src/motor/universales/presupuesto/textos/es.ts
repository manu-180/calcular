import { conVariantes } from "../../comun/locales";
import { segunTrato, type TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

const base: TextosUi<UiPresupuesto> = {
  slug: "presupuesto-50-30-20",
  ui: (trato) => ({
    ingreso: "Ingreso neto mensual",
    ingresoAyuda: segunTrato(trato, {
      tu: "Lo que te llega a la cuenta cada mes, después de impuestos y descuentos.",
      usted: "Lo que le llega a la cuenta cada mes, después de impuestos y descuentos.",
      vos: "Lo que te llega a la cuenta cada mes, después de impuestos y descuentos.",
    }),
    pctNecesidades: "Necesidades (%)",
    pctNecesidadesAyuda: "Vivienda, comida, servicios, transporte, salud y deudas mínimas.",
    pctGustos: "Gustos (%)",
    pctGustosAyuda: "Salidas, ropa que no es imprescindible, suscripciones, viajes.",
    pctAhorro: "Ahorro (%)",
    pctAhorroAyuda: "Fondo de emergencia, metas, retiro y pagos extra de deudas.",
    necesidades: "Para necesidades",
    gustos: "Para gustos",
    ahorro: "Para ahorro",
    ahorroAnual: "Ahorro en un año",
    errorIngreso: segunTrato(trato, {
      tu: "Escribe tu ingreso mensual.",
      usted: "Escriba su ingreso mensual.",
      vos: "Escribí tu ingreso mensual.",
    }),
    errorSuma: (suma) =>
      segunTrato(trato, {
        tu: `Los tres porcentajes suman ${suma} % y tienen que sumar 100 %. Ajusta alguno.`,
        usted: `Los tres porcentajes suman ${suma} % y tienen que sumar 100 %. Ajuste alguno.`,
        vos: `Los tres porcentajes suman ${suma} % y tienen que sumar 100 %. Ajustá alguno.`,
      }),
    observacionAhorroBajo: segunTrato(trato, {
      tu: "Ahorrar menos del 10 % deja poco margen para imprevistos. Si puedes, recorta algo de gustos.",
      usted: "Ahorrar menos del 10 % deja poco margen para imprevistos. Si puede, recorte algo de gustos.",
      vos: "Ahorrar menos del 10 % deja poco margen para imprevistos. Si podés, recortá algo de gustos.",
    }),
  }),
};

const espana = (): Partial<UiPresupuesto> => ({
  ingresoAyuda: "Lo que te llega a la cuenta cada mes, después de retenciones y cotizaciones.",
  pctNecesidadesAyuda: "Vivienda, comida, suministros, transporte, salud y pagos mínimos de deudas.",
  pctAhorroAyuda: "Fondo de emergencia, metas, jubilación y amortizaciones extra de deudas.",
});

export const textosEs = conVariantes(base, { "es-ES": espana });
