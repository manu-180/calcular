import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "al.paga-minimale-2026",
    fecha: "2026-11-01",
    titulo: "Paga minimale 50 000 lekë nga 1 janari 2026",
    texto: "VKM nr. 776, datë 19.12.2025, e çoi pagën bazë minimale në 50 000 lekë në muaj, për 174 orë pune, dhe pagën orare në 287,3 lekë. Me të njëjtën shifër llogariten edhe kontributet minimale.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["al.paga-minimale", "al.kalkulator-page", "al.kontributet-e-sigurimeve", "al.kosto-e-punedhenesit"],
    fuente: {
      organismo: "Inspektorati Shtetëror i Punës",
      titulo: "VKM nr. 776, datë 19.12.2025",
      url: "https://inspektoriatipunes.gov.al/wp-content/uploads/2026/01/vendim-2025-12-19-776.pdf",
      tipo: "primaria",
      verificadoEl: "2026-11-01",
    },
  },
];
