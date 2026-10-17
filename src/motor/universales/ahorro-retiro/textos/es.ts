import { conVariantes } from "../../comun/locales";
import { segunTrato, type TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

const base: TextosUi<UiAhorroRetiro> = {
  slug: "ahorro-para-el-retiro",
  ui: (trato) => ({
    edadActual: segunTrato(trato, { tu: "Tu edad hoy", usted: "Su edad hoy", vos: "Tu edad hoy" }),
    edadRetiro: segunTrato(trato, { tu: "Edad a la que te quieres retirar", usted: "Edad a la que se quiere retirar", vos: "Edad a la que te querés retirar" }),
    actual: segunTrato(trato, { tu: "Lo que ya tienes ahorrado", usted: "Lo que ya tiene ahorrado", vos: "Lo que ya tenés ahorrado" }),
    aporte: "Aporte mensual",
    rendimiento: "Rendimiento real anual (%)",
    rendimientoAyuda: "Lo que rinde la inversión por encima de la inflación. Entre 2 % y 5 % es una suposición prudente para el largo plazo.",
    aniosRenta: "Años de retiro a cubrir",
    aniosRentaAyuda: segunTrato(trato, {
      tu: "Durante cuántos años quieres cobrar de este ahorro.",
      usted: "Durante cuántos años quiere cobrar de este ahorro.",
      vos: "Durante cuántos años querés cobrar de este ahorro.",
    }),
    capital: "Ahorro al retirarse",
    renta: "Ingreso mensual que da ese ahorro",
    aportado: "Total aportado",
    intereses: "Rendimiento acumulado",
    tabla: "Crecimiento por edad",
    colEdad: "Edad",
    colAportado: "Aportado hasta ahí",
    colSaldo: "Ahorro acumulado",
    errorEdades: segunTrato(trato, {
      tu: "La edad de retiro tiene que ser mayor que tu edad de hoy.",
      usted: "La edad de retiro tiene que ser mayor que su edad de hoy.",
      vos: "La edad de retiro tiene que ser mayor que tu edad de hoy.",
    }),
    errorSinAhorro: segunTrato(trato, {
      tu: "Escribe un ahorro inicial o un aporte mensual.",
      usted: "Escriba un ahorro inicial o un aporte mensual.",
      vos: "Escribí un ahorro inicial o un aporte mensual.",
    }),
    observacionDineroDeHoy: "Los montos están en dinero de hoy, porque el rendimiento ya descuenta la inflación.",
    observacionPublica: segunTrato(trato, {
      tu: "Es solo tu ahorro propio. No incluye la jubilación o pensión pública que puedas cobrar.",
      usted: "Es solo su ahorro propio. No incluye la jubilación o pensión pública que pueda cobrar.",
      vos: "Es solo tu ahorro propio. No incluye la jubilación o pensión pública que puedas cobrar.",
    }),
  }),
};

const espana = (): Partial<UiAhorroRetiro> => ({
  edadRetiro: "Edad a la que te quieres jubilar",
  aporte: "Aportación mensual",
  rendimientoAyuda: "Lo que rinde la inversión por encima de la inflación. Entre un 2 % y un 5 % es una suposición prudente a largo plazo.",
  aniosRenta: "Años de jubilación a cubrir",
  capital: "Ahorro al jubilarte",
  errorEdades: "La edad de jubilación tiene que ser mayor que tu edad de hoy.",
  errorSinAhorro: "Escribe un ahorro inicial o una aportación mensual.",
  observacionDineroDeHoy: "Las cantidades están en dinero de hoy, porque el rendimiento ya descuenta la inflación.",
  observacionPublica: "Es solo tu ahorro propio. No incluye la pensión de la Seguridad Social que puedas cobrar.",
});

export const textosEs = conVariantes(base, { "es-ES": espana });
