import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "bt.nppf-members-notice-june-2026",
    fecha: "2026-06-02",
    titulo: "NPPF asks agencies to report joiners and leavers within five working days",
    texto:
      "On 2 June 2026 the National Pension and Provident Fund told members and employing agencies to send enrolment forms within five working days of a new employee joining, and to deposit contributions and the contribution schedule before the 10th of the following month. Our private provident fund calculator uses the same 10th-of-the-month deadline.",
    vigenteDesde: "2026-06-02",
    calculadoras: ["bt.private-provident-fund-calculator"],
    fuente: {
      organismo: "National Pension and Provident Fund (NPPF)",
      titulo: "Notice to All NPPF Members and Employing Agencies",
      url: "https://www.nppf.org.bt/notice-to-all-nppf-members-and-employing-agencies/",
      tipo: "primaria",
      verificadoEl: "2026-10-29",
    },
  },
];
