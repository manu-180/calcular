import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "it.irpef-33-2026",
    fecha: "2026-10-14",
    titulo: "IRPEF 2026: il secondo scaglione scende al 33%",
    texto:
      "Dal 1° gennaio 2026 la parte di reddito tra 28.000 e 50.000 euro paga il 33% invece del 35%. Le calcolatrici di stipendio netto, IRPEF e cedolare secca usano già la nuova aliquota.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["it.stipendio-netto", "it.irpef", "it.cedolare-secca"],
    fuente: {
      organismo: "Normattiva",
      titulo: "DPR 917/1986 (TUIR), art. 11, come modificato dalla legge 199/2025",
      url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.del.presidente.della.repubblica:1986-12-22;917~art11!vig=2026-10-14",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "it.interessi-legali-2026",
    fecha: "2026-10-14",
    titulo: "Interessi legali all'1,6% dal 2026",
    texto: "Il decreto del 10 dicembre 2025 porta il saggio degli interessi legali dal 2% all'1,6% annuo a partire dal 1° gennaio 2026.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["it.interessi-legali"],
    fuente: {
      organismo: "Gazzetta Ufficiale",
      titulo: "DM Economia 10/12/2025 (GU n. 289 del 13/12/2025)",
      url: "https://www.gazzettaufficiale.it/atto/serie_generale/caricaDettaglioAtto/originario?atto.dataPubblicazioneGazzetta=2025-12-13&atto.codiceRedazionale=25A06705",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
];
