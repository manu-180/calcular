import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cagr, roi } from "../definicion";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const inicial = montoEjemplo(ctx, 10000);
  const final = montoEjemplo(ctx, 15000);
  return {
    h1: "Tuottolaskuri: laske sijoituksen tuotto (ROI ja CAGR)",
    title: tituloQueEntre(
      `Tuottolaskuri: kokonaistuotto ja vuosituotto | ${ctx.nombrePais}`,
      `Tuottolaskuri | ${ctx.nombrePais}`,
      "Tuottolaskuri",
    ),
    description: "Laske sijoituksesi kokonaistuotto (ROI) ja vuosituotto (CAGR) sijoitetun summan, nykyarvon ja vuosien perusteella.",
    intro: [
      "50 %:n voitto kuulostaa hyvältä, mutta se ei tarkoita samaa kahdessa vuodessa kuin kymmenessä. Sijoitusten vertailuun tarvitset tuoton vuotta kohden.",
      "Syötä, paljonko sijoitit, paljonko sijoitus on nyt arvoinen ja montako vuotta on kulunut. Näet kokonaistuoton ja korkoa korolle lasketun vuosituoton.",
    ],
    comoSeCalcula: [
      "ROI = (loppuarvo + saadut tuotot − sijoitettu summa) ÷ sijoitettu summa × 100.",
      "CAGR = ((loppuarvo + saadut tuotot) ÷ sijoitettu summa) potenssiin (1 ÷ vuodet), miinus 1.",
      "CAGR on keskimääräinen vuotuinen kasvu korkoa korolle, eli tahti, joka antaa saman tuloksen, kun se toistuu joka vuosi.",
    ],
    ejemplo: [
      `Jos sijoitat ${m(inicial)} ja loppuarvo on ${m(final)}, voitto on ${m(final - inicial)}. ROI on silloin ${p(roi(inicial, final))}.`,
      `Jos siihen meni 5 vuotta, vuosituotto on ${p(cagr(inicial, final, 5))}. Jos siihen meni 2 vuotta, se on ${p(cagr(inicial, final, 2))}.`,
    ],
    faq: [
      {
        pregunta: "Mitä eroa on ROI:llä ja CAGR:llä?",
        respuesta: "ROI on koko voitto suhteessa sijoitettuun summaan riippumatta siitä, kauanko siihen meni. CAGR jakaa sen vuosille, joten voit verrata eripituisia sijoituksia keskenään.",
      },
      {
        pregunta: "Miksi vuosituotto ei ole kokonaistuotto jaettuna vuosilla?",
        respuesta: `Koska jokaisen vuoden voitto lisätään pääomaan ja kasvaa sekin. 50 %:n voitto viidessä vuodessa vastaa korkoa korolle laskettuna ${p(cagr(1, 1.5, 5))} vuodessa, ei ${formatearCifra(ctx, 50 / 5)} %:a.`,
      },
      {
        pregunta: "Miten otan mukaan saamani osingot tai korot?",
        respuesta: "Lisää ne kohtaan saadut tuotot, jos nostit rahat itsellesi. Jos sijoitit ne uudelleen, ne ovat jo mukana loppuarvossa.",
      },
    ],
    glosario: [
      { termino: "ROI", definicion: "Return on investment eli sijoitetun pääoman tuotto: koko voitto prosentteina sijoitetusta summasta." },
      { termino: "CAGR", definicion: "Compound annual growth rate eli keskimääräinen vuosituotto korkoa korolle laskettuna." },
    ],
  };
};
