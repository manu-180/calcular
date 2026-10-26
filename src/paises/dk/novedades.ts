import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "dk.skattereform-2026",
    fecha: "2026-10-24",
    titulo: "Ny topskat og toptopskat fra 2026",
    texto:
      "Den tidligere topskat hedder nu mellemskat: 7,5 % over 641.200 kr. Oven i kommer en ny topskat på 7,5 % over 777.900 kr. og en toptopskat på 5 % over 2.592.700 kr. Grænserne gælder den personlige indkomst efter am-bidrag.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["dk.loen-efter-skat", "dk.topskat"],
    fuente: {
      organismo: "Skatte- og Vækstministeriet",
      titulo: "Satser og beløbsgrænser i personskatteloven 2026 og 2027",
      url: "https://svmn.dk/tal-og-metode/satser/satser-og-beloebsgraenser-i-lovgivningen/personskatteloven",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
  {
    id: "dk.referencesats-juli-2026",
    fecha: "2026-10-24",
    titulo: "Morarenten er 10 % fra 1. juli 2026",
    texto:
      "Nationalbankens udlånsrente var 2,00 % den 1. juli 2026. Med rentelovens tillæg på 8 procentpoint er morarenten 10,00 % om året for andet halvår 2026.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["dk.morarenter"],
    fuente: {
      organismo: "Danmarks Nationalbank (via Danmarks Statistik)",
      titulo: "Nationalbankens rente, udlån (tabel DNRENTD)",
      url: "https://api.statbank.dk/v1/data/DNRENTD/CSV?INSTRUMENT=OIRNAA&LAND=DK&OPGOER=E&Tid=%3E=2025M01D02",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
  {
    id: "dk.koerselsfradrag-2026",
    fecha: "2026-10-24",
    titulo: "Højere kørselsfradrag i 2026",
    texto: "Kørselsfradraget for 25 til 120 km er 3,17 kr. pr. km i 2026 mod 2,23 kr. i 2025. Over 120 km er satsen 1,59 kr.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["dk.koerselsfradrag"],
    fuente: {
      organismo: "Skattestyrelsen (skat.dk)",
      titulo: "Satser for kørselsfradrag 2026",
      url: "https://skat.dk/borger/fradrag/koerselsfradrag/beregn-dit-koerselsfradrag",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
];
