import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  // Známky jako ve škole: jednička 20 %, dvojka 30 %, trojka 50 %.
  const ponderado = (1 * 20 + 2 * 30 + 3 * 50) / (20 + 30 + 50);
  const simple = (1 + 2 + 3) / 3;
  return {
    h1: "Kalkulačka váženého průměru",
    title: tituloQueEntre(
      `Vážený průměr známek: kalkulačka ${GRAMATICA.cs.para(ctx.nombrePais)}`,
      "Vážený průměr známek: výpočet online",
      "Vážený průměr",
    ),
    description: "Spočítejte průměr známek, prostý i vážený, až z 10 hodnot a s váhou každé z nich: v procentech, kreditech nebo počtu opakování.",
    intro: [
      "Zadejte každou známku a to, jakou má váhu. Uvidíte vážený průměr a vedle něj prostý průměr.",
      "Hodí se pro známky na základní, střední i vysoké škole a pro jakýkoli průměr, kde některé hodnoty platí víc než jiné.",
    ],
    comoSeCalcula: [
      "Prostý průměr = součet hodnot ÷ počet hodnot.",
      "Vážený průměr = součet (hodnota × váha) ÷ součet vah.",
      "Váhy nemusí dávat dohromady 100: výpočet dělí jejich součtem.",
    ],
    ejemplo: [
      `Jednička s váhou 20 %, dvojka s váhou 30 % a trojka s váhou 50 % dávají vážený průměr ${n(ponderado)}.`,
      `Prostý průměr těchto tří známek je ${n(simple, 0)}: trojka má největší váhu, a proto vážený průměr zhoršuje.`,
    ],
    faq: [
      {
        pregunta: "Jak se počítá vážený průměr?",
        respuesta: "Každou hodnotu vynásobte její váhou, výsledky sečtěte a vydělte součtem vah.",
      },
      {
        pregunta: "Co když váhy nedávají dohromady 100 %?",
        respuesta: "To nevadí. Pokud má jeden předmět 6 kreditů a druhý 4, zadejte 6 a 4. Výpočet dělí celkovou váhou.",
      },
      {
        pregunta: "Jaký je rozdíl mezi prostým a váženým průměrem?",
        respuesta: "V prostém průměru má každá hodnota stejnou váhu. Ve váženém se každá hodnota započítává podle své váhy.",
      },
    ],
    glosario: [
      { termino: "Váha", definicion: "Jak velký vliv má hodnota na výsledný průměr." },
      { termino: "Vážený průměr", definicion: "Průměr, ve kterém se každá hodnota násobí svou váhou." },
    ],
  };
};
