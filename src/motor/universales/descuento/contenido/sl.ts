import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSl: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 80);
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x);
  const efectiva = Math.round((1 - 0.7 * 0.9) * 100);
  return {
    h1: "Izračun popusta",
    title: tituloQueEntre(`Izračun popusta: cena s popustom (${ctx.nombrePais})`, "Izračun popusta: cena s popustom", "Izračun popusta"),
    description: "Izračunajte ceno s popustom in koliko prihranite, tudi ko se popusti nalagajo, na primer 30 % in nato še dodatnih 10 %.",
    intro: [
      "Vnesite ceno in popust, pa takoj vidite, koliko plačate in koliko prihranite.",
      "Če akcija ponuja tudi dodatni popust, vnesite še tega: dva zaporedna popusta se nikoli ne seštejeta kar tako.",
    ],
    comoSeCalcula: [
      "Cena s popustom = začetna cena × (1 − popust ÷ 100).",
      "Dodatni popust se izračuna od cene, ki je že znižana s prvim popustom.",
      "Prihranek je začetna cena minus cena s popustom.",
    ],
    ejemplo: [
      `Izdelek za ${m(precio)} s popustom 25 % stane ${m(precio * 0.75)}.`,
      `S popustom 30 % in še 10 % stane ${m(precio * 0.7 * 0.9)}: skupni popust znaša ${n(efectiva)} %, ne 40 %.`,
    ],
    faq: [
      {
        pregunta: "Kako se izračuna popust?",
        respuesta: "Ceno pomnožite z odstotkom popusta in delite s sto. To je vaš prihranek. Odštejte ga od cene in dobili boste znesek za plačilo.",
      },
      {
        pregunta: "Ali je popust 30 % in še 10 % enako kot 40 %?",
        respuesta: `Ne. Drugi popust se izračuna od že znižane cene, zato skupaj znaša ${n(efectiva)} %.`,
      },
      {
        pregunta: "Kako izvedeti začetno ceno, če poznam ceno s popustom?",
        respuesta: `Ceno s popustom delite z izrazom (1 − popust ÷ 100). Pri popustu 25 % delite z ${formatearNumero(ctx, 0.75, 2)}.`,
      },
    ],
    glosario: [
      { termino: "Popust", definicion: "Odstotek, za katerega se zniža začetna cena." },
      { termino: "Efektivni popust", definicion: "Skupni odstotek prihranka, kadar se uveljavi več kot en popust." },
    ],
  };
};
