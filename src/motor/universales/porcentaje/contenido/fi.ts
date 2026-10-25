import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 50);
  const m = (n: number) => formatearMonto(ctx, n);
  const c = (n: number) => formatearCifra(ctx, n);
  return {
    h1: "Prosenttilaskuri",
    title: tituloQueEntre(
      `Prosenttilaskuri: laske prosentit helposti | ${ctx.nombrePais}`,
      `Prosenttilaskuri | ${ctx.nombrePais}`,
      "Prosenttilaskuri",
    ),
    description: "Laske, paljonko on X prosenttia luvusta, montako prosenttia luku on toisesta ja mitä tapahtuu, kun lisäät tai vähennät prosentteja.",
    intro: [
      "Valitse, mitä haluat tietää, syötä kaksi lukua ja saat vastauksen heti.",
      "Laskurissa ovat arjen neljä yleisintä prosenttilaskua: osuus, prosenttiosuus, korotus ja alennus.",
    ],
    comoSeCalcula: [
      "X % luvusta Y = X × Y ÷ 100.",
      "Montako prosenttia X on luvusta Y = X ÷ Y × 100.",
      "Y plus X % = Y × (1 + X ÷ 100). Y miinus X % = Y × (1 − X ÷ 100).",
    ],
    ejemplo: [
      `15 % luvusta 200 on ${c((15 * 200) / 100)}.`,
      `30 on ${c((30 / 120) * 100)} % luvusta 120.`,
      `Hinta ${m(precio)} on 10 prosentin korotuksen jälkeen ${m(precio * 1.1)}.`,
    ],
    faq: [
      {
        pregunta: "Miten lasken prosentin luvusta?",
        respuesta: `Kerro luku prosenttiluvulla ja jaa sadalla. 20 % luvusta 350 on 350 × 20 ÷ 100 = ${c((350 * 20) / 100)}.`,
      },
      {
        pregunta: "Miten lasken, montako prosenttia luku on toisesta?",
        respuesta: `Jaa osa kokonaisuudella ja kerro sadalla. Jos saat kokeesta 45 pistettä 60 mahdollisesta, se on 45 ÷ 60 × 100 = ${c((45 / 60) * 100)} %.`,
      },
      {
        pregunta: "Miten lisään prosentit hintaan?",
        respuesta: `Kerro hinta luvulla, joka on 1 plus prosentti desimaalilukuna. Kun lisäät 10 %, kerrot luvulla ${formatearNumero(ctx, 1.1, 2)}.`,
      },
      {
        pregunta: "Palaako luku ennalleen, jos se ensin kasvaa 10 % ja sitten pienenee 10 %?",
        respuesta: `Ei palaa. 100 plus 10 % on ${c(110)}, ja ${c(110)} miinus 10 % on ${c(110 * 0.9)}. Vähennys lasketaan suuremmasta luvusta.`,
      },
    ],
    glosario: [
      { termino: "Prosentti", definicion: "Sadasosa. Osuus, joka ilmaistaan sadasosina." },
      { termino: "Perusarvo", definicion: "Luku, josta prosentti lasketaan (tässä laskurissa Y)." },
    ],
  };
};
