import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const a = montoEjemplo(ctx, 90);
  const b = montoEjemplo(ctx, 30);
  const cuota = (a + b) / 3;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Kulujen jakaminen",
    title: tituloQueEntre(
      `Kulujen jakaminen: kuka on velkaa kenelle | ${ctx.nombrePais}`,
      `Kulujen jakaminen | ${ctx.nombrePais}`,
      "Kulujen jakaminen",
    ),
    description: "Jaa yhteiset kulut enintään 8 henkilön kesken. Näet jokaisen osuuden ja sen, kuka maksaa kenelle, mahdollisimman harvoilla maksuilla.",
    intro: [
      "Käytä laskuria matkalla, illallisella, juhlissa tai yhteisellä mökkireissulla, kun kaikki ovat maksaneet eri summia.",
      "Syötä, paljonko kukin on maksanut. Saat jokaisen osuuden ja maksut, joilla kaikki pääsevät tasoihin.",
    ],
    comoSeCalcula: [
      "Osuus = kulut yhteensä ÷ henkilöiden määrä.",
      "Se, joka on maksanut osuuttaan vähemmän, on velkaa erotuksen. Se, joka on maksanut enemmän, saa rahaa takaisin.",
      "Maksut kulkevat suurimmasta velasta suurimpaan saatavaan, joten turhia siirtoja ei tarvita.",
    ],
    ejemplo: [
      `Anna maksoi ${m(a)}, Mikko maksoi ${m(b)} ja Sara ei maksanut mitään. Kulut ovat yhteensä ${m(a + b)}, joten jokaisen osuus on ${m(cuota)}.`,
      `Sara maksaa Annalle ${m(cuota)} ja Mikko maksaa Annalle ${m(cuota - b)}.`,
    ],
    faq: [
      {
        pregunta: "Miten jaan laskun, kun kaikki ovat maksaneet eri summia?",
        respuesta: "Laske kaikki kulut yhteen, jaa henkilöiden määrällä ja vertaa tulosta siihen, mitä kukin on maksanut. Erotus kertoo, paljonko henkilö on velkaa tai saa takaisin.",
      },
      {
        pregunta: "Entä jos joku ei ole maksanut mitään?",
        respuesta: "Syötä hänelle 0, niin hänet lasketaan mukaan jakoon. Jos jätät kentän tyhjäksi, häntä ei lasketa mukaan.",
      },
      {
        pregunta: "Miksi maksuja on vähemmän kuin henkilöitä?",
        respuesta: "Velat yhdistetään. Eniten velkaa oleva maksaa sille, joka on maksanut eniten, ja niin edelleen. Maksuja ei koskaan tarvita enempää kuin henkilöiden määrä miinus yksi.",
      },
    ],
    glosario: [
      { termino: "Osuus", definicion: "Summa, jonka kukin maksaa yhteisistä kuluista." },
      { termino: "Saldo", definicion: "Erotus sen välillä, mitä henkilö on maksanut, ja hänen osuutensa." },
    ],
  };
};
