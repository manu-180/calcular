import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoDe: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  const c = {
    h1: "Break-even-Punkt berechnen",
    title: tituloQueEntre(
      `Break-even-Rechner: Gewinnschwelle berechnen | ${ctx.nombrePais}`,
      `Break-even-Rechner | ${ctx.nombrePais}`,
      "Break-even-Rechner",
    ),
    description:
      "Berechnen Sie, wie viel Sie im Monat verkaufen und umsetzen müssen, um Ihre Kosten zu decken und Ihr Gewinnziel zu erreichen.",
    intro: [
      "Der Break-even-Punkt (die Gewinnschwelle) ist der Umsatz, bei dem ein Unternehmen weder Gewinn noch Verlust macht. Darunter verlieren Sie Geld, darüber verdienen Sie.",
      "Geben Sie Ihre Fixkosten, den Preis und die Kosten pro Stück ein. Sie sehen, wie viel Sie verkaufen müssen, um die Kosten zu decken und Ihr Ziel zu erreichen.",
    ],
    comoSeCalcula: [
      "Deckungsbeitrag = Preis − variable Kosten pro Stück.",
      "Stückzahl an der Gewinnschwelle = Fixkosten ÷ Deckungsbeitrag, aufgerundet.",
      "Umsatz an der Gewinnschwelle = Fixkosten ÷ (Deckungsbeitrag ÷ Preis).",
      "Für ein Gewinnziel zählen Sie es zu den Fixkosten und rechnen genauso.",
    ],
    ejemplo: [
      `Bei ${m(fijos)} Fixkosten, einem Preis von ${m(precio)} und ${m(variable)} variablen Kosten bringt jeder Verkauf ${m(precio - variable)} Deckungsbeitrag.`,
      `Sie müssen ${formatearNumero(ctx, base.unidades)} Stück verkaufen (${m(base.facturacion)} Umsatz), um die Kosten zu decken, und ${formatearNumero(ctx, meta.unidades)} Stück für ${m(objetivo)} Gewinn im Monat.`,
    ],
    faq: [
      {
        pregunta: "Was sind Fixkosten und variable Kosten?",
        respuesta: "Fixkosten bleiben gleich, auch wenn Sie nichts verkaufen: Miete, feste Gehälter, Energie. Variable Kosten wachsen mit jedem Verkauf: Ware, Material, Provisionen, Versand.",
      },
      {
        pregunta: "Wie senke ich meine Gewinnschwelle?",
        respuesta: "Es gibt drei Hebel: den Preis erhöhen, die variablen Kosten pro Stück senken oder Fixkosten kürzen. Der Preis wirkt meist am stärksten.",
      },
      {
        pregunta: "Funktioniert das auch für Dienstleistungen?",
        respuesta: "Ja. Ein Stück kann eine Stunde, eine Sitzung oder ein Kunde pro Monat sein. Als variable Kosten nehmen Sie, was Sie jede Einheit kostet.",
      },
    ],
    glosario: [
      { termino: "Gewinnschwelle", definicion: "Der Umsatz, bei dem die Einnahmen genau die Kosten decken. Auch Break-even-Punkt genannt." },
      { termino: "Deckungsbeitrag", definicion: "Was jeder Verkauf zur Deckung der Fixkosten beiträgt." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};
