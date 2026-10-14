import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoDe: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 2500);
  const c = {
    h1: "Budget nach der 50-30-20-Regel",
    title: tituloQueEntre(
      `50-30-20-Regel: Haushaltsbudget berechnen | ${ctx.nombrePais}`,
      `50-30-20-Regel Rechner | ${ctx.nombrePais}`,
      "50-30-20-Regel Rechner",
    ),
    description:
      "Teilen Sie Ihr Nettoeinkommen nach der 50-30-20-Regel auf: wie viel für Fixkosten, für Freizeit und Wünsche und zum Sparen. Prozente frei anpassbar.",
    intro: [
      "Die 50-30-20-Regel ist ein einfacher Weg, den Monat zu planen. Die Hälfte geht in Fixkosten, 30 % in Dinge, die Ihnen Freude machen, und 20 % aufs Sparkonto.",
      "Geben Sie Ihr Nettoeinkommen ein, und Sie sehen, wie viel in jeden Topf geht. Ist Ihre Lage anders, etwa wegen hoher Miete, passen Sie die Prozente an.",
    ],
    comoSeCalcula: [
      "Fixkosten = Nettoeinkommen × 50 %.",
      "Freizeit und Wünsche = Nettoeinkommen × 30 %.",
      "Sparen = Nettoeinkommen × 20 %. Die drei Prozentsätze müssen zusammen 100 % ergeben.",
    ],
    ejemplo: [
      `Bei ${m(ingreso)} netto im Monat: ${m(ingreso * 0.5)} für Fixkosten, ${m(ingreso * 0.3)} für Freizeit und Wünsche und ${m(ingreso * 0.2)} zum Sparen.`,
      `Aufs Jahr gerechnet ergeben diese 20 % eine Ersparnis von ${m(ingreso * 0.2 * 12)}.`,
    ],
    faq: [
      {
        pregunta: "Was zählt zu den Fixkosten und was zu den Wünschen?",
        respuesta:
          "Fixkosten müssen Sie zahlen: Miete, Grundnahrungsmittel, Energie, Mobilität, Versicherungen und Mindestraten für Kredite. Wünsche sind alles, worauf Sie zur Not verzichten könnten.",
      },
      {
        pregunta: "Was, wenn meine Fixkosten über 50 % liegen?",
        respuesta: "Das ist häufig, vor allem bei hoher Miete. Versuchen Sie 60-20-20 oder 70-20-10 und lassen Sie das Sparen nicht ganz auf null fallen.",
      },
      {
        pregunta: "Zählen Kreditraten als Sparen?",
        respuesta: "Die vereinbarte Rate gehört zu den Fixkosten. Was Sie zusätzlich tilgen, zählt als Sparen, denn es verbessert Ihr Vermögen genau wie Sparen.",
      },
    ],
    glosario: [
      { termino: "Nettoeinkommen", definicion: "Was Sie nach Steuern und Sozialabgaben ausgezahlt bekommen." },
      { termino: "50-30-20-Regel", definicion: "Eine Methode, das Einkommen auf Fixkosten, Wünsche und Sparen aufzuteilen." },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};
