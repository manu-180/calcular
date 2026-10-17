import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "be-fr.precompte-novembre-2026",
    fecha: "2026-10-14",
    titulo: "Moins de précompte professionnel à partir du 1er novembre 2026",
    texto:
      "Avec la réforme de l'impôt des personnes physiques, la quotité exemptée augmente dès les revenus de 2026. À partir du 1er novembre 2026, votre employeur retient donc moins de précompte professionnel. Les montants pour enfants à charge changent aussi. Les calculs du salaire brut en net et du précompte appliquent les nouvelles règles à partir de cette date.",
    vigenteDesde: "2026-11-01",
    calculadoras: ["be-fr.bruto-netto-berekenen", "be-fr.bedrijfsvoorheffing-berekenen"],
    fuente: {
      organismo: "SPF Finances",
      titulo: "Simulateur précompte professionnel 2026, version valable à partir du 1er novembre 2026",
      url: "https://eservices.minfin.fgov.be/myminfin-rest/fisconetPlus/public/document/addenda/SimulatorBV2026novemberverrouille.xlsx",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "be-fr.bonus-emploi-aout-2026",
    fecha: "2026-10-14",
    titulo: "Bonus à l'emploi fiscal plus élevé pour les très bas salaires",
    texto:
      "Depuis le 1er août 2026, le bonus à l'emploi fiscal pour les très bas salaires est de 63 % du volet B du bonus à l'emploi social, au lieu de 52,54 %. Les travailleurs qui gagnent peu paient ainsi moins de précompte professionnel.",
    vigenteDesde: "2026-08-01",
    calculadoras: ["be-fr.bruto-netto-berekenen"],
    fuente: {
      organismo: "Moniteur belge",
      titulo: "Arrêté royal du 24 juillet 2026 modifiant les règles d'application du précompte professionnel",
      url: "https://www.ejustice.just.fgov.be/eli/besluit/2026/07/24/2026005690/staatsblad",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "be-fr.rmmmg-juillet-2026",
    fecha: "2026-10-14",
    titulo: "Salaire minimum depuis le 1er juillet 2026 : 2.233,61 € par mois",
    texto:
      "Après l'augmentation du 1er avril 2026 et l'indexation du 1er juillet 2026, le revenu minimum mensuel moyen garanti des travailleurs de 18 ans et plus est de 2.233,61 € bruts par mois.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["be-fr.minimumloon-berekenen"],
    fuente: {
      organismo: "Conseil national du travail",
      titulo: "Tableau des montants des CCT actualisé au 1er juillet 2026 (CCT n° 43/18)",
      url: "https://cnt-nar.be/sites/default/files/documents/fr/Tableau-Tabel-Montants%20CCT-CAO%20Bedragen-2026-07-01.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "be-fr.preavis-aout-2026",
    fecha: "2026-10-14",
    titulo: "Nouveaux délais de préavis depuis le 1er août 2026",
    texto:
      "Depuis le 1er août 2026, les délais de préavis des premières années de contrat ont été adaptés, en cas de licenciement comme de démission. Pour les contrats dont l'exécution débute à partir du 1er juin 2026, le délai en cas de licenciement est de 52 semaines à partir de 17 ans d'ancienneté.",
    vigenteDesde: "2026-08-01",
    calculadoras: ["be-fr.opzeggingstermijn-berekenen"],
    fuente: {
      organismo: "Justel",
      titulo: "Loi du 3 juillet 1978 relative aux contrats de travail, art. 37/2 (texte coordonné)",
      url: "https://www.ejustice.just.fgov.be/eli/loi/1978/07/03/1978070303/justel",
      tipo: "primaria",
      verificadoEl: "2026-10-16",
    },
  },
];
