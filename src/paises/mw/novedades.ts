import type { Novedad } from "@/motor/tipos";

const MEDIDAS = {
  organismo: "Malawi Revenue Authority",
  titulo: "Public Notice: new tax measures under the amended Taxation and Value Added Tax laws (March 2026)",
  url: "https://www.mra.mw/admin/storage/download_files/1774423425_NEW%20TAX%20MEASURES%20UNDER%20AMENDED%20TAXATION%20AND%20VALUE%20ADDED%20TAX%20LAWS%20%20March%202026.pdf",
  tipo: "primaria",
  verificadoEl: "2026-10-27",
} as const;

export const novedades: readonly Novedad[] = [
  {
    id: "mw.paye-bands-2026",
    fecha: "2026-10-27",
    titulo: "New PAYE bands with a 40% top rate",
    texto: "From 30 December 2025 the first MK 170,000 of monthly pay is tax free, the next MK 1,400,000 is taxed at 30%, the next MK 8,430,000 at 35% and anything above MK 10,000,000 at 40%. The PAYE, take-home pay and employer cost calculators already use them.",
    vigenteDesde: "2025-12-30",
    calculadoras: ["mw.paye-calculator", "mw.net-salary-calculator", "mw.employer-cost-calculator"],
    fuente: MEDIDAS,
  },
  {
    id: "mw.vat-17-5",
    fecha: "2026-10-27",
    titulo: "VAT goes up to 17.5%",
    texto: "The Value Added Tax (Amendment) (No. 2) Act, 2025 raised the standard rate from 16.5% to 17.5% from 30 December 2025.",
    vigenteDesde: "2025-12-30",
    calculadoras: ["mw.vat-calculator"],
    fuente: MEDIDAS,
  },
  {
    id: "mw.transfer-levy",
    fecha: "2026-10-27",
    titulo: "New levy on mobile money and bank transfers",
    texto: "Since 30 December 2025 the sender pays a levy of 0.05% on mobile money transfers above MK 100,000 and on every transfer through a bank's electronic system.",
    vigenteDesde: "2025-12-30",
    calculadoras: ["mw.transfer-levy-calculator"],
    fuente: MEDIDAS,
  },
  {
    id: "mw.winnings-tax",
    fecha: "2026-10-27",
    titulo: "All betting and lottery winnings now taxed at 15%",
    texto: "The tax-free thresholds on betting, gambling and lottery winnings are gone. Every win now has 15% withholding tax taken off.",
    vigenteDesde: "2025-12-30",
    calculadoras: ["mw.winnings-tax-calculator"],
    fuente: MEDIDAS,
  },
];
