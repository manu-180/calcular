import { pluralSl } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

// Imenovalnik za „Skupaj: 3 meseci“, tožilnik za „traja 3 mesece“.
const mesecev = (n: string) => pluralSl(n, "mesec", "meseca", "meseci", "mesecev");
const meseceTraja = (n: string) => pluralSl(n, "mesec", "meseca", "mesece", "mesecev");

export const textosSl: TextosUi<UiTarjetaDeCredito> = {
  slug: "odplacilo-kreditne-kartice",
  ui: () => ({
    saldo: "Dolg na kartici",
    tasa: "Letna obrestna mera (%)",
    tasaAyuda: "Obrestna mera za nakupe po koncu brezobrestnega obdobja. Navedena je na izpisku ali v pogodbi.",
    modo: "Kako boste odplačevali?",
    modoFijo: "Z enakim zneskom vsak mesec",
    modoMinimo: "Z minimalnim plačilom",
    pagoFijo: "Fiksno mesečno plačilo",
    minimoPorcentaje: "Minimalno plačilo (% dolga)",
    minimoPorcentajeAyuda: "Koliko izdajatelj kartice zahteva vsak mesec. Če niste prepričani, je običajno 5 %.",
    minimoPiso: "Minimalno plačilo ni nikoli manjše od",
    meses: "Število mesecev do odplačila",
    intereses: "Plačane obresti",
    total: "Skupaj plačano",
    primerPago: "Prvo minimalno plačilo",
    tabla: "Načrt odplačila po mesecih",
    colMes: "Mesec",
    colPago: "Plačilo",
    colInteres: "Obresti",
    colCapital: "Glavnica",
    colSaldo: "Preostali dolg",
    errorSaldo: "Vnesite, koliko dolgujete na kartici.",
    errorFaltaPago: "Vnesite, koliko boste plačevali vsak mesec.",
    errorNoCubre: (interes) => `S tem plačilom se dolg nikoli ne zmanjša: samo obresti za prvi mesec znašajo ${interes}. Povečajte plačilo.`,
    errorMuyLargo: "S tem plačilom bi odplačevanje trajalo več kot 50 let. Povečajte plačilo.",
    observacionAnios: (anios, meses) => {
      const a = pluralSl(anios, "leto", "leti", "leta", "let");
      return meses === "0" ? `Skupaj: ${a}.` : `Skupaj: ${a} in ${mesecev(meses)}.`;
    },
    observacionFijo: (pago, meses, ahorro) =>
      `Če vedno plačate ${pago}, kolikor znaša tudi prvo minimalno plačilo, odplačevanje traja ${meseceTraja(meses)}, pri obrestih pa prihranite ${ahorro}.`,
    observacionNoGastar: "Izračun predvideva, da med odplačevanjem s kartico ne kupujete ničesar novega.",
  }),
};
