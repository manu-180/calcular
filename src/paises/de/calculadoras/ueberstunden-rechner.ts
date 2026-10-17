import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "de.ueberstunden-rechner",
  mercado: "de",
  concepto: "horas-extra",
  slug: "ueberstunden-rechner",
  estado: "publicado",
  requiere: { "de.mindestlohn": "numero" },
  campos: [
    { id: "brutto", tipo: "moneda", etiqueta: "Bruttomonatsgehalt", min: 0, porDefecto: 3500 },
    { id: "wochenstunden", tipo: "numero", etiqueta: "Vertragliche Wochenstunden", min: 1, max: 60, porDefecto: 40 },
    { id: "stunden", tipo: "numero", etiqueta: "Überstunden im Monat", min: 0, max: 200, porDefecto: 10 },
    { id: "zuschlag", tipo: "porcentaje", etiqueta: "Überstundenzuschlag laut Vertrag oder Tarif", min: 0, max: 200, porDefecto: 0, ayuda: "Das Gesetz schreibt keinen Zuschlag vor. Tragen Sie ihn nur ein, wenn er vereinbart ist." },
  ],
  calcular(entrada, valores, { redondear }) {
    const stundenlohn = redondear((entrada.brutto * 3) / (13 * entrada.wochenstunden));
    const grund = redondear(stundenlohn * entrada.stunden);
    const zuschlag = redondear(porcentaje(grund, entrada.zuschlag));
    const observaciones: string[] = [];
    if (stundenlohn < valores["de.mindestlohn"]) observaciones.push("Ihr Stundenlohn liegt unter dem Mindestlohn. Auch jede Überstunde muss mindestens mit dem Mindestlohn bezahlt werden.");
    return { stundenlohn, grund, zuschlag, gesamt: redondear(grund + zuschlag), observaciones };
  },
  resultado: [
    { clave: "gesamt", etiqueta: "Vergütung der Überstunden brutto", formato: "moneda", destacada: true },
    { clave: "stundenlohn", etiqueta: "Ihr Stundenlohn", formato: "moneda" },
    { clave: "grund", etiqueta: "Grundvergütung", formato: "moneda" },
    { clave: "zuschlag", etiqueta: "Zuschlag", formato: "moneda", ocultarSiCero: true },
  ],
});
