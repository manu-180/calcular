import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "at.ust-grundnahrungsmittel-2026",
    fecha: "2026-10-14",
    titulo: "Neuer Umsatzsteuersatz von 4,9 % für Grundnahrungsmittel",
    texto: "Seit 1. Juli 2026 gilt für ausgewählte Grundnahrungsmittel wie Brot, Butter, Eier und Milch ein ermäßigter Umsatzsteuersatz von 4,9 %. Welche Produkte genau begünstigt sind, regelt die neue Anlage 3 zum Umsatzsteuergesetz. Der Mehrwertsteuerrechner bietet den neuen Satz an.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["at.mehrwertsteuer-rechner"],
    fuente: {
      organismo: "Unternehmensserviceportal (BMF)",
      titulo: "Neuer Umsatzsteuersatz von 4,9 Prozent seit 1. Juli 2026",
      url: "https://www.usp.gv.at/aktuelles/newsliste/neuer_ustsatz.html",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "at.pendlereuro-2026",
    fecha: "2026-10-14",
    titulo: "Pendlereuro steigt auf 6 Euro je Kilometer",
    texto: "Seit 2026 beträgt der Pendlereuro 6 Euro im Jahr je Kilometer der einfachen Strecke, bis 2025 waren es 2 Euro. Das Pendlerpauschale selbst bleibt gleich. Der Brutto-Netto-Rechner und der Pendlerrechner nutzen den neuen Wert.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["at.brutto-netto-rechner", "at.pendlerpauschale-rechner"],
    fuente: {
      organismo: "Bundesministerium für Finanzen",
      titulo: "Allgemeines zum Pendlerpauschale und Pendlereuro",
      url: "https://www.bmf.gv.at/themen/steuern/arbeitnehmerveranlagung/pendlerfoerderung-das-pendlerpauschale/allgemeines-zum-pendlerpauschale.html",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "at.ueberstunden-2026",
    fecha: "2026-10-14",
    titulo: "Überstundenzuschläge 2026: 170 Euro für 15 Stunden steuerfrei",
    texto: "Im Jahr 2026 sind Zuschläge für die ersten 15 Überstunden im Monat bis zu 170 Euro steuerfrei. Der Überstundenrechner rechnet mit diesen Grenzen.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["at.ueberstunden-rechner"],
    fuente: {
      organismo: "Bundesministerium für Finanzen",
      titulo: "Bundesgesetz, mit dem das Einkommensteuergesetz 1988 geändert wird (BGBl. I Nr. 4/2026)",
      url: "https://www.bmf.gv.at/rechtsnews/steuern-rechtsnews/neue-gesetze/2026/bundesgesetz,-mit-dem-das-einkommensteuergesetz-1988-geaendert-wird.html",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "at.tarif-2026",
    fecha: "2026-10-14",
    titulo: "Tarifstufen 2026 um 1,73 % angehoben",
    texto: "Die Grenzen der Einkommensteuer sind 2026 um zwei Drittel der Inflation gestiegen. Steuerfrei bleiben 13.539 Euro im Jahr, der Spitzensteuersatz von 55 % beginnt weiter bei 1 Million Euro. Auch der Verkehrsabsetzbetrag steigt auf 496 Euro.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["at.brutto-netto-rechner", "at.einkommensteuer-rechner", "at.netto-brutto-rechner"],
    fuente: {
      organismo: "Bundesministerium für Finanzen",
      titulo: "Steuertarif und Steuerabsetzbeträge, Tarifstufen 2026",
      url: "https://www.bmf.gv.at/themen/steuern/arbeitnehmerveranlagung/steuertarif-steuerabsetzbetraege/steuertarif-steuerabsetzbetraege.html",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
];
