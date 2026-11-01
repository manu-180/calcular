import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHr: ContenidoUniversal = (ctx) => {
  const cuenta = montoEjemplo(ctx, 60);
  const propina = cuenta * 0.1;
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x);
  return {
    h1: "Kalkulator napojnice",
    title: tituloQueEntre(`Kalkulator napojnice ${GRAMATICA.hr.para(ctx.nombrePais)}`, "Koliko ostaviti napojnice: kalkulator", "Kalkulator napojnice"),
    description: "Izračunajte napojnicu, ukupan iznos računa i koliko plaća svaka osoba kada se račun dijeli. Dio svake osobe može se zaokružiti naviše.",
    intro: [
      "Unesite iznos računa, postotak napojnice i broj osoba koje plaćaju. Dobit ćete napojnicu, ukupan iznos i dio svake osobe.",
      "Ako više volite okrugle iznose, kalkulator zaokružuje dio svake osobe naviše, a razlika ide u napojnicu.",
    ],
    comoSeCalcula: ["Napojnica = račun × postotak napojnice ÷ 100.", "Ukupno = račun + napojnica.", "Dio svake osobe je ukupan iznos podijeljen brojem osoba."],
    ejemplo: [
      `Na račun od ${m(cuenta)} napojnica od 10 % iznosi ${m(propina)}, pa je ukupno ${m(cuenta + propina)}.`,
      `Ako plaćaju tri osobe, svaka plaća ${m((cuenta + propina) / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Koliko se ostavlja napojnice?",
        respuesta: `Ovisi o lokalnim običajima. Provjerite što je uobičajeno ${GRAMATICA.hr.en(ctx.nombrePais)} i pogledajte sadrži li račun već naknadu za uslugu.`,
      },
      {
        pregunta: "Računa li se napojnica od iznosa s porezom ili bez njega?",
        respuesta: "Obično od ukupnog iznosa na računu. Ako je želite računati od iznosa bez poreza, unesite taj iznos.",
      },
      {
        pregunta: "Kako brzo izračunati napojnicu od 10 % ili 15 %?",
        respuesta: `Račun podijelite s deset i dobit ćete 10 %. Za 15 % dodajte još polovinu tog iznosa. Za račun od 850, 10 % je ${n(850 * 0.1)}, a 15 % je ${n(850 * 0.15)}.`,
      },
    ],
    glosario: [
      { termino: "Napojnica", definicion: "Iznos koji se ostavlja za uslugu, povrh cijene." },
      { termino: "Naknada za uslugu", definicion: "Iznos koji je lokal već dodao na račun za uslugu." },
    ],
  };
};
