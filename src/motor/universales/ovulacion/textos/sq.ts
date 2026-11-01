import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosSq: TextosUi<UiOvulacion> = {
  slug: "kalkulator-ovulacioni",
  ui: () => ({
    fum: "Dita e parë e menstruacioneve të fundit",
    fumAyuda: "Dita e parë e gjakderdhjes, jo e fundit.",
    ciclo: "Gjatësia e ciklit (ditë)",
    cicloAyuda: "Nga dita e parë e një menstruacioni deri në ditën para të ardhshmit. Nëse ndryshon, përdorni një mesatare.",
    ovulacion: "Ovulacioni i përllogaritur",
    fertilDesde: "Ditët pjellore nga",
    fertilHasta: "Ditët pjellore deri në",
    proxima: "Menstruacionet e ardhshme",
    tabla: "Ciklet e ardhshme",
    colRegla: "Menstruacionet",
    colDesde: "Pjellore nga",
    colHasta: "Pjellore deri në",
    colOvulacion: "Ovulacioni",
    errorCiclo: "Gjatësia e ciklit duhet të jetë nga 21 deri në 45 ditë.",
    aviso: "Është një përllogaritje për cikle të rregullta. Nuk është metodë kontraceptive dhe nuk zëvendëson konsultën me një mjek.",
  }),
};
