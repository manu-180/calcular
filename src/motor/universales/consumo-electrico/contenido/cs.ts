import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 0.15);
  const kwhMes = (1000 * 4 * 30) / 1000;
  return {
    h1: "Kalkulačka spotřeby elektřiny",
    title: tituloQueEntre(
      `Kalkulačka spotřeby elektřiny (${ctx.nombrePais})`,
      "Kalkulačka spotřeby elektřiny spotřebičů",
      "Spotřeba elektřiny",
    ),
    description: "Spočítejte, kolik elektřiny spotřebič spotřebuje a kolik to stojí za den, měsíc i rok, podle příkonu, doby provozu a ceny za kWh.",
    intro: [
      "Zadejte příkon spotřebiče, kolik hodin denně ho používáte, a cenu za 1 kWh z vyúčtování. Uvidíte spotřebu i to, kolik vás stojí.",
      "Snadno tak zjistíte, který spotřebič vám nejvíc zvedá účet za elektřinu: klimatizace, přímotop, lednice nebo počítač.",
    ],
    comoSeCalcula: [
      "kWh za den = watty × hodiny provozu ÷ 1000.",
      "kWh za měsíc = kWh za den × dny provozu. Roční spotřeba je měsíční spotřeba krát 12.",
      "Náklady = kWh × cena za 1 kWh.",
    ],
    ejemplo: [
      `Spotřebič s příkonem 1000 W, který běží 4 hodiny denně, spotřebuje 4 kWh za den a ${formatearNumero(ctx, kwhMes)} kWh za měsíc.`,
      `Při ceně ${m(precio)} za 1 kWh vychází měsíční náklady na ${m(kwhMes * precio)}.`,
    ],
    faq: [
      {
        pregunta: "Co je kWh?",
        respuesta: "Kilowatthodina: energie, kterou spotřebič s příkonem 1000 W spotřebuje za hodinu provozu. V těchto jednotkách se elektřina účtuje ve vyúčtování.",
      },
      {
        pregunta: "Běží lednice celý den na plný výkon?",
        respuesta: "Ne. Kompresor se zapíná a vypíná. U takových spotřebičů zadejte místo 24 hodin 8 až 10 hodin denně.",
      },
      {
        pregunta: "Proč výpočet nesedí s vyúčtováním?",
        respuesta: "Ve vyúčtování jsou navíc stálé platby, poplatky za distribuci a daně, někdy i sazby podle odběru. Tento výpočet ukazuje jen spotřebu samotného spotřebiče.",
      },
    ],
    glosario: [
      { termino: "Watt (W)", definicion: "Jednotka výkonu: kolik energie spotřebič odebírá každou sekundu." },
      { termino: "Kilowatthodina (kWh)", definicion: "1000 W po dobu jedné hodiny. Právě za tuto jednotku platíte ve vyúčtování." },
    ],
  };
};
