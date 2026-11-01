import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosSk: TextosUi<UiInteresCompuesto> = {
  slug: "zlozene-urocenie",
  ui: () => ({
    capital: "Počiatočný vklad",
    aporte: "Mesačný vklad (nepovinné)",
    aporteAyuda: "Koľko budete každý mesiac pridávať. Vklad sa pripisuje na konci každého mesiaca.",
    tasa: "Ročná úroková sadzba (%)",
    anios: "Počet rokov",
    capitalizacion: "Pripisovanie úrokov",
    anual: "Ročne",
    semestral: "Polročne",
    trimestral: "Štvrťročne",
    mensual: "Mesačne",
    diaria: "Denne",
    saldo: "Konečná suma",
    aportado: "Vložené spolu",
    intereses: "Získané úroky",
    tabla: "Rast po rokoch",
    colAnio: "Rok",
    colAportado: "Vklady",
    colIntereses: "Úroky",
    colSaldo: "Suma na konci roka",
    errorSinDinero: "Zadajte počiatočný vklad alebo mesačný vklad.",
    observacionIntereses: (porcentaje) => `${porcentaje} % konečnej sumy tvoria úroky.`,
  }),
};
