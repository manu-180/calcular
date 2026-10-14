import { paraSuiza } from "../../comun/locales";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { comparar } from "../definicion";

const contenido: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 400000);
  const alquiler = montoEjemplo(ctx, 1200);
  const base = {
    precio,
    entrada: 20,
    gastosCompra: 10,
    tasa: 3.5,
    aniosHipoteca: 30,
    alquiler,
    aumentoAlquiler: 2,
    gastosPropietario: 1,
    revalorizacion: 2,
    rendimiento: 5,
  };
  const a20 = comparar({ ...base, horizonte: 20 }).anios[19];
  const a5 = comparar({ ...base, horizonte: 5 }).anios[4];
  const wer = (a: { comprar: number; alquilar: number }) => (a.comprar >= a.alquilar ? "das Kaufen" : "das Mieten");
  const c = {
    h1: "Mieten oder kaufen?",
    title: tituloQueEntre(
      `Mieten oder kaufen? Der Vergleichsrechner | ${ctx.nombrePais}`,
      `Mieten oder kaufen? | ${ctx.nombrePais}`,
      "Mieten oder kaufen? Rechner",
    ),
    description:
      "Vergleichen Sie Mieten und Kaufen über die Jahre, die Sie wählen. Sie sehen, was sich mehr lohnt, ab welchem Jahr und um wie viel.",
    intro: [
      "Die Rate mit der Miete zu vergleichen reicht nicht. Wer kauft, zahlt Zinsen, Instandhaltung und Grundsteuer, besitzt am Ende aber die Immobilie. Wer mietet, kann das Eigenkapital anlegen.",
      "Dieser Rechner zählt all das Jahr für Jahr zusammen und zeigt, bei welchem Weg Ihnen am Ende mehr Vermögen bleibt.",
    ],
    comoSeCalcula: [
      "Kaufen: Jeden Monat zahlen Sie die Rate und die Eigentümerkosten. Ihr Vermögen ist der Wert der Immobilie minus die Restschuld.",
      "Mieten: Eigenkapital und Kaufnebenkosten bleiben zur gewählten Rendite angelegt, und die Miete steigt jedes Jahr.",
      "Wer in einem Monat weniger ausgibt, legt die Differenz an. So kommen beide Wege aus demselben Budget.",
      "Besser ist der Weg mit dem höheren Vermögen am Ende.",
    ],
    ejemplo: [
      `Eine Wohnung für ${m(precio)} mit 20 % Eigenkapital, 10 % Kaufnebenkosten und ${formatearNumero(ctx, 3.5, 1)} % Zinsen über 30 Jahre, verglichen mit ${m(alquiler)} Miete im Monat.`,
      `Über 20 Jahre liegt ${wer(a20)} um ${m(Math.abs(a20.comprar - a20.alquilar))} vorn. Über 5 Jahre liegt ${wer(a5)} um ${m(Math.abs(a5.comprar - a5.alquilar))} vorn.`,
    ],
    faq: [
      {
        pregunta: "Ist Miete rausgeworfenes Geld?",
        respuesta:
          "Nicht ganz. Auch wer kauft, zahlt Kosten, die nie zurückkommen: Zinsen, Grundsteuer und Instandhaltung. Entscheidend ist, wie viel Ihnen am Ende jeweils gehört.",
      },
      {
        pregunta: "Warum hängt das Ergebnis so stark von der Zahl der Jahre ab?",
        respuesta:
          "Beim Kauf fallen am Anfang hohe Kosten an (Kaufnebenkosten und die ersten Zinsen), die sich erst mit der Zeit ausgleichen. Wer bald wieder umziehen möchte, fährt mit Mieten meist besser.",
      },
      {
        pregunta: "Welche Angabe ist am wichtigsten?",
        respuesta:
          "Das Verhältnis von Kaufpreis zu Jahresmiete, der Zins und die Wertsteigerung. Ändern Sie Wertsteigerung und Rendite, um zu sehen, wie stark sich das Ergebnis verschiebt.",
      },
    ],
    glosario: [
      { termino: "Vermögen", definicion: "Was Ihnen gehört, minus das, was Sie schulden." },
      { termino: "Wertsteigerung", definicion: "Um wie viel der Wert der Immobilie jedes Jahr steigt." },
      { termino: "Opportunitätskosten", definicion: "Was das Eigenkapital gebracht hätte, wenn Sie es angelegt hätten." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};

export const contenidoDe: ContenidoUniversal = (ctx) => paraSuiza(ctx.locale, contenido(ctx));
