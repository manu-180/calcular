import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosSq: TextosUi<UiSumarDias> = {
  slug: "shtim-ditesh-ne-date",
  ui: () => ({
    fecha: "Data e fillimit",
    operacion: "Veprimi",
    sumar: "Shtoni ditë",
    restar: "Zbritni ditë",
    dias: "Numri i ditëve",
    tipo: "Lloji i ditëve",
    corridos: "Ditë kalendarike",
    habiles: "Ditë pune (nga e hëna në të premte)",
    resultado: "Data që del",
    diaSemana: "Dita e javës",
    diasCorridos: "Totali i ditëve kalendarike",
    nombresDias: ["e diel", "e hënë", "e martë", "e mërkurë", "e enjte", "e premte", "e shtunë"],
    errorDias: "Numri i ditëve duhet të jetë numër i plotë, jo më shumë se 100 vjet.",
    notaHabiles: "Ditët e punës kapërcejnë të shtunat dhe të dielat, por jo festat zyrtare. Nëse në interval bie një festë, shtojeni veçmas.",
  }),
};
