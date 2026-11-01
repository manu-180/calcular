import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const mensual = montoEjemplo(ctx, 4000);
  const hora = montoEjemplo(ctx, 20);
  const anual = mensual * 12;
  return {
    h1: "Kalkulator page për orë",
    title: tituloQueEntre(`Kalkulator page për orë: ${ctx.nombrePais}`, "Kalkulator page për orë", "Paga për orë"),
    description: "Ktheni pagën midis orës, ditës, javës, gjysmë muajit, muajit dhe vitit, me orët dhe javët e paguara reale.",
    intro: [
      "Sa është paga juaj për orë? Sa bën në vit një ofertë e paguar me orë? Vendosni një shumë, zgjidhni periudhën dhe ju tregojmë të gjitha të tjerat.",
      "Ju ndihmon të krahasoni oferta pune, të llogaritni orët shtesë ose të shikoni sa vlen koha juaj.",
    ],
    comoSeCalcula: [
      "Fillimisht gjithçka kthehet në një shumë vjetore.",
      "Në orë = vjetore ÷ (orë në javë × javë të paguara).",
      "Në ditë = vjetore ÷ (ditë në javë × javë të paguara). Në javë = vjetore ÷ javë të paguara.",
      "Në muaj = vjetore ÷ 12. Për gjysmë muaji = vjetore ÷ 24.",
    ],
    ejemplo: [
      `Një pagë prej ${m(mensual)} në muaj, me 40 orë në javë, do të thotë ${m(anual)} në vit dhe ${m(anual / 2080)} në orë.`,
      `Një ofertë prej ${m(hora)} në orë, me kohë të plotë, arrin në ${m(hora * 2080)} në vit.`,
    ],
    faq: [
      {
        pregunta: "Sa orë pune ka një vit?",
        respuesta: `Me 40 orë në javë dhe 52 javë të paguara, ${formatearNumero(ctx, 2080)} orë. Prandaj një rregull i shpejtë është të shumëzoni tarifën për orë me rreth ${formatearNumero(ctx, 2000)}.`,
      },
      {
        pregunta: "Pse paga javore e shumëzuar me 4 nuk jep pagën mujore?",
        respuesta: `Sepse një muaj ka mesatarisht ${formatearNumero(ctx, 52 / 12, 2)} javë, jo 4. Për të kaluar nga java te muaji, shumëzoni me 52 dhe pjesëtoni me 12.`,
      },
      {
        pregunta: "A përfshin bonuse ose tatime?",
        respuesta: "Jo. E kthen të njëjtën shifër midis periudhave. Nëse merrni bonuse, shtojini veçmas kur krahasoni ofertat.",
      },
    ],
    glosario: [
      { termino: "Paga bruto", definicion: "Paga para tatimeve dhe kontributeve." },
      { termino: "Kohë e plotë", definicion: "Orari i plotë i punës, zakonisht 40 orë në javë." },
    ],
  };
};
