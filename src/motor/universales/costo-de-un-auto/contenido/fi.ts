import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const g: GastosAuto = {
    precio: montoEjemplo(ctx, 25000),
    depreciacion: 15,
    seguro: montoEjemplo(ctx, 100),
    distancia: 1000,
    consumo: imperial ? 28 : 8,
    precioCombustible: montoEjemplo(ctx, imperial ? 3.5 : 1.2),
    mantenimiento: montoEjemplo(ctx, 60),
    estacionamiento: 0,
    otros: 0,
  };
  const mensual = costoMensual(g, imperial);
  const unidad = imperial ? "maili" : "kilometri";
  return {
    h1: "Auton kulut: paljonko auto maksaa kuukaudessa?",
    title: tituloQueEntre(
      `Auton kulut: paljonko auto maksaa kuukaudessa? | ${ctx.nombrePais}`,
      `Auton kulut kuukaudessa | ${ctx.nombrePais}`,
      `Auton kulut | ${ctx.nombrePais}`,
      "Auton kulut",
    ),
    description: `Laske, mitä auto todella maksaa kuukaudessa, vuodessa ja per ${unidad}: polttoaine, vakuutus, huolto, pysäköinti ja arvon alenema.`,
    intro: [
      "Useimmat tietävät, paljonko polttoaineeseen menee. Harvempi laskee mukaan vakuutuksen, huollon, pysäköinnin ja ennen kaikkea arvon, jonka auto menettää joka vuosi.",
      "Syötä omat kulusi, niin näet, mitä auto sinulle oikeasti maksaa. Se auttaa päättämään, ostatko, vaihdatko vai liikutko jollain muulla tavalla.",
    ],
    comoSeCalcula: [
      imperial
        ? "Polttoaine kuukaudessa = mailit kuukaudessa ÷ mailia gallonalla × gallonahinta."
        : "Polttoaine kuukaudessa = kilometrit kuukaudessa × litraa / 100 km ÷ 100 × litrahinta.",
      "Arvon alenema kuukaudessa = auton arvo × vuotuinen arvon alenema ÷ 12.",
      "Todelliset kulut = polttoaine + vakuutus + huolto + pysäköinti + muut kulut + arvon alenema.",
      `Kulut per ${unidad} = todelliset kulut kuukaudessa ÷ kuukaudessa ajettu matka.`,
    ],
    ejemplo: [
      `Auto, jonka arvo on ${m(g.precio)} ja jolla ajetaan ${formatearNumero(ctx, g.distancia)} ${imperial ? "mailia" : "km"} kuukaudessa, maksaa arvon alenema mukaan luettuna ${m(mensual)} kuukaudessa.`,
      `Se tekee ${m(mensual * 12)} vuodessa ja ${formatearMonto(ctx, mensual / g.distancia)} per ${unidad}.`,
    ],
    faq: [
      {
        pregunta: "Mitä auton arvon alenema tarkoittaa?",
        respuesta: "Se on arvo, jonka auto menettää ajan myötä. Et maksa sitä joka kuukausi, mutta huomaat sen, kun myyt auton. Uudessa autossa se on usein suurin yksittäinen kulu.",
      },
      {
        pregunta: "Miksi autolainan lyhennystä ei lasketa mukaan?",
        respuesta:
          "Osa lyhennyksestä maksaa itse autoa, ja se on jo mukana arvon alenemassa. Jos lasket molemmat, auto tulee laskettua kahteen kertaan. Lainan korko on lisäkulu tämän päälle.",
      },
      {
        pregunta: "Miten saan auton kulut pienemmiksi?",
        respuesta:
          "Kilpailuta vakuutus joka vuosi, pidä huolta rengaspaineista ja huolloista äläkä vaihda autoa liian usein. Auto menettää arvoaan eniten ensimmäisinä vuosina.",
      },
    ],
    glosario: [
      { termino: "Arvon alenema", definicion: "Arvo, jonka auto menettää ajan ja käytön myötä." },
      { termino: `Kulut per ${unidad}`, definicion: `Mitä yksi ${unidad} maksaa keskimäärin, kun kaikki kulut ovat mukana.` },
    ],
  };
};
