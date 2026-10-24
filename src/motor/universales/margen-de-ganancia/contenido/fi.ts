import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { precioConMargen } from "../definicion";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const costo = montoEjemplo(ctx, 60);
  const precio = montoEjemplo(ctx, 100);
  const kateLisaysta50 = ((costo * 1.5 - costo) / (costo * 1.5)) * 100;
  return {
    h1: "Katelaskuri: kate ja lisäys",
    title: tituloQueEntre(
      `Katelaskuri: laske kateprosentti ja lisäys | ${ctx.nombrePais}`,
      `Katelaskuri | ${ctx.nombrePais}`,
      "Katelaskuri",
    ),
    description: "Laske kate ja lisäys hankintahinnasta ja myyntihinnasta tai se myyntihinta, jolla pääset haluamaasi kateprosenttiin.",
    intro: [
      "Kate ja lisäys menevät usein sekaisin, ja ero voi tulla kalliiksi. Molemmat mittaavat samaa voittoa, mutta eri summaan suhteutettuna.",
      "Syötä hankintahinta ja myyntihinta, niin näet molemmat. Tai valitse kate, niin saat tietää, mitä tuotteesta kannattaa pyytää.",
    ],
    comoSeCalcula: [
      "Voitto = myyntihinta − hankintahinta.",
      "Kate = voitto ÷ myyntihinta × 100.",
      "Lisäys = voitto ÷ hankintahinta × 100.",
      "Myyntihinta tietylle katteelle = hankintahinta ÷ (1 − kate ÷ 100).",
    ],
    ejemplo: [
      `Tuote, jonka hankintahinta on ${m(costo)} ja myyntihinta ${m(precio)}, tuottaa ${m(precio - costo)} voittoa. Kate on ${p(((precio - costo) / precio) * 100)} ja lisäys ${p(((precio - costo) / costo) * 100)}.`,
      `Jotta saat tällä hankintahinnalla 50 %:n katteen, sinun pitää myydä hintaan ${m(precioConMargen(costo, 50))}. Jos lisäät hankintahintaan vain 50 %, kate on vain ${p(kateLisaysta50)}.`,
    ],
    faq: [
      {
        pregunta: "Mitä eroa on katteella ja lisäyksellä?",
        respuesta: "Kate on voitto suhteessa myyntihintaan. Lisäys on voitto suhteessa hankintahintaan. Samalla voitolla lisäysprosentti on aina suurempi luku.",
      },
      {
        pregunta: "Miten hinnoittelen tuotteen tietylle katteelle?",
        respuesta: `Jaa hankintahinta luvulla (1 − kate). Jos haluat 30 %:n katteen, jaa hankintahinta luvulla ${formatearNumero(ctx, 0.7, 2)}. Älä vain lisää hankintahintaan 30 %, koska silloin ansaitset vähemmän kuin luulet.`,
      },
      {
        pregunta: "Lasketaanko kate verollisista vai verottomista hinnoista?",
        respuesta: "Laske hankintahinta ja myyntihinta ilman arvonlisäveroa. Muuten kate näyttää suuremmalta kuin se on.",
      },
    ],
    glosario: [
      { termino: "Kate", definicion: "Voitto prosentteina myyntihinnasta. Kun kulut ovat muuttuvia, puhutaan myös myyntikatteesta." },
      { termino: "Lisäys", definicion: "Voitto prosentteina hankintahinnasta." },
    ],
  };
};
