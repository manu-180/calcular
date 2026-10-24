import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "ke.minimum-wage-may-2026",
    fecha: "2026-10-17",
    titulo: "Minimum wages up from 1 May 2026",
    texto:
      "The Regulation of Wages (General) (Amendment) Order, 2026 sets new minimum wages for every occupation and area, backdated to 1 May 2026. A general labourer in Nairobi, Mombasa, Kisumu, Nakuru or Eldoret now earns at least KSh 18,047.40 a month. Our minimum wage calculator already uses the new schedule.",
    vigenteDesde: "2026-05-01",
    calculadoras: ["ke.minimum-wage"],
    fuente: {
      organismo: "Kenya Law (Kenya Gazette Supplement No. 160)",
      titulo: "Regulation of Wages (General) (Amendment) Order, 2026, Legal Notice 108 of 2026",
      url: "https://new.kenyalaw.org/akn/ke/act/ln/2026/108/eng@2026-06-26",
      tipo: "primaria",
      verificadoEl: "2026-10-17",
    },
  },
  {
    id: "ke.nssf-year-4",
    fecha: "2026-10-17",
    titulo: "NSSF Year 4 rates from February 2026",
    texto:
      "From February 2026 the NSSF lower earnings limit is KSh 9,000 and the upper limit is KSh 108,000. The most an employee pays is KSh 6,480 a month, matched by the employer. Our NSSF, PAYE and net salary calculators already use the new limits.",
    vigenteDesde: "2026-02-01",
    calculadoras: ["ke.nssf-calculator", "ke.paye-calculator", "ke.net-salary-calculator", "ke.employer-cost-calculator"],
    fuente: {
      organismo: "National Social Security Fund",
      titulo: "Notice to employers: Year 4 (2026) NSSF contribution rates",
      url: "https://www.nssf.or.ke/notice-to-employers-year-4-2026-nssf-contribution-rates",
      tipo: "primaria",
      verificadoEl: "2026-10-17",
    },
  },
];
