import { pluralSl } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiAlquilarOComprar } from "../definicion";

// „čez 1 leto“, „čez 2 leti“, „čez 3 leta“, „čez 10 let“ (tožilnik za „čez“).
const leto = (n: string) => pluralSl(n, "leto", "leti", "leta", "let");

export const textosSl: TextosUi<UiAlquilarOComprar> = {
  slug: "najem-ali-nakup-stanovanja",
  ui: () => ({
    precio: "Cena stanovanja",
    entrada: "Lastna sredstva (% cene)",
    gastosCompra: "Stroški nakupa (% cene)",
    gastosCompraAyuda: "Cenitev nepremičnine, stroški odobritve kredita, overitev pogodbe, davek na promet nepremičnin ali DDV, vpis v zemljiško knjigo in provizija agencije.",
    tasa: "Obrestna mera stanovanjskega kredita (% na leto)",
    aniosHipoteca: "Doba odplačila kredita (v letih)",
    alquiler: "Mesečna najemnina za podobno stanovanje",
    aumentoAlquiler: "Letno povišanje najemnine (%)",
    gastosPropietario: "Letni stroški lastnika (% cene)",
    gastosPropietarioAyuda: "Popravila in vzdrževanje, davek na nepremičnine, zavarovanje stanovanja. Običajno 1 do 2 %.",
    revalorizacion: "Letna rast cene stanovanja (%)",
    rendimiento: "Donos druge naložbe (% na leto)",
    rendimientoAyuda: "Koliko bi zaslužili, če bi lastna sredstva naložili, namesto da kupite stanovanje.",
    horizonte: "Po koliko letih primerjati",
    veredicto: "Rezultat",
    patrimonioComprar: "Vaše premoženje na koncu, če kupite",
    patrimonioAlquilar: "Vaše premoženje na koncu, če najemate",
    diferencia: "Razlika",
    anioDesde: "Leto, od katerega se nakup bolj splača",
    pagadoAlquilando: "Skupaj plačano za najem",
    pagadoComprando: "Skupaj plačano za kredit in vzdrževanje",
    tabla: "Primerjava po letih",
    colAnio: "Leto",
    colComprar: "Nakup",
    colAlquilar: "Najem",
    colDiferencia: "Razlika",
    errorPrecio: "Vnesite ceno stanovanja.",
    errorAlquiler: "Vnesite, kolikšna bi bila najemnina za podobno stanovanje.",
    convieneComprar: (anios, diferencia) => `Bolj se splača nakup: čez ${leto(anios)} boste imeli ${diferencia} več.`,
    convieneAlquilar: (anios, diferencia) => `Bolj se splača najem: čez ${leto(anios)} boste imeli ${diferencia} več.`,
    empate: (anios) => `Čez ${leto(anios)} sta obe možnosti izenačeni.`,
    observacionDesde: (anio) => `Nakup prehiti najem od ${anio}. leta naprej in nato ostane ugodnejši.`,
    observacionMetodo:
      "Primerja se, kaj imate pri vsaki možnosti. Če najemate, lastna sredstva in to, kar vsak mesec prihranite, ostanejo naložena. Stroški poznejše prodaje stanovanja niso odšteti.",
  }),
};
