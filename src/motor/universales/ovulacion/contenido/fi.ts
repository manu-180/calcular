import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { FASE_LUTEA, ventana } from "../definicion";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-03-05";
  const v = ventana(aDia(fum), 28);
  return {
    h1: "Ovulaatiolaskuri",
    title: tituloQueEntre(
      `Ovulaatiolaskuri: hedelmälliset päiväsi | ${ctx.nombrePais}`,
      `Ovulaatiolaskuri | ${ctx.nombrePais}`,
      "Ovulaatiolaskuri",
    ),
    description: "Laske, milloin ovulaatiosi on, mitkä ovat hedelmälliset päiväsi ja milloin seuraavat kuukautiset alkavat. Näet myös kolme tulevaa kiertoa.",
    intro: [
      "Syötä viimeisten kuukautisten ensimmäinen päivä ja kiertosi pituus. Näet arvioidun ovulaation, hedelmälliset päiväsi ja seuraavat kuukautiset.",
      "Tulos on arvio säännölliselle kierrolle. Se ei ole ehkäisymenetelmä eikä korvaa kätilön, terveydenhoitajan tai lääkärin arviota.",
    ],
    comoSeCalcula: [
      `Ovulaatio tapahtuu yleensä ${FASE_LUTEA} päivää ennen seuraavia kuukautisia: viimeisten kuukautisten ensimmäinen päivä + kierron pituus − ${FASE_LUTEA}.`,
      "Hedelmälliset päivät alkavat 5 päivää ennen ovulaatiota ja päättyvät ovulaatiota seuraavana päivänä, koska siittiöt voivat elää jopa 5 päivää.",
      "Seuraavat kuukautiset odotetaan yhden kierron päähän edellisistä.",
    ],
    ejemplo: [
      `Kun viimeiset kuukautiset alkoivat ${f(fum)} ja kierto on 28 päivää, arvioitu ovulaatio on ${f(aFecha(v.ovulacion))}.`,
      `Hedelmälliset päivät ovat ${f(aFecha(v.desde))} ja ${f(aFecha(v.hasta))} välillä, ja seuraavat kuukautiset alkavat arviolta ${f(aFecha(v.proxima))}.`,
    ],
    faq: [
      {
        pregunta: "Minä päivinä on hedelmällisin?",
        respuesta: "Kahtena tai kolmena päivänä ennen ovulaatiota ja itse ovulaatiopäivänä. Koko hedelmällinen jakso kestää noin 6 päivää.",
      },
      {
        pregunta: "Toimiiko laskuri, jos kiertoni on epäsäännöllinen?",
        respuesta: "Saat suuntaa antavan tuloksen, mutta se on epätarkempi. Epäsäännöllisessä kierrossa ovulaatio voi siirtyä useita päiviä kuukaudesta toiseen.",
      },
      {
        pregunta: "Voinko käyttää laskuria raskauden ehkäisyyn?",
        respuesta: "Et. Arvio on likimääräinen, ja ovulaatio voi tulla aiemmin tai myöhemmin. Raskauden ehkäisyyn tarvitset ehkäisymenetelmän.",
      },
    ],
    glosario: [
      { termino: "Ovulaatio", definicion: "Hetki, jolloin munasarja vapauttaa munasolun." },
      { termino: "Hedelmälliset päivät", definicion: "Kierron päivät, joina on mahdollista tulla raskaaksi." },
    ],
  };
};
