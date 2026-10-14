import { aplicarEscalaMarginal, definirCalculadora } from "@/motor/calculo";
import { avabJahr, satzInStufe } from "../lib/lohn";

export default definirCalculadora({
  id: "at.einkommensteuer-rechner",
  mercado: "at",
  concepto: "impuesto-renta",
  slug: "einkommensteuer-rechner",
  estado: "publicado",
  requiere: {
    "at.est-tarif": "escala",
    "at.verkehrsabsetzbetrag": "numero",
    "at.avab": "mapa",
  },
  campos: [
    { id: "einkommen", tipo: "moneda", etiqueta: "Zu versteuerndes Einkommen im Jahr", min: 0, porDefecto: 40000, ayuda: "Einkünfte nach Abzug von Sozialversicherung, Werbungskosten, Sonderausgaben und Freibeträgen. Bei Arbeitnehmern ohne Urlaubsgeld und Weihnachtsgeld." },
    { id: "arbeitnehmer", tipo: "si-no", etiqueta: "Einkünfte als Arbeitnehmer (Verkehrsabsetzbetrag)", porDefecto: false },
    { id: "avabKinder", tipo: "entero", etiqueta: "Alleinverdiener oder Alleinerzieher: Anzahl der Kinder", min: 0, max: 10, porDefecto: 0, ayuda: "0, wenn Ihnen der Absetzbetrag nicht zusteht." },
  ],
  calcular(entrada, valores, { redondear }) {
    const tarif = valores["at.est-tarif"];
    const tarifsteuer = redondear(aplicarEscalaMarginal(tarif, entrada.einkommen));
    const absetzbetraege = (entrada.arbeitnehmer ? valores["at.verkehrsabsetzbetrag"] : 0) + avabJahr(valores["at.avab"], entrada.avabKinder);
    const steuer = Math.max(0, redondear(tarifsteuer - absetzbetraege));
    const observaciones: string[] = [];
    if (tarifsteuer > 0 && tarifsteuer < absetzbetraege) observaciones.push("Die Absetzbeträge sind höher als die Steuer. Unter Umständen wird ein Teil davon in der Veranlagung ausgezahlt, etwa als SV-Rückerstattung.");
    return {
      steuer,
      tarifsteuer,
      absetzbetraege,
      durchschnitt: entrada.einkommen > 0 ? (steuer / entrada.einkommen) * 100 : 0,
      grenzsteuersatz: satzInStufe(tarif, entrada.einkommen),
      nachSteuer: redondear(entrada.einkommen - steuer),
      monatlich: redondear(steuer / 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "steuer", etiqueta: "Einkommensteuer im Jahr", formato: "moneda", destacada: true },
    { clave: "tarifsteuer", etiqueta: "Steuer nach Tarif", formato: "moneda" },
    { clave: "absetzbetraege", etiqueta: "Absetzbeträge", formato: "moneda", ocultarSiCero: true },
    { clave: "durchschnitt", etiqueta: "Durchschnittssteuersatz", formato: "porcentaje", decimales: 2 },
    { clave: "grenzsteuersatz", etiqueta: "Grenzsteuersatz", formato: "porcentaje" },
    { clave: "nachSteuer", etiqueta: "Einkommen nach Steuer", formato: "moneda" },
    { clave: "monatlich", etiqueta: "Steuer pro Monat (ein Zwölftel)", formato: "moneda" },
  ],
});
