import { GRAMATICA } from "../../../i18n/gramatica";
import { formaLt } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const menesiai = (n: number) => `${formatearNumero(ctx, n)} ${formaLt(n, "mėnuo", "mėnesiai", "mėnesių")}`;
  const saldo = montoEjemplo(ctx, 2000);
  const fijo = montoEjemplo(ctx, 100);
  const conFijo = saldar(saldo, 22, { modo: "fijo", fijo, porcentaje: 0, piso: 0 }, r2);
  const conMinimo = saldar(saldo, 22, { modo: "minimo", fijo: 0, porcentaje: 3, piso: montoEjemplo(ctx, 25) }, r2);
  return {
    h1: "Kredito kortelės grąžinimo skaičiuoklė",
    title: tituloQueEntre(
      `Kredito kortelės skaičiuoklė ${GRAMATICA.lt.en(ctx.nombrePais)}`,
      "Kredito kortelės grąžinimas: palūkanos",
      "Kredito kortelės skaičiuoklė",
    ),
    description: "Sužinokite, kiek truks kredito kortelės grąžinimas ir kiek sumokėsite palūkanų, kai mokate fiksuotą arba minimalią įmoką.",
    intro: [
      "Kredito kortelė dažnai būna brangiausia skola. Kai mokate tik minimumą, grąžinimas užsitęsia metų metais, o palūkanos kaupiasi.",
      "Įveskite skolą, metinę palūkanų normą ir sumą, kurią galite mokėti kas mėnesį. Parodysime, kada skola bus grąžinta, kiek sumokėsite palūkanų, ir planą pagal mėnesius.",
    ],
    comoSeCalcula: [
      "Kas mėnesį priskaičiuojamos palūkanos: likutis × metinė norma ÷ 12.",
      "Tada atimama įmoka. Minimali įmoka yra skolos procentas, bet ne mažesnė už nustatytą sumą.",
      "Tai kartojama, kol likutis pasiekia nulį. Jei įmoka nėra didesnė už palūkanas, skola niekada nesumažės.",
    ],
    ejemplo: [
      `Kai skola yra ${m(saldo)}, metinė palūkanų norma 22 %, o įmoka ${m(fijo)} per mėnesį, grąžinimo trukmė yra ${menesiai(conFijo.meses)}, o palūkanų sumokėsite ${m(conFijo.intereses)}.`,
      `Kai mokate tik 3 % minimalią įmoką, trukmė yra ${menesiai(conMinimo.meses)}, o palūkanos išauga iki ${m(conMinimo.intereses)}.`,
    ],
    faq: [
      {
        pregunta: "Kas nutinka, kai mokama tik minimali įmoka?",
        respuesta:
          "Minimali įmoka mažėja kartu su skola, todėl kas mėnesį mokate mažiau, o skola tęsiasi metų metais. Jei galite, mokėkite didesnę fiksuotą sumą, net jei tik šiek tiek didesnę.",
      },
      {
        pregunta: "Ar verta kortelės skolą perkelti į vartojimo paskolą?",
        respuesta:
          "Paprastai taip, jei paskolos palūkanų norma gerokai mažesnė nei kortelės. Palyginkite bendrą abiejų variantų kainą su mokesčiais, geriausia pagal BVKKMN.",
      },
      {
        pregunta: "Kurią kortelę grąžinti pirmiausia?",
        respuesta: "Už visas mokėkite minimumą, o likusią sumą skirkite kortelei su didžiausia palūkanų norma. Taip palūkanų iš viso sumokėsite mažiausiai.",
      },
    ],
    glosario: [
      { termino: "Minimali įmoka", definicion: "Mažiausia suma, kurią galite sumokėti per mėnesį be sankcijų. Skolos ji nepanaikina." },
      { termino: "Metinė palūkanų norma", definicion: "Norma, kurią kortelė per metus taiko negrąžintam likučiui." },
      { termino: "Laikotarpis be palūkanų", definicion: "Laikas, kai už pirkinius palūkanų nemokate, jei visą skolą grąžinate laiku." },
    ],
  };
};
