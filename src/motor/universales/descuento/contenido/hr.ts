import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHr: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 80);
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x);
  const efectiva = Math.round((1 - 0.7 * 0.9) * 100);
  return {
    h1: "Kalkulator popusta",
    title: tituloQueEntre(`Kalkulator popusta: cijena s popustom (${ctx.nombrePais})`, "Kalkulator popusta: cijena s popustom", "Kalkulator popusta"),
    description: "Izračunajte cijenu s popustom i koliko štedite, pa i kada se popusti nadovezuju, na primjer 30 % pa još dodatnih 10 %.",
    intro: [
      "Unesite cijenu i popust i odmah vidite koliko plaćate i koliko štedite.",
      "Ako akcija nudi i dodatni popust, unesite i njega: dva popusta zaredom nikada se ne zbrajaju tek tako.",
    ],
    comoSeCalcula: [
      "Cijena s popustom = početna cijena × (1 − popust ÷ 100).",
      "Dodatni popust računa se od cijene koja je već snižena prvim popustom.",
      "Ušteda je početna cijena minus cijena s popustom.",
    ],
    ejemplo: [
      `Proizvod od ${m(precio)} s popustom od 25 % košta ${m(precio * 0.75)}.`,
      `S popustom od 30 % i još 10 % košta ${m(precio * 0.7 * 0.9)}: ukupan popust iznosi ${n(efectiva)} %, a ne 40 %.`,
    ],
    faq: [
      {
        pregunta: "Kako se računa popust?",
        respuesta: "Cijenu pomnožite postotkom popusta i podijelite sa sto. To je vaša ušteda. Oduzmite je od cijene i dobit ćete iznos za plaćanje.",
      },
      {
        pregunta: "Je li popust od 30 % plus 10 % isto što i 40 %?",
        respuesta: `Nije. Drugi popust računa se od već snižene cijene, pa ukupno iznosi ${n(efectiva)} %.`,
      },
      {
        pregunta: "Kako saznati početnu cijenu ako znam cijenu s popustom?",
        respuesta: `Cijenu s popustom podijelite izrazom (1 − popust ÷ 100). Za popust od 25 % dijelite s ${formatearNumero(ctx, 0.75, 2)}.`,
      },
    ],
    glosario: [
      { termino: "Popust", definicion: "Postotak za koji se smanjuje početna cijena." },
      { termino: "Efektivni popust", definicion: "Ukupan postotak uštede kada se primijeni više od jednog popusta." },
    ],
  };
};
