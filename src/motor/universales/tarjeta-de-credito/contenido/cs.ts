import { GRAMATICA } from "../../../i18n/gramatica";
import { formaCs } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const mesice = (n: number) => `${formatearNumero(ctx, n)} ${formaCs(n, "měsíc", "měsíce", "měsíců")}`;
  const saldo = montoEjemplo(ctx, 2000);
  const fijo = montoEjemplo(ctx, 100);
  const conFijo = saldar(saldo, 22, { modo: "fijo", fijo, porcentaje: 0, piso: 0 }, r2);
  const conMinimo = saldar(saldo, 22, { modo: "minimo", fijo: 0, porcentaje: 3, piso: montoEjemplo(ctx, 25) }, r2);
  return {
    h1: "Kalkulačka splácení kreditní karty",
    title: tituloQueEntre(
      `Splácení kreditní karty: kalkulačka ${GRAMATICA.cs.para(ctx.nombrePais)}`,
      "Splácení kreditní karty: kalkulačka úroků",
      "Kalkulačka splácení kreditní karty",
    ),
    description: "Zjistěte, za kolik měsíců splatíte kreditní kartu a kolik zaplatíte na úrocích, při pevné splátce i při minimální splátce.",
    intro: [
      "Kreditní karta bývá nejdražší dluh, jaký máte. Když splácíte jen minimum, splácení se táhne roky a úroky narůstají.",
      "Zadejte dluh, roční úrokovou sazbu a kolik můžete měsíčně splácet. Ukážeme, kdy budete mít splaceno, kolik zaplatíte na úrocích, a plán po měsících.",
    ],
    comoSeCalcula: [
      "Každý měsíc se připíše úrok: zůstatek × roční sazba ÷ 12.",
      "Pak se odečte splátka. U minimální splátky je to procento z dluhu, ale nejméně stanovená částka.",
      "To se opakuje, dokud zůstatek neklesne na nulu. Pokud splátka není vyšší než úrok, dluh nikdy neklesne.",
    ],
    ejemplo: [
      `Dluh ${m(saldo)} s úrokem 22 % ročně při splátce ${m(fijo)} měsíčně splatíte za ${mesice(conFijo.meses)} a na úrocích zaplatíte ${m(conFijo.intereses)}.`,
      `Když platíte jen minimální splátku 3 %, trvá splácení ${mesice(conMinimo.meses)} a úroky vzrostou na ${m(conMinimo.intereses)}.`,
    ],
    faq: [
      {
        pregunta: "Co se stane, když budu splácet jen minimum?",
        respuesta:
          "Minimální splátka se zmenšuje spolu s dluhem, takže každý měsíc platíte méně a dluh se táhne roky. Pokud můžete, splácejte vyšší pevnou částku, i když jen o trochu.",
      },
      {
        pregunta: "Vyplatí se převést dluh z karty na spotřebitelský úvěr?",
        respuesta:
          "Pokud je úroková sazba úvěru výrazně nižší než u karty, obvykle ano. Porovnejte celkové náklady obou možností včetně poplatků, nejlépe podle RPSN.",
      },
      {
        pregunta: "Kterou kartu splatit jako první?",
        respuesta: "Na všech plaťte minimum a zbytek dávejte na tu s nejvyšší úrokovou sazbou. Tak zaplatíte na úrocích celkově nejméně.",
      },
    ],
    glosario: [
      { termino: "Minimální splátka", definicion: "Nejmenší částka, kterou můžete za měsíc zaplatit bez sankce. Dluh tím nesplatíte." },
      { termino: "Roční úroková sazba", definicion: "Sazba, kterou karta ročně účtuje z nesplaceného zůstatku." },
      { termino: "Bezúročné období", definicion: "Doba, během které z nákupů neplatíte úrok, pokud dluh včas splatíte celý." },
    ],
  };
};
