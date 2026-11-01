import { GRAMATICA } from "../../../i18n/gramatica";
import { formaSl } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const enote = (n: number) => `${formatearNumero(ctx, n)} ${formaSl(n, "enoto", "enoti", "enote", "enot")}`;
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  return {
    h1: "Izračun praga rentabilnosti",
    title: tituloQueEntre(`Prag rentabilnosti: kalkulator ${GRAMATICA.sl.para(ctx.nombrePais)}`, "Prag rentabilnosti: spletni izračun", "Izračun praga rentabilnosti"),
    description: "Ugotovite, koliko enot morate prodati in kolikšne prihodke potrebujete vsak mesec, da pokrijete stroške in dosežete ciljni dobiček.",
    intro: [
      "Prag rentabilnosti je obseg prodaje, pri katerem podjetje niti ne zasluži niti ne izgublja. Pod njim poslujete z izgubo, nad njim začnete zaslužiti.",
      "Vnesite fiksne stroške, ceno in strošek ene enote. Pokazali vam bomo, koliko morate prodati, da pokrijete stroške in dosežete svoj cilj.",
    ],
    comoSeCalcula: [
      "Prispevek za kritje = cena − spremenljivi strošek na enoto.",
      "Prag rentabilnosti v enotah = fiksni stroški ÷ prispevek za kritje, zaokroženo navzgor.",
      "Prag rentabilnosti v prihodkih = fiksni stroški ÷ (prispevek za kritje ÷ cena).",
      "Za ciljni dobiček ga prištejte fiksnim stroškom in računajte na enak način.",
    ],
    ejemplo: [
      `Pri fiksnih stroških v višini ${m(fijos)}, ceni ${m(precio)} in spremenljivem strošku ${m(variable)} vam vsaka prodaja pusti ${m(precio - variable)}.`,
      `Za pokritje stroškov morate prodati ${enote(base.unidades)} (prihodki: ${m(base.facturacion)}), za dobiček v višini ${m(objetivo)} na mesec pa ${enote(meta.unidades)}.`,
    ],
    faq: [
      {
        pregunta: "Kaj so fiksni in kaj spremenljivi stroški?",
        respuesta:
          "Fiksni stroški ostanejo enaki tudi, ko ničesar ne prodate: najemnina, fiksne plače, režijski stroški. Spremenljivi stroški rastejo z vsako prodajo: blago, material, provizije, dostava.",
      },
      {
        pregunta: "Kako znižati prag rentabilnosti?",
        respuesta: "Imate tri vzvode: višjo ceno, nižji spremenljivi strošek na enoto ali nižje fiksne stroške. Največ običajno prinese cena.",
      },
      {
        pregunta: "Ali to velja tudi za storitve?",
        respuesta: "Da. Enota je lahko ura dela, svetovanje ali stranka na mesec. Kot spremenljivi strošek vnesite, koliko vas stane vsaka od njih.",
      },
    ],
    glosario: [
      { termino: "Prag rentabilnosti", definicion: "Obseg prodaje, pri katerem so prihodki enaki stroškom." },
      { termino: "Prispevek za kritje", definicion: "Koliko vsaka prodaja pusti za pokritje fiksnih stroškov." },
    ],
  };
};
