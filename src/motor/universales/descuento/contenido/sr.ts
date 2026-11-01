import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 80);
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x);
  const efectiva = Math.round((1 - 0.7 * 0.9) * 100);
  return {
    h1: "Kalkulator popusta",
    title: tituloQueEntre(`Kalkulator popusta: cena sa popustom (${ctx.nombrePais})`, "Kalkulator popusta: cena sa popustom", "Kalkulator popusta"),
    description: "Izračunajte cenu sa popustom i koliko štedite, i kada se popusti nadovezuju, na primer 30% pa još dodatnih 10%.",
    intro: [
      "Unesite cenu i popust i odmah vidite koliko plaćate i koliko štedite.",
      "Ako akcija nudi i dodatni popust, unesite i njega: dva popusta zaredom se nikada ne sabiraju prosto.",
    ],
    comoSeCalcula: [
      "Cena sa popustom = početna cena × (1 − popust ÷ 100).",
      "Dodatni popust se računa od cene koja je već snižena prvim popustom.",
      "Ušteda je početna cena minus cena sa popustom.",
    ],
    ejemplo: [
      `Proizvod od ${m(precio)} sa popustom od 25% košta ${m(precio * 0.75)}.`,
      `Sa popustom od 30% i još 10% košta ${m(precio * 0.7 * 0.9)}: ukupan popust je ${n(efectiva)}%, a ne 40%.`,
    ],
    faq: [
      {
        pregunta: "Kako se računa popust?",
        respuesta: "Cenu pomnožite procentom popusta i podelite sa 100. To je vaša ušteda. Oduzmite je od cene i dobijate iznos za plaćanje.",
      },
      {
        pregunta: "Da li je popust od 30% plus 10% isto što i 40%?",
        respuesta: `Nije. Drugi popust se računa od već snižene cene, pa ukupno iznosi ${n(efectiva)}%.`,
      },
      {
        pregunta: "Kako da saznam početnu cenu ako znam cenu sa popustom?",
        respuesta: `Cenu sa popustom podelite izrazom (1 − popust ÷ 100). Za popust od 25% delite sa ${formatearNumero(ctx, 0.75, 2)}.`,
      },
    ],
    glosario: [
      { termino: "Popust", definicion: "Procenat za koji se smanjuje početna cena." },
      { termino: "Efektivni popust", definicion: "Ukupan procenat uštede kada se primeni više od jednog popusta." },
    ],
  };
};
