import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "de.rentenwert-juli-2026",
    fecha: "2026-10-14",
    titulo: "Aktueller Rentenwert steigt auf 42,52 Euro",
    texto: "Seit dem 1. Juli 2026 ist ein Entgeltpunkt 42,52 Euro Monatsrente wert, vorher waren es 40,79 Euro. Der Rentenrechner nutzt den neuen Wert.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["de.rentenrechner"],
    fuente: {
      organismo: "Bundesministerium der Justiz (gesetze-im-internet.de)",
      titulo: "§ 1 Rentenwertbestimmungsverordnung 2026",
      url: "https://www.gesetze-im-internet.de/rwbestv_2026/__1.html",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "de.mindestlohn-2026",
    fecha: "2026-10-14",
    titulo: "Mindestlohn 2026: 13,90 Euro je Stunde",
    texto: "Seit dem 1. Januar 2026 beträgt der Mindestlohn 13,90 Euro brutto je Stunde. Ab dem 1. Januar 2027 sind es 14,60 Euro. Die Minijob-Grenze liegt 2026 bei 603 Euro im Monat.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["de.mindestlohn-rechner", "de.minijob-rechner", "de.midijob-rechner"],
    fuente: {
      organismo: "Bundesministerium der Justiz (gesetze-im-internet.de)",
      titulo: "§ 1 Fünfte Mindestlohnanpassungsverordnung",
      url: "https://www.gesetze-im-internet.de/milov5/__1.html",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "de.pendlerpauschale-2026",
    fecha: "2026-10-14",
    titulo: "Pendlerpauschale ab dem ersten Kilometer 38 Cent",
    texto: "Seit 2026 gilt die Entfernungspauschale von 0,38 Euro für jeden vollen Kilometer zwischen Wohnung und erster Tätigkeitsstätte, schon ab dem ersten Kilometer.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["de.pendlerpauschale-rechner"],
    fuente: {
      organismo: "Bundesministerium der Justiz (gesetze-im-internet.de)",
      titulo: "§ 9 Absatz 1 Satz 3 Nummer 4 EStG",
      url: "https://www.gesetze-im-internet.de/estg/__9.html",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
];
