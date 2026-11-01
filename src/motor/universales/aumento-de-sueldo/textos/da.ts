import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosDa: TextosUi<UiAumentoDeSueldo> = {
  slug: "loenstigning",
  ui: () => ({
    sueldo: "Nuværende månedsløn",
    sueldoAyuda: "Før eller efter skat, som du vil. Resultatet regnes på samme måde.",
    aumentoPorcentaje: "Lønstigning (%)",
    aumentoMonto: "Lønstigning som beløb (valgfrit)",
    aumentoMontoAyuda: "Er lønstigningen et fast beløb, så skriv det her. Det bruges i stedet for procentsatsen.",
    inflacion: "Inflation i perioden (%, valgfrit)",
    inflacionAyuda: "Inflationen siden din sidste lønstigning, så du kan se, om lønnen rækker til mere eller mindre end før.",
    sueldosAnio: "Antal lønudbetalinger om året",
    sueldosAnioAyuda: "12, hvis du får månedsløn. Flere, hvis du også får en ekstra månedsløn hvert år.",
    nuevo: "Ny månedsløn",
    diferenciaMensual: "Forskel om måneden",
    diferenciaAnual: "Forskel om året",
    porcentaje: "Lønstigning i procent",
    real: "Reallønsstigning (efter inflation)",
    realAyuda: "Hvor meget mere din nye løn rækker til sammenlignet med den gamle.",
    errorSueldo: "Skriv din nuværende løn.",
    errorSinAumento: "Skriv lønstigningen i procent eller som beløb.",
    observacionGana: (puntos) => `Du slår inflationen. Din løn rækker til ${puntos} % mere end før.`,
    observacionPierde: (puntos) => `Lønstigningen er ikke nok til at dække inflationen. Din løn rækker til ${puntos} % mindre end før.`,
    observacionIgual: "Lønstigningen er lige så stor som inflationen. Din løn rækker til det samme som før.",
  }),
};
