import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 50);
  const m = (n: number) => formatearMonto(ctx, n);
  const c = (n: number) => formatearCifra(ctx, n);
  return {
    h1: "Prósentureiknivél",
    title: tituloQueEntre(
      `Prósentureiknivél: reiknaðu prósentur á einfaldan hátt | ${ctx.nombrePais}`,
      `Prósentureiknivél | ${ctx.nombrePais}`,
      "Prósentureiknivél",
    ),
    description: "Reiknaðu hvað X prósent af tölu er, hve mörg prósent ein tala er af annarri og hvað gerist þegar þú bætir við eða dregur frá prósentu.",
    intro: [
      "Veldu hvað þú vilt vita, sláðu inn tölurnar tvær og fáðu svarið strax.",
      "Hér eru fjórir algengustu prósentureikningarnir í daglegu lífi: hluti, hlutfall, hækkun og lækkun.",
    ],
    comoSeCalcula: [
      "X% af Y = X × Y ÷ 100.",
      "Hve mörg prósent X er af Y = X ÷ Y × 100.",
      "Y plús X% = Y × (1 + X ÷ 100). Y mínus X% = Y × (1 − X ÷ 100).",
    ],
    ejemplo: [
      `15% af 200 er ${c((15 * 200) / 100)}.`,
      `30 er ${c((30 / 120) * 100)}% af 120.`,
      `Verð upp á ${m(precio)} sem hækkar um 10% verður ${m(precio * 1.1)}.`,
    ],
    faq: [
      {
        pregunta: "Hvernig reikna ég prósentu af tölu?",
        respuesta: `Margfaldaðu töluna með prósentunni og deildu með 100. 20% af 350 er 350 × 20 ÷ 100 = ${c((350 * 20) / 100)}.`,
      },
      {
        pregunta: "Hvernig reikna ég hve mörg prósent ein tala er af annarri?",
        respuesta: `Deildu hlutanum með heildinni og margfaldaðu með 100. Ef þú ert með 45 rétt af 60 er það 45 ÷ 60 × 100 = ${c((45 / 60) * 100)}%.`,
      },
      {
        pregunta: "Hvernig legg ég prósentu ofan á verð?",
        respuesta: `Margfaldaðu verðið með 1 plús prósentunni sem tugabroti. Til að leggja 10% ofan á margfaldarðu með ${formatearNumero(ctx, 1.1, 2)}.`,
      },
      {
        pregunta: "Kemst ég aftur í sömu tölu ef hún hækkar fyrst um 10% og lækkar svo um 10%?",
        respuesta: `Nei. 100 plús 10% er ${c(110)} og ${c(110)} mínus 10% er ${c(110 * 0.9)}. Lækkunin reiknast af hærri tölu.`,
      },
    ],
    glosario: [
      { termino: "Prósenta", definicion: "Hlutfall sett fram sem hundraðshlutar." },
      { termino: "Grunnur", definicion: "Talan sem prósentan reiknast af (Y í þessari reiknivél)." },
    ],
  };
};
