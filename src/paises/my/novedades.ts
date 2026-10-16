import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "my.lindung-24-jam-2026",
    fecha: "2026-10-16",
    titulo: "LINDUNG 24 Jam adds a new SOCSO deduction",
    texto:
      "Since 1 June 2026 PERKESO's Non-Employment Injury Scheme (SKBBK) covers accidents outside working hours. It adds an employee share to the SOCSO deduction. Our SOCSO, take-home pay and employer cost calculators already use the new table.",
    vigenteDesde: "2026-06-01",
    calculadoras: ["my.socso-calculator", "my.take-home-pay", "my.employer-cost"],
    fuente: {
      organismo: "PERKESO",
      titulo: "Kenyataan media 2 Jun 2026: penerima pertama faedah Skim LINDUNG 24 Jam",
      url: "https://www.perkeso.gov.my/images/kenyataan_media/2026/020626-TRAGEDI%20SIMPANG%20RENGGAM-DUA%20MANGSA%20KEMALANGAN%20PENERIMA%20PERTAMA%20FAEDAH%20%20SKIM%20LINDUNG%2024%20JAM%202%20JUN%202026.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-16",
    },
  },
  {
    id: "my.stamp-duty-foreign-2026",
    fecha: "2026-10-16",
    titulo: "Higher stamp duty on homes bought by foreigners",
    texto: "From 1 January 2026, residential property sold to a foreign company or a non-citizen who is not a permanent resident pays stamp duty of RM8 for every RM100.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["my.stamp-duty-calculator"],
    fuente: {
      organismo: "LHDN (HASiL)",
      titulo: "Garis Panduan Pengenaan Duti Setem bagi Surat Cara yang Tertakluk kepada Jadual Pertama Akta Setem 1949",
      url: "https://www.hasil.gov.my/wp-content/uploads/garis-panduan-pengenaan-duti-setem-jadual-pertama-as-1949.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-16",
    },
  },
  {
    id: "my.pcb-2026",
    fecha: "2026-10-16",
    titulo: "PCB 2026 specification from HASiL",
    texto:
      "HASiL's specification for computerised PCB calculations applies from January 2026. The childcare relief is now RM3,000 a year and the tax rates for resident individuals stay the same. Our PCB and take-home pay calculators follow it.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["my.pcb-calculator", "my.take-home-pay", "my.income-tax-calculator"],
    fuente: {
      organismo: "LHDN (HASiL)",
      titulo: "Specification for Monthly Tax Deduction (MTD) Calculations Using Computerised Calculation for 2026",
      url: "https://www.hasil.gov.my/wp-content/uploads/spesifikasi-kaedah-pengiraan-berkomputer-pcb-2026.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-16",
    },
  },
];
