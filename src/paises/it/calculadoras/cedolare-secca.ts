import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { aliquotaMarginale, irpefLorda } from "../lib/irpef";

export default definirCalculadora({
  id: "it.cedolare-secca",
  mercado: "it",
  concepto: "propio",
  slug: "calcolo-cedolare-secca",
  estado: "publicado",
  requiere: {
    "it.cedolare-secca": "mapa",
    "it.irpef-scaglioni": "escala",
    "it.riduzione-canone": "numero",
    "it.riduzione-concordato": "numero",
  },
  campos: [
    { id: "canone", tipo: "moneda", etiqueta: "Canone annuo d'affitto", min: 0, porDefecto: 9600 },
    { id: "contratto", tipo: "opcion-dato", dato: "it.cedolare-secca", etiqueta: "Tipo di contratto", porDefecto: "libero" },
    {
      id: "altriRedditi",
      tipo: "moneda",
      etiqueta: "Altri redditi imponibili IRPEF",
      ayuda: "Il tuo reddito senza l'affitto, per esempio lo stipendio al netto dei contributi.",
      min: 0,
      porDefecto: 30000,
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.canone < 0) throw new ErrorEntrada("Il canone non può essere negativo.", "canone");
    const aliquota = enMapa(v["it.cedolare-secca"], e.contratto);
    const cedolare = redondear(porcentaje(e.canone, aliquota));
    let reddito = e.canone - porcentaje(e.canone, v["it.riduzione-canone"]);
    if (e.contratto === "concordato") reddito -= porcentaje(reddito, v["it.riduzione-concordato"]);
    reddito = redondear(reddito);
    const scaglioni = v["it.irpef-scaglioni"];
    const irpef = redondear(irpefLorda(scaglioni, e.altriRedditi + reddito) - irpefLorda(scaglioni, e.altriRedditi));
    const risparmio = redondear(irpef - cedolare);
    return {
      cedolare,
      aliquota,
      reddito,
      irpef,
      risparmio,
      marginale: aliquotaMarginale(scaglioni, e.altriRedditi + reddito),
      observaciones: [
        risparmio >= 0
          ? "Con questi numeri la cedolare secca conviene. In più non paghi le addizionali sull'affitto né l'imposta di registro e di bollo sul contratto."
          : "Con questi numeri la tassazione ordinaria costa meno, prima di contare le addizionali e l'imposta di registro che con la cedolare non paghi.",
      ],
    };
  },
  resultado: [
    { clave: "cedolare", etiqueta: "Cedolare secca da pagare", formato: "moneda", destacada: true },
    { clave: "aliquota", etiqueta: "Aliquota della cedolare", formato: "porcentaje", decimales: 0 },
    { clave: "irpef", etiqueta: "IRPEF in più con la tassazione ordinaria", formato: "moneda" },
    { clave: "reddito", etiqueta: "Reddito da affitto ai fini IRPEF", formato: "moneda" },
    { clave: "risparmio", etiqueta: "Risparmio con la cedolare", formato: "moneda" },
    { clave: "marginale", etiqueta: "Tua aliquota IRPEF marginale", formato: "porcentaje", decimales: 0 },
  ],
});
