import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { REQ_SV, svLaufend, svSonderzahlung } from "../lib/lohn";

export default definirCalculadora({
  id: "at.sozialversicherung-rechner",
  mercado: "at",
  concepto: "aportes-seguridad-social",
  slug: "sozialversicherung-rechner",
  estado: "publicado",
  requiere: REQ_SV,
  campos: [
    { id: "brutto", tipo: "moneda", etiqueta: "Bruttogehalt im Monat", min: 0, porDefecto: 3500 },
    { id: "wien", tipo: "si-no", etiqueta: "Arbeitsort in Wien", porDefecto: false, ayuda: "In Wien ist der Wohnbauförderungsbeitrag höher." },
  ],
  calcular(entrada, valores, { redondear }) {
    const sv = svLaufend(entrada.brutto, valores, entrada.wien, redondear);
    const ak = redondear(porcentaje(sv.basis, valores["at.sv-dienstnehmer"].ak));
    const erste = sv.geringfuegig ? { sv: 0, basis: 0 } : svSonderzahlung(entrada.brutto, 0, valores, redondear);
    const zweite = sv.geringfuegig ? { sv: 0, basis: 0 } : svSonderzahlung(entrada.brutto, erste.basis, valores, redondear);
    const observaciones: string[] = [];
    if (sv.geringfuegig) observaciones.push("Unter der Geringfügigkeitsgrenze zahlen Dienstnehmer aus diesem Dienstverhältnis keine Beiträge.");
    if (entrada.brutto > valores["at.beitragsgrundlage"]["hoechst-monat"]) observaciones.push("Beiträge werden nur bis zur Höchstbeitragsgrundlage berechnet.");
    return {
      summe: sv.summe,
      kv: sv.kv,
      pv: sv.pv,
      av: sv.av,
      avSatz: sv.avSatz,
      ak,
      wbf: redondear(sv.umlagen - ak),
      quote: entrada.brutto > 0 ? (sv.summe / entrada.brutto) * 100 : 0,
      sonderzahlung: erste.sv,
      jahr: redondear(12 * sv.summe + erste.sv + zweite.sv),
      observaciones,
    };
  },
  resultado: [
    { clave: "summe", etiqueta: "Sozialversicherung im Monat", formato: "moneda", destacada: true },
    { clave: "kv", etiqueta: "Krankenversicherung", formato: "moneda" },
    { clave: "pv", etiqueta: "Pensionsversicherung", formato: "moneda" },
    { clave: "av", etiqueta: "Arbeitslosenversicherung", formato: "moneda" },
    { clave: "avSatz", etiqueta: "Ihr Satz in der Arbeitslosenversicherung", formato: "porcentaje" },
    { clave: "ak", etiqueta: "Arbeiterkammerumlage", formato: "moneda" },
    { clave: "wbf", etiqueta: "Wohnbauförderungsbeitrag", formato: "moneda" },
    { clave: "quote", etiqueta: "Anteil am Bruttogehalt", formato: "porcentaje", decimales: 2 },
    { clave: "sonderzahlung", etiqueta: "Sozialversicherung auf Urlaubsgeld oder Weihnachtsgeld", formato: "moneda" },
    { clave: "jahr", etiqueta: "Sozialversicherung im Jahr (14 Gehälter)", formato: "moneda" },
  ],
});
