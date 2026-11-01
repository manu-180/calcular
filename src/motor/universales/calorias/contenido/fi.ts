import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DEFICIT, FACTORES, mifflin, SUPERAVIT } from "../definicion";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const basal = mifflin("hombre", 35, 180 * 0.45359237, 70 * 2.54);
        return [
          `35-vuotiaan miehen, joka painaa 180 paunaa ja on 5 jalkaa 10 tuumaa pitkä, perusaineenvaihdunta on noin ${n(basal)} kcal.`,
          `Jos hän liikkuu vähän, paino pysyy ennallaan noin ${n(basal * FACTORES.sedentaria)} kcal:n vuorokausisaannilla.`,
        ];
      })()
    : (() => {
        const basal = mifflin("mujer", 30, 60, 165);
        return [
          `30-vuotiaan naisen, joka painaa 60 kiloa ja on 165 senttiä pitkä, perusaineenvaihdunta on noin ${n(basal)} kcal.`,
          `Kohtalaisesti liikkuvana hänen painonsa pysyy ennallaan noin ${n(basal * FACTORES.moderada)} kcal:n vuorokausisaannilla.`,
        ];
      })();
  return {
    h1: "Laske kalorintarpeesi",
    title: tituloQueEntre(
      `Kalorintarve: laske päivittäinen energiantarve | ${ctx.nombrePais}`,
      `Kalorintarve: laske kalorit päivässä | ${ctx.nombrePais}`,
      `Kalorintarve | ${ctx.nombrePais}`,
      "Kalorintarve",
    ),
    description: "Laske, paljonko energiaa kulutat vuorokaudessa iän, painon, pituuden ja liikunnan perusteella, ja paljonko kannattaa syödä painotavoitteesi mukaan.",
    intro: [
      "Syötä tietosi ja valitse, kuinka paljon liikut. Näet perusaineenvaihduntasi ja energiantarpeesi tavallisena päivänä.",
      "Tulos on suuntaa antava arvio. Se ei korvaa ravitsemusterapeutin, lääkärin tai terveydenhoitajan arviota.",
    ],
    comoSeCalcula: [
      `Perusaineenvaihdunta (Mifflin-St Jeor): 10 × paino kiloina + ${n(6.25, 2)} × pituus senttimetreinä − 5 × ikä. Miehillä lisätään 5, naisilla vähennetään 161.`,
      `Energiantarve = perusaineenvaihdunta × aktiivisuuskerroin. Kerroin on ${n(1.2, 1)}, jos liikut vähän, ja ${n(1.9, 1)}, jos liikut erittäin paljon.`,
      `Laihduttaessa vuorokauden tarpeesta vähennetään ${DEFICIT} kcal, ja painoa lisätessä siihen lisätään ${SUPERAVIT} kcal. Maltillinen muutos on helpompi pitää yllä.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Mitä perusaineenvaihdunta tarkoittaa?",
        respuesta: "Se on energia, jonka keho kuluttaa täydessä levossa hengittämiseen, lämmön ylläpitoon ja elinten toimintaan.",
      },
      {
        pregunta: "Montako kaloria pitää syödä laihtuakseen?",
        respuesta: `Tavallinen lähtökohta on noin ${DEFICIT} kcal vähemmän vuorokaudessa kuin energiantarpeesi. Sopiva määrä kannattaa sopia terveydenhuollon ammattilaisen kanssa.`,
      },
      {
        pregunta: "Kuinka tarkka kaava on?",
        respuesta: "Mifflin-St Jeor on yksi käytetyimmistä kaavoista, mutta se antaa keskiarvon. Perimä, lihasmassa ja terveydentila vaikuttavat siihen, paljonko todella kulutat.",
      },
    ],
    glosario: [
      { termino: "Kalori (kcal)", definicion: "Ruoan energiasisällön ja kehon energiankulutuksen yksikkö." },
      { termino: "Perusaineenvaihdunta", definicion: "Kalorit, jotka keho kuluttaa täydessä levossa." },
    ],
  };
};
