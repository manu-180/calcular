import { formaSl } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosSl: TextosUi<UiPrestamo> = {
  slug: "kalkulator-kredita",
  ui: () => ({
    monto: "Znesek kredita",
    tasa: "Letna obrestna mera (%)",
    tasaAyuda: "Nominalna letna obrestna mera iz ponudbe. Stroški niso vključeni, upošteva jih EOM.",
    meses: "Doba odplačila v mesecih",
    extra: "Dodatno plačilo na mesec (neobvezno)",
    extraAyuda: "Koliko bi vsak mesec plačali več, da bi kredit odplačali prej. Celoten znesek zmanjša glavnico.",
    cuota: "Mesečni obrok",
    intereses: "Skupne obresti",
    total: "Skupaj boste plačali",
    mesesReales: "Število mesecev z dodatnim plačilom",
    ahorro: "Prihranek pri obrestih",
    tabla: "Načrt odplačila",
    colMes: "Mesec",
    colPago: "Obrok",
    colInteres: "Obresti",
    colCapital: "Glavnica",
    colSaldo: "Preostali dolg",
    errorMonto: "Vnesite znesek, večji od nič.",
    observacionCostos: "Obrok ne vključuje zavarovanja, stroškov in davkov, ki jih lahko doda banka. Pred podpisom pogodbe vprašajte za EOM in skupni znesek za plačilo.",
    observacionExtra: (meses, ahorro) =>
      `Z dodatnim plačilom odplačilo traja ${meses} ${formaSl(meses.replace(/\D/g, ""), "mesec", "meseca", "mesece", "mesecev")}, pri obrestih pa prihranite ${ahorro}.`,
  }),
};
