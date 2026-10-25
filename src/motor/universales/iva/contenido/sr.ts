import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const tasa = `{{${ctx.datos.tasa}}}`;
  const precio = formatearMonto(ctx, montoEjemplo(ctx, 100));
  const g = GRAMATICA.sr;
  return {
    h1: `PDV kalkulator ${g.para(ctx.nombrePais)}`,
    title: tituloQueEntre(`PDV kalkulator (${tasa}) ${g.para(ctx.nombrePais)}`, `Obračun PDV-a (${tasa}) ${g.en(ctx.nombrePais)}`, `PDV kalkulator (${tasa})`),
    description: `Dodajte ili izdvojite PDV od ${tasa} iz bilo koje cene u jednom koraku: cena bez PDV-a, iznos poreza i cena sa PDV-om, zaokruženo na dve decimale.`,
    intro: [
      `Opšta stopa sa kojom kalkulator računa ${g.en(ctx.nombrePais)} iznosi ${tasa}.`,
      "Izaberite da li PDV dodajete na cenu ili ga izdvajate iz cene koja ga već sadrži, pa unesite iznos.",
    ],
    comoSeCalcula: [
      "Dodavanje PDV-a: porez = cena bez PDV-a × stopa ÷ 100. Cena sa PDV-om = cena bez PDV-a + porez.",
      "Izdvajanje PDV-a: cena bez PDV-a = cena sa PDV-om ÷ (1 + stopa ÷ 100). Porez je razlika između dve cene.",
      "Ako roba ima posebnu stopu, unesite je u polje „Druga stopa PDV-a“.",
    ],
    ejemplo: [
      `Da biste dodali PDV na cenu od ${precio}, pomnožite je stopom od ${tasa} i rezultat dodajte na cenu.`,
      `Koliko PDV-a ima u ceni od ${precio} saznaćete kada je podelite sa jedan plus stopa i rezultat oduzmete od cene.`,
    ],
    faq: [
      {
        pregunta: "Kako se izdvaja PDV iz cene?",
        respuesta: "Cenu podelite sa 1 plus stopa izražena kao decimalni broj. Rezultat je cena bez PDV-a, a razlika je sam porez.",
      },
      {
        pregunta: "Zašto nije dovoljno oduzeti procenat stope od cene sa PDV-om?",
        respuesta: "Zato što je porez obračunat na nižu cenu, onu bez PDV-a. Ako procenat oduzmete od cene sa PDV-om, oduzećete više nego što porez stvarno iznosi.",
      },
      {
        pregunta: `Da li se na sve plaća PDV od ${tasa}?`,
        respuesta: "Ne uvek. Neke namirnice, lekovi ili usluge imaju posebnu, nižu stopu ili su oslobođeni poreza. Tada koristite polje „Druga stopa PDV-a“.",
      },
    ],
    glosario: [
      { termino: "PDV", definicion: "Porez na dodatu vrednost. Dodaje se na cenu robe i usluga, a obračunava ga i plaća obveznik PDV-a." },
      { termino: "Cena bez PDV-a", definicion: "Cena pre dodavanja poreza, u knjigovodstvu poreska osnovica." },
    ],
  };
};
