import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "gm.expatriate-payroll-tax-2026",
    fecha: "2026-10-27",
    titulo: "Expatriate quota payroll tax goes up to D30,000 and D100,000",
    texto:
      "The Expatriate Quota Pay Roll Tax Notice, 2026 sets the yearly tax an employer pays for each expatriate at D30,000 for ECOWAS citizens or people with special status and D100,000 for everyone else. Our expatriate payroll tax and employer cost calculators use the new amounts.",
    vigenteDesde: "2026-03-10",
    calculadoras: ["gm.expatriate-payroll-tax", "gm.employer-cost"],
    fuente: {
      organismo: "Ministry of Finance and Economic Affairs",
      titulo: "Expatriate Quota Pay Roll Tax Notice, 2026",
      url: "https://www.gra.gm/download-file/221f7a81-6596-11f1-b086-029254d29bb1",
      tipo: "primaria",
      verificadoEl: "2026-10-27",
    },
  },
];
