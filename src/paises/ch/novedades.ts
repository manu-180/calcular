import type { Novedad } from "@/motor/tipos";

const BSV_2027 = {
  organismo: "Bundesamt für Sozialversicherungen",
  titulo: "Medienmitteilung vom 2. Oktober 2026: AHV/IV-Minimalrente steigt um 20 Franken",
  url: "https://www.bsv.admin.ch/de/newnsb/BqB41FVYi5FB",
  tipo: "primaria",
  verificadoEl: "2026-10-14",
} as const;

export const novedades: readonly Novedad[] = [
  {
    id: "ch.ahv-renten-2027",
    fecha: "2026-10-14",
    titulo: "AHV-Renten steigen 2027: Minimalrente 1280 Franken",
    texto: "Ab 1. Januar 2027 beträgt die minimale AHV-Altersrente 1280 Franken im Monat, die maximale 2560 Franken. Bis Ende 2026 sind es 1260 und 2520 Franken. Der AHV-Rentenrechner nutzt ab Januar die neuen Werte.",
    vigenteDesde: "2027-01-01",
    calculadoras: ["ch.ahv-rentenrechner"],
    fuente: BSV_2027,
  },
  {
    id: "ch.saeule-3a-2027",
    fecha: "2026-10-14",
    titulo: "Säule 3a: höhere Maximalbeiträge ab 2027",
    texto: "Ab 2027 können Erwerbstätige mit Pensionskasse bis 7373 Franken im Jahr in die Säule 3a einzahlen, ohne Pensionskasse bis 36 864 Franken. Für 2026 gelten 7258 und 36 288 Franken.",
    vigenteDesde: "2027-01-01",
    calculadoras: ["ch.saeule-3a-rechner"],
    fuente: BSV_2027,
  },
  {
    id: "ch.dreizehnte-altersrente-2026",
    fecha: "2026-10-14",
    titulo: "Erste 13. AHV-Altersrente im Dezember 2026",
    texto: "Wer im Dezember eine AHV-Altersrente bezieht, erhält zusätzlich eine 13. Altersrente. Sie beträgt einen Zwölftel der im Kalenderjahr bezogenen Altersrente und wird ab 2026 jedes Jahr im Dezember ausbezahlt.",
    vigenteDesde: "2026-12-01",
    calculadoras: ["ch.ahv-rentenrechner"],
    fuente: {
      organismo: "Bundeskanzlei (fedlex.admin.ch)",
      titulo: "Art. 34ter AHVG, 13. Altersrente",
      url: "https://www.fedlex.admin.ch/eli/cc/63/837_843_843/de#art_34_ter",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "ch.dbst-tarif-2026",
    fecha: "2026-10-14",
    titulo: "Bundessteuer 2026: Tarife an die Teuerung angepasst",
    texto: "Für das Steuerjahr 2026 gelten neue Tarife der direkten Bundessteuer. Das Eidgenössische Finanzdepartement hat sie wegen der kalten Progression angepasst. Der Bundessteuer-Rechner nutzt die neuen Tarife.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["ch.bundessteuer-rechner", "ch.kapitalbezug-steuer-rechner", "ch.saeule-3a-rechner"],
    fuente: {
      organismo: "Bundeskanzlei (fedlex.admin.ch)",
      titulo: "Art. 36 DBG, Fassung gemäss Verordnung des EFD vom 10. September 2025 über die kalte Progression",
      url: "https://www.fedlex.admin.ch/eli/cc/1991/1184_1184_1184/de#art_36",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
];
