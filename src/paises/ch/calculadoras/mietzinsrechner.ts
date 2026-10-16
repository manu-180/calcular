import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { monatsname } from "../lib/datum";
import { veraenderungZwischen } from "../lib/lik";

// Art. 13 Abs. 1 VMWG: je Viertelprozent höchstens 2 % (Satz über 6 %), 2,5 % (5 bis 6 %) oder den
// Satz aus datos.json (unter 5 %). Senkungen kehren die Erhöhung um (geteilt statt multipliziert).
function satzFuer(niveau: number, unter5: number): number {
  if (niveau > 6) return 2;
  if (niveau >= 5) return 2.5;
  return unter5;
}

export default definirCalculadora({
  id: "ch.mietzinsrechner",
  mercado: "ch",
  concepto: "propio",
  slug: "mietzinsrechner",
  estado: "publicado",
  requiere: {
    "ch.referenzzinssatz": "numero",
    "ch.mietzins-hypothekarzins": "numero",
    "ch.mietzins-teuerungsanteil": "numero",
    "ch.lik": "serie",
  },
  campos: [
    { id: "miete", tipo: "moneda", etiqueta: "Heutiger Nettomietzins pro Monat", min: 0, porDefecto: 2000 },
    { id: "refAlt", tipo: "porcentaje", etiqueta: "Referenzzinssatz bei der letzten Mietzinsanpassung", min: 0.25, max: 10, porDefecto: 1.75, ayuda: "Steht im Mietvertrag oder in der letzten Mietzinsanpassung." },
    { id: "monatAlt", tipo: "fecha", etiqueta: "Stand des Landesindexes bei der letzten Anpassung (Monat)", min: "2000-01-01", porDefecto: "2023-12-01" },
    { id: "kosten", tipo: "porcentaje", etiqueta: "Allgemeine Kostensteigerung (falls geltend gemacht)", min: -10, max: 20, requerido: false },
  ],
  calcular(entrada, valores, { redondear, fecha }) {
    const refNeu = valores["ch.referenzzinssatz"];
    const schritteRoh = (refNeu - entrada.refAlt) / 0.25;
    const schritte = Math.round(schritteRoh);
    if (Math.abs(schritteRoh - schritte) > 1e-9) throw new ErrorEntrada("Der Referenzzinssatz ändert in Schritten von 0.25 Prozentpunkten.", "refAlt");
    let faktor = 1;
    let niveau = entrada.refAlt;
    for (let i = 0; i < Math.abs(schritte); i++) {
      if (schritte > 0) {
        faktor *= 1 + satzFuer(niveau, valores["ch.mietzins-hypothekarzins"]) / 100;
        niveau += 0.25;
      } else {
        niveau -= 0.25;
        faktor /= 1 + satzFuer(niveau, valores["ch.mietzins-hypothekarzins"]) / 100;
      }
    }
    const hypothek = (faktor - 1) * 100;
    const lik = veraenderungZwischen(valores["ch.lik"], entrada.monatAlt, fecha, { von: "monatAlt", bis: "monatAlt" });
    const teuerung = (lik.gesamt * valores["ch.mietzins-teuerungsanteil"]) / 100;
    const kosten = entrada.kosten ?? 0;
    const total = hypothek + teuerung + kosten;
    const neu = redondear(entrada.miete * (1 + total / 100));
    return {
      neu,
      differenz: redondear(neu - entrada.miete),
      total,
      hypothek,
      teuerung,
      kosten,
      refNeu,
      likMonat: monatsname(lik.monatEnde),
      observaciones: [
        ...lik.hinweise,
        "Der Rechner zählt die drei Anteile zusammen. Ob und wie viel Sie verlangen oder geltend machen können, hängt auch von früheren Anpassungen und vom Vertrag ab.",
      ],
    };
  },
  resultado: [
    { clave: "neu", etiqueta: "Angepasster Nettomietzins pro Monat", formato: "moneda", destacada: true },
    { clave: "differenz", etiqueta: "Veränderung pro Monat", formato: "moneda" },
    { clave: "total", etiqueta: "Veränderung total", formato: "porcentaje", decimales: 2 },
    { clave: "hypothek", etiqueta: "Anteil Referenzzinssatz", formato: "porcentaje", decimales: 2 },
    { clave: "teuerung", etiqueta: "Anteil Teuerung", formato: "porcentaje", decimales: 2 },
    { clave: "kosten", etiqueta: "Anteil Kostensteigerung", formato: "porcentaje", decimales: 2, ocultarSiCero: true },
    { clave: "refNeu", etiqueta: "Aktueller Referenzzinssatz", formato: "porcentaje", decimales: 2 },
    { clave: "likMonat", etiqueta: "Landesindex bis", formato: "texto" },
  ],
});
