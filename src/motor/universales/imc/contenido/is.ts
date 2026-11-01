import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { KG_POR_LB, M_POR_PULGADA } from "../definicion";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const m = 69 * M_POR_PULGADA;
  const ejemplo = imperial
    ? [
        `Manneskja sem er 160 lb og 5 fet og 9 tommur á hæð er með LÞS upp á ${n((160 * KG_POR_LB) / (m * m))}, sem telst kjörþyngd.`,
        `Við þessa hæð er kjörþyngd á bilinu ${n((18.5 * m * m) / KG_POR_LB)} til ${n((24.9 * m * m) / KG_POR_LB)} lb.`,
      ]
    : [
        `Manneskja sem er 70 kg og ${n(1.75, 2)} m á hæð er með LÞS upp á ${n(70 / (1.75 * 1.75))}, sem telst kjörþyngd.`,
        `Við þessa hæð er kjörþyngd á bilinu ${n(18.5 * 1.75 * 1.75)} til ${n(24.9 * 1.75 * 1.75)} kg.`,
      ];
  return {
    h1: "Reiknivél fyrir líkamsþyngdarstuðul",
    title: tituloQueEntre(
      `Líkamsþyngdarstuðull: reiknaðu LÞS | ${ctx.nombrePais}`,
      `Líkamsþyngdarstuðull | ${ctx.nombrePais}`,
      "Líkamsþyngdarstuðull",
    ),
    description: "Reiknaðu líkamsþyngdarstuðulinn út frá þyngd og hæð. Þú sérð flokkinn samkvæmt WHO og hvaða þyngdarbil telst kjörþyngd miðað við hæð þína.",
    intro: [
      "Sláðu inn þyngd og hæð. Þú sérð líkamsþyngdarstuðulinn (LÞS), flokkinn samkvæmt Alþjóðaheilbrigðismálastofnuninni (WHO) og kjörþyngdarbilið miðað við hæð þína.",
      "Niðurstaðan er almennt viðmið fyrir fullorðna. Hún kemur ekki í stað mats læknis eða annars heilbrigðisstarfsfólks.",
    ],
    comoSeCalcula: [
      imperial ? "LÞS = þyngd í pundum × 703 ÷ (hæð í tommum × hæð í tommum)." : "LÞS = þyngd í kílóum ÷ (hæð í metrum × hæð í metrum).",
      `Undir ${n(18.5)} er undirþyngd. ${n(18.5)} til ${n(24.9)} er kjörþyngd. 25 til ${n(29.9)} er ofþyngd. 30 og yfir telst offita.`,
      `Kjörþyngdarbilið er sú þyngd sem gefur LÞS á bilinu ${n(18.5)} til ${n(24.9)} miðað við hæð þína.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Hvað telst eðlilegur LÞS?",
        respuesta: `Samkvæmt WHO er það LÞS á bilinu ${n(18.5)} til ${n(24.9)} hjá fullorðnum. Mörkin eru þau sömu fyrir konur og karla.`,
      },
      {
        pregunta: "Á LÞS við um alla?",
        respuesta: "Nei. Hann gerir ekki greinarmun á vöðvum og fitu, svo sá sem er í mjög góðu formi getur fengið hátt gildi. Á meðgöngu og hjá börnum og unglingum eru notaðir aðrir mælikvarðar.",
      },
      {
        pregunta: "Hvernig reikna ég LÞS?",
        respuesta: imperial
          ? "Margfaldaðu þyngdina í pundum með 703 og deildu með hæðinni í tommum í öðru veldi. Við 5 fet og 9 tommur er það 69 × 69."
          : `Deildu þyngdinni í kílóum með hæðinni í metrum í öðru veldi. Ef þú ert ${n(1.75, 2)} m á hæð deilirðu með ${n(1.75 * 1.75, 4)}.`,
      },
    ],
    glosario: [
      { termino: "LÞS", definicion: "Líkamsþyngdarstuðull, mælikvarði á þyngd miðað við hæð." },
      { termino: "WHO", definicion: "Alþjóðaheilbrigðismálastofnunin, sem setur flokka LÞS fyrir fullorðna." },
    ],
  };
};
