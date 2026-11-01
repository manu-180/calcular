import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const a = montoEjemplo(ctx, 90);
  const b = montoEjemplo(ctx, 30);
  const cuota = (a + b) / 3;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Skipta kostnaði",
    title: tituloQueEntre(
      `Skipta kostnaði: hver skuldar hverjum? | ${ctx.nombrePais}`,
      `Skipta kostnaði | ${ctx.nombrePais}`,
      "Skipta kostnaði",
    ),
    description: "Skiptu sameiginlegum kostnaði á milli allt að 8 einstaklinga. Þú sérð hlut hvers og eins og hver á að borga hverjum, með sem fæstum greiðslum.",
    intro: [
      "Notaðu þetta fyrir ferðalag, kvöldverð, veislu eða sameiginlegan sumarbústað þar sem fólk hefur borgað mismikið.",
      "Sláðu inn hvað hver og einn hefur lagt út. Þú færð hlut hvers og eins og greiðslurnar sem gera alla kvitt.",
    ],
    comoSeCalcula: [
      "Hlutur = heildarkostnaður ÷ fjöldi einstaklinga.",
      "Sá sem hefur borgað minna en sinn hlut skuldar mismuninn. Sá sem hefur borgað meira fær endurgreitt.",
      "Greiðslurnar fara frá stærstu skuldinni til stærstu kröfunnar, svo enginn þarf að gera óþarfa millifærslur.",
    ],
    ejemplo: [
      `Anna borgaði ${m(a)}, Jón borgaði ${m(b)} og Sigga borgaði ekkert. Samtals eru það ${m(a + b)}, svo hlutur hvers og eins er ${m(cuota)}.`,
      `Sigga borgar Önnu ${m(cuota)} og Jón borgar Önnu ${m(cuota - b)}.`,
    ],
    faq: [
      {
        pregunta: "Hvernig skipti ég reikningnum þegar allir hafa borgað mismikið?",
        respuesta: "Leggðu allt saman, deildu með fjölda fólks og berðu saman við það sem hver og einn hefur borgað. Mismunurinn er það sem viðkomandi skuldar eða á að fá til baka.",
      },
      {
        pregunta: "Hvað geri ég ef einhver hefur ekkert borgað?",
        respuesta: "Sláðu inn 0 fyrir viðkomandi og þá er hann tekinn með í skiptingunni. Ef þú skilur reitinn eftir auðan er hann ekki talinn með.",
      },
      {
        pregunta: "Af hverju verða greiðslurnar færri en fólkið?",
        respuesta: "Skuldirnar eru jafnaðar saman. Sá sem skuldar mest borgar þeim sem hefur lagt mest út, og svo koll af kolli. Greiðslurnar verða aldrei fleiri en fjöldi fólks að einum frádregnum.",
      },
    ],
    glosario: [
      { termino: "Hlutur", definicion: "Það sem hver og einn á að borga af heildarkostnaðinum." },
      { termino: "Staða", definicion: "Mismunurinn á því sem einhver hefur borgað og hlut viðkomandi." },
    ],
  };
};
