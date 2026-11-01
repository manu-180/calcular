import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoBs: ContenidoUniversal = (ctx) => {
  const cuenta = montoEjemplo(ctx, 60);
  const propina = cuenta * 0.1;
  const m = (n: number) => formatearMonto(ctx, n);
  const n = (x: number) => formatearNumero(ctx, x);
  return {
    h1: "Kalkulator bakšiša",
    title: tituloQueEntre(`Kalkulator bakšiša ${GRAMATICA.bs.para(ctx.nombrePais)}`, "Koliko ostaviti bakšiša: kalkulator", "Kalkulator bakšiša"),
    description: "Izračunajte bakšiš, ukupan iznos računa i koliko plaća svaka osoba kada se račun dijeli. Dio svake osobe može se zaokružiti naviše.",
    intro: [
      "Unesite iznos računa, procenat bakšiša i broj osoba koje plaćaju. Dobit ćete bakšiš, ukupan iznos i dio svake osobe.",
      "Ako više volite okrugle iznose, kalkulator zaokružuje dio svake osobe naviše, a razlika ide u bakšiš.",
    ],
    comoSeCalcula: ["Bakšiš = račun × procenat bakšiša ÷ 100.", "Ukupno = račun + bakšiš.", "Dio svake osobe je ukupan iznos podijeljen brojem osoba."],
    ejemplo: [
      `Na račun od ${m(cuenta)} bakšiš od 10 % iznosi ${m(propina)}, pa je ukupno ${m(cuenta + propina)}.`,
      `Ako plaćaju tri osobe, svaka plaća ${m((cuenta + propina) / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Koliko se ostavlja bakšiša?",
        respuesta: `Ovisi o lokalnim običajima. Provjerite šta je uobičajeno ${GRAMATICA.bs.en(ctx.nombrePais)} i pogledajte sadrži li račun već naknadu za uslugu.`,
      },
      {
        pregunta: "Računa li se bakšiš od iznosa s porezom ili bez njega?",
        respuesta: "Obično od ukupnog iznosa na računu. Ako je želite računati od iznosa bez poreza, unesite taj iznos.",
      },
      {
        pregunta: "Kako brzo izračunati bakšiš od 10 % ili 15 %?",
        respuesta: `Račun podijelite s deset i dobit ćete 10 %. Za 15 % dodajte još polovinu tog iznosa. Za račun od 850, 10 % je ${n(850 * 0.1)}, a 15 % je ${n(850 * 0.15)}.`,
      },
    ],
    glosario: [
      { termino: "Bakšiš", definicion: "Iznos koji se ostavlja za uslugu, povrh cijene." },
      { termino: "Naknada za uslugu", definicion: "Iznos koji je lokal već dodao na račun za uslugu." },
    ],
  };
};
