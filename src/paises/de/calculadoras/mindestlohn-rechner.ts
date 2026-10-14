import { definirCalculadora } from "@/motor/calculo";
import { geringfuegigkeitsgrenze } from "../lib/steuer";

export default definirCalculadora({
  id: "de.mindestlohn-rechner",
  mercado: "de",
  concepto: "salario-minimo",
  slug: "mindestlohn-rechner",
  estado: "publicado",
  requiere: { "de.mindestlohn": "numero" },
  campos: [
    { id: "wochenstunden", tipo: "numero", etiqueta: "Arbeitsstunden pro Woche", min: 1, max: 60, porDefecto: 40 },
    { id: "monatsbrutto", tipo: "moneda", etiqueta: "Ihr Bruttolohn im Monat (optional)", min: 0, requerido: false, ayuda: "Zum Prüfen, ob Sie mindestens den Mindestlohn erhalten." },
  ],
  calcular(entrada, valores, { redondear }) {
    const ml = valores["de.mindestlohn"];
    const ihrStundenlohn = entrada.monatsbrutto === null ? null : redondear((entrada.monatsbrutto * 3) / (13 * entrada.wochenstunden));
    const observaciones: string[] = [];
    if (ihrStundenlohn !== null) {
      observaciones.push(
        ihrStundenlohn >= ml
          ? "Ihr Stundenlohn liegt auf oder über dem Mindestlohn."
          : "Ihr Stundenlohn liegt unter dem Mindestlohn. Sprechen Sie Ihren Arbeitgeber an; der Anspruch auf den Mindestlohn lässt sich nicht vertraglich ausschließen.",
      );
    }
    const grenze = geringfuegigkeitsgrenze(ml);
    return {
      mindestlohn: ml,
      monatlich: redondear((ml * entrada.wochenstunden * 13) / 3),
      jaehrlich: redondear(ml * entrada.wochenstunden * 52),
      ihrStundenlohn,
      differenz: ihrStundenlohn === null ? null : redondear(ihrStundenlohn - ml),
      minijobGrenze: grenze,
      minijobStunden: grenze / ml,
      observaciones,
    };
  },
  resultado: [
    { clave: "mindestlohn", etiqueta: "Mindestlohn pro Stunde", formato: "moneda", destacada: true },
    { clave: "monatlich", etiqueta: "Mindestens im Monat bei Ihren Wochenstunden", formato: "moneda" },
    { clave: "jaehrlich", etiqueta: "Mindestens im Jahr", formato: "moneda" },
    { clave: "ihrStundenlohn", etiqueta: "Ihr Stundenlohn", formato: "moneda" },
    { clave: "differenz", etiqueta: "Abstand zum Mindestlohn", formato: "moneda" },
    { clave: "minijobGrenze", etiqueta: "Minijob-Grenze im Monat", formato: "moneda" },
    { clave: "minijobStunden", etiqueta: "Höchste Monatsstunden im Minijob zum Mindestlohn", formato: "horas", decimales: 1 },
  ],
});
