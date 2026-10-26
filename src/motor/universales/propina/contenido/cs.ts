import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const cuenta = montoEjemplo(ctx, 60);
  const propina = cuenta * 0.1;
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x);
  return {
    h1: "Kalkulačka spropitného",
    title: tituloQueEntre(
      `Kalkulačka spropitného ${GRAMATICA.cs.para(ctx.nombrePais)}`,
      "Kolik nechat spropitné: kalkulačka",
      "Kalkulačka spropitného",
    ),
    description: "Spočítejte spropitné, celkovou částku účtu a podíl každého, když platíte společně. Podíl lze zaokrouhlit nahoru na celou částku.",
    intro: [
      "Zadejte částku na účtu, procento spropitného a počet lidí, kteří platí. Uvidíte spropitné, celkovou částku a podíl každého.",
      "Pokud jsou vám milejší kulatá čísla, kalkulačka podíl každého zaokrouhlí nahoru a rozdíl připadne na spropitné.",
    ],
    comoSeCalcula: ["Spropitné = účet × procento spropitného ÷ 100.", "Celkem = účet + spropitné.", "Podíl každého je celková částka vydělená počtem lidí."],
    ejemplo: [
      `K účtu ${m(cuenta)} přidá spropitné 10 % částku ${m(propina)}, celkem tedy ${m(cuenta + propina)}.`,
      `Když platí tři lidé, každý zaplatí ${m((cuenta + propina) / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Kolik se dává spropitné?",
        respuesta: `Záleží na místních zvyklostech. Zjistěte, co je obvyklé ${GRAMATICA.cs.en(ctx.nombrePais)}, a podívejte se, jestli účet už neobsahuje poplatek za obsluhu.`,
      },
      {
        pregunta: "Počítá se spropitné z částky s daní, nebo bez ní?",
        respuesta: "Obvykle z celkové částky na účtu. Pokud ho chcete počítat z částky bez daně, zadejte tu.",
      },
      {
        pregunta: "Jak rychle spočítat 10 % nebo 15 % spropitného?",
        respuesta: `Účet vydělte deseti, tím máte 10 %. Pro 15 % k tomu přičtěte ještě polovinu. U účtu 850 je 10 % rovno ${n(850 * 0.1)} a 15 % je ${n(850 * 0.15)}.`,
      },
    ],
    glosario: [
      { termino: "Spropitné", definicion: "Částka navíc, kterou necháváte za obsluhu nad rámec ceny." },
      { termino: "Poplatek za obsluhu", definicion: "Částka, kterou podnik už připočítal k účtu za obsluhu." },
    ],
  };
};
