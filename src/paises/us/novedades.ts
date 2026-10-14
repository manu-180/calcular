import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "us.mileage-july-2026",
    fecha: "2026-07-13",
    titulo: "IRS raises the business mileage rate to 76 cents",
    texto:
      "Miles driven for business on or after July 1, 2026 are worth 76 cents each, up from 72.5 cents. The medical and moving rate rises to 23.5 cents. The charity rate stays at 14 cents because it is set by law.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["us.mileage-reimbursement"],
    fuente: {
      organismo: "IRS",
      titulo: "Announcement 2026-11 (Internal Revenue Bulletin 2026-29)",
      url: "https://www.irs.gov/pub/irs-irbs/irb26-29.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "us.florida-minimum-wage-2026",
    fecha: "2026-09-30",
    titulo: "Florida's minimum wage reaches $15.00",
    texto: "The last scheduled step of Florida's constitutional amendment took effect on September 30, 2026. From 2027 the rate follows inflation each January 1.",
    vigenteDesde: "2026-09-30",
    calculadoras: ["us.minimum-wage"],
    fuente: {
      organismo: "Florida Senate",
      titulo: "Florida Constitution, Article X, Section 24",
      url: "https://www.flsenate.gov/Laws/Constitution",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "us.tax-year-2026",
    fecha: "2025-10-09",
    titulo: "New brackets, standard deduction and child tax credit for 2026",
    texto:
      "For 2026 the standard deduction is $16,100 for single filers and $32,200 for married couples filing jointly. The child tax credit is $2,200 per child, with up to $1,700 refundable.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["us.federal-income-tax", "us.take-home-pay", "us.child-tax-credit", "us.capital-gains-tax", "us.standard-deduction"],
    fuente: {
      organismo: "IRS",
      titulo: "Rev. Proc. 2025-32",
      url: "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
];
