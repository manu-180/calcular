import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const precio3 = montoEjemplo(ctx, 6);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Kalkulačka trojčlenky",
    title: tituloQueEntre(`Trojčlenka: kalkulačka ${GRAMATICA.cs.para(ctx.nombrePais)}`, "Trojčlenka: výpočet online", "Kalkulačka trojčlenky"),
    description: "Vyřešte přímou i nepřímou úměrnost během vteřiny. Zadejte tři hodnoty a získáte čtvrtou i s postupem výpočtu.",
    intro: [
      "Trojčlenka funguje, když se dvě veličiny mění spolu a znáte tři ze čtyř hodnot.",
      "Zvolte přímou nebo nepřímou úměrnost, vyplňte A, B a C a kalkulačka vám dopočítá X.",
    ],
    comoSeCalcula: [
      "Přímá úměrnost: X = B × C ÷ A. Použijte ji, když obě veličiny rostou spolu (víc kilogramů, vyšší cena).",
      "Nepřímá úměrnost: X = A × B ÷ C. Použijte ji, když jedna roste a druhá klesá (víc lidí, méně dní).",
    ],
    ejemplo: [
      `Když 3 kilogramy stojí ${m(precio3)}, 5 kilogramů stojí ${m((precio3 * 5) / 3)}.`,
      "Když 4 lidé vymalují dům za 12 dní, 6 lidí ho vymaluje za 8 dní.",
    ],
    faq: [
      {
        pregunta: "Jak poznám, jestli jde o přímou, nebo nepřímou úměrnost?",
        respuesta: "Když jedna veličina roste spolu s druhou, jde o přímou úměrnost. Když jedna klesá, zatímco druhá roste, jde o nepřímou.",
      },
      {
        pregunta: "Jak spočítat přímou úměrnost ručně?",
        respuesta: `Vynásobte dvě známé hodnoty křížem a vydělte tou zbývající. Když 3 odpovídá 600, pak 5 odpovídá 600 × 5 ÷ 3 = ${formatearNumero(ctx, (600 * 5) / 3)}.`,
      },
      {
        pregunta: "Dá se trojčlenka použít i na procenta?",
        respuesta: "Ano. Když 200 je 100 %, pak 50 je 25 %: jde o přímou úměrnost s A = 200, B = 100 a C = 50.",
      },
    ],
    glosario: [
      { termino: "Přímá úměrnost", definicion: "Obě veličiny spolu rostou nebo klesají." },
      { termino: "Nepřímá úměrnost", definicion: "Jedna veličina roste, když druhá klesá." },
    ],
  };
};
