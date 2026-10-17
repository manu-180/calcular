import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "be.bedrijfsvoorheffing-november-2026",
    fecha: "2026-10-14",
    titulo: "Minder bedrijfsvoorheffing vanaf 1 november 2026",
    texto:
      "Door de hervorming van de personenbelasting stijgt de belastingvrije som al voor de inkomsten van 2026. Vanaf 1 november 2026 houdt je werkgever daarom minder bedrijfsvoorheffing in. Ook de bedragen voor kinderen ten laste veranderen. De bruto-netto- en bedrijfsvoorheffingberekening rekenen vanaf die datum met de nieuwe regels.",
    vigenteDesde: "2026-11-01",
    calculadoras: ["be.bruto-netto-berekenen", "be.bedrijfsvoorheffing-berekenen"],
    fuente: {
      organismo: "FOD Financiën",
      titulo: "Simulator bedrijfsvoorheffing 2026, versie geldig vanaf 1 november 2026",
      url: "https://eservices.minfin.fgov.be/myminfin-rest/fisconetPlus/public/document/addenda/SimulatorBV2026novemberverrouille.xlsx",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "be.werkbonus-augustus-2026",
    fecha: "2026-10-14",
    titulo: "Hogere fiscale werkbonus voor zeer lage lonen",
    texto:
      "Sinds 1 augustus 2026 is de fiscale werkbonus voor zeer lage lonen 63 % van luik B van de sociale werkbonus, in plaats van 52,54 %. Wie weinig verdient, betaalt zo minder bedrijfsvoorheffing.",
    vigenteDesde: "2026-08-01",
    calculadoras: ["be.bruto-netto-berekenen"],
    fuente: {
      organismo: "Belgisch Staatsblad",
      titulo: "Koninklijk besluit van 24 juli 2026 tot wijziging van de toepassingsregels voor de bedrijfsvoorheffing",
      url: "https://www.ejustice.just.fgov.be/eli/besluit/2026/07/24/2026005690/staatsblad",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "be.ggmmi-juli-2026",
    fecha: "2026-10-14",
    titulo: "Minimumloon sinds 1 juli 2026: € 2.233,61 per maand",
    texto:
      "Na de stap van 1 april 2026 en de indexering van 1 juli 2026 is het gewaarborgd gemiddeld minimum maandinkomen voor werknemers van 18 jaar en ouder € 2.233,61 bruto per maand.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["be.minimumloon-berekenen"],
    fuente: {
      organismo: "Nationale Arbeidsraad",
      titulo: "Tabel cao-bedragen bijgewerkt op 1 juli 2026 (cao nr. 43/18)",
      url: "https://cnt-nar.be/sites/default/files/documents/fr/Tableau-Tabel-Montants%20CCT-CAO%20Bedragen-2026-07-01.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "be.opzegging-augustus-2026",
    fecha: "2026-10-14",
    titulo: "Nieuwe opzeggingstermijnen sinds 1 augustus 2026",
    texto:
      "Sinds 1 augustus 2026 gelden aangepaste opzeggingstermijnen in de eerste jaren van een contract, zowel bij ontslag door de werkgever als door de werknemer. Voor contracten die starten vanaf 1 juni 2026 is de opzeggingstermijn bij ontslag door de werkgever vanaf 17 jaar anciënniteit 52 weken.",
    vigenteDesde: "2026-08-01",
    calculadoras: ["be.opzeggingstermijn-berekenen"],
    fuente: {
      organismo: "Justel",
      titulo: "Wet van 3 juli 1978 betreffende de arbeidsovereenkomsten, art. 37/2",
      url: "https://www.ejustice.just.fgov.be/eli/wet/1978/07/03/1978070303/justel",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
];
