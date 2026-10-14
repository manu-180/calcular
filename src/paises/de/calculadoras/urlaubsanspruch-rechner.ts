import { definirCalculadora } from "@/motor/calculo";

// § 5 Absatz 2 BUrlG: Bruchteile ab einem halben Tag werden aufgerundet, kleinere bleiben stehen.
function teilurlaubRunden(tage: number): number {
  const ganz = Math.floor(tage + 1e-9);
  return tage - ganz >= 0.5 - 1e-9 ? ganz + 1 : Math.round(tage * 100) / 100;
}

export default definirCalculadora({
  id: "de.urlaubsanspruch-rechner",
  mercado: "de",
  concepto: "vacaciones",
  slug: "urlaubsanspruch-rechner",
  estado: "publicado",
  requiere: { "de.mindesturlaub": "numero" },
  campos: [
    { id: "tageProWoche", tipo: "entero", etiqueta: "Arbeitstage pro Woche", min: 1, max: 6, porDefecto: 5 },
    { id: "vertraglich", tipo: "entero", etiqueta: "Urlaubstage laut Arbeitsvertrag (optional)", min: 0, max: 60, requerido: false },
    { id: "monate", tipo: "entero", etiqueta: "Volle Monate im Arbeitsverhältnis in diesem Jahr", min: 0, max: 12, porDefecto: 12, ayuda: "Weniger als 12 bei Eintritt oder Austritt im Laufe des Jahres." },
  ],
  calcular(entrada, valores) {
    const gesetzlich = (valores["de.mindesturlaub"] * entrada.tageProWoche) / 6;
    const jahresurlaub = Math.max(gesetzlich, entrada.vertraglich ?? 0);
    const anteilig = entrada.monate >= 12 ? jahresurlaub : teilurlaubRunden((jahresurlaub * entrada.monate) / 12);
    const observaciones: string[] = [];
    if (entrada.vertraglich !== null && entrada.vertraglich < gesetzlich) observaciones.push("Ihr Vertrag sieht weniger als den gesetzlichen Mindesturlaub vor. Es gilt mindestens der gesetzliche Anspruch.");
    if (entrada.monate < 12) observaciones.push("Ein Zwölftel pro vollem Monat gilt im Eintrittsjahr vor Ablauf von sechs Monaten und beim Ausscheiden in der ersten Jahreshälfte. Wer nach sechs Monaten in der zweiten Jahreshälfte geht, behält den vollen gesetzlichen Urlaub.");
    return { gesetzlich, jahresurlaub, anteilig, observaciones };
  },
  resultado: [
    { clave: "anteilig", etiqueta: "Ihr Urlaubsanspruch in diesem Jahr", formato: "dias", decimales: 2, destacada: true },
    { clave: "gesetzlich", etiqueta: "Gesetzlicher Mindesturlaub im Jahr", formato: "dias", decimales: 2 },
    { clave: "jahresurlaub", etiqueta: "Voller Jahresurlaub", formato: "dias", decimales: 2 },
  ],
});
