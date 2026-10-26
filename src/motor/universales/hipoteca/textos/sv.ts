import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

export const textosSv: TextosUi<UiHipoteca> = {
  slug: "bolanekalkyl",
  ui: () => ({
    precio: "Bostadens pris",
    entradaPorcentaje: "Kontantinsats (% av priset)",
    entradaMonto: "Kontantinsats i belopp (valfritt)",
    entradaMontoAyuda: "Fyller du i den används den i stället för procentsatsen.",
    tasa: "Årsränta (%)",
    anios: "Löptid i år",
    gastos: "Boendekostnader per månad (valfritt)",
    gastosAyuda: "Månadsavgift, driftkostnad, hemförsäkring eller fastighetsavgift som du betalar utöver lånet.",
    cuota: "Månadskostnad för lånet",
    cuotaTotal: "Månadskostnad med boendekostnader",
    entrada: "Kontantinsats",
    prestado: "Lånebelopp",
    intereses: "Total ränta",
    total: "Summa betalningar på lånet",
    tabla: "År för år",
    colAnio: "År",
    colIntereses: "Betald ränta",
    colCapital: "Amortering",
    colSaldo: "Kvar att betala vid årets slut",
    errorPrecio: "Fyll i bostadens pris.",
    errorEntrada: "Kontantinsatsen täcker hela priset, så det finns inget lån att räkna på. Sänk kontantinsatsen.",
    observacionPrestado: (porcentaje) => `Du lånar ${porcentaje} % av bostadens värde. Ju högre andel, desto mer brukar banken kräva av dig.`,
    observacionCostos: "Kostnader vid köpet (lagfart, pantbrev, avgifter och värdering) ingår inte. Räkna med dem utöver kontantinsatsen.",
  }),
};
