import { pluralSl } from "../../../i18n/plural";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ploscica = (k: number) => pluralSl(k, "ploščico", "ploščici", "ploščice", "ploščic");
  const skatla = (k: number) => pluralSl(k, "škatlo", "škatli", "škatle", "škatel");
  const ejemplo = imperial
    ? (() => {
        const piezas = Math.ceil((150 * 1.1) / 1 - 1e-9);
        return [
          `Za površino 150 ft² s ploščicami 12 × 12 in (vsaka meri 1 ft²) in rezervo 10 % boste potrebovali ${ploscica(piezas)}.`,
          `Če je v škatli 10 ploščic, kupite ${skatla(Math.ceil(piezas / 10))}.`,
        ];
      })()
    : (() => {
        const pieza = 0.6 * 0.6;
        const piezas = Math.ceil((20 * 1.1) / pieza - 1e-9);
        return [
          `Za površino 20 m² s ploščicami 60 × 60 cm (vsaka meri ${n(pieza)} m²) in rezervo 10 % boste potrebovali ${ploscica(piezas)}.`,
          `Če so v škatli 4 ploščice, kupite ${skatla(Math.ceil(piezas / 4))}.`,
        ];
      })();
  return {
    h1: "Izračun keramičnih ploščic",
    title: tituloQueEntre(
      `Izračun keramičnih ploščic za tla in stene (${ctx.nombrePais})`,
      "Izračun keramičnih ploščic: koliko škatel kupiti",
      "Izračun keramičnih ploščic",
    ),
    description:
      "Izračunajte, koliko keramičnih ploščic potrebujete za tla ali steno, z rezervo za razrez, in koliko škatel morate kupiti.",
    intro: [
      "Vnesite površino, mere ene ploščice in število ploščic v škatli. Videli boste, koliko ploščic in škatel morate kupiti.",
      "Rezerva za razrez pokrije rezanje ob robovih in kose, ki med delom počijo.",
    ],
    comoSeCalcula: [
      `Površina ene ploščice = dolžina × širina, v ${imperial ? "kvadratnih čevljih" : "kvadratnih metrih"}.`,
      "Število ploščic = površina × (1 + rezerva ÷ 100) ÷ površina ene ploščice, zaokroženo navzgor.",
      "Škatle = število ploščic ÷ ploščice v škatli, zaokroženo navzgor.",
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Kolikšno rezervo za razrez upoštevati?",
        respuesta: "Pri ravnem polaganju 10 %. Pri diagonalnem polaganju, polaganju v ribjo kost ali v prostorih z veliko razreza 15 do 20 %.",
      },
      {
        pregunta: "Ali je treba upoštevati fuge?",
        respuesta: "Ne. Fuge merijo le nekaj milimetrov in to razliko pokrije rezerva za razrez.",
      },
      {
        pregunta: "Se splača kupiti malo več?",
        respuesta: "Da, shranite nekaj ploščic iz iste serije. Če kakšna pozneje poči, je enak odtenek morda težko najti.",
      },
    ],
    glosario: [
      { termino: "Rezerva za razrez", definicion: "Odstotek ploščic, ki jih kupite več zaradi rezanja in polomljenih kosov." },
      { termino: "Serija", definicion: "Ploščice iz iste proizvodnje. Odtenek ploščic iz različnih serij se lahko nekoliko razlikuje." },
    ],
  };
};
