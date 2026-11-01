import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { area, FT2_POR_M2 } from "../definicion";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "ft" : "m";
  const us = imperial ? "ft²" : "m²";
  const enL = imperial ? area("rectangulo", 16, 12) + area("rectangulo", 10, 6) : area("rectangulo", 5, 4) + area("rectangulo", 3, 2);
  return {
    h1: imperial ? "Reiknaðu ferfet" : "Reiknaðu fermetra",
    title: tituloQueEntre(
      `Fermetrar: reiknaðu flatarmál herbergis og lóðar | ${ctx.nombrePais}`,
      `Reiknaðu fermetra | ${ctx.nombrePais}`,
      "Reiknaðu fermetra",
    ),
    description: "Reiknaðu flatarmál herbergis, gólfs eða lóðar: rétthyrninga, þríhyrninga og hringa, með allt að fimm form sem eru lögð saman.",
    intro: [
      "Veldu lögun og sláðu inn málin. Ef flöturinn er ekki einfaldur rétthyrningur skaltu skipta honum í hluta og reiknivélin leggur þá saman.",
      imperial ? "Þú sérð líka niðurstöðuna í fermetrum." : "Þú sérð líka niðurstöðuna í ferfetum.",
    ],
    comoSeCalcula: [
      "Rétthyrningur: lengd × breidd.",
      "Þríhyrningur: grunnlína × hæð ÷ 2.",
      `Hringur: π × radíus × radíus, þar sem radíus er hálft þvermál. 1 m² er ${n(FT2_POR_M2)} ft².`,
    ],
    ejemplo: [
      imperial
        ? `L-laga stofu má skipta í rétthyrning sem er 16 × 12 ft og annan sem er 10 × 6 ft. Samtals eru það ${n(enL, 0)} ft².`
        : `L-laga stofu má skipta í rétthyrning sem er 5 × 4 m og annan sem er 3 × 2 m. Samtals eru það ${n(enL, 0)} m².`,
      `Hringlaga borð sem er 2 ${u} í þvermál tekur ${n(area("circulo", 2, 0))} ${us}.`,
    ],
    faq: [
      {
        pregunta: "Hvernig reikna ég fermetra herbergis?",
        respuesta: imperial
          ? `Mældu lengd og breidd í fetum og margfaldaðu saman. Herbergi sem er 12 × 10 ft er ${n(area("rectangulo", 12, 10), 0)} ft².`
          : `Mældu lengd og breidd í metrum og margfaldaðu saman. Herbergi sem er 4 × 3 m er ${n(area("rectangulo", 4, 3), 0)} m².`,
      },
      {
        pregunta: "Hvað geri ég ef málin eru í sentimetrum?",
        respuesta: `Umreiknaðu þau fyrst: deildu sentimetrunum með 100 til að fá metra, eða tommunum með 12 til að fá fet. 350 cm eru ${n(350 / 100, 1)} m.`,
      },
      {
        pregunta: "Hvernig breyti ég fermetrum í ferfet?",
        respuesta: `Margfaldaðu með ${n(FT2_POR_M2)}. 20 m² eru ${n(20 * FT2_POR_M2)} ft².`,
      },
    ],
    glosario: [
      { termino: "Fermetri (m²)", definicion: "Flatarmál fernings sem er 1 metri á hverja hlið." },
      { termino: "Ferfet (ft²)", definicion: "Flatarmál fernings sem er 1 fet á hverja hlið." },
    ],
  };
};
