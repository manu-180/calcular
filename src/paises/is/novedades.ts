import type { Novedad } from "@/motor/tipos";

const STAD = { organismo: "Skatturinn", titulo: "Staðgreiðsla 2026", url: "https://www.skatturinn.is/einstaklingar/stadgreidsla/stadgreidsla/2026/", tipo: "primaria", verificadoEl: "2026-11-01" } as const;
const HT = { organismo: "Skatturinn", titulo: "Helstu tölur og prósentur 2026", url: "https://www.skatturinn.is/einstaklingar/helstutolur/2026/helstu-tolur-og-prosentur-2026", tipo: "primaria", verificadoEl: "2026-11-01" } as const;

export const novedades: readonly Novedad[] = [
  {
    id: "is.drattarvextir-11-2026",
    fecha: "2026-10-20",
    titulo: "Dráttarvextir óbreyttir í nóvember",
    texto: "Seðlabankinn birti tilkynningu nr. 10/2026: dráttarvextir eru 15,75% fyrir 1. til 30. nóvember 2026.",
    vigenteDesde: "2026-11-01",
    calculadoras: ["is.drattarvextir"],
    fuente: { organismo: "Seðlabanki Íslands", titulo: "Tilkynning um dráttarvexti og vexti af peningakröfum nr. 10/2026", url: "https://sedlabanki.is/frettir-og-utgefid-efni/grein/tilkynning-um-drattarvexti-og-vexti-af-peningakrofum-nr-10-2026", tipo: "primaria", verificadoEl: "2026-11-01" },
  },
  {
    id: "is.leigutekjur-2026",
    fecha: "2026-01-01",
    titulo: "Nýr skattstofn leigutekna",
    texto: "Helstu tölur Skattsins fyrir 2026 segja að skattur leggist á 75% leigutekna af íbúðarhúsnæði, án frádráttar, ef skilyrðin eru uppfyllt.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["is.leigutekjur"],
    fuente: HT,
  },
  {
    id: "is.stadgreidsla-2026",
    fecha: "2026-01-05",
    titulo: "Skattþrep og persónuafsláttur 2026",
    texto: "Persónuafsláttur er 72.492 kr. á mánuði og fyrsta þrep nær upp í 498.122 kr. Launareiknivélin og tekjuskattsreiknivélin nota þessar tölur.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["is.launareiknivel", "is.tekjuskattur", "is.personuafslattur"],
    fuente: STAD,
  },
];
