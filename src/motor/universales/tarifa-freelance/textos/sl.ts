import type { TextosUi } from "../../tipos";
import type { UiTarifaFreelance } from "../definicion";

export const textosSl: TextosUi<UiTarifaFreelance> = {
  slug: "izracun-urne-postavke",
  ui: () => ({
    ingreso: "Koliko želite neto na leto",
    ingresoAyuda: "Po davkih in stroških poslovanja. To je vaša plača kot samostojnega podjetnika.",
    gastos: "Stroški poslovanja na leto",
    gastosAyuda: "Oprema, programska oprema, internet, tečaji, računovodja, zavarovanje in varčevanje za pokojnino.",
    impuestos: "Ocena davkov in prispevkov (%)",
    impuestosAyuda:
      "Koliko tega, kar zaračunate, po odbitku stroškov odide za davke in prispevke. Če niste prepričani, vprašajte računovodjo. Za začetno oceno lahko vzamete 25 %.",
    diasLibres: "Prosti dnevi na leto",
    diasLibresAyuda: "Dopust, prazniki in bolniška. Nihče vam jih ne plača, zato jih mora pokriti vaša urna postavka.",
    diasSemana: "Delovni dnevi na teden",
    horasSemana: "Obračunljive ure na teden",
    horasSemanaAyuda:
      "Samo ure, ki jih zaračunate strankam. Iskanje poslov, administracija in učenje se ne zaračunajo. Običajno je to 20 do 30 ur od 40.",
    tarifaHora: "Urna postavka",
    tarifaDia: "Dnevna postavka",
    facturacionMensual: "Potrebni prihodki na mesec",
    facturacionAnual: "Potrebni prihodki na leto",
    horasAnio: "Obračunljive ure na leto",
    errorIngreso: "Vnesite, koliko želite zaslužiti na leto.",
    errorImpuestos: "Davki morajo biti manjši od 100 %.",
    errorDias: "S toliko prostimi dnevi vam v letu ne ostane noben delovni dan.",
    errorHoras: "Vnesite, koliko ur na teden lahko zaračunate.",
    observacionFacturables: "Če zaračunate manj ur, boste zaslužili manj, kot načrtujete, ali pa boste delali dlje.",
  }),
};
