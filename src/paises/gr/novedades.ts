import type { Novedad } from "@/motor/tipos";

const N5246 = {
  organismo: "Εθνικό Τυπογραφείο (ΦΕΚ)",
  titulo: "ν. 5246/2025, ΦΕΚ Α' 198/11.11.2025",
  url: "https://ia37rg02wpsa01.blob.core.windows.net/fek/01/2025/20250100198.pdf",
  tipo: "primaria",
  verificadoEl: "2026-10-24",
} as const;

export const novedades: readonly Novedad[] = [
  {
    id: "gr.katotatos-misthos-2026",
    fecha: "2026-10-24",
    titulo: "Κατώτατος μισθός 920 € από τον Απρίλιο του 2026",
    texto: "Από την 1η Απριλίου 2026 ο κατώτατος μισθός είναι 920 € τον μήνα και το κατώτατο ημερομίσθιο 41,09 €. Μέχρι τις 31 Μαρτίου ίσχυαν 880 € και 39,30 €.",
    vigenteDesde: "2026-04-01",
    calculadoras: ["gr.katotatos-misthos", "gr.apozimiosi-apolysis"],
    fuente: {
      organismo: "Εθνικό Τυπογραφείο (ΦΕΚ)",
      titulo: "ΚΥΑ 8934/2026, ΦΕΚ Β' 1759/27.03.2026",
      url: "https://ia37rg02wpsa01.blob.core.windows.net/fek/02/2026/20260201759.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
  {
    id: "gr.klimaka-forou-2026",
    fecha: "2026-10-24",
    titulo: "Νέα κλίμακα φόρου εισοδήματος για το 2026",
    texto: "Για τα εισοδήματα του 2026 τα κλιμάκια είναι 9%, 20%, 26%, 34%, 39% και 44%. Οι συντελεστές μέχρι τα 30.000 € μειώνονται ανάλογα με τα παιδιά, και οι νέοι έως 30 ετών έχουν χαμηλότερο συντελεστή μέχρι τα 20.000 €.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["gr.ypologismos-katharou-misthou", "gr.ypologismos-miktou-apo-katharo", "gr.ypologismos-forou-eisodimatos", "gr.foros-eleftheron-epangelmation"],
    fuente: N5246,
  },
  {
    id: "gr.foros-enoikion-2026",
    fecha: "2026-10-24",
    titulo: "Νέο κλιμάκιο 25% στον φόρο ενοικίων",
    texto: "Από το 2026 τα ενοίκια από 12.000,01 έως 24.000 € φορολογούνται με 25% αντί για 35%. Το 35% ισχύει πλέον από 24.000,01 έως 36.000 € και το 45% πάνω από τα 36.000 €.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["gr.foros-enoikion"],
    fuente: N5246,
  },
  {
    id: "gr.fpa-nisia-2026",
    fecha: "2026-10-24",
    titulo: "Μειωμένος ΦΠΑ σε μικρά νησιά του Αιγαίου",
    texto: "Από την 1η Ιανουαρίου 2026 οι συντελεστές ΦΠΑ μειώνονται κατά 30% στα νησιά του Βορείου Αιγαίου, στη Σαμοθράκη και στα Δωδεκάνησα με έως 20.000 κατοίκους. Οι συντελεστές γίνονται 17%, 9%, 4% και 3%.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["gr.ypologismos-fpa"],
    fuente: N5246,
  },
  {
    id: "gr.eisfores-eleftheron-2026",
    fecha: "2026-10-24",
    titulo: "Εισφορές ελεύθερων επαγγελματιών 2026: αύξηση 2,5%",
    texto: "Οι μηνιαίες εισφορές των ελεύθερων επαγγελματιών αυξήθηκαν κατά 2,5% από τον Ιανουάριο του 2026. Η 1η κατηγορία είναι 250,77 € τον μήνα, χωρίς τα 10 € της εισφοράς ανεργίας.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["gr.eisfores-eleftheron-epangelmation", "gr.foros-eleftheron-epangelmation"],
    fuente: {
      organismo: "e-ΕΦΚΑ",
      titulo: "Εγκύκλιος 6/2026",
      url: "https://www.e-efka.gov.gr/sites/default/files/2026-02/%CE%91%CF%83%CF%86%CE%B1%CE%BB%CE%B9%CF%83%CF%84%CE%B9%CE%BA%CE%AD%CF%82_%CE%B5%CE%B9%CF%83%CF%86%CE%BF%CF%81%CE%AD%CF%82_%CE%AD%CF%84%CE%BF%CF%85%CF%82_2026_%CE%BC%CE%B7_%CE%BC%CE%B9%CF%83%CE%B8%CF%89%CF%84%CF%8E%CE%BD_%CE%95%CE%BB%CE%B5%CF%85%CE%B8%CE%AD%CF%81%CF%89%CE%BD_%CE%95%CF%80%CE%B1%CE%B3%CE%B3%CE%B5%CE%BB%CE%BC%CE%B1%CF%84%CE%B9%CF%8E%CE%BD_%CE%91%CF%85%CF%84%CE%BF%CE%B1%CF%80%CE%B1%CF%83%CF%87%CE%BF%CE%BB%CE%BF%CF%8D%CE%BC%CE%B5%CE%BD%CF%89%CE%BD_%CE%91%CE%B3%CF%81%CE%BF%CF%84%CF%8E%CE%BD_V1.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
];
