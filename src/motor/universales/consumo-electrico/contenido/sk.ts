import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 0.15);
  const kwhMes = (1000 * 4 * 30) / 1000;
  return {
    h1: "Kalkulačka spotreby elektriny",
    title: tituloQueEntre(
      `Kalkulačka spotreby elektriny (${ctx.nombrePais})`,
      "Kalkulačka spotreby elektriny spotrebičov",
      "Spotreba elektriny",
    ),
    description: "Vypočítajte, koľko elektriny spotrebič spotrebuje a koľko to stojí za deň, mesiac aj rok, podľa príkonu, času prevádzky a ceny za kWh.",
    intro: [
      "Zadajte príkon spotrebiča, koľko hodín denne ho používate, a cenu za 1 kWh z vyúčtovania. Uvidíte spotrebu aj to, koľko vás stojí.",
      "Ľahko tak zistíte, ktorý spotrebič vám najviac zvyšuje účet za elektrinu: klimatizácia, elektrický ohrievač, chladnička alebo počítač.",
    ],
    comoSeCalcula: [
      "kWh za deň = watty × hodiny prevádzky ÷ 1000.",
      "kWh za mesiac = kWh za deň × dni prevádzky. Ročná spotreba je mesačná spotreba krát 12.",
      "Náklady = kWh × cena za 1 kWh.",
    ],
    ejemplo: [
      `Spotrebič s príkonom 1000 W, ktorý beží 4 hodiny denne, spotrebuje 4 kWh za deň a ${formatearNumero(ctx, kwhMes)} kWh za mesiac.`,
      `Pri cene ${m(precio)} za 1 kWh vychádzajú mesačné náklady na ${m(kwhMes * precio)}.`,
    ],
    faq: [
      {
        pregunta: "Čo je kWh?",
        respuesta: "Kilowatthodina: energia, ktorú spotrebič s príkonom 1000 W spotrebuje za hodinu prevádzky. V týchto jednotkách sa elektrina účtuje vo vyúčtovaní.",
      },
      {
        pregunta: "Beží chladnička celý deň na plný výkon?",
        respuesta: "Nie. Kompresor sa zapína a vypína. Pri takýchto spotrebičoch zadajte namiesto 24 hodín 8 až 10 hodín denne.",
      },
      {
        pregunta: "Prečo výpočet nesedí s vyúčtovaním?",
        respuesta: "Vo vyúčtovaní sú navyše stále platby, poplatky za distribúciu a dane, niekedy aj sadzby podľa odberu. Tento výpočet ukazuje len spotrebu samotného spotrebiča.",
      },
    ],
    glosario: [
      { termino: "Watt (W)", definicion: "Jednotka výkonu: koľko energie spotrebič odoberá každú sekundu." },
      { termino: "Kilowatthodina (kWh)", definicion: "1000 W počas jednej hodiny. Práve za túto jednotku platíte vo vyúčtovaní." },
    ],
  };
};
