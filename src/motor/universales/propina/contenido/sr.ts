import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const cuenta = montoEjemplo(ctx, 60);
  const propina = cuenta * 0.1;
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x);
  return {
    h1: "Kalkulator napojnice",
    title: tituloQueEntre(`Kalkulator napojnice ${GRAMATICA.sr.para(ctx.nombrePais)}`, "Koliko ostaviti napojnicu: kalkulator", "Kalkulator napojnice"),
    description: "Izračunajte napojnicu, ukupan iznos računa i koliko plaća svaka osoba kada se račun deli. Deo svake osobe može da se zaokruži naviše.",
    intro: [
      "Unesite iznos računa, procenat napojnice i broj osoba koje plaćaju. Dobijate napojnicu, ukupan iznos i deo svake osobe.",
      "Ako više volite okrugle iznose, kalkulator zaokružuje deo svake osobe naviše, a razlika ide u napojnicu.",
    ],
    comoSeCalcula: ["Napojnica = račun × procenat napojnice ÷ 100.", "Ukupno = račun + napojnica.", "Deo svake osobe je ukupan iznos podeljen brojem osoba."],
    ejemplo: [
      `Na račun od ${m(cuenta)} napojnica od 10% iznosi ${m(propina)}, pa je ukupno ${m(cuenta + propina)}.`,
      `Ako plaćaju tri osobe, svaka plaća ${m((cuenta + propina) / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Koliko se ostavlja napojnica?",
        respuesta: `Zavisi od lokalnih običaja. Proverite šta je uobičajeno ${GRAMATICA.sr.en(ctx.nombrePais)} i pogledajte da li račun već sadrži naknadu za uslugu.`,
      },
      {
        pregunta: "Da li se napojnica računa od iznosa sa porezom ili bez njega?",
        respuesta: "Obično od ukupnog iznosa na računu. Ako želite da je računate od iznosa bez poreza, unesite taj iznos.",
      },
      {
        pregunta: "Kako brzo izračunati napojnicu od 10% ili 15%?",
        respuesta: `Račun podelite sa deset i dobijate 10%. Za 15% dodajte još polovinu tog iznosa. Za račun od 850, 10% je ${n(850 * 0.1)}, a 15% je ${n(850 * 0.15)}.`,
      },
    ],
    glosario: [
      { termino: "Napojnica", definicion: "Iznos koji se ostavlja za uslugu, preko cene." },
      { termino: "Naknada za uslugu", definicion: "Iznos koji je lokal već dodao na račun za uslugu." },
    ],
  };
};
