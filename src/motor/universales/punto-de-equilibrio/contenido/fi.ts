import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const kpl = (n: number) => `${formatearNumero(ctx, n)} ${n === 1 ? "kappale" : "kappaletta"}`;
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  return {
    h1: "Kannattavuusraja: laske kriittinen piste",
    title: tituloQueEntre(
      `Kannattavuusraja: laske kriittinen piste | ${ctx.nombrePais}`,
      `Kannattavuusraja | ${ctx.nombrePais}`,
      "Kannattavuusraja",
    ),
    description: "Laske, montako kappaletta sinun pitää myydä ja paljonko liikevaihtoa tarvitset kuukaudessa, jotta kulut katetaan ja pääset voittoon.",
    intro: [
      "Kannattavuusraja eli kriittinen piste on myynnin määrä, jolla toiminta ei tuota voittoa eikä tappiota. Sen alapuolella menetät rahaa, sen yläpuolella alat ansaita.",
      "Syötä kiinteät kulut, hinta ja yhden kappaleen muuttuvat kulut. Näet, paljonko sinun pitää myydä, jotta kulut katetaan ja tavoitteesi täyttyy.",
    ],
    comoSeCalcula: [
      "Katetuotto = hinta − muuttuvat kulut kappaleelta.",
      "Kappaleita kannattavuusrajaan = kiinteät kulut ÷ katetuotto, pyöristettynä ylöspäin.",
      "Liikevaihto kannattavuusrajalla = kiinteät kulut ÷ (katetuotto ÷ hinta).",
      "Tavoitevoittoa varten lisää voitto kiinteisiin kuluihin ja laske samalla tavalla.",
    ],
    ejemplo: [
      `Kun kiinteät kulut ovat ${m(fijos)}, hinta ${m(precio)} ja muuttuvat kulut ${m(variable)}, jokaisesta myynnistä jää ${m(precio - variable)}.`,
      `Sinun pitää myydä ${kpl(base.unidades)} (${m(base.facturacion)}), jotta kulut katetaan, ja ${kpl(meta.unidades)}, jotta ansaitset ${m(objetivo)} kuukaudessa.`,
    ],
    faq: [
      {
        pregunta: "Mitä ovat kiinteät ja muuttuvat kulut?",
        respuesta: "Kiinteät kulut pysyvät samoina, vaikka et myisi mitään: vuokra, kiinteät palkat, sähkö. Muuttuvat kulut kasvavat jokaisen myynnin myötä: ostot, materiaalit, provisiot ja rahti.",
      },
      {
        pregunta: "Miten saan kannattavuusrajan alemmaksi?",
        respuesta: "Keinoja on kolme: nosta hintaa, pienennä kappalekohtaisia muuttuvia kuluja tai karsi kiinteitä kuluja. Hinta vaikuttaa yleensä eniten.",
      },
      {
        pregunta: "Toimiiko laskelma palveluyritykselle?",
        respuesta: "Toimii. Kappale voi olla tunti, käyntikerta tai asiakas kuukaudessa. Käytä muuttuvana kuluna sitä, mitä yhden yksikön tuottaminen sinulle maksaa.",
      },
    ],
    glosario: [
      { termino: "Kannattavuusraja", definicion: "Myynnin taso, jolla tulot ovat yhtä suuret kuin kulut. Kutsutaan myös kriittiseksi pisteeksi." },
      { termino: "Katetuotto", definicion: "Mitä jokaisesta myynnistä jää kiinteiden kulujen maksamiseen." },
    ],
  };
};
