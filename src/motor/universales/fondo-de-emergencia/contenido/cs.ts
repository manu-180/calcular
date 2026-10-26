import { GRAMATICA } from "../../../i18n/gramatica";
import { formaCs } from "../../../i18n/plural";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const gastos = montoEjemplo(ctx, 1500);
  const aporte = montoEjemplo(ctx, 300);
  const meses = Math.ceil((gastos * 6) / aporte);
  return {
    h1: "Kalkulačka finanční rezervy",
    title: tituloQueEntre(
      `Finanční rezerva: kalkulačka ${GRAMATICA.cs.para(ctx.nombrePais)}`,
      "Finanční rezerva: kalkulačka",
      "Kalkulačka finanční rezervy",
    ),
    description: "Spočítejte, jak velkou finanční rezervu potřebujete podle svých nezbytných výdajů a za kolik měsíců ji naspoříte.",
    intro: [
      "Finanční rezerva je polštář peněz na to, co se nedá naplánovat: ztrátu práce, zdravotní potíže nebo nečekanou opravu doma.",
      "Díky ní si nemusíte půjčovat ani žít na kreditní kartu právě ve chvíli, kdy je to nejtěžší. Zadejte nezbytné výdaje a počet měsíců, které chcete pokrýt.",
    ],
    comoSeCalcula: [
      "Doporučená rezerva = nezbytné měsíční výdaje × počet měsíců.",
      "Zbývá naspořit = doporučená rezerva − to, co už máte.",
      "Měsíců do cílové částky = zbývá naspořit ÷ částka, kterou měsíčně odkládáte, zaokrouhleno nahoru.",
    ],
    ejemplo: [
      `Pokud jsou vaše nezbytné výdaje ${m(gastos)} měsíčně, rezerva na 6 měsíců je ${m(gastos * 6)}.`,
      `Když budete každý měsíc odkládat ${m(aporte)}, naspoříte ji za ${meses} ${formaCs(meses, "měsíc", "měsíce", "měsíců")}.`,
    ],
    faq: [
      {
        pregunta: "Na kolik měsíců by měla finanční rezerva stačit?",
        respuesta:
          "Obvykle se doporučuje mít nezbytné výdaje na 3 až 6 měsíců. Pokud máte nepravidelný příjem, pracujete na sebe nebo má domácnost jen jeden příjem, počítejte spíš se 6 až 12 měsíci.",
      },
      {
        pregunta: "Kde finanční rezervu držet?",
        respuesta: "Na bezpečném místě, odkud peníze dostanete ještě týž den, odděleně od karty na běžné výdaje. Nejsou to peníze na riskantní investice: mají být po ruce, až je budete potřebovat.",
      },
      {
        pregunta: "Co dřív: rezerva, nebo splacení dluhů?",
        respuesta: "Častý postup je nejdřív odložit výdaje na jeden měsíc, potom splatit drahé dluhy, jako je kreditní karta, a nakonec rezervu doplnit na celou částku.",
      },
    ],
    glosario: [
      { termino: "Nezbytné výdaje", definicion: "Platby, které musíte platit, i když příjem přestane: bydlení, jídlo, energie, zdraví." },
      { termino: "Likvidita", definicion: "Jak rychle můžete peníze použít, aniž by ztratily hodnotu." },
    ],
  };
};
