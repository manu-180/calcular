import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosLv: TextosUi<UiOvulacion> = {
  slug: "ovulacijas-kalkulators",
  ui: () => ({
    fum: "Pēdējo mēnešreižu pirmā diena",
    fumAyuda: "Pirmā asiņošanas diena, nevis pēdējā.",
    ciclo: "Cikla ilgums (dienās)",
    cicloAyuda: "No vienu mēnešreižu pirmās dienas līdz dienai pirms nākamajām. Ja ilgums mainās, ievadiet vidējo.",
    ovulacion: "Paredzamā ovulācija",
    fertilDesde: "Auglīgās dienas no",
    fertilHasta: "Auglīgās dienas līdz",
    proxima: "Nākamās mēnešreizes",
    tabla: "Nākamie cikli",
    colRegla: "Mēnešreizes",
    colDesde: "Auglīgās no",
    colHasta: "Auglīgās līdz",
    colOvulacion: "Ovulācija",
    errorCiclo: "Cikla ilgumam jābūt no 21 līdz 45 dienām.",
    aviso: "Tas ir aptuvens aprēķins regulāram ciklam. Tā nav kontracepcijas metode, un tas neaizstāj ārsta konsultāciju.",
  }),
};
