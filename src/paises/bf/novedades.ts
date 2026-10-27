import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "bf.code-du-travail-2026",
    fecha: "2026-10-27",
    titulo: "Un nouveau code du travail promulgué le 25 mai 2026",
    texto:
      "La loi n° 013-2026/ALP du 6 mai 2026 remplace le code du travail de 2008. Elle fixe le préavis, l'essai, le congé payé, l'indemnité pour rupture irrégulière et le plafond des dommages et intérêts. Employeurs et travailleurs ont six mois pour s'y conformer.",
    vigenteDesde: "2026-05-25",
    calculadoras: ["bf.preavis", "bf.periode-d-essai", "bf.conges-payes", "bf.rupture-irreguliere", "bf.indemnite-maladie", "bf.conge-maternite"],
    fuente: {
      organismo: "Gouvernement du Burkina Faso (SIG)",
      titulo: "Décret n° 2026-0613/PF du 25 mai 2026 promulguant la loi n° 013-2026/ALP portant code du travail",
      url: "https://gouvernement.gov.bf/wp-content/uploads/2026/06/DECRET-N%C2%B02026-0613-PF.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-27",
    },
  },
];
