import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "li.lohnsteuer-rechner",
  h1: "Lohnsteuer in Liechtenstein schätzen",
  title: "Lohnsteuer Liechtenstein 2026: Steuer vom Lohn schätzen",
  description: "Wie viel Steuer zahlen Sie in Liechtenstein auf Ihren Lohn? Schätzung der Landes- und Gemeindesteuer mit Abzügen, Kinderabzug und Gemeindezuschlag.",
  intro: [
    "In Liechtenstein besteht die Steuer auf dem Lohn aus der Landessteuer und dem Zuschlag der Wohngemeinde. Der Arbeitgeber zieht laufend einen Steuerabzug ab, die Steuerverwaltung rechnet danach mit der Veranlagung ab.",
    "Der Rechner schätzt die Jahressteuer für einen Lohn als einziges Einkommen, ohne Vermögen.",
  ],
  comoSeCalcula: [
    "Vom Bruttolohn gehen ab: AHV/IV/FAK und ALV, der Mindestbeitrag an die Pensionskasse, die Pauschale von {{li.gewinnungskosten-pauschale}} für Gewinnungskosten und die Versicherungsprämien bis {{li.versicherungsabzug[person]}} ({{li.versicherungsabzug[ehegatten]}} für Ehegatten, {{li.versicherungsabzug[kind]}} pro Kind).",
    "Pro Kind kommt ein Abzug von {{li.kinderabzug}} dazu.",
    "Auf den Erwerb wird der Tarif des Landes angewendet, dann der Gemeindezuschlag.",
  ],
  ejemplo: [
    "Bei 85 000 Franken Bruttolohn, alleinstehend und 150 % Gemeindezuschlag, ergibt sich ein Erwerb von 71 710 Franken und eine Steuer von rund 4661 Franken im Jahr.",
  ],
  faq: [
    { pregunta: "Wer legt den Steuerabzug vom Lohn fest?", respuesta: "Die Steuerverwaltung. Sie berücksichtigt den voraussichtlichen Jahreserwerb, Pauschalen für Abzüge und die Familienverhältnisse." },
    { pregunta: "Wie hoch ist der Gemeindezuschlag?", respuesta: "Der Gemeinderat setzt ihn jedes Jahr fest, zwischen 150 und 250 % der Landessteuer." },
    { pregunta: "Was fehlt in dieser Schätzung?", respuesta: "Vermögen, weitere Einkommen und Abzüge wie Krankheitskosten, Spenden oder Weiterbildung. Massgebend ist die Veranlagung." },
  ],
  glosario: [
    { termino: "Steuerpflichtiger Erwerb", definicion: "Einkommen nach den gesetzlichen Abzügen, auf das der Tarif angewendet wird." },
    { termino: "Gemeindezuschlag", definicion: "Zuschlag der Wohngemeinde in Prozent der Landessteuer." },
  ],
});
