import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

export const textosNb: TextosUi<UiHipoteca> = {
  slug: "boliglanskalkulator",
  ui: () => ({
    precio: "Kjøpesum for boligen",
    entradaPorcentaje: "Egenkapital (% av kjøpesummen)",
    entradaMonto: "Egenkapital som beløp (valgfritt)",
    entradaMontoAyuda: "Fyller du inn denne, brukes den i stedet for prosentsatsen.",
    tasa: "Nominell rente per år (%)",
    anios: "Nedbetalingstid i år",
    gastos: "Faste boutgifter per måned (valgfritt)",
    gastosAyuda: "Felleskostnader, kommunale avgifter, eiendomsskatt, boligforsikring eller annet du betaler i tillegg til lånet.",
    cuota: "Terminbeløp på lånet per måned",
    cuotaTotal: "Månedlig kostnad med boutgifter",
    entrada: "Egenkapital",
    prestado: "Lånebeløp",
    intereses: "Renter totalt",
    total: "Totalt betalt på lånet",
    tabla: "År for år",
    colAnio: "År",
    colIntereses: "Betalte renter",
    colCapital: "Avdrag",
    colSaldo: "Restgjeld ved årets slutt",
    errorPrecio: "Skriv inn kjøpesummen for boligen.",
    errorEntrada: "Egenkapitalen dekker hele kjøpesummen, så det er ikke noe lån å regne på. Sett ned egenkapitalen.",
    observacionPrestado: (porcentaje) => `Du låner ${porcentaje} % av boligens verdi. Jo større andel, desto strengere krav stiller banken som regel.`,
    observacionCostos: "Kostnader ved kjøpet (dokumentavgift, tinglysing, gebyrer og takst) er ikke med. Regn med dem i tillegg til egenkapitalen.",
  }),
};
