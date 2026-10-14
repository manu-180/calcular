import { definirCalculadora, porRegion } from "@/motor/calculo";
import { abrunden, einkommensteuer, solidaritaetszuschlag, type Tarif } from "../lib/steuer";
import { REQ_TARIF, soliAus } from "../lib/werte";

function grenzsteuersatz(zvE: number, t: Tarif, splitting: boolean): number {
  const x = splitting ? zvE / 2 : zvE;
  if (x <= t.grundfreibetrag) return 0;
  if (x <= t["zone2-bis"]) return (2 * t["zone2-faktor"] * ((x - t.grundfreibetrag) / 10000) + t["zone2-basis"]) / 100;
  if (x <= t["zone3-bis"]) return (2 * t["zone3-faktor"] * ((x - t["zone2-bis"]) / 10000) + t["zone3-basis"]) / 100;
  if (x <= t["zone4-bis"]) return t["zone4-satz"];
  return t["zone5-satz"];
}

export default definirCalculadora({
  id: "de.einkommensteuer-rechner",
  mercado: "de",
  concepto: "impuesto-renta",
  slug: "einkommensteuer-rechner",
  estado: "publicado",
  requiere: { ...REQ_TARIF, "de.kirchensteuer": "numero-por-region" },
  campos: [
    { id: "zvE", tipo: "moneda", etiqueta: "Zu versteuerndes Einkommen im Jahr", min: 0, porDefecto: 50000 },
    {
      id: "veranlagung",
      tipo: "opcion",
      etiqueta: "Veranlagung",
      opciones: [
        { valor: "einzeln", etiqueta: "Einzelveranlagung (Grundtarif)" },
        { valor: "zusammen", etiqueta: "Zusammenveranlagung (Splittingtarif)" },
      ],
      porDefecto: "einzeln",
    },
    { id: "kirche", tipo: "si-no", etiqueta: "Kirchensteuerpflichtig", porDefecto: false },
    { id: "bundesland", tipo: "region", etiqueta: "Bundesland (für die Kirchensteuer)", porDefecto: "nw" },
  ],
  calcular(entrada, valores, { redondear }) {
    const tarif = valores["de.est-tarif"];
    const splitting = entrada.veranlagung === "zusammen";
    const est = einkommensteuer(entrada.zvE, tarif, splitting);
    const soli = solidaritaetszuschlag(est, soliAus(valores), splitting);
    const kirchensteuer = entrada.kirche ? abrunden((est * porRegion(valores["de.kirchensteuer"], entrada.bundesland)) / 100, 2) : 0;
    const gesamt = redondear(est + soli + kirchensteuer);
    return {
      est,
      soli,
      kirchensteuer,
      gesamt,
      monatlich: redondear(gesamt / 12),
      durchschnitt: entrada.zvE > 0 ? (est / entrada.zvE) * 100 : 0,
      grenz: grenzsteuersatz(entrada.zvE, tarif, splitting),
    };
  },
  resultado: [
    { clave: "est", etiqueta: "Einkommensteuer", formato: "moneda", destacada: true },
    { clave: "soli", etiqueta: "Solidaritätszuschlag", formato: "moneda" },
    { clave: "kirchensteuer", etiqueta: "Kirchensteuer", formato: "moneda", ocultarSiCero: true },
    { clave: "gesamt", etiqueta: "Steuern zusammen", formato: "moneda" },
    { clave: "monatlich", etiqueta: "Das sind im Monat", formato: "moneda" },
    { clave: "durchschnitt", etiqueta: "Durchschnittssteuersatz", formato: "porcentaje", decimales: 2 },
    { clave: "grenz", etiqueta: "Grenzsteuersatz", formato: "porcentaje", decimales: 2 },
  ],
});
