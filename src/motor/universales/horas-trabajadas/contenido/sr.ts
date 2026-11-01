import { GRAMATICA } from "../../../i18n/gramatica";
import { formaSr } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { horarios, minutosTrabajados } from "../definicion";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const m = (x: number) => formatearMonto(ctx, x);
  const n = (x: number, decimales = 0) => formatearNumero(ctx, x, decimales);
  // «1 sat», «3 sata», «8 sati», «21 sat»; las fracciones van con «sati» («7,75 sati»).
  const h = (x: number, decimales = 0) => `${n(x, decimales)} ${formaSr(x, "sat", "sata", "sati")}`;
  const hora = (v: string) => horarios(ctx.locale).find((o) => o.valor === v)?.etiqueta ?? v;
  const pago = montoEjemplo(ctx, 15);
  const jornada = minutosTrabajados("09:00", "17:30", 30) / 60;
  const larga = minutosTrabajados("08:00", "18:00", 60) / 60;
  const extra = larga * 5 - 40;
  return {
    h1: "Kalkulator radnih sati",
    title: tituloQueEntre(
      `Obračun radnih sati: kalkulator radnog vremena ${GRAMATICA.sr.para(ctx.nombrePais)}`,
      `Obračun radnih sati ${GRAMATICA.sr.para(ctx.nombrePais)}`,
      "Kalkulator radnih sati",
    ),
    description: "Saberite sate rada u nedelji prema početku, kraju i pauzama i izračunajte zaradu, zajedno sa prekovremenim radom.",
    intro: [
      "Za svaki dan izaberite početak i kraj, neplaćenu pauzu i zaradu po satu. Pokazaćemo vam ukupan broj sati, prekovremeni rad i zaradu za nedelju.",
      "Korisno je za proveru plate, za evidenciju radnog vremena ili za fakturisanje rada koji se plaća po satu.",
    ],
    comoSeCalcula: [
      "Sati dnevno = kraj − početak − pauza. Ako je kraj pre početka, smena se završava sledećeg dana.",
      "Prekovremeni sati = ukupni sati u nedelji − redovni sati, ako ukupni sati pređu redovne.",
      "Zarada = redovni sati × zarada po satu + prekovremeni sati × zarada po satu × (1 + uvećanje).",
    ],
    ejemplo: [
      `Od ${hora("09:00")} do ${hora("17:30")} sa pauzom od 30 minuta to je ${h(jornada)} dnevno. Od ponedeljka do petka to je ${h(jornada * 5)}: uz zaradu od ${m(pago)} po satu to iznosi ${m(jornada * 5 * pago)}.`,
      `Od ${hora("08:00")} do ${hora("18:00")} sa pauzom od jednog sata to je ${h(larga * 5)} nedeljno, od toga prekovremenog rada: ${h(extra)}. Uz uvećanje od 50% to iznosi ${m(40 * pago + extra * pago * 1.5)}.`,
    ],
    faq: [
      {
        pregunta: "Kako se računaju radni sati?",
        respuesta: "Od vremena završetka oduzmite vreme početka, a zatim pauzu. Na kraju saberite sve dane u nedelji.",
      },
      {
        pregunta: "Kako se minuti pretvaraju u decimalne sate?",
        respuesta: `Minute podelite sa 60. Pola sata je ${n(0.5, 1)}, 15 minuta je ${n(0.25, 2)}, a 45 minuta ${n(0.75, 2)}. Tako je 7 sati i 45 minuta ukupno ${h(7.75, 2)}.`,
      },
      {
        pregunta: "Koliko prekovremenog rada je dozvoljeno i kako se plaća?",
        respuesta: "Zavisi od zakona zemlje u kojoj radite i od vašeg ugovora. Kalkulator koristi uvećanje i redovne sate koje unesete, bez konkretnog zakonskog pravila.",
      },
    ],
    glosario: [
      { termino: "Prekovremeni rad", definicion: "Rad preko redovnog radnog vremena, za koji se plaća uvećanje." },
      { termino: "Sat i po", definicion: "Zarada za prekovremeni sat za polovinu veća od redovne, odnosno sa uvećanjem od 50%." },
    ],
  };
};
