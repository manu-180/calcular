import { pluralSq } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiFechaDeParto } from "../definicion";

export const textosSq: TextosUi<UiFechaDeParto> = {
  slug: "kalkulator-shtatzanie",
  ui: () => ({
    metodo: "Cilën datë e dini?",
    fum: "Dita e parë e menstruacioneve të fundit",
    concepcion: "Data e konceptimit",
    fecha: "Data",
    fechaAyuda: "Nëse zgjidhni menstruacionet e fundit, vendosni ditën e parë të gjakderdhjes.",
    ciclo: "Gjatësia e ciklit (ditë)",
    cicloAyuda: "Përdoret vetëm me menstruacionet e fundit. Nëse nuk e dini, lëreni 28.",
    fpp: "Data e mundshme e lindjes",
    edadGestacional: "Mosha e shtatzënisë sot",
    trimestre: "Tremujori",
    faltan: "Ditë të mbetura",
    fechaConcepcion: "Data e përllogaritur e konceptimit",
    semanasYDias: (s, d) => `${pluralSq(s, "javë", "javë")}${d ? ` dhe ${pluralSq(d, "ditë", "ditë")}` : ""}`,
    trimestres: ["Tremujori i parë", "Tremujori i dytë", "Tremujori i tretë"],
    errorFutura: "Data nuk mund të jetë pas ditës së sotme.",
    errorCiclo: "Gjatësia e ciklit duhet të jetë nga 20 deri në 45 ditë.",
    notaPasada: "Nga kjo datë kanë kaluar më shumë se 42 javë, prandaj mosha e shtatzënisë nuk shfaqet.",
    aviso: "Është një përllogaritje: pak fëmijë lindin pikërisht në datën e mundshme. Ekografia dhe kontrollet te mjeku japin datën më të saktë. Ky kalkulator nuk zëvendëson konsultën mjekësore.",
  }),
};
