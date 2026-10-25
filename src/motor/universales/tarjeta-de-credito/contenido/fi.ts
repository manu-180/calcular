import { formatearCifra, formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const saldo = montoEjemplo(ctx, 2000);
  const fijo = montoEjemplo(ctx, 100);
  const conFijo = saldar(saldo, 22, { modo: "fijo", fijo, porcentaje: 0, piso: 0 }, r2);
  const conMinimo = saldar(saldo, 22, { modo: "minimo", fijo: 0, porcentaje: 3, piso: montoEjemplo(ctx, 25) }, r2);
  return {
    h1: "Maksa luottokorttivelka pois",
    title: tituloQueEntre(
      `Luottokorttivelka: laske maksuaika ja korot | ${ctx.nombrePais}`,
      `Luottokorttivelka | ${ctx.nombrePais}`,
      "Luottokorttivelka",
    ),
    description: "Laske, montako kuukautta luottokorttivelan maksaminen kestää ja paljonko maksat korkoja, kun maksat kiinteän summan tai vähimmäismaksun.",
    intro: [
      "Luottokorttivelka on yleensä kallein velkasi. Jos maksat vain vähimmäismaksun, maksaminen venyy vuosiksi ja korot kasvavat.",
      "Syötä velka, vuosikorko ja se, paljonko pystyt maksamaan kuukaudessa. Näet, milloin velka on maksettu, paljonko maksat korkoja ja suunnitelman kuukausi kuukaudelta.",
    ],
    comoSeCalcula: [
      "Joka kuukausi velkaan lisätään korko: velka × vuosikorko ÷ 12.",
      "Sen jälkeen maksu vähennetään. Vähimmäismaksussa maksu on prosentti velasta, mutta aina vähintään tietty summa.",
      "Tätä toistetaan, kunnes velka on nolla. Jos maksu ei ole korkoa suurempi, velka ei koskaan pienene.",
    ],
    ejemplo: [
      `Velka on ${m(saldo)} ja vuosikorko 22 %. Kun maksat ${m(fijo)} kuukaudessa, velka on maksettu ${formatearCifra(ctx, conFijo.meses, 0)} kuukaudessa ja korkoja kertyy ${m(conFijo.intereses)}.`,
      `Jos maksat vain 3 prosentin vähimmäismaksun, maksamiseen menee ${formatearCifra(ctx, conMinimo.meses, 0)} kuukautta ja korkoja kertyy ${m(conMinimo.intereses)}.`,
    ],
    faq: [
      {
        pregunta: "Mitä tapahtuu, jos maksan vain vähimmäismaksun?",
        respuesta:
          "Vähimmäismaksu pienenee velan pienentyessä, joten maksat joka kuukausi vähemmän ja velka roikkuu mukana vuosia. Maksa mieluummin suurempi kiinteä summa, jos voit, vaikka vain vähän enemmän.",
      },
      {
        pregunta: "Kannattaako velka siirtää kulutusluottoon?",
        respuesta: "Jos lainan korko on selvästi kortin korkoa pienempi, se kannattaa yleensä. Vertaa kummankin vaihtoehdon korkoja yhteensä kulut mukaan lukien.",
      },
      {
        pregunta: "Minkä kortin velka kannattaa maksaa ensin?",
        respuesta: "Maksa kaikista korteista vähimmäismaksu ja loput sille kortille, jonka korko on suurin. Silloin maksat korkoja yhteensä vähiten.",
      },
    ],
    glosario: [
      { termino: "Vähimmäismaksu", definicion: "Pienin summa, jonka voit maksaa kuukaudessa ilman viivästyskulua. Se ei juuri lyhennä velkaa." },
      { termino: "Nimellinen vuosikorko", definicion: "Vuosikorko, jonka kortti perii jäljellä olevasta velasta." },
    ],
  };
};
