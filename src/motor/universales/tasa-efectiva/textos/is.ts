import { formaIs } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

export const textosIs: TextosUi<UiTasaEfectiva> = {
  slug: "virkir-vextir",
  ui: () => ({
    direccion: "Hvaða vexti ertu með?",
    nominalAEfectiva: "Nafnvexti (reikna yfir í virka vexti)",
    efectivaANominal: "Virka vexti (reikna yfir í nafnvexti)",
    tasa: "Ársvextir (%)",
    tasaAyuda: "Sláðu þá inn nákvæmlega eins og þeir standa í tilboðinu eða samningnum.",
    capitalizacion: "Vaxtareikningur",
    capitalizacionAyuda: "Hve oft vextir bætast við skuldina eða innstæðuna. Lán og kreditkort reikna vexti yfirleitt mánaðarlega.",
    mensual: "Í hverjum mánuði (12 sinnum á ári)",
    trimestral: "Á hverjum ársfjórðungi (4 sinnum á ári)",
    semestral: "Á hálfs árs fresti (2 sinnum á ári)",
    diaria: "Á hverjum degi (365 sinnum á ári)",
    efectiva: "Virkir ársvextir",
    nominal: "Nafnvextir á ári",
    periodica: "Vextir á tímabil",
    errorNegativa: "Vextir geta ekki verið neikvæðir. Sláðu inn tölu frá 0 og upp úr.",
    observacionDiferencia: (puntos) => `Virku vextirnir eru ${puntos} ${formaIs(puntos, "prósentustigi", "prósentustigum")} hærri en nafnvextirnir, því vextirnir bera líka vexti.`,
  }),
};
