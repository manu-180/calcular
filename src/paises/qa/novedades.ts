import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "qa.sugar-tax-2026",
    fecha: "2026-10-26",
    titulo: "Sweetened drinks now pay excise tax by sugar content",
    texto: "From 6 July 2026, Qatar taxes sweetened drinks per litre according to their sugar per 100 ml: QAR 0.77 for medium sugar and QAR 1.06 for high sugar. Drinks below 5 g are exempt.",
    vigenteDesde: "2026-07-06",
    calculadoras: ["qa.sugar-tax-calculator"],
    fuente: { organismo: "General Tax Authority (GTA)", titulo: "Taxes information: excise tax", url: "https://www.gta.gov.qa/en/taxes-info", tipo: "primaria", verificadoEl: "2026-10-26" },
  },
  {
    id: "qa.property-fees-2026",
    fecha: "2026-10-26",
    titulo: "New Ministry of Justice fees for registering property",
    texto: "Decision No. 5 of 2026 sets the real estate registration fees in force since 16 January 2026: 0.25% of the value for a sale and QAR 500 for a gift to parents, children or a spouse.",
    vigenteDesde: "2026-01-16",
    calculadoras: ["qa.property-registration-fee"],
    fuente: { organismo: "Official Gazette (via Al Meezan)", titulo: "Minister of Justice Decision No. 5 of 2026, Table 2", url: "https://files.almeezan.gov.qa/almeezan/3b60f0cf-4a4a-42d5-a91a-41877a516863.pdf", tipo: "primaria", verificadoEl: "2026-10-26" },
  },
  {
    id: "qa.labour-law-2026",
    fecha: "2026-10-26",
    titulo: "Labour Law amended by Law No. 9 of 2026",
    texto: "The amendment, in force since 11 June 2026, redefines who the Labour Law covers, renames the National Day holiday and adds rules on disputes and strikes. Gratuity, leave, notice and overtime rules didn't change.",
    vigenteDesde: "2026-06-11",
    calculadoras: ["qa.gratuity-calculator", "qa.annual-leave", "qa.notice-period"],
    fuente: { organismo: "Al Meezan, Qatar Legal Portal (Ministry of Justice)", titulo: "Law No. 9 of 2026 amending the Labour Law", url: "https://almeezan.qa/legislations/26995a3e-c468-5031-9136-991d00916ac7", tipo: "primaria", verificadoEl: "2026-10-26" },
  },
];
