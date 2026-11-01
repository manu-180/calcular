import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoBs: ContenidoUniversal = (ctx) => {
  const tasa = `{{${ctx.datos.tasa}}}`;
  const precio = formatearMonto(ctx, montoEjemplo(ctx, 100));
  const g = GRAMATICA.bs;
  return {
    h1: `PDV kalkulator ${g.para(ctx.nombrePais)}`,
    title: tituloQueEntre(`PDV kalkulator (${tasa}) ${g.para(ctx.nombrePais)}`, `Izračun PDV-a (${tasa}) ${g.en(ctx.nombrePais)}`, `PDV kalkulator (${tasa})`),
    description: `Dodajte ili izdvojite PDV od ${tasa} iz bilo koje cijene u jednom koraku: cijena bez PDV-a, iznos poreza i cijena s PDV-om, zaokruženo na dvije decimale.`,
    intro: [
      `Opća stopa s kojom kalkulator računa ${g.en(ctx.nombrePais)} iznosi ${tasa}.`,
      "Izaberite dodajete li PDV na cijenu ili ga izdvajate iz cijene koja ga već sadrži, a zatim unesite iznos.",
    ],
    comoSeCalcula: [
      "Dodavanje PDV-a: porez = cijena bez PDV-a × stopa ÷ 100. Cijena s PDV-om = cijena bez PDV-a + porez.",
      "Izdvajanje PDV-a: cijena bez PDV-a = cijena s PDV-om ÷ (1 + stopa ÷ 100). Porez je razlika između dviju cijena.",
      "Ako roba ima posebnu stopu, unesite je u polje „Druga stopa PDV-a”.",
    ],
    ejemplo: [
      `Da biste dodali PDV na cijenu od ${precio}, pomnožite je stopom od ${tasa} i rezultat dodajte cijeni.`,
      `Koliko je PDV-a sadržano u cijeni od ${precio} saznat ćete tako da je podijelite s jedan plus stopa i rezultat oduzmete od cijene.`,
    ],
    faq: [
      {
        pregunta: "Kako se izdvaja PDV iz cijene?",
        respuesta: "Cijenu podijelite s 1 plus stopa izražena kao decimalni broj. Rezultat je cijena bez PDV-a, a razlika je sam porez.",
      },
      {
        pregunta: "Zašto nije dovoljno oduzeti procenat stope od cijene s PDV-om?",
        respuesta: "Zato što je porez obračunat na nižu cijenu, onu bez PDV-a. Ako procenat oduzmete od cijene s PDV-om, oduzet ćete više nego što porez stvarno iznosi.",
      },
      {
        pregunta: `Plaća li se PDV od ${tasa} na sve?`,
        respuesta: "Ne uvijek. Neke namirnice, lijekovi ili usluge imaju posebnu, nižu stopu ili su oslobođeni poreza. Tada koristite polje „Druga stopa PDV-a”.",
      },
    ],
    glosario: [
      { termino: "PDV", definicion: "Porez na dodanu vrijednost. Dodaje se na cijenu robe i usluga, a obračunava ga i plaća obaveznik PDV-a." },
      { termino: "Cijena bez PDV-a", definicion: "Cijena prije dodavanja poreza, u knjigovodstvu porezna osnovica." },
    ],
  };
};
