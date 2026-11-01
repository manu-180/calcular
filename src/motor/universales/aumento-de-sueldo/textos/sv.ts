import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosSv: TextosUi<UiAumentoDeSueldo> = {
  slug: "loneokning",
  ui: () => ({
    sueldo: "Nuvarande månadslön",
    sueldoAyuda: "Före eller efter skatt, som du vill. Resultatet räknas på samma sätt.",
    aumentoPorcentaje: "Löneökning (%)",
    aumentoMonto: "Löneökning som belopp (valfritt)",
    aumentoMontoAyuda: "Om löneökningen är ett fast belopp, fyll i det här. Det används i stället för procentsatsen.",
    inflacion: "Inflation under perioden (%, valfritt)",
    inflacionAyuda: "Inflationen sedan din förra löneökning, för att se om lönen räcker till mer eller mindre än förut.",
    sueldosAnio: "Antal löner per år",
    sueldosAnioAyuda: "12 om du har månadslön. Fler om du också får en extra månadslön varje år.",
    nuevo: "Ny månadslön",
    diferenciaMensual: "Skillnad per månad",
    diferenciaAnual: "Skillnad per år",
    porcentaje: "Löneökning i procent",
    real: "Reallöneökning (efter inflation)",
    realAyuda: "Hur mycket mer din nya lön räcker till jämfört med den gamla.",
    errorSueldo: "Fyll i din nuvarande lön.",
    errorSinAumento: "Fyll i löneökningen i procent eller som belopp.",
    observacionGana: (puntos) => `Du slår inflationen. Din lön räcker till ${puntos} % mer än förut.`,
    observacionPierde: (puntos) => `Löneökningen räcker inte för att täcka inflationen. Din lön räcker till ${puntos} % mindre än förut.`,
    observacionIgual: "Löneökningen är lika stor som inflationen. Din lön räcker till lika mycket som förut.",
  }),
};
