import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "is.drattarvextir",
  h1: "Dráttarvextir {{anio}}: reiknaðu vexti af vanskilum",
  title: "Dráttarvextir {{anio}}: {{is.drattarvextir}} á ári",
  description: "Dráttarvextir eru {{is.drattarvextir}} á ári samkvæmt Seðlabanka Íslands. Sláðu inn kröfu og fjölda daga í vanskilum og sjáðu vextina.",
  intro: [
    "Dráttarvextir eru {{is.drattarvextir}} á ári frá {{is.drattarvextir#desde}}, samkvæmt tilkynningu Seðlabanka Íslands nr. 10/2026. Sláðu inn kröfuna og fjölda daga í vanskilum.",
    "Meginvextir bankans eru {{is.meginvextir}}. Seðlabankinn birtir dráttarvexti og vexti af peningakröfum mánaðarlega, svo að talan getur breyst næsta mánuð.",
  ],
  comoSeCalcula: [
    "Krafan er margfölduð með árshlutfallinu, síðan með fjölda daga og deilt með 365.",
    "Þetta er einfaldur útreikningur með núgildandi hlutfalli, án vaxtavaxta.",
    "Yfir lengri tímabil þarf að nota hlutfall hvers mánaðar og þá getur staðan verið önnur en reiknivélin sýnir.",
  ],
  ejemplo: [
    "Krafa upp á 1.000.000 kr. í 30 daga: 1.000.000 x 15,75% x 30 / 365 eru 12.945 kr. Samtals 1.012.945 kr.",
  ],
  faq: [
    { pregunta: "Hvað eru meginvextir?", respuesta: "Vextir Seðlabankans á sjö daga bundnum innlánum. Peningastefnunefnd hélt þeim í {{is.meginvextir}} í yfirlýsingu sinni 7. október 2026." },
    { pregunta: "Hvað eru almennir vextir núna?", respuesta: "Vextir óverðtryggðra útlána eru {{is.vextir-peningakrofur[overdtryggd]}}, verðtryggðra {{is.vextir-peningakrofur[verdtryggd]}} og af skaðabótakröfum {{is.vextir-peningakrofur[skadabaetur]}}, samkvæmt sömu tilkynningu." },
    { pregunta: "Hversu oft breytast dráttarvextir?", respuesta: "Seðlabankinn birtir tilkynningu fyrir hvern mánuð. Tilkynning nr. 10/2026 gildir fyrir 1. til 30. nóvember." },
    { pregunta: "Er þetta nákvæm krafa?", respuesta: "Nei, þetta er áætlun. Kröfuhafi getur bætt við kostnaði og reiknar hlutfall hvers tímabils." },
  ],
  glosario: [
    { termino: "Dráttarvextir", definicion: "Vextir sem reiknast þegar krafa er ekki greidd á gjalddaga." },
    { termino: "Meginvextir", definicion: "Vextir Seðlabankans á sjö daga bundnum innlánum." },
  ],
});
