import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x);
  const precio = montoEjemplo(ctx, 0.15);
  const kwhDia = (1000 * 4) / 1000;
  const kwhMes = kwhDia * 30;
  return {
    h1: "Reiknaðu rafmagnskostnað tækis",
    title: tituloQueEntre(
      `Rafmagnsnotkun: reiknaðu notkun og kostnað | ${ctx.nombrePais}`,
      `Rafmagnsnotkun | ${ctx.nombrePais}`,
      "Rafmagnsnotkun",
    ),
    description: "Reiknaðu hvað tæki notar mikið rafmagn og hvað það kostar á dag, mánuði og ári, út frá afli, notkunartíma og verði á kílóvattstund.",
    intro: [
      "Sláðu inn afl tækisins, hvað það er notað margar klukkustundir og rafmagnsverðið á kWh af reikningnum þínum. Þá sérðu notkunina og kostnaðinn.",
      "Þannig sérðu hvaða tæki vegur þyngst á rafmagnsreikningnum: varmadæla, rafmagnsofn, frystikista eða tölva.",
    ],
    comoSeCalcula: [
      `kWh á dag = vött × notkunarstundir ÷ ${n(1000)}.`,
      "kWh á mánuði = kWh á dag × fjöldi daga. Fyrir árið er mánuðurinn margfaldaður með 12.",
      "Kostnaður = kWh × rafmagnsverð á kWh.",
    ],
    ejemplo: [
      `Tæki sem er ${n(1000)} W og er notað í 4 klukkustundir á dag notar ${n(kwhDia)} kWh á dag og ${n(kwhMes)} kWh á mánuði.`,
      `Ef rafmagnsverðið er ${m(precio)} á kWh kostar það ${m(kwhMes * precio)} á mánuði.`,
    ],
    faq: [
      {
        pregunta: "Hvað er kWh?",
        respuesta: `Kílóvattstund er orkan sem ${n(1000)} W tæki notar á einni klukkustund. Það er einingin á rafmagnsreikningnum þínum.`,
      },
      {
        pregunta: "Gengur ísskápurinn á fullu afli allan sólarhringinn?",
        respuesta: "Nei. Pressan slær inn og út. Fyrir slík tæki er nær að reikna með 8 til 10 klukkustundum á dag en 24.",
      },
      {
        pregunta: "Af hverju stemmir þetta ekki alveg við rafmagnsreikninginn?",
        respuesta: "Á reikningnum bætast við föst gjöld, dreifing, skattar og stundum verð sem breytist eftir tíma. Hér sérðu aðeins hvað tækið notar.",
      },
    ],
    glosario: [
      { termino: "Vatt (W)", definicion: "Eining fyrir afl, það er hvað tæki notar mikla orku á hverri sekúndu." },
      { termino: "Kílóvattstund (kWh)", definicion: `${n(1000)} W í eina klukkustund. Það er það sem þú borgar fyrir á rafmagnsreikningnum.` },
    ],
  };
};
