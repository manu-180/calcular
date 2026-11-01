import { GRAMATICA } from "../../../i18n/gramatica";
import { formaBs } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { horarios, minutosTrabajados } from "../definicion";

export const contenidoBs: ContenidoUniversal = (ctx) => {
  const m = (x: number) => formatearMonto(ctx, x);
  const n = (x: number, decimales = 0) => formatearNumero(ctx, x, decimales);
  // «1 sat», «3 sata», «8 sati», «21 sat»; las fracciones van con «sati» («7,75 sati»).
  const h = (x: number, decimales = 0) => `${n(x, decimales)} ${formaBs(x, "sat", "sata", "sati")}`;
  const hora = (v: string) => horarios(ctx.locale).find((o) => o.valor === v)?.etiqueta ?? v;
  const pago = montoEjemplo(ctx, 15);
  const jornada = minutosTrabajados("09:00", "17:30", 30) / 60;
  const larga = minutosTrabajados("08:00", "18:00", 60) / 60;
  const extra = larga * 5 - 40;
  return {
    h1: "Kalkulator radnih sati",
    title: tituloQueEntre(
      `Izračun radnih sati: kalkulator radnog vremena ${GRAMATICA.bs.para(ctx.nombrePais)}`,
      `Izračun radnih sati ${GRAMATICA.bs.para(ctx.nombrePais)}`,
      "Kalkulator radnih sati",
    ),
    description: "Saberite radne sate u sedmici prema početku, kraju i stankama te izračunajte iznos za isplatu, zajedno s prekovremenim radom.",
    intro: [
      "Za svaki dan izaberite početak i kraj, neplaćenu pauzu i satnicu. Pokazat ćemo vam ukupan broj sati, prekovremeni rad i iznos za sedmicu.",
      "Korisno je za provjeru plate, za evidenciju radnog vremena ili za fakturisanje rada koji se plaća po satu.",
    ],
    comoSeCalcula: [
      "Sati dnevno = kraj − početak − pauza. Ako je kraj prije početka, smjena završava sljedećeg dana.",
      "Prekovremeni sati = ukupni sati u sedmici − redovni sati, ako ukupni sati pređu redovne.",
      "Iznos = redovni sati × satnica + prekovremeni sati × satnica × (1 + uvećanje).",
    ],
    ejemplo: [
      `Od ${hora("09:00")} do ${hora("17:30")} sa pauzom od 30 minuta to je ${h(jornada)} dnevno. Od ponedjeljka do petka to je ${h(jornada * 5)}: uz satnicu od ${m(pago)} to iznosi ${m(jornada * 5 * pago)}.`,
      `Od ${hora("08:00")} do ${hora("18:00")} sa pauzom od jednog sata to je ${h(larga * 5)} sedmično, od toga prekovremeni rad: ${h(extra)}. Uz uvećanje od 50 % to iznosi ${m(40 * pago + extra * pago * 1.5)}.`,
    ],
    faq: [
      {
        pregunta: "Kako se računaju radni sati?",
        respuesta: "Od vremena završetka oduzmite vrijeme početka, a zatim pauzu. Na kraju saberite sve dane u sedmici.",
      },
      {
        pregunta: "Kako se minute pretvaraju u decimalne sate?",
        respuesta: `Minute podijelite sa šezdeset. Pola sata je ${n(0.5, 1)}, 15 minuta je ${n(0.25, 2)}, a 45 minuta ${n(0.75, 2)}. Tako je 7 sati i 45 minuta ukupno ${h(7.75, 2)}.`,
      },
      {
        pregunta: "Koliko je prekovremenog rada dozvoljeno i kako se plaća?",
        respuesta: "Ovisi o zakonu zemlje u kojoj radite i o vašem ugovoru. Kalkulator koristi uvećanje i redovne sate koje unesete, bez konkretnog zakonskog pravila.",
      },
    ],
    glosario: [
      { termino: "Prekovremeni rad", definicion: "Rad iznad redovnog radnog vremena, za koji se plaća uvećanje." },
      { termino: "Sat i pol", definicion: "Iznos za prekovremeni sat za polovinu veći od redovnog, odnosno s uvećanjem od 50 %." },
    ],
  };
};
