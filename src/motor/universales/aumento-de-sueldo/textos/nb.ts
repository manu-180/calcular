import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosNb: TextosUi<UiAumentoDeSueldo> = {
  slug: "lonnsokning",
  ui: () => ({
    sueldo: "Månedslønn i dag",
    sueldoAyuda: "Før eller etter skatt, som du vil. Resultatet regnes ut på samme måte.",
    aumentoPorcentaje: "Lønnsøkning (%)",
    aumentoMonto: "Lønnsøkning som beløp (valgfritt)",
    aumentoMontoAyuda: "Er lønnsøkningen et fast beløp, fyll det inn her. Det brukes i stedet for prosentsatsen.",
    inflacion: "Prisvekst i perioden (%, valgfritt)",
    inflacionAyuda: "Prisveksten siden forrige lønnsøkning, så du ser om lønnen rekker til mer eller mindre enn før.",
    sueldosAnio: "Antall lønnsutbetalinger per år",
    sueldosAnioAyuda: "12 hvis du får månedslønn. Flere hvis du får ekstra utbetalinger i løpet av året.",
    nuevo: "Ny månedslønn",
    diferenciaMensual: "Forskjell per måned",
    diferenciaAnual: "Forskjell per år",
    porcentaje: "Lønnsøkning i prosent",
    real: "Reallønnsvekst (etter prisvekst)",
    realAyuda: "Hvor mye mer den nye lønnen rekker til sammenlignet med den gamle.",
    errorSueldo: "Fyll inn lønnen du har i dag.",
    errorSinAumento: "Fyll inn lønnsøkningen i prosent eller som beløp.",
    observacionGana: (puntos) => `Du slår prisveksten. Lønnen din rekker til ${puntos} % mer enn før.`,
    observacionPierde: (puntos) => `Lønnsøkningen dekker ikke prisveksten. Lønnen din rekker til ${puntos} % mindre enn før.`,
    observacionIgual: "Lønnsøkningen er like stor som prisveksten. Lønnen din rekker til det samme som før.",
  }),
};
