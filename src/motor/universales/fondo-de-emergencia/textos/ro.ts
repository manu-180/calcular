import type { TextosUi } from "../../tipos";
import type { UiFondoDeEmergencia } from "../definicion";

export const textosRo: TextosUi<UiFondoDeEmergencia> = {
  slug: "fond-de-urgenta",
  ui: () => ({
    gastos: "Cheltuieli esențiale pe lună",
    gastosAyuda: "Ce nu puteți înceta să plătiți: locuința, mâncarea, utilitățile, transportul, sănătatea și ratele.",
    meses: "Luni de cheltuieli de acoperit",
    mesesAyuda: "Între 3 și 6 luni dacă venitul este stabil. Mai multe dacă variază sau dacă în gospodărie există un singur venit.",
    actual: "Cât aveți deja pus deoparte (opțional)",
    aporte: "Cât puteți economisi pe lună (opțional)",
    meta: "Fondul de urgență recomandat",
    falta: "Mai aveți de economisit",
    mesesParaLlegar: "Luni până îl completați",
    cobertura: "Luni acoperite azi de economii",
    errorGastos: "Introduceți cheltuielile esențiale pentru o lună.",
    yaCubierto: "Fondul este complet. Ce economisiți de acum înainte poate merge spre alte obiective.",
    sinAporte: "Introduceți cât puteți economisi în fiecare lună și vă spunem în cât timp ajungeți la fond.",
    observacionDonde: "Țineți-l într-un cont separat, din care puteți retrage în aceeași zi și care își păstrează valoarea, cum ar fi un cont de economii sau un depozit cu retragere oricând.",
  }),
};
