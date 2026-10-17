import { definirCalculadora } from "@/motor/calculo";
import { einkommensteuer } from "../lib/steuer";

export default definirCalculadora({
  id: "de.kindergeld-rechner",
  mercado: "de",
  concepto: "propio",
  slug: "kindergeld-rechner",
  estado: "publicado",
  requiere: { "de.kindergeld": "numero", "de.kinderfreibetrag": "mapa", "de.est-tarif": "mapa" },
  campos: [
    { id: "kinder", tipo: "entero", etiqueta: "Anzahl der Kinder mit Kindergeld", min: 1, max: 15, porDefecto: 1 },
    { id: "zvE", tipo: "moneda", etiqueta: "Zu versteuerndes Einkommen im Jahr (optional)", min: 0, requerido: false, ayuda: "Für den Vergleich mit den Kinderfreibeträgen." },
    {
      id: "veranlagung",
      tipo: "opcion",
      etiqueta: "Veranlagung",
      opciones: [
        { valor: "zusammen", etiqueta: "Zusammen veranlagte Eltern" },
        { valor: "einzeln", etiqueta: "Einzeln veranlagt (halber Freibetrag)" },
      ],
      porDefecto: "zusammen",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const monat = redondear(valores["de.kindergeld"] * entrada.kinder);
    const jahr = redondear(monat * 12);
    let ersparnis: number | null = null;
    let besser: string | null = null;
    if (entrada.zvE !== null) {
      const sp = entrada.veranlagung === "zusammen";
      const f = valores["de.kinderfreibetrag"];
      const freibetrag = (f.saechlich + f.bea) * (sp ? 2 : 1) * entrada.kinder;
      const t = valores["de.est-tarif"];
      ersparnis = einkommensteuer(entrada.zvE, t, sp) - einkommensteuer(Math.max(entrada.zvE - freibetrag, 0), t, sp);
      const anteilKindergeld = sp ? jahr : redondear(jahr / 2);
      besser = ersparnis > anteilKindergeld ? "Kinderfreibeträge" : "Kindergeld";
    }
    return {
      monat,
      jahr,
      ersparnis,
      besser,
      observaciones: ["Das Finanzamt prüft in der Steuererklärung von selbst, ob die Freibeträge günstiger sind, und verrechnet dann das schon gezahlte Kindergeld. Solidaritätszuschlag und Kirchensteuer sind im Vergleich nicht enthalten."],
    };
  },
  resultado: [
    { clave: "monat", etiqueta: "Kindergeld im Monat", formato: "moneda", destacada: true },
    { clave: "jahr", etiqueta: "Kindergeld im Jahr", formato: "moneda" },
    { clave: "ersparnis", etiqueta: "Steuerersparnis durch die Kinderfreibeträge", formato: "moneda" },
    { clave: "besser", etiqueta: "Günstiger für Sie", formato: "texto" },
  ],
});
