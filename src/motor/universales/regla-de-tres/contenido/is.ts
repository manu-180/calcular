import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const precio3 = montoEjemplo(ctx, 6);
  const m = (n: number) => formatearMonto(ctx, n);
  const c = (n: number) => formatearCifra(ctx, n);
  return {
    h1: "Þríliða",
    title: tituloQueEntre(
      `Þríliða: reiknaðu hlutföll á augabragði | ${ctx.nombrePais}`,
      `Þríliða | ${ctx.nombrePais}`,
      "Þríliða",
    ),
    description: "Leystu beint eða öfugt hlutfall á nokkrum sekúndum. Sláðu inn þrjú gildi og fáðu það fjórða, ásamt útreikningnum.",
    intro: [
      "Þríliða virkar þegar tvær stærðir tengjast og þú þekkir þrjú af fjórum gildum.",
      "Veldu beint eða öfugt hlutfall, sláðu inn A, B og C og reiknivélin finnur X.",
    ],
    comoSeCalcula: [
      "Beint: X = B × C ÷ A. Notað þegar báðar stærðirnar vaxa saman (fleiri kíló, hærra verð).",
      "Öfugt: X = A × B ÷ C. Notað þegar önnur vex og hin minnkar (fleira fólk, færri dagar).",
    ],
    ejemplo: [
      `Ef 3 kíló kosta ${m(precio3)} kosta 5 kíló ${m((precio3 * 5) / 3)}.`,
      `Ef 4 manns mála hús á 12 dögum klára 6 manns það á ${c((4 * 12) / 6)} dögum.`,
    ],
    faq: [
      {
        pregunta: "Hvernig veit ég hvort hlutfallið er beint eða öfugt?",
        respuesta: "Ef önnur stærðin eykst þegar hin eykst er það beint. Ef önnur minnkar þegar hin eykst er það öfugt.",
      },
      {
        pregunta: "Hvernig reikna ég þríliðu í höndunum?",
        respuesta: `Margfaldaðu þekktu gildin tvö á ská og deildu með því sem eftir er. Ef 3 samsvara 600 samsvara 5 tölunni 600 × 5 ÷ 3 = ${formatearNumero(ctx, (600 * 5) / 3)}.`,
      },
      {
        pregunta: "Get ég notað þríliðu fyrir prósentur?",
        respuesta: `Já. Ef 200 eru 100% eru 50 jafnt og ${c((100 * 50) / 200)}%. Það er beint hlutfall með A = 200, B = 100 og C = 50.`,
      },
    ],
    glosario: [
      { termino: "Beint hlutfall", definicion: "Báðar stærðirnar aukast eða minnka saman." },
      { termino: "Öfugt hlutfall", definicion: "Önnur stærðin eykst þegar hin minnkar." },
    ],
  };
};
