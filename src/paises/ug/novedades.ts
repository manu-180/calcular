import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "ug.employment-amendment-2026",
    fecha: "2026-10-24",
    titulo: "Employment (Amendment) Act 2026: new severance and sick pay rules",
    texto:
      "Since 5 June 2026, severance allowance is one month's salary for each year worked. Sick employees get full pay for the first two months and half pay for the next four. Our severance and sick pay calculators already use the new rules.",
    vigenteDesde: "2026-06-05",
    calculadoras: ["ug.severance-pay-calculator", "ug.sick-pay-calculator"],
    fuente: {
      organismo: "ULII (Uganda Legal Information Institute)",
      titulo: "Employment (Amendment) Act, 2026 (Act 10 of 2026)",
      url: "https://media.ulii.org/media/legislation/128859/source_file/107fdd589735b99e/ug-act-2026-10-publication-document.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-23",
    },
  },
];
