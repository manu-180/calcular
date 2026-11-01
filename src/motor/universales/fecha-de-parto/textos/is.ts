import { formaIs } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiFechaDeParto } from "../definicion";

export const textosIs: TextosUi<UiFechaDeParto> = {
  slug: "settur-dagur",
  ui: () => ({
    metodo: "Hvaða dagsetningu veistu?",
    fum: "Fyrsti dagur síðustu blæðinga",
    concepcion: "Dagsetning getnaðar",
    fecha: "Dagsetning",
    fechaAyuda: "Ef þú velur síðustu blæðingar skaltu slá inn fyrsta blæðingadaginn.",
    ciclo: "Lengd tíðahrings (dagar)",
    cicloAyuda: "Aðeins notað með síðustu blæðingum. Ef þú veist það ekki skaltu láta 28 standa.",
    fpp: "Settur dagur",
    edadGestacional: "Meðgöngulengd í dag",
    trimestre: "Þriðjungur",
    faltan: "Dagar eftir",
    fechaConcepcion: "Áætlaður getnaður",
    semanasYDias: (s, d) => `${s} ${formaIs(s, "vika", "vikur")}${d ? ` og ${d} ${formaIs(d, "dagur", "dagar")}` : ""}`,
    trimestres: ["Fyrsti þriðjungur", "Annar þriðjungur", "Þriðji þriðjungur"],
    errorFutura: "Dagsetningin má ekki vera eftir daginn í dag.",
    errorCiclo: "Lengd tíðahrings þarf að vera á bilinu 20 til 45 dagar.",
    notaPasada: "Meira en 42 vikur eru liðnar frá þessari dagsetningu, svo meðgöngulengdin er ekki sýnd.",
    aviso: "Þetta er áætlun. Fá börn fæðast nákvæmlega á settum degi. Ómskoðun og mæðravernd gefa öruggustu dagsetninguna og þetta kemur ekki í stað mats ljósmóður, læknis eða annars heilbrigðisstarfsfólks.",
  }),
};
