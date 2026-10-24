import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const tasa = `{{${ctx.datos.tasa}}}`;
  const precio = formatearMonto(ctx, montoEjemplo(ctx, 100));
  const g = GRAMATICA.cs;
  return {
    h1: `Kalkulačka DPH ${g.para(ctx.nombrePais)}`,
    title: tituloQueEntre(`Kalkulačka DPH (${tasa}) ${g.para(ctx.nombrePais)}`, `Výpočet DPH (${tasa}) ${g.en(ctx.nombrePais)}`, `Kalkulačka DPH (${tasa})`),
    description: `Přičtěte nebo odečtěte DPH ${tasa} u libovolné ceny v jednom kroku: cena bez DPH, samotná daň a cena s DPH, přesně na haléře.`,
    intro: [
      `Základní sazba, se kterou kalkulačka ${g.en(ctx.nombrePais)} počítá, je ${tasa}.`,
      "Vyberte, jestli chcete DPH k ceně přičíst, nebo ji z ceny s DPH odečíst, a zadejte částku.",
    ],
    comoSeCalcula: [
      "Přičtení DPH: daň = cena bez DPH × sazba ÷ 100. Cena s DPH = cena bez DPH + daň.",
      "Odečtení DPH: cena bez DPH = cena s DPH ÷ (1 + sazba ÷ 100). Daň je rozdíl obou cen.",
      "Pokud zboží spadá do snížené sazby, zadejte ji do pole „Jiná sazba DPH“.",
    ],
    ejemplo: [
      `Chcete-li přičíst DPH k ceně ${precio}, vynásobte ji sazbou ${tasa} a výsledek k ceně přičtěte.`,
      `Kolik DPH je v ceně ${precio}, zjistíte tak, že ji vydělíte jedničkou plus sazbou a výsledek od ceny odečtete.`,
    ],
    faq: [
      {
        pregunta: "Jak odečíst DPH z ceny?",
        respuesta: "Vydělte cenu číslem 1 plus sazba jako desetinné číslo. Výsledek je cena bez DPH a rozdíl je samotná daň.",
      },
      {
        pregunta: "Proč nestačí od ceny s DPH odečíst procento sazby?",
        respuesta: "Protože daň se počítala z nižší ceny bez DPH. Když procento odečtete z ceny s DPH, odečtete víc, než kolik daň činí.",
      },
      {
        pregunta: `Platí se u všeho DPH ${tasa}?`,
        respuesta: "Ne vždy. Některé potraviny, léky nebo služby mají sníženou sazbu nebo jsou od daně osvobozené. V tom případě použijte pole „Jiná sazba DPH“.",
      },
    ],
    glosario: [
      { termino: "DPH", definicion: "Daň z přidané hodnoty. Připočítává se k ceně zboží a služeb a odvádí ji plátce DPH." },
      { termino: "Cena bez DPH", definicion: "Cena před připočtením daně, v účetnictví také základ daně." },
    ],
  };
};
