import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const anual = montoEjemplo(ctx, 50000);
  const hora = montoEjemplo(ctx, 20);
  const nedelja = 52 / 12;
  return {
    h1: "Preračun plate po satu",
    title: tituloQueEntre(
      `Plata po satu, mesečno i godišnje: preračun ${GRAMATICA.sr.para(ctx.nombrePais)}`,
      `Preračun plate po satu ${GRAMATICA.sr.para(ctx.nombrePais)}`,
      "Preračun plate po satu",
    ),
    description: "Preračunajte platu između sata, dana, nedelje, pola meseca, meseca i godine, prema vašim radnim satima i plaćenim nedeljama.",
    intro: [
      "Koliko zarađujete po satu? Koliko godišnje donosi ponuda sa satnicom? Unesite iznos, izaberite period i pokazaćemo vam sve ostale.",
      "Pomaže kada poredite ponude za posao, procenjujete prekovremeni rad ili želite da znate koliko vredi vaš sat.",
    ],
    comoSeCalcula: [
      "Prvo se sve preračuna na godišnji iznos.",
      "Po satu = godišnji iznos ÷ (sati nedeljno × plaćene nedelje).",
      "Po danu = godišnji iznos ÷ (radni dani nedeljno × plaćene nedelje). Nedeljno = godišnji iznos ÷ plaćene nedelje.",
      "Mesečno = godišnji iznos ÷ 12. Za pola meseca = godišnji iznos ÷ 24.",
    ],
    ejemplo: [
      `Plata od ${m(anual)} godišnje uz 40 sati nedeljno odgovara iznosu od ${m(anual / 2080)} po satu i ${m(anual / 12)} mesečno.`,
      `Ponuda od ${m(hora)} po satu sa punim radnim vremenom donosi ${m(hora * 2080)} godišnje.`,
    ],
    faq: [
      {
        pregunta: "Koliko radnih sati ima godina?",
        respuesta: `Uz 40 sati nedeljno i 52 plaćene nedelje to je ${formatearNumero(ctx, 2080)} sati. Za brzu procenu satnica se zato množi sa otprilike ${formatearNumero(ctx, 2000)}.`,
      },
      {
        pregunta: "Zašto nedeljna plata puta 4 ne daje mesečnu?",
        respuesta: `Zato što mesec u proseku nema 4 nedelje, nego 52 ÷ 12, odnosno ${formatearNumero(ctx, nedelja, 2)}. Nedeljnu platu pretvarate u mesečnu tako što je pomnožite sa 52 i podelite sa 12.`,
      },
      {
        pregunta: "Da li se računaju bonusi ili porezi?",
        respuesta: "Ne. Kalkulator preračunava isti iznos između perioda. Ako dobijate bonuse, dodajte ih posebno kada poredite ponude.",
      },
    ],
    glosario: [
      { termino: "Bruto plata", definicion: "Plata pre odbitka poreza na zarade i doprinosa za socijalno osiguranje." },
      { termino: "Isplata dva puta mesečno", definicion: "Plata koja se isplaćuje u dva dela svakog meseca, odnosno 24 puta godišnje." },
    ],
  };
};
