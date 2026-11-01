import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const precio = montoEjemplo(ctx, 3.5);
        const galones = 300 / 30;
        return [
          `Ferð fram og til baka, 150 mílur hvora leið, á bíl sem fer 30 mílur á gallon þarf ${formatearNumero(ctx, galones)} gallon.`,
          `Á ${m(precio)} fyrir gallonið kostar það ${m(galones * precio)}. Ef 2 skipta kostnaðinum borgar hvor ${m((galones * precio) / 2)}.`,
        ];
      })()
    : (() => {
        const precio = montoEjemplo(ctx, 1.2);
        const litros = (600 * 8) / 100;
        return [
          `Ferð fram og til baka, 300 km hvora leið, á bíl sem eyðir 8 lítrum á 100 km þarf ${formatearNumero(ctx, litros)} lítra.`,
          `Á ${m(precio)} fyrir lítrann kostar það ${m(litros * precio)}. Ef 2 skipta kostnaðinum borgar hvor ${m((litros * precio) / 2)}.`,
        ];
      })();
  return {
    h1: "Reiknaðu eldsneytiskostnað ferðarinnar",
    title: tituloQueEntre(
      `Eldsneytiskostnaður: hvað kostar ferðin í eldsneyti? | ${ctx.nombrePais}`,
      `Eldsneytiskostnaður | ${ctx.nombrePais}`,
      "Eldsneytiskostnaður",
    ),
    description: "Reiknaðu hvað ferð kostar í bensíni eða dísil út frá vegalengd, eyðslu bílsins og eldsneytisverði, og hvað hver og einn borgar.",
    intro: [
      `Sláðu inn vegalengdina, eyðslu bílsins og verðið á ${imperial ? "gallon" : "lítra"}. Þá sérðu hvað fer mikið eldsneyti í ferðina og hvað hún kostar.`,
      imperial
        ? "Eyðslan er gefin upp í mílum á gallon, eins og á merkimiða bílsins."
        : "Eyðslan getur verið gefin upp í lítrum á 100 km eða kílómetrum á lítra.",
    ],
    comoSeCalcula: imperial
      ? ["Gallon = vegalengd ÷ mílur á gallon.", "Kostnaður = gallon × verð á gallon. Fram og til baka tvöfaldar vegalengdina."]
      : [
          "Með lítrum á 100 km: lítrar = vegalengd × eyðsla ÷ 100.",
          "Með kílómetrum á lítra: lítrar = vegalengd ÷ eyðsla.",
          "Kostnaður = lítrar × verð á lítra. Fram og til baka tvöfaldar vegalengdina.",
        ],
    ejemplo,
    faq: [
      {
        pregunta: "Hvernig breyti ég kílómetrum á lítra í lítra á 100 km?",
        respuesta: `Deildu í 100 með kílómetrunum á lítra. Bíll sem fer ${formatearNumero(ctx, 12.5, 1)} km á lítra eyðir ${formatearNumero(ctx, 100 / 12.5)} lítrum á 100 km.`,
      },
      {
        pregunta: "Eru veggjöld og bílastæði með í þessu?",
        respuesta: "Nei. Útreikningurinn nær aðeins yfir eldsneytið. Bættu veggjöldum og bílastæðum við sérstaklega.",
      },
      {
        pregunta: "Af hverju eyðir bíllinn meira innanbæjar?",
        respuesta: "Að stöðva og taka af stað krefst meiri orku en að aka á jöfnum hraða á þjóðvegi, svo eyðslan innanbæjar er oftast meiri.",
      },
    ],
    glosario: [
      { termino: "Eldsneytiseyðsla", definicion: "Hvað bíllinn notar mikið eldsneyti á tiltekinni vegalengd." },
      { termino: "Lítrar á 100 km", definicion: "Algengasta leiðin til að gefa upp eyðslu: hvað bíllinn notar marga lítra á hverja 100 km." },
    ],
  };
};
