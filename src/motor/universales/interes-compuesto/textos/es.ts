import { conVariantes } from "../../comun/locales";
import { segunTrato, type TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

const base: TextosUi<UiInteresCompuesto> = {
  slug: "interes-compuesto",
  ui: (trato) => ({
    capital: "Capital inicial",
    aporte: "Aporte mensual (opcional)",
    aporteAyuda: segunTrato(trato, {
      tu: "Lo que sumarías cada mes. Se agrega al final de cada mes.",
      usted: "Lo que sumaría cada mes. Se agrega al final de cada mes.",
      vos: "Lo que sumarías cada mes. Se agrega al final de cada mes.",
    }),
    tasa: "Tasa de interés anual (%)",
    anios: "Plazo en años",
    capitalizacion: "Capitalización de los intereses",
    anual: "Anual",
    semestral: "Semestral",
    trimestral: "Trimestral",
    mensual: "Mensual",
    diaria: "Diaria",
    saldo: "Saldo final",
    aportado: "Total aportado",
    intereses: "Intereses ganados",
    tabla: "Crecimiento año por año",
    colAnio: "Año",
    colAportado: "Aportes del año",
    colIntereses: "Intereses del año",
    colSaldo: "Saldo al cierre",
    errorSinDinero: segunTrato(trato, {
      tu: "Escribe un capital inicial o un aporte mensual.",
      usted: "Escriba un capital inicial o un aporte mensual.",
      vos: "Escribí un capital inicial o un aporte mensual.",
    }),
    observacionIntereses: (porcentaje) => `El ${porcentaje} % del saldo final son intereses.`,
  }),
};

const espana = (): Partial<UiInteresCompuesto> => ({
  aporte: "Aportación mensual (opcional)",
  aporteAyuda: "Lo que añadirías cada mes. Se suma al final de cada mes.",
  tasa: "Tipo de interés anual (%)",
  colAportado: "Aportaciones del año",
  errorSinDinero: "Escribe un capital inicial o una aportación mensual.",
});

export const textosEs = conVariantes(base, { "es-ES": espana });
