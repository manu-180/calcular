import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "cy.foroi-2026",
    fecha: "2026-10-26",
    titulo: "Νέα κλίμακα φόρου εισοδήματος από το 2026",
    texto: "Από το φορολογικό έτος 2026 το αφορολόγητο είναι 22.000 € και τα κλιμάκια 20%, 25%, 30% και 35%. Προστέθηκαν εκπτώσεις για τέκνα, ενοίκιο ή στεγαστικό, ενεργειακή αναβάθμιση και ασφάλιση κατοικίας.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["cy.ypologismos-katharou-misthou", "cy.ypologismos-miktou-apo-katharo", "cy.ypologismos-forou-eisodimatos"],
    fuente: {
      organismo: "CyLaw (Παγκύπριος Δικηγορικός Σύλλογος)",
      titulo: "Ο περί Φορολογίας του Εισοδήματος Νόμος 118(I)/2002, όπως τροποποιήθηκε με τον Ν. 244(I)/2025",
      url: "https://www.cylaw.org/nomoi/enop/non-ind/2002_1_118/full.html",
      tipo: "primaria",
      verificadoEl: "2026-10-26",
    },
  },
  {
    id: "cy.katotatos-2026",
    fecha: "2026-10-26",
    titulo: "Κατώτατος μισθός 1.088 € από τον Ιανουάριο του 2026",
    texto: "Από την 1η Ιανουαρίου 2026 ο κατώτατος μηνιαίος μισθός πλήρους απασχόλησης είναι 1.088 €. Τους πρώτους έξι μήνες στον ίδιο εργοδότη μπορεί να είναι 979 €.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["cy.katotatos-misthos"],
    fuente: {
      organismo: "Επίσημη Εφημερίδα (ΚΔΠ)",
      titulo: "ΚΔΠ 427/2025, περί Κατωτάτου Ορίου Μισθών (Τροποποιητικό) Διάταγμα του 2025",
      url: "https://www.cylaw.org/KDP/data/2025_1_427.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-26",
    },
  },
  {
    id: "cy.amyna-merismata-2026",
    fecha: "2026-10-26",
    titulo: "Εισφορά άμυνας 5% στα μερίσματα",
    texto: "Η έκτακτη εισφορά για την άμυνα στα μερίσματα των φορολογικών κατοίκων μειώθηκε σε 5%. Για μερίσματα από κέρδη μέχρι το 2025 εξακολουθεί να ισχύει το 17%.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["cy.ektakti-eisfora-merismata"],
    fuente: {
      organismo: "CyLaw (Παγκύπριος Δικηγορικός Σύλλογος)",
      titulo: "Ο περί Έκτακτης Εισφοράς για την Άμυνα της Δημοκρατίας Νόμος 117(I)/2002, άρθρο 3, όπως τροποποιήθηκε με τον Ν. 245(I)/2025",
      url: "https://www.cylaw.org/nomoi/enop/non-ind/2002_1_117/full.html",
      tipo: "primaria",
      verificadoEl: "2026-10-26",
    },
  },
  {
    id: "cy.orio-ka-2026",
    fecha: "2026-10-26",
    titulo: "Ανώτατο όριο ασφαλιστέων αποδοχών 5.742 € τον μήνα",
    texto: "Για το έτος εισφορών 2026 το ανώτατο όριο είναι 5.742 € τον μήνα και 1.325 € την εβδομάδα. Οι βασικές ασφαλιστέες αποδοχές είναι 220,76 € την εβδομάδα.",
    vigenteDesde: "2026-01-05",
    calculadoras: ["cy.ypologismos-katharou-misthou", "cy.eisfores-koinonikon-asfaliseon", "cy.kostos-ergodoti", "cy.eisfores-autotelos-ergazomenon", "cy.plirome-pleonasmou"],
    fuente: {
      organismo: "Υπηρεσίες Κοινωνικών Ασφαλίσεων",
      titulo: "Βασικές ασφαλιστέες αποδοχές 1981-2026",
      url: "https://www.mlsi.gov.cy/mlsi/sid/sidv2.nsf/All/109C23F9B530F193C2257DB700288564?OpenDocument",
      tipo: "primaria",
      verificadoEl: "2026-10-26",
    },
  },
];
