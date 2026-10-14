import { conVariantes } from "../../comun/locales";
import { segunTrato, type TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

const base: TextosUi<UiInteresSimple> = {
  slug: "interes-simple",
  ui: (trato) => ({
    capital: "Capital",
    tasa: "Tasa de interés anual (%)",
    tiempo: "Plazo",
    unidad: "El plazo está en",
    dias: "Días",
    meses: "Meses",
    anios: "Años",
    base: "Año de cálculo para plazos en días",
    baseAyuda: segunTrato(trato, {
      tu: "Algunos bancos cuentan el año como de 360 días. Si no lo sabes, deja 365.",
      usted: "Algunos bancos cuentan el año como de 360 días. Si no lo sabe, deje 365.",
      vos: "Algunos bancos cuentan el año como de 360 días. Si no lo sabés, dejá 365.",
    }),
    base365: "365 días",
    base360: "360 días (comercial)",
    interes: "Interés",
    montoFinal: "Capital más interés",
    tasaPeriodo: "Tasa del período",
    errorCapital: segunTrato(trato, {
      tu: "Escribe un capital mayor que cero.",
      usted: "Escriba un capital mayor que cero.",
      vos: "Escribí un capital mayor que cero.",
    }),
  }),
};

const espana = (): Partial<UiInteresSimple> => ({
  tasa: "Tipo de interés anual (%)",
  tasaPeriodo: "Tipo del periodo",
});

export const textosEs = conVariantes(base, { "es-ES": espana });
