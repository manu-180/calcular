import { paraSuiza } from "../../comun/locales";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

const contenido: ContenidoUniversal = (ctx) => {
  const a = montoEjemplo(ctx, 90);
  const b = montoEjemplo(ctx, 30);
  const cuota = (a + b) / 3;
  const m = (n: number) => formatearMonto(ctx, n);
  const c = {
    h1: "Kosten teilen",
    title: tituloQueEntre(
      `Kosten teilen: Wer schuldet wem wie viel? | ${ctx.nombrePais}`,
      `Kosten teilen | ${ctx.nombrePais}`,
      "Kosten teilen",
    ),
    description:
      "Teilen Sie gemeinsame Ausgaben unter bis zu 8 Personen auf. Sie sehen den Anteil jeder Person und wer wem wie viel überweist.",
    intro: [
      "Ideal für den Urlaub, das gemeinsame Essen, eine Feier oder die Ferienwohnung, wenn jeder unterschiedlich viel ausgelegt hat.",
      "Tragen Sie ein, was jede Person bezahlt hat. Sie bekommen den Anteil pro Kopf und die Überweisungen, mit denen alles ausgeglichen ist.",
    ],
    comoSeCalcula: [
      "Anteil = Ausgaben insgesamt ÷ Anzahl der Personen.",
      "Wer weniger als seinen Anteil bezahlt hat, schuldet die Differenz. Wer mehr bezahlt hat, bekommt sie zurück.",
      "Die größte Schuld wird mit dem größten Guthaben verrechnet. So braucht es keine unnötigen Überweisungen.",
    ],
    ejemplo: [
      `Anna hat ${m(a)} bezahlt, Ben ${m(b)} und Clara nichts. Insgesamt sind das ${m(a + b)}, also ${m(cuota)} pro Person.`,
      `Clara überweist Anna ${m(cuota)}, und Ben überweist Anna ${m(cuota - b)}.`,
    ],
    faq: [
      {
        pregunta: "Wie teile ich Kosten auf, wenn jeder etwas anderes bezahlt hat?",
        respuesta: "Zählen Sie alles zusammen, teilen Sie durch die Zahl der Personen und vergleichen Sie mit dem, was jeder bezahlt hat. Die Differenz ist die Schuld oder das Guthaben.",
      },
      {
        pregunta: "Was ist, wenn jemand gar nichts bezahlt hat?",
        respuesta: "Tragen Sie bei dieser Person eine 0 ein, damit sie mitgerechnet wird. Bleibt das Feld leer, wird sie nicht berücksichtigt.",
      },
      {
        pregunta: "Warum gibt es weniger Überweisungen als Personen?",
        respuesta: "Die Schulden werden gebündelt. Wer am meisten schuldet, zahlt an den, der am meisten ausgelegt hat, und so weiter. Es braucht nie mehr Überweisungen als Personen minus eins.",
      },
    ],
    glosario: [
      { termino: "Anteil", definicion: "Was jede Person von den gesamten Kosten tragen sollte." },
      { termino: "Saldo", definicion: "Die Differenz zwischen dem, was jemand bezahlt hat, und seinem Anteil." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};

export const contenidoDe: ContenidoUniversal = (ctx) => paraSuiza(ctx.locale, contenido(ctx));
