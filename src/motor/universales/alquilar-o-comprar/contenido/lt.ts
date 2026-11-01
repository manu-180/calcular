import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { comparar } from "../definicion";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const alquiler = montoEjemplo(ctx, 1000);
  const base = { precio, entrada: 20, gastosCompra: 4, tasa: 7, aniosHipoteca: 25, alquiler, aumentoAlquiler: 3, gastosPropietario: 1.5, revalorizacion: 3, rendimiento: 5 };
  const a10 = comparar({ ...base, horizonte: 10 }).anios[9];
  const a3 = comparar({ ...base, horizonte: 3 }).anios[2];
  const quien = (a: { comprar: number; alquilar: number }) => (a.comprar >= a.alquilar ? "pirkimas" : "nuoma");
  return {
    h1: "Nuoma ar būsto pirkimas: skaičiuoklė",
    title: tituloQueEntre(`Nuoma ar būsto pirkimas: skaičiuoklė (${ctx.nombrePais})`, "Nuoma ar būsto pirkimas: skaičiuoklė", "Nuoma ar pirkimas"),
    description: "Palyginkite nuomą ir būsto pirkimą su būsto paskola per pasirinktą laikotarpį. Sužinokite, kas naudingiau, nuo kurių metų ir kiek.",
    intro: [
      "Palyginti paskolos įmokos su nuoma nepakanka. Savininkas moka palūkanas, priežiūrą ir nekilnojamojo turto mokestį, bet pabaigoje turi būstą. Nuomininkas gali pradinį įnašą toliau laikyti investuotą.",
      "Skaičiuoklė visa tai apskaičiuoja kiekvieniems metams ir parodo, kuris variantas jums paliks didesnį turtą.",
    ],
    comoSeCalcula: [
      "Pirkimas: kas mėnesį mokate paskolos įmoką ir savininko išlaidas. Jūsų turtas yra būsto vertė atėmus paskolos likutį.",
      "Nuoma: pradinis įnašas ir pirkimo išlaidos lieka investuoti ir uždirba alternatyvią grąžą, o nuoma kasmet brangsta.",
      "Kas mėnesį pigesnis variantas investuoja skirtumą, todėl abu remiasi tuo pačiu biudžetu.",
      "Naudingesnis tas variantas, kuriam pabaigoje turtas yra didesnis.",
    ],
    ejemplo: [
      `Būstas kainuoja ${m(precio)}, pradinis įnašas yra 20 %, paskolos palūkanų norma 7 %, terminas 25 metai, o panašaus būsto nuoma kainuoja ${m(alquiler)} per mėnesį.`,
      `Po 10 metų naudingesnis variantas yra ${quien(a10)}, skirtumas ${m(Math.abs(a10.comprar - a10.alquilar))}. Po 3 metų naudingesnis variantas yra ${quien(a3)}, skirtumas ${m(Math.abs(a3.comprar - a3.alquilar))}.`,
    ],
    faq: [
      {
        pregunta: "Ar nuoma yra išmesti pinigai?",
        respuesta:
          "Ne visai. Savininkas taip pat moka tai, kas niekada negrįžta: palūkanas, nekilnojamojo turto mokestį ir priežiūrą. Svarbu, kiek turėsite pabaigoje kiekvienu atveju.",
      },
      {
        pregunta: "Kodėl rezultatas priklauso nuo metų skaičiaus?",
        respuesta:
          "Pirkimo pradžios išlaidos yra didelės (mokesčiai ir pirmųjų metų palūkanos) ir iš karto neatsiperka. Jei netrukus ketinate persikelti, nuoma paprastai būna naudingesnė.",
      },
      {
        pregunta: "Kas labiausiai veikia rezultatą?",
        respuesta:
          "Būsto kainos ir nuomos santykis, paskolos palūkanų norma ir tai, kaip greitai brangsta būstas. Pakeiskite kainų augimą ir investicijų grąžą, ir pamatysite, kaip keičiasi atsakymas.",
      },
    ],
    glosario: [
      { termino: "Turtas", definicion: "Tai, kas jums priklauso, atėmus tai, ką esate skolingi." },
      { termino: "Būsto kainos augimas", definicion: "Kiek būstas kasmet pabrangsta." },
      { termino: "Alternatyviosios išlaidos", definicion: "Kiek pradinis įnašas uždirbtų, jei jį investuotumėte." },
    ],
  };
};
