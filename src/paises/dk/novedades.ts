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
];
